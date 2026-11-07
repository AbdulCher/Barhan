import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Icons from "../components/Icons";
import { PRODUCTS, CATEGORIES, SHIPPING_ZONES } from "./ShopData";
import useCart from "../hooks/useCart";
import Coussindesign from "../assets/coussindesign.webp";
import NdeysanCover from "../assets/ndeysancover.webp";
import MotsdeteteCover from "../assets/motsdetetecover.webp";

// ── Images des produits (id du produit → image) ───────────────
// Pour ajouter une photo : importez-la en haut du fichier puis
// ajoutez-la ici en face de l'id du produit (voir ShopData.js).
const PRODUCT_IMAGES = {
  1: NdeysanCover,      // CD Ndeysan
  2: MotsdeteteCover,   // CD Mots de Tête
  3: NdeysanCover,      // Vinyle Ndeysan
  4: MotsdeteteCover,   // Vinyle Mots de Tête
  // 5: TshirtNoir,
  // 6: TshirtBlanc,
};

const CATEGORY_ICONS = { CD: "💿", Vinyle: "🎵", "T-shirt": "👕" };

function ProductPlaceholder({ category }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <span className="text-5xl" aria-hidden="true">{CATEGORY_ICONS[category] ?? "🛍️"}</span>
      <p className="font-dm text-xs text-[#efdecd]/60 uppercase tracking-widest">
        Image à venir
      </p>
    </div>
  );
}

// Disque qui dépasse de la pochette (CD argenté / vinyle noir)
function Disc({ type }) {
  const isVinyl = type === "Vinyle";
  return (
    <div
      aria-hidden="true"
      className="absolute top-[5%] left-[30%] w-[90%] aspect-square rounded-full
                 transition-transform duration-700 ease-out
                 group-hover:translate-x-[18%] group-hover:rotate-[60deg]"
      style={{
        background: isVinyl
          ? "radial-gradient(circle, #e29600 0 15%, #2a1405 15.5% 17%, transparent 17.5%), repeating-radial-gradient(circle, #141414 0 2px, #070707 2px 4px)"
          : "radial-gradient(circle, transparent 0 7%, #cfd2da 7.5% 16%, rgba(255,255,255,0.15) 16.5% 18%, transparent 18.5%), conic-gradient(from 20deg, #d8dbe3, #8f99ad, #efe6cf, #a9bdd0, #d6c7e8, #d8dbe3)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
      }}
    />
  );
}

function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [added, setAdded] = useState(false);
  const image = PRODUCT_IMAGES[product.id];
  const hasDisc = product.category === "CD" || product.category === "Vinyle";

  const handleAdd = () => {
    onAdd(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="relative flex flex-col rounded-2xl overflow-hidden group
         bg-[#140907] border border-[#efdecd]/10
         shadow-[0_20px_50px_rgba(0,0,0,0.55)]
         hover:-translate-y-1 hover:border-[#e29600]/40
         hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(226,150,0,0.08)]
         transition-all duration-300">

      <span className="absolute top-3 left-3 z-10 font-dm text-[10px] font-bold
        tracking-widest uppercase px-2.5 py-1 rounded-full
        bg-black/60 border border-[#e29600]/30 text-[#e29600]">
        {product.category}
      </span>

      {/* Présentoir : pochette centrée + disque qui dépasse */}
      <div
        className="relative w-full aspect-[5/4] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(226,150,0,0.16), transparent 70%), linear-gradient(180deg, #24100a 0%, #110705 100%)",
        }}
      >
        {image ? (
          <div className="relative w-[58%] aspect-square transition-transform duration-700 ease-out group-hover:-translate-x-[10%]">
            {hasDisc && <Disc type={product.category} />}
            <img
              src={image}
              alt={`${product.category} ${product.title}`}
              width="300"
              height="300"
              loading="lazy"
              className="relative w-full h-full object-cover rounded-[4px]
                         shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
            />
          </div>
        ) : (
          <ProductPlaceholder category={product.category} />
        )}
        {/* reflet du sol */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col gap-3 p-6 flex-1 border-t border-[#efdecd]/10">
        <div>
          <h3 className="font-bebas text-2xl tracking-widest text-[#efdecd] leading-none">{product.title}</h3>
          <p className="font-dm text-[11px] text-[#efdecd]/60 tracking-[0.2em] uppercase mt-1.5">
            {product.subtitle}
          </p>
        </div>

        <p className="font-dm text-sm text-[#efdecd]/75 leading-relaxed">{product.description}</p>

        {product.sizes && (
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Taille">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                aria-pressed={selectedSize === s}
                aria-label={`Taille ${s}`}
                className={`font-dm text-xs font-bold tracking-widest w-10 h-10 rounded-lg border
                            transition-all duration-200
                            ${selectedSize === s
                              ? "border-[#e29600] text-[#e29600] bg-[#e29600]/10"
                              : "border-[#efdecd]/15 text-[#efdecd]/70 hover:border-[#efdecd]/40"
                            }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-[#efdecd]/10">
          <span className="font-bebas text-3xl text-[#e29600] tracking-wide leading-none">
            {product.price} €
          </span>
          <button
            onClick={handleAdd}
            aria-label={`Ajouter ${product.category} ${product.title}${selectedSize ? `, taille ${selectedSize}` : ""} au panier`}
            className={`font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
            px-5 py-2.5 rounded-full border transition-all duration-300
            ${added
              ? "bg-green-700 text-white border-green-500/60"
              : "border-[#e29600]/70 text-[#e29600] hover:bg-[#e29600] hover:text-black hover:border-[#e29600]"
            }`}
          >
            {added ? (
              <>
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <polyline points="3 8 6 11 13 4"/>
                </svg>
                Ajouté
              </>
            ) : (
              <>
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <circle cx="6" cy="13" r="1"/><circle cx="12" cy="13" r="1"/>
                  <path d="M1 1h2l1.5 7h7l1.5-6H4"/>
                </svg>
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose }) {
  const { items, removeItem, updateQty, clearCart, totalItems, totalPrice } = cart;
  const [zoneId, setZoneId] = useState("FR");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const zone = SHIPPING_ZONES.find((z) => z.id === zoneId);
  const grandTotal = totalPrice + (items.length ? zone.price : 0);

  // Fermer avec la touche Échap
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/.netlify/functions/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zone: zoneId,
          items: items.map((i) => ({ id: i.id, size: i.size, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Erreur");
      window.location.href = data.url; // → page de paiement sécurisée Stripe
    } catch (e) {
      setError(e.message || "Le paiement n'a pas pu démarrer. Réessayez.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mon panier"
        className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50
        bg-black border-l border-[#390202]/40
        flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
        animate-[slideInRight_0.3s_ease]"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#efdecd]/10">
          <div>
            <h2 className="font-bebas text-2xl tracking-widest text-[#efdecd]">Mon Panier</h2>
            <p className="font-dm text-xs text-[#efdecd]/60 tracking-widest uppercase">
              {totalItems} article{totalItems > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer le panier"
            className="w-10 h-10 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
            flex items-center justify-center text-[#efdecd]/70 hover:text-[#efdecd]
            transition-all duration-200"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M3 3l10 10M13 3L3 13"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl" aria-hidden="true">🛍️</span>
              <p className="font-dm text-sm text-[#efdecd]/60 tracking-wide">Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => {
              const image = PRODUCT_IMAGES[item.id];
              const name = `${item.category} ${item.title}${item.size ? `, taille ${item.size}` : ""}`;
              return (
                <div key={item.key}
                  className="flex items-center gap-4 bg-[#efdecd]/5 border border-[#efdecd]/10
                  rounded-xl p-4 transition-all duration-200">

                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#efdecd]/5
                    flex items-center justify-center">
                    {image
                      ? <img src={image} alt="" width="56" height="56" className="w-full h-full object-cover" />
                      : <span className="text-2xl" aria-hidden="true">{CATEGORY_ICONS[item.category] ?? "🛍️"}</span>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bebas text-base tracking-widest text-[#efdecd] truncate">{item.title}</p>
                    <p className="font-dm text-xs text-[#efdecd]/60 uppercase">
                      {item.category}{item.size ? ` · Taille ${item.size}` : ""}
                    </p>
                    <p className="font-dm text-sm text-[#e29600] font-bold">{item.price} €</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      aria-label={`Retirer un exemplaire : ${name}`}
                      className="w-8 h-8 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
                      flex items-center justify-center text-[#efdecd]/70 hover:text-[#efdecd]
                      font-bold text-sm transition-all duration-200"
                    >−</button>
                    <span className="font-dm text-sm text-[#efdecd] w-5 text-center" aria-label={`Quantité : ${item.qty}`}>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, Math.min(item.qty + 1, 10))}
                      aria-label={`Ajouter un exemplaire : ${name}`}
                      className="w-8 h-8 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
                      flex items-center justify-center text-[#efdecd]/70 hover:text-[#efdecd]
                      font-bold text-sm transition-all duration-200"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label={`Supprimer du panier : ${name}`}
                    className="w-8 h-8 flex items-center justify-center text-[#efdecd]/50 hover:text-red-400 transition-colors duration-200 shrink-0"
                  >
                    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                      <path d="M3 3l10 10M13 3L3 13"/>
                    </svg>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#efdecd]/10 flex flex-col gap-4">

            {/* Zone de livraison */}
            <fieldset className="flex flex-col gap-2">
              <legend className="font-dm text-xs text-[#efdecd]/70 uppercase tracking-widest mb-2">
                Livraison
              </legend>
              {SHIPPING_ZONES.map((z) => (
                <label
                  key={z.id}
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border cursor-pointer
                    transition-all duration-200 ${zoneId === z.id
                      ? "border-[#e29600] bg-[#e29600]/10"
                      : "border-[#efdecd]/15 hover:border-[#efdecd]/30"}`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="zone"
                      value={z.id}
                      checked={zoneId === z.id}
                      onChange={() => setZoneId(z.id)}
                      className="accent-[#e29600]"
                    />
                    <span className="font-dm text-sm text-[#efdecd]">
                      {z.label}
                      <span className="block text-[11px] text-[#efdecd]/60">{z.delay}</span>
                    </span>
                  </span>
                  <span className="font-dm text-sm text-[#efdecd]/80">{z.price} €</span>
                </label>
              ))}
            </fieldset>

            <div className="flex flex-col gap-1 font-dm text-sm">
              <div className="flex justify-between text-[#efdecd]/70">
                <span>Articles</span><span>{totalPrice} €</span>
              </div>
              <div className="flex justify-between text-[#efdecd]/70">
                <span>Livraison</span><span>{zone.price} €</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#efdecd]/80 uppercase tracking-widest">Total TTC</span>
                <span className="font-bebas text-2xl text-[#e29600] tracking-wide">{grandTotal} €</span>
              </div>
            </div>

            {error && (
              <p role="alert" className="font-dm text-sm text-red-300 bg-red-900/30 border border-red-500/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="font-dm w-full flex items-center justify-center gap-2
              text-sm font-bold tracking-widest uppercase
              text-[#efdecd] hover:text-black bg-[#390202] hover:bg-[#e29600]
              disabled:opacity-60 disabled:cursor-wait
              py-4 rounded-full transition-all duration-200
              shadow-[0_4px_20px_rgba(57,2,2,0.4)]"
            >
              {loading ? "Redirection…" : "Payer"}
              {!loading && (
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M2 8h12M9 3l5 5-5 5"/>
                </svg>
              )}
            </button>
            <p className="font-dm text-[11px] text-[#efdecd]/60 text-center flex items-center justify-center gap-1.5">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <rect x="3" y="7" width="10" height="7" rx="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/>
              </svg>
              Paiement sécurisé par Stripe · Carte, Apple Pay, Google Pay
            </p>
            <button
              onClick={clearCart}
              className="font-dm text-xs text-[#efdecd]/60 hover:text-[#efdecd]
              tracking-widest uppercase transition-colors duration-200 text-center py-2"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState(null); // "ok" | "annule" | null
  const cart = useCart();
  const { clearCart } = cart;

  // Retour depuis Stripe : /shop?paiement=ok ou /shop?paiement=annule
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("paiement");
    if (status === "ok") {
      clearCart();
      setNotice("ok");
    } else if (status === "annule") {
      setNotice("annule");
    }
    if (status) window.history.replaceState({}, "", window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = activeCategory === "Tous"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* BG normal */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${Coussindesign})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Overlay sombre */}
      <div className="fixed inset-0 z-[1]"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(8,3,1,0.55), rgba(8,3,1,0.85))" }} />

      <Header />

      {/* Bouton panier flottant (au-dessus du lecteur audio) */}
      <button
        onClick={() => setCartOpen(true)}
        aria-label={`Ouvrir le panier (${cart.totalItems} article${cart.totalItems > 1 ? "s" : ""})`}
        className="fixed bottom-28 right-6 z-40 w-14 h-14 rounded-full
        bg-[#390202] hover:bg-[#e29600] border border-[#efdecd]/20
        flex items-center justify-center
        shadow-[0_4px_24px_rgba(57,2,2,0.5)]
        transition-all duration-200 hover:scale-110"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#efdecd" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {cart.totalItems > 0 && (
          <span aria-hidden="true" className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e29600]
            text-black font-dm text-[10px] font-bold
            flex items-center justify-center">
            {cart.totalItems}
          </span>
        )}
      </button>

      <section className="relative w-full min-h-screen bg-transparent text-white pt-28 pb-24 overflow-hidden">

        <div className="absolute bottom-0 left-0 right-0 h-64 z-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(57,2,2,0.15) 0%, transparent 75%)" }}
        />

        <div className="relative z-[10] max-w-[1100px] mx-auto px-6 flex flex-col gap-12">

          <div className="flex flex-col items-center gap-3 mt-6">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/60 uppercase">
              Merchandising
            </p>
            <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              BOUTIQUE
            </h2>
            <p className="font-dm text-sm text-[#efdecd]/75 text-center max-w-[460px] mt-2 leading-relaxed">
              Disques et t-shirts officiels, préparés et expédiés par Barhan.
            </p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3 font-dm text-[11px] tracking-widest uppercase text-[#efdecd]/70">
              <li className="flex items-center gap-2">
                <span className="text-[#e29600]" aria-hidden="true">✦</span> Paiement sécurisé
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e29600]" aria-hidden="true">✦</span> Expédié par l'artiste
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#e29600]" aria-hidden="true">✦</span> France · Europe · Monde
              </li>
            </ul>
          </div>

          {/* Message au retour de Stripe */}
          {notice && (
            <div
              role="status"
              className={`relative flex items-start gap-3 rounded-2xl px-5 py-4 border font-dm text-sm
                ${notice === "ok"
                  ? "bg-green-900/40 border-green-500/40 text-green-100"
                  : "bg-[#390202]/60 border-[#efdecd]/20 text-[#efdecd]"}`}
            >
              <span className="flex-1">
                {notice === "ok" ? (
                  <>
                    <strong className="block font-bold">Merci pour votre commande !</strong>
                    Le paiement est confirmé. Vous allez recevoir un reçu par e-mail, et votre colis sera envoyé rapidement.
                  </>
                ) : (
                  <>Le paiement a été annulé. Votre panier est toujours là si vous souhaitez réessayer.</>
                )}
              </span>
              <button
                onClick={() => setNotice(null)}
                aria-label="Fermer le message"
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path d="M3 3l10 10M13 3L3 13"/>
                </svg>
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 flex-wrap" role="group" aria-label="Filtrer par catégorie">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`font-dm text-xs font-bold tracking-widest uppercase
                px-5 py-2.5 rounded-full border transition-all duration-200
                ${activeCategory === cat
                  ? "bg-[#e29600] text-black border-[#e29600] shadow-[0_4px_16px_rgba(226,150,0,0.3)]"
                  : "text-[#efdecd]/70 border-[#efdecd]/15 hover:border-[#efdecd]/40 hover:text-[#efdecd]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={cart.addItem}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Icons />
          </div>

        </div>
      </section>

      <Footer />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
        />
      )}
    </>
  );
}
