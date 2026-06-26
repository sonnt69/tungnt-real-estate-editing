"use client";

/**
 * Tung.NT — Real Estate Photo Editing. Standalone marketing site (fully static).
 * Scoped styles via .re-* prefix, light theme.
 */

import { useMemo, useState } from "react";

const IMG = "/img/hrl";

// Contact details (provided by client)
const WHATSAPP = "0387575008";
const WHATSAPP_INTL = "84387575008"; // VN: drop leading 0, prepend 84
const IG_URL = "https://www.instagram.com/thanhtungphotoediting/";
const FB_URL = "https://m.me/thanh.tung.644412";
const EMAIL = "tung.nt2642000@gmail.com";
const ADDRESS = "Đội 1, thôn Thái Bình, xã Vạn Thái, Ứng Hòa, Hà Nội";
const VIDEO_MP4 = `${IMG}/tour.mp4`;
const VIDEO_POSTER = `${IMG}/tour-poster.jpg`;
// Coordinates from the client's Google Maps link (Thái Bình, Ứng Hoà) — use lat,lng
// because the text address may not geocode in the embed (blank/gray map otherwise).
const MAP_EMBED = `https://maps.google.com/maps?q=20.7144687,105.7695951&z=16&hl=en&output=embed`;

const STATS = [
  { ico: "📸", n: "2,500+", l: "Photos / day" },
  { ico: "👥", n: "120+", l: "Customers" },
  { ico: "⚡", n: "24h", l: "Turnaround" },
  { ico: "⭐", n: "98%", l: "Satisfaction" },
];

// BeforeAfter render: image `b` shows on the left ("Before" tag), image `a` on the right ("After" tag).
// → b = before, a = after. Real before/after pairs from the client's "Before After" Drive folder.
const SHOWCASE = [
  { t: "HDR", d: "Multi-exposure HDR blending for balanced highlights, shadows and crisp window pulls.", a: `${IMG}/ba-hdr-after.jpg`, b: `${IMG}/ba-hdr-before.jpg` },
  { t: "Twilights", d: "Turn ordinary daytime exteriors into warm, inviting twilight photography.", a: `${IMG}/ba-twi-after.jpg`, b: `${IMG}/ba-twi-before.jpg` },
  { t: "Flash", d: "Flash-and-ambient blending for natural, true-to-color interiors.", a: `${IMG}/ba-flash-after-v2.jpg`, b: `${IMG}/ba-flash-before-v2.jpg` },
  { t: "Virtual Staging", d: "Add premium furniture and decor to empty rooms so buyers can picture the space.", a: `${IMG}/ba-stg-after.jpg`, b: `${IMG}/ba-stg-before.jpg` },
  { t: "Remove Objects", d: "Remove clutter, wires and unwanted items for a clean, tidy space.", a: `${IMG}/ba-rem-after.jpg`, b: `${IMG}/ba-rem-before.jpg` },
  { t: "Demolition and Renovation", d: "Visualize renovations — clear out, refresh and restyle a dated space.", a: `${IMG}/ba-demo-after.jpg`, b: `${IMG}/ba-demo-before.jpg` },
];

const SERVICES = [
  { t: "Photo Editing", d: "Brightness, color and contrast correction plus clean-up for every shot." },
  { t: "Flash Blend", d: "Blending flash and ambient light for crisp, true-to-color interiors." },
  { t: "Day to Dusk", d: "Turn daytime shots into warm sunset scenes that boost exterior appeal." },
  { t: "Virtual Staging", d: "Add premium furniture and decor to empty rooms so buyers can picture living there." },
  { t: "Remove Object", d: "Remove clutter, wires and reflections for a clean, tidy space." },
  { t: "Floor Plan & Video", d: "Clear 2D/3D floor plans and professional property tour videos." },
];

const PRICING = [
  {
    id: "hdr",
    t: "HDR",
    price: 0.6,
    unit: "/ photo",
    feat: ["Multi-exposure blend", "Balanced highlights/shadows", "Crisp window pulls", "24h delivery"],
  },
  {
    id: "flash",
    t: "Flash",
    price: 0.9,
    unit: "/ photo",
    feat: ["Flash + ambient blend", "True-to-color interiors", "Shadow & noise removal", "24h delivery"],
    hot: true,
  },
  {
    id: "twilight",
    t: "Twilights",
    price: 4,
    unit: "/ photo",
    feat: ["Day-to-twilight sky", "Warm ambient glow", "Lawn & exterior polish", "Premium look"],
  },
  {
    id: "staging",
    t: "Virtual Staging",
    price: 10,
    unit: "/ photo",
    feat: ["Premium furniture", "Styled to taste", "Realistic lighting", "1 free revision"],
  },
  {
    id: "remove",
    t: "Remove Objects",
    price: 10,
    unit: "/ photo",
    feat: ["Remove clutter & wires", "Clean, tidy space", "Seamless fill", "24h delivery"],
  },
  {
    id: "renovation",
    t: "Demolition and Renovation",
    price: 10,
    unit: "/ photo",
    feat: ["Clear out & refresh", "Restyle dated rooms", "Realistic materials", "Concept visualization"],
  },
];

const TESTIMONIALS = [
  { q: "Professional work, fast and exactly what I needed for my listings.", a: "Maximilian", r: "Real Estate Agent, US", rating: 5, av: "M", color: "#c69a3a" },
  { q: "Very professional and always on time. Photos come back clean with consistent colors.", a: "SanDy Nguyen", r: "Photographer", rating: 5, av: "SN", color: "#2563eb" },
  { q: "Amazing virtual staging — looks incredibly realistic. Highly recommended!", a: "Milan Hoang", r: "Broker", rating: 5, av: "MH", color: "#16a34a" },
];

const GALLERY = [
  `${IMG}/port1.jpg`,
  `${IMG}/port2.jpg`,
  `${IMG}/port3.jpg`,
  `${IMG}/port4.jpg`,
  `${IMG}/port5.jpg`,
  `${IMG}/port6.jpg`,
];

/* ===== Social icons ===== */
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.042-.001-.001zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function IconPayPal() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path fill="#003087" d="M12.4 6.5h6.7c2.9 0 5.2 1.5 5 4.6-.3 4-3 6.1-6.6 6.1h-2.3c-.5 0-.9.4-1 .9l-.9 5.7c-.05.4-.4.7-.8.7H9.1c-.5 0-.9-.5-.8-1L10.9 8c.1-.9.7-1.5 1.5-1.5z" />
      <path fill="#009cde" d="M16.3 9.4h6.7c2.9 0 4.4 1.7 4.1 4.7-.3 3.9-3 6-6.6 6h-2.3c-.5 0-.9.4-1 .9l-.9 5.7c-.05.4-.4.7-.8.7h-2.6c-.5 0-.9-.5-.8-1l2.7-15.5c.1-.9.7-1.5 1.5-1.5z" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* Logo Tung.NT — Real Estate Editing (SVG: camera body + gold lens + sparkle).
   light=true → white text (for dark footer). Gold lens stays on both backgrounds. */
function TungLogo({ light = false }: { light?: boolean }) {
  return (
    <svg
      className="re-logo-svg"
      viewBox="0 0 392 100"
      role="img"
      aria-label="Tung.NT — Real Estate Editing"
      style={{ color: light ? "#ffffff" : "#2b2b2b" }}
    >
      <rect x="8" y="38" width="100" height="52" rx="13" fill="currentColor" />
      <rect x="66" y="27" width="28" height="13" rx="4" fill="currentColor" />
      <circle cx="50" cy="64" r="23" fill="#f2b705" />
      <circle cx="50" cy="64" r="23" fill="none" stroke="#c9882a" strokeWidth="3.5" />
      <path d="M46 52 l3.5 8.5 8.5 3.5 -8.5 3.5 -3.5 8.5 -3.5 -8.5 -8.5 -3.5 8.5 -3.5 z" fill="#ffffff" />
      <circle cx="41" cy="55" r="2.6" fill="#ffffff" />
      <text x="124" y="62" fontFamily="Inter, system-ui, sans-serif" fontSize="46" fontWeight="800" letterSpacing="-1" fill="currentColor">Tung.NT</text>
      <text x="126" y="86" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="600" letterSpacing="5" fill="#d4a017">REAL ESTATE EDITING</text>
    </svg>
  );
}

function BeforeAfter({ a, b, label }: { a: string; b: string; label: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="re-ba-wrap">
      <img src={a} alt={`${label} after`} className="re-ba-img" loading="lazy" />
      <div className="re-ba-after" style={{ width: `${pos}%` }}>
        <img src={b} alt={`${label} before`} className="re-ba-img" loading="lazy" />
      </div>
      <div className="re-ba-line" style={{ left: `${pos}%` }}>
        <span className="re-ba-handle">⇆</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="re-ba-range"
        aria-label={`${label} before after slider`}
      />
      <span className="re-ba-tag re-ba-tag-l">Before</span>
      <span className="re-ba-tag re-ba-tag-r">After</span>
    </div>
  );
}

export default function RealEstateEditorDemo() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const total = useMemo(
    () => PRICING.reduce((s, p) => s + (qty[p.id] || 0) * p.price, 0),
    [qty],
  );
  const setQ = (id: string, v: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, v) }));

  const waHref = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(
    "Hi, I'd like a quote for real estate photo editing.",
  )}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Real estate editing request")}`;
  const fbHref = FB_URL;

  return (
    <div className="re-root">
      {/* ===== Header ===== */}
      <header className="re-header">
        <div className="re-container re-nav">
          <a href="#top" className="re-logo"><TungLogo /></a>
          <nav className="re-menu">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#showcase">Showcase</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="re-hsoc">
            <a href={waHref} target="_blank" rel="noopener" className="s-wa" title="WhatsApp"><IconWhatsApp /></a>
            <a href={IG_URL} target="_blank" rel="noopener" className="s-ig" title="Instagram"><IconInstagram /></a>
            <a href={fbHref} target="_blank" rel="noopener" className="s-fb" title="Facebook"><IconFacebook /></a>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="re-hero">
        <div className="re-container re-hero-grid">
          <div>
            <span className="re-pill">⚡ 24-hour turnaround · Editors from Vietnam</span>
            <h1 className="re-h1">Real Estate <span>&amp;</span> Editing</h1>
            <p className="re-lead">
              An outsourced real estate photo editing team from Vietnam. HDR,
              Flash Blend, Day to Dusk and Virtual Staging — fast turnaround,
              fair pricing, magazine-grade quality.
            </p>
            <div className="re-hero-cta">
              <a href={waHref} target="_blank" rel="noopener" className="re-btn re-btn-primary re-btn-lg">
                <IconWhatsApp /> Chat on WhatsApp
              </a>
              <a href="#pricing" className="re-btn re-btn-ghost re-btn-lg">View Pricing</a>
            </div>
            <p className="re-trust">Trusted by real estate photographers &amp; agents in the US, Australia and Vietnam.</p>
          </div>
          <div className="re-hero-media">
            <video controls preload="metadata" poster={VIDEO_POSTER} playsInline className="re-hero-video">
              <source src={VIDEO_MP4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <span className="re-hero-badge">▶ Property video tour</span>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="re-stats">
        <div className="re-container re-stats-grid">
          {STATS.map((s) => (
            <div key={s.l} className="re-stat">
              <div className="re-stat-ico">{s.ico}</div>
              <div className="re-stat-n">{s.n}</div>
              <div className="re-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== About Us ===== */}
      <section id="about" className="re-section re-section-alt">
        <div className="re-container re-about">
          <div className="re-about-media">
            <img src={`${IMG}/about.jpg`} alt="Tung.NT — real estate photo editor" />
          </div>
          <div className="re-about-body">
            <h2 className="re-h2 re-left">About Us</h2>
            <p>
              Looking for a reliable outsourced editing team to help grow your
              real estate photography business — 24 hours a day, 7 days a week?
              Tung.NT is the partner to walk that journey with you.
            </p>
            <p>
              Among many real estate editing studios, Tung.NT stands out with
              fast turnaround and fair pricing — keeping your clients happy while
              protecting your bottom line.
            </p>
            <p>
              We serve clients worldwide — the US, Australia, the UK, Norway,
              Canada and more — backed by a 100% satisfaction promise with
              unlimited revisions until you are truly happy.
            </p>
            <h3 className="re-about-sub">Our criteria</h3>
            <ul className="re-about-list">
              <li>We don&apos;t take the photos, but we make them look great: retouching, object removal and elevating every frame.</li>
              <li>A smooth, professional editing experience from start to finish.</li>
              <li>We bring your real estate photos to a whole new level.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="re-section">
        <div className="re-container">
          <h2 className="re-h2">Editing Services</h2>
          <p className="re-sub">From basic retouching to complex virtual staging — handled with precision, delivered on time.</p>
          <div className="re-grid-3">
            {SERVICES.map((s) => (
              <div key={s.t} className="re-card">
                <h3 className="re-card-t">{s.t}</h3>
                <p className="re-card-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Showcase ===== */}
      <section id="showcase" className="re-section re-section-alt">
        <div className="re-container">
          <h2 className="re-h2">Before / After</h2>
          <p className="re-sub">Real results from our editing services. Drag the slider to compare.</p>
          <div className="re-grid-3">
            {SHOWCASE.map((s) => (
              <div key={s.t} className="re-sc">
                <BeforeAfter a={s.a} b={s.b} label={s.t} />
                <h3 className="re-sc-t">{s.t}</h3>
                <p className="re-sc-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Feature split ===== */}
      <section className="re-section">
        <div className="re-container re-split">
          <BeforeAfter a={`${IMG}/hdrflash-after-v2.jpg`} b={`${IMG}/hdrflash-before-v2.jpg`} label="HDR & Flash" />
          <div>
            <h2 className="re-h2 re-left">HDR &amp; Flash Blending</h2>
            <p className="re-lead">
              Accurate light, true color and crisp window pulls in every corner —
              hand-blended for natural, magazine-grade interiors.
            </p>
            <a href={waHref} target="_blank" rel="noopener" className="re-btn re-btn-primary">Order Flash Editing — $0.90</a>
          </div>
        </div>
        <div className="re-container re-split re-split-rev">
          <BeforeAfter a={`${IMG}/split-stage-after.jpg`} b={`${IMG}/split-stage-before.jpg`} label="Virtual Staging" />
          <div>
            <h2 className="re-h2 re-left">Realistic Virtual Staging</h2>
            <p className="re-lead">Add premium furniture and decor to empty rooms, with realistic light and shadows so buyers instantly picture the space.</p>
            <a href={waHref} target="_blank" rel="noopener" className="re-btn re-btn-primary">Order Virtual Staging — $10</a>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how" className="re-section re-section-alt">
        <div className="re-container">
          <h2 className="re-h2">How It Works</h2>
          <p className="re-sub">A simple, smooth workflow for busy photographers &amp; agents.</p>
          <div className="re-grid-3 re-steps">
            {[
              { n: "1", t: "Upload", d: "Send us your RAW/JPEG photos via Drive or a download link." },
              { n: "2", t: "Enhance", d: "Our editors process your photos within 24 hours." },
              { n: "3", t: "Download", d: "Get notified and download high-resolution, ready-to-list images." },
            ].map((s) => (
              <div key={s.n} className="re-step">
                <div className="re-step-n">{s.n}</div>
                <h3 className="re-card-t">{s.t}</h3>
                <p className="re-card-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="re-section">
        <div className="re-container">
          <h2 className="re-h2">Per-Photo Pricing</h2>
          <p className="re-sub">No subscription. Pay only for the photos you need.</p>
          <div className="re-grid-3 re-plans">
            {PRICING.map((p) => (
              <div key={p.id} className={`re-plan${p.hot ? " re-plan-hot" : ""}`}>
                {p.hot && <span className="re-plan-badge">Popular</span>}
                <h3 className="re-plan-t">{p.t}</h3>
                <div className="re-plan-price">
                  <span className="re-plan-from">from</span>${p.price}
                  <small>{p.unit}</small>
                </div>
                <ul className="re-plan-feat">
                  {p.feat.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <a href={waHref} target="_blank" rel="noopener" className="re-btn re-btn-primary re-w-full">Order now</a>
              </div>
            ))}
          </div>

          {/* Calculator */}
          <div className="re-price-box">
            <h3 className="re-calc-title">Quick price estimate</h3>
            {PRICING.map((p) => (
              <div key={p.id} className="re-price-row">
                <div className="re-price-name">{p.t} <span>(${p.price} {p.unit})</span></div>
                <div className="re-qty">
                  <button onClick={() => setQ(p.id, (qty[p.id] || 0) - 1)} aria-label="minus">−</button>
                  <input
                    type="number"
                    min={0}
                    value={qty[p.id] || 0}
                    onChange={(e) => setQ(p.id, Number(e.target.value))}
                  />
                  <button onClick={() => setQ(p.id, (qty[p.id] || 0) + 1)} aria-label="plus">+</button>
                </div>
                <div className="re-price-sub">${((qty[p.id] || 0) * p.price).toFixed(2)}</div>
              </div>
            ))}
            <div className="re-price-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <a href={waHref} target="_blank" rel="noopener" className="re-btn re-btn-primary re-btn-lg re-w-full">Send quote via WhatsApp</a>
          </div>
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="re-section re-section-alt">
        <div className="re-container">
          <h2 className="re-h2">Portfolio</h2>
          <p className="re-sub">A few recent results.</p>
          <div className="re-gallery">
            {GALLERY.map((src, i) => (
              <div key={i} className="re-gal-item"><img src={src} alt={`Portfolio ${i + 1}`} loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="re-section">
        <div className="re-container">
          <h2 className="re-h2">What our clients say</h2>
          <p className="re-sub">We work every day to deliver the best results and service to our clients.</p>
          <div className="re-grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.a} className="re-quote">
                <div className="re-stars" aria-label={`${t.rating} out of 5`}>
                  {"★★★★★".slice(0, t.rating)}<span className="re-stars-off">{"★★★★★".slice(t.rating)}</span>
                </div>
                <p>“{t.q}”</p>
                <div className="re-quote-author">
                  <span className="re-avatar" style={{ background: t.color }}>{t.av}</span>
                  <span className="re-quote-meta">{t.a}<small>{t.r}</small></span>
                  <span className="re-verified" title="Verified client">✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" className="re-cta">
        <div className="re-container re-cta-grid">
          <div>
            <h2 className="re-h2 re-left re-white">Contact &amp; Free Trial</h2>
            <p className="re-lead re-white-2">Get your first 2 photos edited free. We reply within a few hours.</p>
            <div className="re-contact-btns">
              <a href={waHref} target="_blank" rel="noopener" className="re-cbtn re-cbtn-wa"><IconWhatsApp /> WhatsApp: {WHATSAPP}</a>
              <a href={IG_URL} target="_blank" rel="noopener" className="re-cbtn re-cbtn-ig"><IconInstagram /> @thanhtungphotoediting</a>
              <a href={fbHref} target="_blank" rel="noopener" className="re-cbtn re-cbtn-fb"><IconFacebook /> Facebook</a>
              <a href={mailHref} className="re-cbtn re-cbtn-mail"><IconMail /> {EMAIL}</a>
            </div>
          </div>
          <form className="re-form" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Your name" />
            <input placeholder="Email" type="email" />
            <input placeholder="Phone / WhatsApp" />
            <textarea placeholder="Tell us about your project" rows={3} />
            <button className="re-btn re-btn-primary re-btn-lg re-w-full" type="submit">Send request</button>
            <p className="re-form-note">Demo form — no data is sent anywhere.</p>
          </form>
        </div>
      </section>

      {/* ===== Address & Map ===== */}
      <section className="re-section re-map-sec">
        <div className="re-container">
          <h2 className="re-h2">Information &amp; Contact Address</h2>
          <div className="re-map-grid">
            <div className="re-map-info">
              <div className="re-info-row">
                <span className="re-info-ico"><IconPin /></span>
                <div><b>Address</b><p>{ADDRESS}</p></div>
              </div>
              <div className="re-info-row">
                <span className="re-info-ico"><IconMail /></span>
                <div><b>Email</b><a href={mailHref}>{EMAIL}</a></div>
              </div>
              <div className="re-info-row">
                <span className="re-info-ico"><IconWhatsApp /></span>
                <div><b>WhatsApp</b><a href={waHref} target="_blank" rel="noopener">{WHATSAPP}</a></div>
              </div>
              <div className="re-info-row">
                <span className="re-info-ico"><IconInstagram /></span>
                <div><b>Instagram</b><a href={IG_URL} target="_blank" rel="noopener">@thanhtungphotoediting</a></div>
              </div>
              <div className="re-info-row">
                <span className="re-info-ico"><IconFacebook /></span>
                <div><b>Messenger</b><a href={fbHref} target="_blank" rel="noopener">m.me/thanh.tung.644412</a></div>
              </div>
            </div>
            <div className="re-map-frame">
              <iframe src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location map" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="re-footer">
        <div className="re-container re-footer-grid">
          <div>
            <a href="#top" className="re-logo re-logo-foot"><TungLogo light /></a>
            <p>Professional real estate photo editing — editors from Vietnam.</p>
            <div className="re-pay">
              <span className="re-pay-text">We accept payment via PayPal</span>
              <span className="re-pay-badge">
                <IconPayPal />
                <b><span className="re-pp-1">Pay</span><span className="re-pp-2">Pal</span></b>
              </span>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <a href="#services">Photo Editing</a>
            <a href="#services">Flash Blend</a>
            <a href="#services">Virtual Staging</a>
            <a href="#services">Floor Plan &amp; Video</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#showcase">Showcase</a>
            <a href="#pricing">Pricing</a>
            <a href={fbHref} target="_blank" rel="noopener">Facebook</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="re-container re-footer-bottom">
          <span>© {new Date().getFullYear()} Tung.NT — Real Estate Editing. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </footer>

      <style>{css}</style>
    </div>
  );
}

const css = `
.re-root{--re-blue:#c69a3a;--re-blue-d:#a87f26;--re-ink:#15171c;--re-mut:#6b7280;--re-line:#e6e6e6;--re-bg:#ffffff;--re-soft:#f7f6f3;
  background:var(--re-bg);color:var(--re-ink);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.6;}
.re-root *{box-sizing:border-box;}
.re-container{max-width:1180px;margin:0 auto;padding:0 20px;}
.re-back{position:fixed;left:16px;bottom:16px;z-index:60;background:rgba(21,23,28,.85);color:#fff;
  font-size:13px;font-weight:600;padding:9px 14px;border-radius:99px;text-decoration:none;backdrop-filter:blur(8px);
  box-shadow:0 6px 18px rgba(0,0,0,.25);}
.re-back:hover{background:#15171c;}
/* header */
.re-header{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--re-line);}
.re-nav{display:flex;align-items:center;justify-content:space-between;height:70px;gap:20px;}
.re-logo{display:flex;align-items:center;text-decoration:none;color:var(--re-ink);}
.re-logo-svg{height:52px;width:auto;display:block;}
.re-logo-foot .re-logo-svg{height:50px;}
.re-menu{display:flex;gap:24px;}
.re-menu a{color:var(--re-ink);text-decoration:none;font-weight:500;font-size:15px;}
.re-menu a:hover{color:var(--re-blue-d);}
/* header social (round) */
.re-hsoc{display:flex;align-items:center;gap:10px;}
.re-hsoc a{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;transition:.15s;}
.re-hsoc a svg{width:20px;height:20px;}
.re-hsoc .s-wa{background:#25d366;}
.re-hsoc .s-ig{background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);}
.re-hsoc .s-fb{background:#1877f2;}
.re-hsoc a:hover{transform:translateY(-2px);box-shadow:0 6px 14px rgba(0,0,0,.18);}
/* buttons */
.re-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;font-weight:600;font-size:15px;
  padding:10px 18px;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:.15s;white-space:nowrap;}
.re-btn svg{width:17px;height:17px;}
.re-btn-primary{background:var(--re-blue);color:#15171c;}
.re-btn-primary:hover{background:var(--re-blue-d);color:#fff;}
.re-btn-ghost{background:transparent;color:var(--re-ink);border-color:var(--re-line);}
.re-btn-ghost:hover{border-color:var(--re-blue);color:var(--re-blue-d);}
.re-btn-lg{padding:13px 26px;font-size:16px;}
.re-w-full{width:100%;}
.re-pill{display:inline-block;background:#f6efde;color:var(--re-blue-d);font-weight:600;font-size:13px;padding:6px 14px;border-radius:99px;margin-bottom:18px;}
/* hero */
.re-hero{padding:64px 0;background:linear-gradient(180deg,#f7f6f3,#ffffff);}
.re-hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;}
.re-h1{font-size:50px;line-height:1.05;font-weight:800;letter-spacing:-.02em;margin:0 0 18px;}
.re-h1 span{color:var(--re-blue);}
.re-lead{font-size:18px;color:var(--re-mut);margin:0 0 26px;max-width:540px;}
.re-hero-cta{display:flex;gap:14px;flex-wrap:wrap;}
.re-trust{margin-top:20px;font-size:13px;color:var(--re-mut);}
.re-hero-media{position:relative;}
.re-hero-media img{width:100%;border-radius:18px;box-shadow:0 30px 60px -20px rgba(15,23,42,.35);display:block;}
.re-hero-video{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:18px;box-shadow:0 30px 60px -20px rgba(15,23,42,.4);display:block;background:#000;}
.re-hero-badge{position:absolute;top:14px;left:14px;background:rgba(21,23,28,.82);color:#fff;font-size:12px;font-weight:600;padding:6px 12px;border-radius:99px;backdrop-filter:blur(6px);pointer-events:none;}
/* stats */
.re-stats{background:#ffffff;color:var(--re-ink);padding:36px 0;border-top:1px solid var(--re-line);border-bottom:1px solid var(--re-line);}
.re-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center;}
.re-stat{position:relative;}
.re-stat-ico{font-size:32px;line-height:1;margin-bottom:10px;}
.re-stat-n{font-size:38px;font-weight:800;color:var(--re-blue-d);letter-spacing:-.02em;}
.re-stat-l{font-size:14px;color:var(--re-mut);margin-top:2px;font-weight:500;}
/* sections */
.re-section{padding:72px 0;}
.re-root .re-section-alt{background:var(--re-soft);}
.re-h2{font-size:34px;font-weight:800;text-align:center;letter-spacing:-.02em;margin:0 0 12px;}
.re-h2.re-left{text-align:left;}
.re-sub{text-align:center;color:var(--re-mut);font-size:17px;max-width:640px;margin:0 auto 44px;}
.re-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.re-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
/* about us */
.re-about{display:grid;grid-template-columns:.85fr 1.15fr;gap:48px;align-items:start;}
.re-about-media img{width:100%;border-radius:16px;display:block;box-shadow:0 24px 48px -24px rgba(15,23,42,.35);position:sticky;top:90px;}
.re-about-body p{color:var(--re-mut);font-size:16px;margin:0 0 16px;}
.re-about-sub{font-size:18px;font-weight:700;margin:24px 0 12px;}
.re-about-list{list-style:none;padding:0;margin:0;display:grid;gap:11px;}
.re-about-list li{position:relative;padding-left:26px;color:#374151;font-size:15px;line-height:1.55;}
.re-about-list li:before{content:"✓";position:absolute;left:0;top:0;color:var(--re-blue-d);font-weight:700;}
/* before/after */
.re-sc{display:flex;flex-direction:column;}
.re-sc-t{font-size:19px;font-weight:700;margin:16px 0 6px;}
.re-sc-d{color:var(--re-mut);font-size:14px;margin:0;}
.re-ba-wrap{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:3/2;background:#000;user-select:none;box-shadow:0 16px 36px -24px rgba(15,23,42,.4);}
.re-ba-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.re-ba-after{position:absolute;inset:0;overflow:hidden;border-right:2px solid #fff;}
.re-ba-after .re-ba-img{width:auto;}
.re-ba-line{position:absolute;top:0;bottom:0;width:2px;background:#fff;transform:translateX(-50%);pointer-events:none;}
.re-ba-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;color:var(--re-blue-d);
  width:34px;height:34px;border-radius:99px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 4px 12px rgba(0,0,0,.3);}
.re-ba-range{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0;}
.re-ba-tag{position:absolute;top:12px;background:rgba(15,23,42,.7);color:#fff;font-size:11px;font-weight:600;padding:3px 9px;border-radius:6px;}
.re-ba-tag-l{left:12px;}
.re-ba-tag-r{right:12px;}
/* cards */
.re-card{background:#fff;border:1px solid var(--re-line);border-radius:16px;padding:26px 22px;transition:.18s;}
.re-card:hover{box-shadow:0 16px 30px -18px rgba(15,23,42,.3);transform:translateY(-3px);}
.re-card-t{font-size:18px;font-weight:700;margin:0 0 8px;}
.re-card-d{color:var(--re-mut);font-size:14px;margin:0;}
/* split */
.re-split{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:48px;}
.re-split:last-child{margin-bottom:0;}
.re-split img{width:100%;border-radius:16px;display:block;box-shadow:0 24px 48px -24px rgba(15,23,42,.35);}
.re-split-rev{direction:rtl;}
.re-split-rev > *{direction:ltr;}
/* video */
.re-video{max-width:900px;margin:0 auto;aspect-ratio:16/9;border-radius:16px;overflow:hidden;box-shadow:0 24px 48px -24px rgba(15,23,42,.4);background:#000;}
.re-video iframe,.re-video video{width:100%;height:100%;border:0;display:block;object-fit:cover;background:#000;}
/* steps */
.re-steps .re-step{background:#fff;border:1px solid var(--re-line);border-radius:16px;padding:32px 24px;text-align:center;}
.re-step-n{width:48px;height:48px;border-radius:99px;background:var(--re-blue);color:#15171c;font-weight:800;font-size:20px;
  display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
/* plans */
.re-plans{align-items:stretch;}
.re-plan{position:relative;background:#fff;border:1px solid var(--re-line);border-radius:16px;padding:28px 22px;display:flex;flex-direction:column;}
.re-plan-hot{border-color:var(--re-blue);box-shadow:0 18px 36px -22px rgba(198,154,58,.7);}
.re-plan-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--re-blue);color:#15171c;font-size:11px;font-weight:700;padding:4px 12px;border-radius:99px;}
.re-plan-t{font-size:18px;font-weight:700;margin:0 0 6px;}
.re-plan-price{font-size:36px;font-weight:800;letter-spacing:-.02em;margin:0 0 16px;}
.re-plan-from{font-size:13px;color:var(--re-mut);font-weight:500;margin-right:6px;}
.re-plan-price small{font-size:13px;color:var(--re-mut);font-weight:500;margin-left:4px;}
.re-plan-feat{list-style:none;padding:0;margin:0 0 22px;display:grid;gap:9px;flex:1;}
.re-plan-feat li{font-size:14px;color:#374151;padding-left:22px;position:relative;}
.re-plan-feat li:before{content:"✓";position:absolute;left:0;color:var(--re-blue-d);font-weight:700;}
/* calculator */
.re-price-box{max-width:680px;margin:48px auto 0;background:#fff;border:1px solid var(--re-line);border-radius:18px;padding:24px 26px 26px;box-shadow:0 20px 50px -30px rgba(15,23,42,.4);}
.re-calc-title{font-size:18px;font-weight:700;margin:0 0 8px;text-align:center;}
.re-price-row{display:grid;grid-template-columns:1fr auto 90px;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--re-line);}
.re-price-name{font-weight:600;}
.re-price-name span{color:var(--re-mut);font-weight:400;font-size:13px;}
.re-qty{display:flex;align-items:center;gap:6px;}
.re-qty button{width:32px;height:32px;border-radius:8px;border:1px solid var(--re-line);background:#fff;font-size:18px;cursor:pointer;color:var(--re-ink);}
.re-qty button:hover{border-color:var(--re-blue);color:var(--re-blue-d);}
.re-qty input{width:54px;height:32px;text-align:center;border:1px solid var(--re-line);border-radius:8px;font-size:14px;}
.re-price-sub{text-align:right;font-weight:600;}
.re-price-total{display:flex;justify-content:space-between;align-items:center;font-size:22px;font-weight:800;padding:18px 0;}
.re-price-total span:last-child{color:var(--re-blue-d);}
/* gallery */
.re-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.re-gal-item{aspect-ratio:3/2;border-radius:12px;overflow:hidden;}
.re-gal-item img{width:100%;height:100%;object-fit:cover;display:block;transition:.3s;}
.re-gal-item:hover img{transform:scale(1.06);}
/* quote */
.re-quote{background:#fff;border:1px solid var(--re-line);border-radius:16px;padding:26px;box-shadow:0 14px 30px -22px rgba(15,23,42,.3);}
.re-stars{font-size:17px;letter-spacing:2px;color:#f5b301;margin-bottom:12px;}
.re-stars-off{color:#e3e3e3;}
.re-quote p{font-size:16px;margin:0 0 18px;color:#374151;}
.re-quote-author{display:flex;align-items:center;gap:12px;}
.re-avatar{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;flex:none;}
.re-quote-meta{display:flex;flex-direction:column;color:var(--re-ink);font-weight:700;font-size:14px;flex:1;}
.re-quote-meta small{color:var(--re-mut);font-weight:500;font-size:13px;}
.re-verified{width:22px;height:22px;border-radius:50%;background:#16a34a;color:#fff;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex:none;}
/* cta / contact */
.re-cta{background:linear-gradient(135deg,#15171c,#2a2d34);color:#fff;padding:72px 0;}
.re-cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
.re-white{color:#fff;}
.re-white-2{color:#c9cdd5;}
.re-contact-btns{display:grid;gap:12px;margin-top:24px;max-width:420px;}
.re-cbtn{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);
  color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 18px;border-radius:12px;transition:.15s;}
.re-cbtn svg{width:20px;height:20px;flex:none;}
.re-cbtn:hover{background:rgba(255,255,255,.13);transform:translateX(3px);}
.re-cbtn-wa svg{color:#25d366;}
.re-cbtn-ig svg{color:#e1306c;}
.re-cbtn-fb svg{color:#1877f2;}
.re-cbtn-mail svg{color:var(--re-blue);}
.re-form{background:#fff;border-radius:18px;padding:26px;display:grid;gap:12px;}
.re-form input,.re-form textarea{border:1px solid var(--re-line);border-radius:10px;padding:12px 14px;font-size:15px;font-family:inherit;color:var(--re-ink);}
.re-form input:focus,.re-form textarea:focus{outline:2px solid var(--re-blue);border-color:transparent;}
.re-form-note{font-size:12px;color:var(--re-mut);text-align:center;margin:2px 0 0;}
/* address & map */
.re-map-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:40px;align-items:stretch;}
.re-map-info{display:grid;gap:22px;align-content:start;}
.re-info-row{display:flex;gap:14px;align-items:flex-start;}
.re-info-ico{width:44px;height:44px;border-radius:12px;background:#f6efde;color:var(--re-blue-d);display:flex;align-items:center;justify-content:center;flex:none;}
.re-info-ico svg{width:21px;height:21px;}
.re-info-row b{display:block;font-size:15px;margin-bottom:3px;}
.re-info-row p,.re-info-row a{margin:0;color:var(--re-mut);font-size:15px;text-decoration:none;display:block;}
.re-info-row a:hover{color:var(--re-blue-d);}
.re-map-frame{min-height:360px;border-radius:16px;overflow:hidden;border:1px solid var(--re-line);box-shadow:0 20px 44px -28px rgba(15,23,42,.4);}
.re-map-frame iframe{width:100%;height:100%;min-height:360px;border:0;display:block;}
/* payment badge */
.re-pay{margin-top:4px;}
.re-pay-text{display:block;font-size:14px;color:#94a3b8;margin-bottom:10px;}
.re-pay-badge{display:inline-flex;align-items:center;gap:8px;background:#fff;border-radius:9px;padding:8px 14px;box-shadow:0 4px 14px rgba(0,0,0,.25);}
.re-pay-badge svg{width:24px;height:24px;}
.re-pay-badge b{font-size:18px;font-weight:800;font-style:italic;letter-spacing:-.4px;}
.re-pp-1{color:#003087;}
.re-pp-2{color:#009cde;}
/* footer */
.re-footer{background:#0c0d10;color:#cbd5e1;padding:56px 0 28px;}
.re-footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1fr;gap:32px;}
.re-logo-foot{margin-bottom:14px;color:#fff;}
.re-footer p{font-size:14px;color:#94a3b8;margin:0 0 16px;}
.re-footer h4{color:#fff;font-size:15px;margin:0 0 14px;}
.re-footer a{display:block;color:#94a3b8;text-decoration:none;font-size:14px;margin-bottom:9px;}
.re-footer a:hover{color:#fff;}
.re-footer-bottom{display:flex;justify-content:space-between;border-top:1px solid #1e293b;margin-top:36px;padding-top:22px;font-size:13px;color:#64748b;}
@media(max-width:880px){
  .re-hero-grid,.re-split,.re-split-rev,.re-cta-grid{grid-template-columns:1fr;}
  .re-split-rev{direction:ltr;}
  .re-grid-3,.re-grid-4{grid-template-columns:1fr 1fr;}
  .re-stats-grid{grid-template-columns:1fr 1fr;gap:24px;}
  .re-gallery{grid-template-columns:1fr 1fr;}
  .re-menu{display:none;}
  .re-map-grid{grid-template-columns:1fr;}
  .re-about{grid-template-columns:1fr;gap:28px;}
  .re-about-media img{position:static;}
  .re-h1{font-size:36px;}
  .re-footer-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:560px){
  .re-grid-3,.re-grid-4,.re-footer-grid{grid-template-columns:1fr;}
  .re-footer-bottom{flex-direction:column;gap:8px;}
  .re-price-row{grid-template-columns:1fr auto;grid-template-areas:"name name" "qty sub";gap:8px 12px;}
  .re-price-name{grid-area:name;}
  .re-price-name span{display:inline;margin-left:4px;}
  .re-qty{grid-area:qty;}
  .re-price-sub{grid-area:sub;align-self:center;}
  .re-hsoc a{width:36px;height:36px;}
}
`;
