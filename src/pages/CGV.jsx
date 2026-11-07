// ============================================================
// CGV — Conditions générales de vente de la boutique
// ============================================================
//
// ⚠ Modèle de base, à compléter et à faire relire si besoin.
//   Remplacez chaque texte entre crochets surligné en jaune
//   (ex. [ADRESSE POSTALE]) par vos vraies informations.
//
// Les zones, frais et délais de livraison sont repris automatiquement
// de ShopData.js : ils restent toujours à jour.

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SHIPPING_ZONES } from "./ShopData";

// ── Informations du vendeur : À COMPLÉTER ─────────────────────
const SELLER = {
  name: "[NOM DU VENDEUR — ex. Ndeysan Asso]",
  status: "[STATUT — ex. association loi 1901 / auto-entrepreneur]",
  address: "[77 Rue des Cités, 93300 Aubervilliers, France]",
  id: "[N° SIRET ou RNA]",
  email: "[ndaysanasso@gmail.com]",
  vat: "[TVA non applicable, art. 293 B du CGI — ou votre n° de TVA]",
  mediator: "[NOM ET SITE WEB DU MÉDIATEUR DE LA CONSOMMATION]",
};
const LAST_UPDATE = "7 novembre 2026";

// Surligne les informations restant à compléter
function Fill({ children }) {
  const missing = typeof children === "string" && children.startsWith("[");
  return missing ? (
    <mark className="bg-[#e29600]/25 text-[#efdecd] px-1 rounded">{children}</mark>
  ) : (
    <>{children}</>
  );
}

function Section({ n, title, children }) {
  return (
    <section className="flex flex-col gap-3 py-8 border-b border-[#efdecd]/10" aria-labelledby={`cgv-${n}`}>
      <h2 id={`cgv-${n}`} className="font-bebas text-2xl tracking-[0.12em] text-[#e29600]">
        {n}. {title}
      </h2>
      <div className="font-dm text-[15px] leading-relaxed text-[#efdecd]/85 flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

export default function CGV() {
  return (
    <>
      <Helmet>
        <title>Conditions générales de vente — Barhan</title>
        <meta name="description" content="Conditions générales de vente de la boutique officielle de Barhan : commande, paiement, livraison, droit de rétractation." />
        <meta property="og:url" content="https://www.barhanmusic.com/cgv" />
      </Helmet>

      <div className="fixed inset-0 z-0 bg-[#080301]" />

      <Header />

      <main className="relative z-10 w-full min-h-screen text-white pt-32 pb-40">
        <div className="max-w-[800px] mx-auto px-6">

          <div className="flex flex-col items-center gap-3 text-center mb-6">
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/60 uppercase">Boutique</p>
            <h1 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              CONDITIONS GÉNÉRALES DE VENTE
            </h1>
            <p className="font-dm text-xs text-[#efdecd]/60 mt-2">Dernière mise à jour : {LAST_UPDATE}</p>
          </div>

          <Section n={1} title="Objet">
            <p>
              Les présentes conditions générales de vente (CGV) s'appliquent à toutes les commandes passées
              sur la boutique du site <strong>barhanmusic.com</strong> (CD, vinyles, t-shirts et autres articles).
              Passer une commande vaut acceptation de ces CGV.
            </p>
          </Section>

          <Section n={2} title="Vendeur">
            <p>
              Les produits sont vendus par <Fill>{SELLER.name}</Fill>, <Fill>{SELLER.status}</Fill>,
              dont le siège est situé <Fill>{SELLER.address}</Fill>, immatriculé sous le numéro <Fill>{SELLER.id}</Fill>.
            </p>
            <p>Contact : <Fill>{SELLER.email}</Fill>.</p>
          </Section>

          <Section n={3} title="Produits">
            <p>
              Les produits proposés sont décrits et photographiés avec le plus grand soin. Les photos
              n'ont pas de valeur contractuelle : de légères différences de couleur peuvent exister.
              Les offres sont valables dans la limite des stocks disponibles. Si un article commandé est
              indisponible, l'acheteur en est informé et remboursé sans délai.
            </p>
          </Section>

          <Section n={4} title="Prix">
            <p>
              Les prix sont indiqués en euros, toutes taxes comprises (TTC). <Fill>{SELLER.vat}</Fill>.
            </p>
            <p>
              Les frais de livraison s'ajoutent au prix des articles. Ils sont indiqués dans le panier,
              avant le paiement, selon la zone de livraison choisie (voir article 7).
            </p>
          </Section>

          <Section n={5} title="Commande">
            <p>
              L'acheteur ajoute les articles au panier, choisit sa zone de livraison, puis clique sur
              « Payer ». Il est alors redirigé vers une page de paiement sécurisée où il indique ses
              coordonnées et son adresse de livraison. La commande est définitive une fois le paiement
              accepté. Un reçu est envoyé par e-mail à l'adresse indiquée.
            </p>
          </Section>

          <Section n={6} title="Paiement">
            <p>
              Le paiement s'effectue en ligne, par carte bancaire, Apple Pay ou Google Pay, via la
              plateforme sécurisée <strong>Stripe</strong>. Les données bancaires sont saisies et traitées
              uniquement par Stripe : le vendeur n'y a jamais accès.
            </p>
          </Section>

          <Section n={7} title="Livraison">
            <p>Les commandes sont expédiées par voie postale à l'adresse indiquée lors du paiement.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border border-[#efdecd]/15 rounded-lg overflow-hidden">
                <thead className="bg-[#efdecd]/5 text-[#efdecd]">
                  <tr>
                    <th scope="col" className="px-4 py-2 font-bold">Zone</th>
                    <th scope="col" className="px-4 py-2 font-bold">Frais</th>
                    <th scope="col" className="px-4 py-2 font-bold">Délai indicatif</th>
                  </tr>
                </thead>
                <tbody>
                  {SHIPPING_ZONES.map((z) => (
                    <tr key={z.id} className="border-t border-[#efdecd]/10">
                      <td className="px-4 py-2">{z.label}</td>
                      <td className="px-4 py-2">{z.price} €</td>
                      <td className="px-4 py-2">{z.delay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Les délais courent à partir de l'expédition et sont donnés à titre indicatif. En cas de
              retard important, de colis perdu ou abîmé, l'acheteur est invité à contacter le vendeur
              à <Fill>{SELLER.email}</Fill>. Les éventuels droits de douane hors Union européenne sont
              à la charge de l'acheteur.
            </p>
          </Section>

          <Section n={8} title="Droit de rétractation">
            <p>
              Conformément à l'article L221-18 du Code de la consommation, l'acheteur dispose d'un délai
              de <strong>14 jours</strong> à compter de la réception de sa commande pour se rétracter,
              sans avoir à se justifier.
            </p>
            <p>
              Pour l'exercer, il suffit d'envoyer une déclaration claire (par exemple un e-mail) à
              <Fill> {SELLER.email}</Fill>, en indiquant son nom, la date de commande et les articles
              concernés. Les articles doivent être retournés dans les 14 jours suivant cette demande,
              dans leur état d'origine, à l'adresse <Fill>{SELLER.address}</Fill>. Les frais de retour
              sont à la charge de l'acheteur.
            </p>
            <p>
              Le remboursement (articles et frais de livraison initiaux au tarif standard) est effectué
              dans les 14 jours suivant la demande, avec le même moyen de paiement. Il peut être différé
              jusqu'à la réception des articles retournés.
            </p>
            <p>
              <strong>Exception :</strong> le droit de rétractation ne s'applique pas aux CD et vinyles
              dont l'emballage scellé a été ouvert après la livraison (article L221-28 du Code de la consommation).
            </p>
          </Section>

          <Section n={9} title="Garanties">
            <p>
              Les produits bénéficient de la garantie légale de conformité (articles L217-3 et suivants
              du Code de la consommation) et de la garantie des vices cachés (articles 1641 et suivants
              du Code civil). En cas de produit défectueux ou non conforme, l'acheteur contacte le
              vendeur, qui procède au remplacement ou au remboursement.
            </p>
          </Section>

          <Section n={10} title="Données personnelles">
            <p>
              Les informations recueillies lors de la commande (nom, adresse, e-mail, téléphone) servent
              uniquement à traiter et expédier la commande. Pour en savoir plus et exercer vos droits,
              consultez notre{" "}
              <Link to="/confidentialite" className="text-[#e29600] underline underline-offset-2 hover:text-[#efdecd]">
                politique de confidentialité
              </Link>.
            </p>
          </Section>

          <Section n={11} title="Litiges et médiation">
            <p>
              En cas de difficulté, l'acheteur contacte d'abord le vendeur à <Fill>{SELLER.email}</Fill>
              {" "}pour trouver une solution amiable. À défaut, il peut recourir gratuitement au médiateur
              de la consommation : <Fill>{SELLER.mediator}</Fill>.
            </p>
            <p>Les présentes CGV sont soumises au droit français.</p>
          </Section>

          <div className="flex justify-center mt-10">
            <Link
              to="/shop"
              className="font-dm text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full
              border border-[#e29600]/70 text-[#e29600] hover:bg-[#e29600] hover:text-black transition-all duration-200"
            >
              ← Retour à la boutique
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
