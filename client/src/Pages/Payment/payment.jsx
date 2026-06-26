import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import customPrices from "../../Api/customPrices";
import classes from "./payment.module.css";
import { Type } from "../../Utility/action.type";
import { axiosInstance } from "../../Api/axios";
import { clipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";

// ─── Chapa inline checkout helper ───────────────────────────────────────────
// Loads the Chapa inline script once and resolves when ready.
function loadChapaScript() {
  return new Promise((resolve) => {
    if (window.ChapaCheckout) return resolve(window.ChapaCheckout);
    const script = document.createElement("script");
    script.src = "https://checkout.chapa.co/checkout.js";
    script.async = true;
    script.onload = () => resolve(window.ChapaCheckout);
    document.head.appendChild(script);
  });
}

// ─── Icons (inline SVG – no extra deps) ─────────────────────────────────────
const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);


// ─── Payment method card ─────────────────────────────────────────────────────
function PaymentMethodCard({ id, selected, onSelect, label, description, icon }) {
  return (
    <button
      type="button"
      className={`${classes.method_card} ${selected ? classes.method_card_selected : ""}`}
      onClick={() => onSelect(id)}
      aria-pressed={selected}
    >
      <span className={classes.method_radio}>
        {selected && <span className={classes.method_radio_dot} />}
      </span>
      <span className={classes.method_icon}>{icon}</span>
      <span className={classes.method_info}>
        <span className={classes.method_label}>{label}</span>
        <span className={classes.method_desc}>{description}</span>
      </span>
    </button>
  );
}

// ─── Order summary row ───────────────────────────────────────────────────────
function OrderItem({ item }) {
  const price = customPrices[item.id];
  return (
    <div className={classes.order_item}>
      <div className={classes.order_item_img_wrap}>
        <img src={item.image} alt={item.title} className={classes.order_item_img} />
        <span className={classes.order_item_badge}>{item.amount}</span>
      </div>
      <span className={classes.order_item_title}>{item.title}</span>
      <span className={classes.order_item_price}>
        <CurrencyFormat amount={price * item.amount} />
      </span>
    </div>
  );
}

// ─── Main Payment component ──────────────────────────────────────────────────
function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce(
    (sum, item) => sum + (customPrices[item.id] || 0) * item.amount,
    0
  );
  const[processing, setProcessing] = useState(false);
  const shipping = total > 5000 ? 0 : 150;
  const grandTotal = total + shipping;

  const [paymentMethod, setPaymentMethod] = useState("chapa_inline");
  const [orderExpanded, setOrderExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Billing form state
  const [form, setForm] = useState({
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
  });

  const handleInput = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Chapa Inline checkout ───────────────────────────────────────────────
  const handleChapaInline = async () => {
    setError("");
    setLoading(true);
    try {
      const Chapa = await loadChapaScript();

      // In production, generate tx_ref + fetch public_key from your backend
      const txRef = `chapa-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      Chapa.initialize({
        public_key: process.env.REACT_APP_CHAPA_PUBLIC_KEY || "CHAPUBK_TEST-XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        tx_ref: txRef,
        amount: grandTotal,
        currency: "ETB",
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
        title: "Order Payment",
        description: `${basket.length} item(s) from your cart`,
        logo: "https://your-store-logo.png", // replace with your logo
        callback: (data) => {
          if (data.status === "success" || data.status === "completed") {
            // Clear basket on success
            basket.forEach((item) =>
              dispatch({ type: Type.REMOVE_FROM_BASKET, id: item.id })
            );
            navigate("/result", { state: { txRef, status: "success", total: grandTotal } });
          } else {
            setError("Payment was not completed. Please try again.");
          }
          setLoading(false);
        },
        onClose: () => setLoading(false),
      });
    } catch (err) {
      setError("Could not load payment. Check your connection and try again.");
      setLoading(false);
    }
  };


  // ── Chapa hosted redirect ───────────────────────────────────────────────
  const handleChapaHosted = async () => {
  setError("");
  setLoading(true);
  try {
    const response = await axiosInstance.post("/accept-payment", {
      amount: grandTotal,
      currency: "ETB",
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      phone_number: form.phone,
    });

    const checkoutUrl = response?.data?.data?.checkout_url;
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      throw new Error(response?.data?.message || "Failed to initialize payment");
    }
  } catch (err) {
    setError(err.response?.data?.error || err.message || "Payment initialization failed. Try again.");
    setLoading(false);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    if (paymentMethod === "chapa_inline") handleChapaInline();
    else handleChapaHosted();
  };
  const handelpayment = (e) => {
    e.preventDefault();
  } 

  if (basket.length === 0) {
    return (
      <Layout>
        <div className={classes.empty}>
          <span className={classes.empty_icon}>🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some items before checking out.</p>
          <button onClick={() => navigate("/")} className={classes.back_btn}>
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.page}>
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className={classes.checkout_header}>
          <h1 className={classes.checkout_title}>Checkout</h1>
          <span className={classes.secure_badge}>
            <LockIcon /> Secured by Chapa
          </span>
        </header>

        <div className={classes.layout}>
          {/* ═══════════════ LEFT COLUMN ═══════════════ */}
          <form className={classes.form_col} onSubmit={handleSubmit} noValidate>

            {/* ── Delivery info ───────────────────────────────── */}
            <section className={classes.card}>
              <h2 className={classes.section_title}>
                <span className={classes.step_num}>1</span>Delivery information
              </h2>
              <div className={classes.form_row}>
                <div className={classes.field}>
                  <label htmlFor="firstName">First name *</label>
                  <input id="firstName" name="firstName" value={form.firstName} onChange={handleInput} placeholder="Abebe" required />
                </div>
                <div className={classes.field}>
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" name="lastName" value={form.lastName} onChange={handleInput} placeholder="Girma" />
                </div>
              </div>
              <div className={classes.field}>
                <label htmlFor="email">Email address *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleInput} placeholder="abebe@email.com" required />
              </div>
              <div className={classes.field}>
                <label htmlFor="phone">Phone number *</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleInput} placeholder="+251 9__ __ __ __" required />
                <span className={classes.field_hint}>Chapa may send an OTP to this number</span>
              </div>
            </section>

            {/* ── Payment method ──────────────────────────────── */}
            <section className={classes.card}>
              <h2 className={classes.section_title}>
                <span className={classes.step_num}>2</span>Payment method
              </h2>
              <form onSubmit={handelpayment}>
              <PaymentMethodCard
                id="chapa_inline"
                selected={paymentMethod === "chapa_inline"}
                onSelect={setPaymentMethod}
                label="Pay with Chapa (Inline)"
                description="Telebirr, CBE Birr, Awash, card & more — stays on this page"
                icon={<img src="https://chapa.co/asset/images/chapa_swirl.svg" alt="Chapa" width="28" onError={(e) => { e.target.style.display = "none"; }} />}
              />
              <PaymentMethodCard
                id="chapa_hosted"
                selected={paymentMethod === "chapa_hosted"}
                onSelect={setPaymentMethod}
                label="Pay with Chapa (Hosted)"
                description="You'll be redirected to Chapa's secure payment page"
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#febd69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                }
              />
</form>
              {/* Accepted channels */}
              <div className={classes.channels}>
                <span className={classes.channels_label}>Accepted via Chapa:</span>
                {["Telebirr", "CBE Birr", "Awash", "Visa/MC", "Amole"].map((c) => (
                  <span key={c} className={classes.channel_chip}>{c}</span>
                ))}
              </div>
            </section>

            {/* ── Error ───────────────────────────────────────── */}
            {error && (
              <div className={classes.error_banner} role="alert">
                ⚠ {error}
              </div>
            )}

            {/* ── Submit ──────────────────────────────────────── */}
            <button
              type="submit"
              className={classes.pay_btn}
              disabled={loading}
            >
              {loading ? (
                <span className={classes.spinner} />
              ) : (
                <>
                  <LockIcon />
                  &nbsp; Pay &nbsp;<CurrencyFormat amount={grandTotal} />
                </>
              )}
            </button>

            <p className={classes.tnc}>
              By placing your order you agree to our{" "}
              <a href="/terms">Terms & Conditions</a>. Your payment is
              processed securely by <strong>Chapa</strong>.
            </p>
          </form>

          {/* ═══════════════ RIGHT COLUMN — Order summary ═══════════════ */}
          <aside className={classes.summary_col}>
            <div className={classes.card}>
              {/* Collapsible header on mobile */}
              <button
                type="button"
                className={classes.summary_toggle}
                onClick={() => setOrderExpanded((v) => !v)}
                aria-expanded={orderExpanded}
              >
                <span className={classes.section_title} style={{ margin: 0 }}>
                  Order summary
                  <span className={classes.item_count}>
                    &nbsp;({basket.length} item{basket.length !== 1 ? "s" : ""})
                  </span>
                </span>
                <ChevronIcon open={orderExpanded} />
              </button>

              {orderExpanded && (
                <>
                  <div className={classes.items_list}>
                    {basket.map((item, i) => (
                      <OrderItem key={i} item={item} />
                    ))}
                  </div>

                  <div className={classes.divider} />

                  <div className={classes.totals}>
                    <div className={classes.total_row}>
                      <span>Subtotal</span>
                      <CurrencyFormat amount={total} />
                    </div>
                    <div className={classes.total_row}>
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className={classes.free_shipping}>Free</span>
                      ) : (
                        <CurrencyFormat amount={shipping} />
                      )}
                    </div>
                    {shipping === 0 && (
                      <div className={classes.free_notice}>
                        <CheckIcon /> Free shipping on orders over 5,000 ETB
                      </div>
                    )}
                    <div className={classes.divider} />
                    <div className={`${classes.total_row} ${classes.grand_total}`}>
                      <span>Total</span>
                      <CurrencyFormat amount={grandTotal} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trust signals */}
            <div className={classes.trust}>
              {[
                { icon: "🔒", text: "SSL-encrypted checkout" },
                { icon: "↩", text: "30-day hassle-free returns" },
                { icon: "✅", text: "Licensed by NBE via Chapa" },
              ].map(({ icon, text }) => (
                <div key={text} className={classes.trust_item}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default Payment;