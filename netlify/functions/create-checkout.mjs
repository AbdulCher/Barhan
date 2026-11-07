// ============================================================
// CREATE CHECKOUT — crée la page de paiement Stripe
// ============================================================
//
// Appelée par le panier (Shop.jsx) à l'adresse :
//   /.netlify/functions/create-checkout
//
// Les prix sont relus ICI depuis ShopData.js : le navigateur envoie
// seulement { id, size, qty }, il ne peut donc pas changer un prix.
//
// Réglage obligatoire dans Netlify :
//   Project configuration → Environment variables → STRIPE_SECRET_KEY
//   (sk_test_... pour tester, sk_live_... pour vendre pour de vrai)

import { PRODUCTS, SHIPPING_ZONES } from "../../src/pages/ShopData.js";

const MAX_QTY = 10;

// Stripe attend ses données au format formulaire : a[b][0][c]=valeur
function toForm(value, prefix, out = []) {
  if (value === null || value === undefined) return out;
  if (Array.isArray(value)) {
    value.forEach((v, i) => toForm(v, `${prefix}[${i}]`, out));
  } else if (typeof value === "object") {
    for (const [k, v] of Object.entries(value)) toForm(v, prefix ? `${prefix}[${k}]` : k, out);
  } else {
    out.push(`${encodeURIComponent(prefix)}=${encodeURIComponent(value)}`);
  }
  return out;
}

const json = (status, data) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });

export function buildSession(body, origin) {
  const { items, zone } = body || {};
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    throw new Error("Panier vide ou invalide.");
  }
  const shipping = SHIPPING_ZONES.find((z) => z.id === zone);
  if (!shipping) throw new Error("Zone de livraison invalide.");

  const line_items = items.map((item) => {
    const product = PRODUCTS.find((p) => p.id === Number(item.id));
    if (!product) throw new Error("Produit inconnu.");
    const qty = Number(item.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new Error("Quantité invalide.");
    if (product.sizes) {
      if (!product.sizes.includes(item.size)) throw new Error("Taille invalide.");
    }
    const size = product.sizes ? item.size : null;
    return {
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.category} — ${product.title}${size ? ` (taille ${size})` : ""}`,
          metadata: { product_id: String(product.id), size: size || "" },
        },
      },
    };
  });

  return {
    mode: "payment",
    locale: "fr",
    line_items,
    shipping_address_collection: { allowed_countries: shipping.countries },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: `Livraison ${shipping.label} (${shipping.delay})`,
          fixed_amount: { amount: Math.round(shipping.price * 100), currency: "eur" },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    success_url: `${origin}/shop?paiement=ok`,
    cancel_url: `${origin}/shop?paiement=annule`,
  };
}

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Méthode non autorisée." });

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return json(500, { error: "Paiement non configuré (clé Stripe manquante)." });

  let params;
  try {
    params = buildSession(await req.json(), new URL(req.url).origin);
  } catch (e) {
    return json(400, { error: e.message || "Requête invalide." });
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: toForm(params).join("&"),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Stripe:", data?.error?.message);
    return json(502, { error: "Le paiement n'a pas pu être préparé. Réessayez dans un instant." });
  }
  return json(200, { url: data.url });
};

export { toForm };
