import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Icons from "../components/Icons";
import { PRODUCTS, CATEGORIES } from "./ShopData";
import useCart from "../hooks/useCart";
import Coussindesign from "../assets/coussindesign.jpg";

function ProductPlaceholder({ category }) {
  const icons = {
    CD:       "💿",
    Vinyle:   "🎵",
    "T-shirt":"👕",
  };
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/5">
      <span className="text-5xl">{icons[category] ?? "🛍️"}</span>
      <p className="font-dm text-xs text-white/20 uppercase tracking-widest">
        Image à venir
      </p>
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : null
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="relative flex flex-col bg-white/5 border border-l-[4px]
         border-[#efdecd]/15 border-l-[#390202]/80 rounded-2xl overflow-hidden
         hover:border-[#e29600]/40 hover:border-l-[#e29600]
         transition-all duration-300 group
         hover:shadow-[0_0_24px_rgba(226,150,0,0.08)]">

      <div className="absolute top-0 left-0 right-0 h-[2px] z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(226,150,0,0.3), transparent)" }}
      />

      <span className="absolute top-3 right-3 z-10 font-dm text-[10px] font-bold
                       tracking-widest uppercase px-2.5 py-1 rounded-full
                       bg-black/70 border border-[#efdecd]/10 text-[#efdecd]/50">
        {product.category}
      </span>

      <div className="relative w-full h-[220px] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProductPlaceholder category={product.category} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col gap-3 p-6">
        <div>
          <h3 className="font-bebas text-xl tracking-widest text-[#efdecd]">{product.title}</h3>
          <p className="font-dm text-xs text-[#efdecd]/40 tracking-widest uppercase mt-0.5">
            {product.subtitle}
          </p>
        </div>

        <p className="font-dm text-sm text-[#efdecd]/60 leading-relaxed">{product.description}</p>

        {product.sizes && (
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`font-dm text-xs font-bold tracking-widest w-9 h-9 rounded-lg border
                            transition-all duration-200
                            ${selectedSize === s
                              ? "border-[#e29600] text-[#e29600] bg-[#e29600]/10"
                              : "border-[#efdecd]/15 text-[#efdecd]/40 hover:border-[#efdecd]/30"
                            }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-1">
          <span className="font-bebas text-2xl text-[#e29600] tracking-wide">
            {product.price} €
          </span>
          <button
            onClick={handleAdd}
            className={`font-dm flex items-center gap-2 text-xs font-bold tracking-widest uppercase
                        px-4 py-2 rounded-full transition-all duration-300
                        ${added
                          ? "bg-green-600/80 text-white border border-green-500/50"
                          : "bg-[#390202] hover:bg-[#e29600] text-[#efdecd] hover:text-[#efdecd] border border-transparent"
                        }`}
          >
            {added ? (
              <>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <polyline points="3 8 6 11 13 4"/>
                </svg>
                Ajouté
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
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

  const handleOrder = () => {
    window.open("https://bandcamp.com", "_blank");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-full max-w-[420px] z-50
                      bg-black border-l border-[#390202]/40
                      flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.8)]
                      animate-[slideInRight_0.3s_ease]">

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#efdecd]/10">
          <div>
            <h2 className="font-bebas text-2xl tracking-widest text-[#efdecd]">Mon Panier</h2>
            <p className="font-dm text-xs text-[#efdecd]/30 tracking-widest uppercase">
              {totalItems} article{totalItems > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
                       flex items-center justify-center text-[#efdecd]/50 hover:text-[#efdecd]
                       transition-all duration-200"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M3 3l10 10M13 3L3 13"/>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-5xl">🛍️</span>
              <p className="font-dm text-sm text-[#efdecd]/30 tracking-wide">Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key}
                className="flex items-center gap-4 bg-[#efdecd]/5 border border-[#efdecd]/10
                           rounded-xl p-4 transition-all duration-200">

                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#efdecd]/5
                                flex items-center justify-center">
                  {item.image
                    ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    : <span className="text-2xl">{item.category === "CD" ? "💿" : item.category === "Vinyle" ? "🎵" : "👕"}</span>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bebas text-base tracking-widest text-[#efdecd] truncate">{item.title}</p>
                  {item.size && (
                    <p className="font-dm text-xs text-[#efdecd]/30 uppercase">Taille : {item.size}</p>
                  )}
                  <p className="font-dm text-sm text-[#e29600] font-bold">{item.price} €</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => updateQty(item.key, item.qty - 1)}
                    className="w-7 h-7 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
                               flex items-center justify-center text-[#efdecd]/60 hover:text-[#efdecd]
                               font-bold text-sm transition-all duration-200"
                  >−</button>
                  <span className="font-dm text-sm text-[#efdecd] w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.key, item.qty + 1)}
                    className="w-7 h-7 rounded-full border border-[#efdecd]/15 hover:border-[#efdecd]/40
                               flex items-center justify-center text-[#efdecd]/60 hover:text-[#efdecd]
                               font-bold text-sm transition-all duration-200"
                  >+</button>
                </div>

                <button
                  onClick={() => removeItem(item.key)}
                  className="text-[#efdecd]/20 hover:text-red-400 transition-colors duration-200 shrink-0"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M3 3l10 10M13 3L3 13"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#efdecd]/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-dm text-sm text-[#efdecd]/50 uppercase tracking-widest">Total</span>
              <span className="font-bebas text-2xl text-[#e29600] tracking-wide">{totalPrice} €</span>
            </div>
            <button
              onClick={handleOrder}
              className="font-dm w-full flex items-center justify-center gap-2
                         text-sm font-bold tracking-widest uppercase
                         text-[#efdecd] hover:text-[#efdecd] bg-[#390202] hover:bg-[#e29600]
                         py-4 rounded-full transition-all duration-200
                         shadow-[0_4px_20px_rgba(57,2,2,0.4)]"
            >
              Commander sur Bandcamp
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M2 8h12M9 3l5 5-5 5"/>
              </svg>
            </button>
            <button
              onClick={clearCart}
              className="font-dm text-xs text-[#efdecd]/20 hover:text-[#efdecd]/50
                         tracking-widest uppercase transition-colors duration-200 text-center"
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
  const cart = useCart();

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
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* BG reflet */}
      
      {/* Overlay sombre */}
      <div className="fixed inset-0 z-[1] bg-[#030405]/40" />

      <Header />

      {/* Bouton panier flottant */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full
        bg-[#390202] hover:bg-[#e29600] border border-[#efdecd]/20
        flex items-center justify-center
        shadow-[0_4px_24px_rgba(57,2,2,0.5)]
        transition-all duration-200 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#efdecd" strokeWidth="1.5" className="w-6 h-6">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#e29600]
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
            <p className="font-bold text-[16px] tracking-[0.35em] text-[#efdecd]/40 uppercase">
              Merchandising
            </p>
            <h2 className="font-bebas text-[32px] mt-3 tracking-[0.20em] text-[#e29600] leading-none">
              BOUTIQUE
            </h2>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["Tous", "CD", "Vinyle", "T-shirt"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-dm text-xs font-bold tracking-widest uppercase
                            px-5 py-2.5 rounded-full border transition-all duration-200
                            ${activeCategory === cat
                              ? "bg-[#e29600] text-black border-[#e29600] shadow-[0_4px_16px_rgba(226,150,0,0.3)]"
                              : "text-[#efdecd]/50 border-[#efdecd]/15 hover:border-[#efdecd]/40 hover:text-[#efdecd]"
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