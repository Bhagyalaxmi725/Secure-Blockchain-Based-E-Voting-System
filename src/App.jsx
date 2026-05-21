import { useState, useEffect, useRef } from "react";

// ─── ICONS (inline SVG components) ───────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);

const icons = {
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  fingerprint: "M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z M12 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z M12 11v2",
  blockchain: "M7 16H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v2 M21 20H13a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2z",
  check: "M20 6L9 17l-5-5",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  vote: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  chart: "M18 20V10 M12 20V4 M6 20v-6",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  menu: "M3 12h18 M3 6h18 M3 18h18",
  close: "M18 6L6 18 M6 6l12 12",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  plus: "M12 5v14 M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  settings: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  cpu: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 0 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 0-2-2V9m0 0h18",
  database: "M12 2a9 3 0 1 0 0 6 9 3 0 0 0 0-6z M3 5v14a9 3 0 0 0 18 0V5 M3 12a9 3 0 0 0 18 0",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
};

const SvgIcon = ({ name, size = 20, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {icons[name]?.split(" M").map((segment, i) => (
      <path key={i} d={i === 0 ? segment : "M" + segment} />
    ))}
  </svg>
);

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html {
  width: 100%;
  overflow-x: hidden;
}
body { 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  background: var(--bg); 
  color: var(--text); 
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  overflow-x: hidden !important;
}
    :root {
      --navy: #0F1E4A;
      --blue: #1E3A8A;
      --blue-mid: #2563EB;
      --blue-light: #3B82F6;
      --accent: #22C55E;
      --accent-dark: #16A34A;
      --accent-glow: rgba(34,197,94,0.15);
      --gold: #F59E0B;
      --red: #EF4444;
      --bg: #F0F2F8;
      --surface: #FFFFFF;
      --surface2: #F8F9FD;
      --border: #E2E8F0;
      --text: #0F172A;
      --text2: #475569;
      --text3: #94A3B8;
      --shadow: 0 1px 3px rgba(15,30,74,0.08), 0 4px 16px rgba(15,30,74,0.06);
      --shadow-lg: 0 4px 6px rgba(15,30,74,0.05), 0 10px 40px rgba(15,30,74,0.12);
      --shadow-blue: 0 4px 20px rgba(37,99,235,0.25);
      --shadow-green: 0 4px 20px rgba(34,197,94,0.25);
      --r: 14px;
      --r-sm: 10px;
    }
    
    body { 
  font-family: 'Plus Jakarta Sans', sans-serif; 
  background: var(--bg); 
  color: var(--text); 
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}
    
    h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; letter-spacing: -0.02em; }
    
    .card {
      background: var(--surface);
      border-radius: var(--r);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    }
    
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 10px; border: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px; font-weight: 600; cursor: pointer;
      transition: all 0.2s ease; text-decoration: none;
      white-space: nowrap;
    }
    .btn-primary {
      background: linear-gradient(135deg, var(--blue-mid), var(--blue));
      color: #fff; box-shadow: var(--shadow-blue);
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,99,235,0.35); }
    .btn-success {
      background: linear-gradient(135deg, var(--accent), var(--accent-dark));
      color: #fff; box-shadow: var(--shadow-green);
    }
    .btn-success:hover { transform: translateY(-1px); }
    .btn-outline {
      background: transparent; color: var(--blue-mid);
      border: 1.5px solid var(--blue-mid);
    }
    .btn-outline:hover { background: rgba(37,99,235,0.06); }
    .btn-ghost {
      background: var(--surface2); color: var(--text2);
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: var(--border); color: var(--text); }
    .btn-danger { background: var(--red); color: #fff; }
    .btn-sm { padding: 6px 14px; font-size: 13px; }
    .btn-lg { padding: 14px 28px; font-size: 16px; border-radius: 12px; }
    
    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .form-label { font-size: 13px; font-weight: 600; color: var(--text2); letter-spacing: 0.02em; text-transform: uppercase; }
    .form-input {
      padding: 11px 14px; border-radius: 10px;
      border: 1.5px solid var(--border); background: var(--surface2);
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s; outline: none;
    }
    .form-input:focus { border-color: var(--blue-light); box-shadow: 0 0 0 3px rgba(59,130,246,0.1); background: #fff; }
    
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;
    }
    .badge-green { background: rgba(34,197,94,0.1); color: var(--accent-dark); }
    .badge-blue { background: rgba(37,99,235,0.1); color: var(--blue-mid); }
    .badge-red { background: rgba(239,68,68,0.1); color: var(--red); }
    .badge-gold { background: rgba(245,158,11,0.1); color: var(--gold); }
    .badge-gray { background: var(--surface2); color: var(--text2); border: 1px solid var(--border); }
    
    .table { width: 100%; border-collapse: collapse; }
    .table th { 
      padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 700;
      color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em;
      border-bottom: 1.5px solid var(--border); background: var(--surface2);
    }
    .table td { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid var(--border); color: var(--text); }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: var(--surface2); }
    
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15,30,74,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }
    .modal { 
      background: var(--surface); border-radius: 20px;
      padding: 32px; max-width: 480px; width: 90%; box-shadow: var(--shadow-lg);
      animation: slideUp 0.3s ease;
    }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes ripple { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2.4); opacity: 0; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes blockSlide { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-spin { animation: spin 1s linear infinite; }
    
    .page { animation: fadeIn 0.3s ease; }
    
    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    
    .nav-link {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px; border-radius: 10px; cursor: pointer;
      font-size: 14px; font-weight: 500; color: var(--text2);
      transition: all 0.15s ease; text-decoration: none; border: none; background: none; width: 100%;
    }
    .nav-link:hover { background: rgba(37,99,235,0.07); color: var(--blue-mid); }
    .nav-link.active { background: linear-gradient(135deg, rgba(37,99,235,0.12), rgba(37,99,235,0.06)); color: var(--blue-mid); font-weight: 600; }
    
    .stat-card {
      background: var(--surface); border-radius: var(--r); padding: 22px;
      border: 1px solid var(--border); box-shadow: var(--shadow);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .stat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
    
    .section-title { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 4px; }
    .section-sub { font-size: 14px; color: var(--text2); margin-bottom: 24px; }
    
    /* Blockchain block animation */
    .block-card { animation: blockSlide 0.4s ease both; }
    
    .fingerprint-scanner {
      width: 120px; height: 120px; border-radius: 50%;
      background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(34,197,94,0.08));
      border: 2px dashed var(--blue-light);
      display: flex; align-items: center; justify-content: center;
      position: relative; cursor: pointer;
      transition: all 0.3s ease;
    }
    .fingerprint-scanner::before {
      content: ''; position: absolute; inset: -8px;
      border-radius: 50%; border: 2px solid var(--blue-light);
      opacity: 0; animation: ripple 2s ease-in-out infinite;
    }
    .fingerprint-scanner:hover { border-style: solid; box-shadow: 0 0 30px rgba(37,99,235,0.2); }
    
    .progress-bar { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
    
    .tag { 
      display: inline-flex; align-items: center; 
      padding: 2px 8px; border-radius: 6px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
    }
    
    hero-grid { margin: 0; padding: 0;
      display: grid; 
      background: linear-gradient(135deg, #0F1E4A 0%, #1E3A8A 50%, #1a4d6e 100%);
    }
    
    .chain-link { 
      display: flex; align-items: center;
      background: rgba(255,255,255,0.06); 
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px; padding: 12px 16px;
      backdrop-filter: blur(8px);
    }
    
    .sidebar {
      width: 240px; min-height: 100vh; flex-shrink: 0;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      position: fixed; top: 0; left: 0; z-index: 100;
      overflow-y: auto;
    }
    
    .main-content {
      margin-left: 240px; flex: 1; min-height: 100vh;
      padding: 24px; background: var(--bg);
    }
    
    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .sidebar.open { transform: translateX(0); }
      .main-content { margin-left: 0; }
    }
  `}</style>
);

// ─── LOGO COMPONENT ───────────────────────────────────────────────────────────
const Logo = ({ size = "md", dark = false }) => {
  const sz = size === "lg" ? 40 : size === "sm" ? 24 : 32;
  const textClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: sz, height: sz, borderRadius: "10px",
        background: "linear-gradient(135deg, #2563EB, #1E3A8A)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
        flexShrink: 0,
      }}>
        <svg width={sz * 0.55} height={sz * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
          <path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="5" r="1" fill="white" opacity="0.7"/>
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: size === "lg" ? 26 : size === "sm" ? 16 : 20, color: dark ? "#fff" : "#0F1E4A", letterSpacing: "-0.03em", lineHeight: 1 }}>
          Block<span style={{ color: "#22C55E" }}>Vote</span>
        </div>
        {size !== "sm" && <div style={{ fontSize: 10, color: dark ? "rgba(255,255,255,0.5)" : "#94A3B8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.2 }}>Secure E-Voting</div>}
      </div>
    </div>
  );
};

// ─── BLOCKCHAIN ILLUSTRATION ──────────────────────────────────────────────────
const BlockchainIllustration = () => (
  <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400 }}>
    {/* Background glow */}
    <ellipse cx="200" cy="140" rx="180" ry="100" fill="url(#glow)" opacity="0.3"/>
    <defs>
      <radialGradient id="glow"><stop stopColor="#3B82F6"/><stop offset="1" stopColor="#3B82F6" stopOpacity="0"/></radialGradient>
      <linearGradient id="blockGrad" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1E3A8A"/><stop offset="1" stopColor="#2563EB"/></linearGradient>
      <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#22C55E"/><stop offset="1" stopColor="#3B82F6"/></linearGradient>
    </defs>
    
    {/* Connecting lines */}
    <path d="M90 140 L140 140" stroke="url(#chainGrad)" strokeWidth="2.5" strokeDasharray="4 2"/>
    <path d="M210 140 L260 140" stroke="url(#chainGrad)" strokeWidth="2.5" strokeDasharray="4 2"/>
    <path d="M310 140 L360 140" stroke="url(#chainGrad)" strokeWidth="2.5" strokeDasharray="4 2"/>
    
    {/* Block 1 */}
    <rect x="20" y="108" width="70" height="64" rx="10" fill="url(#blockGrad)" opacity="0.9"/>
    <rect x="22" y="110" width="66" height="60" rx="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <text x="55" y="136" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">#001</text>
    <text x="55" y="150" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace">3AF91B82</text>
    <text x="55" y="163" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="sans-serif">✓ Vote</text>
    
    {/* Block 2 */}
    <rect x="140" y="100" width="70" height="80" rx="10" fill="url(#blockGrad)"/>
    <rect x="142" y="102" width="66" height="76" rx="9" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    <text x="175" y="132" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">#002</text>
    <text x="175" y="146" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace">7F0C81D1</text>
    <text x="175" y="159" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="sans-serif">✓ Vote</text>
    <text x="175" y="172" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="sans-serif">prev:3AF9</text>

    {/* Block 3 - active */}
    <rect x="260" y="108" width="70" height="64" rx="10" fill="url(#blockGrad)" opacity="0.95"/>
    <rect x="262" y="110" width="66" height="60" rx="9" stroke="#22C55E" strokeWidth="1.5"/>
    <text x="295" y="136" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">#003</text>
    <text x="295" y="150" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace">A1B2C3D4</text>
    <text x="295" y="163" textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="sans-serif">✓ Sealed</text>
    
    {/* Fingerprint icon */}
    <circle cx="200" cy="230" r="26" fill="rgba(34,197,94,0.1)" stroke="#22C55E" strokeWidth="1.5"/>
    <text x="200" y="237" textAnchor="middle" fontSize="22">🔏</text>
    
    {/* Shield */}
    <circle cx="50" cy="60" r="22" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.3)" strokeWidth="1"/>
    <text x="50" y="68" textAnchor="middle" fontSize="22">🛡️</text>
    
    {/* Vote icon */}
    <circle cx="350" cy="60" r="22" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="1"/>
    <text x="350" y="68" textAnchor="middle" fontSize="22">🗳️</text>
    
    {/* Particles */}
    <circle cx="160" cy="55" r="3" fill="#22C55E" opacity="0.6"/>
    <circle cx="240" cy="50" r="2" fill="#3B82F6" opacity="0.5"/>
    <circle cx="310" cy="240" r="3" fill="#22C55E" opacity="0.5"/>
    <circle cx="100" cy="220" r="2" fill="#3B82F6" opacity="0.6"/>
  </svg>
);

// ─── FINGERPRINT SVG ──────────────────────────────────────────────────────────
const FingerprintSvg = ({ size = 60, color = "#2563EB", animate = false }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={animate ? { animation: "pulse 2s ease infinite" } : {}}>
    <circle cx="30" cy="30" r="29" fill={`${color}10`} stroke={`${color}30`} strokeWidth="1"/>
    <path d="M30 42c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 38c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 34c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M30 46c-8.8 0-16-7.2-16-16" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M46 30c0 8.8-7.2 16-16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="30" cy="30" r="1.5" fill={color}/>
    {animate && <circle cx="30" cy="30" r="16" stroke={color} strokeWidth="1" opacity="0" style={{ animation: "ripple 2s ease-out infinite" }}/>}
  </svg>
);

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const VOTERS = [
  { id: "VT001", name: "Rahul Sharma", age: 28, area: "Mumbai North", phone: "9876543210", status: "Not Voted", fp: true },
  { id: "VT002", name: "Priya Patel", age: 34, area: "Mumbai South", phone: "9765432109", status: "Voted", fp: true },
  { id: "VT003", name: "Amit Kumar", age: 41, area: "Andheri East", phone: "9654321098", status: "Not Voted", fp: true },
  { id: "VT004", name: "Sunita Rao", age: 29, area: "Bandra West", phone: "9543210987", status: "Not Voted", fp: false },
  { id: "VT005", name: "Vikram Singh", age: 52, area: "Dadar", phone: "9432109876", status: "Voted", fp: true },
];

const CANDIDATES = [
  { id: "C001", name: "Narendra Patil", party: "National Progress Party", votes: 142, color: "#2563EB", emoji: "👔" },
  { id: "C002", name: "Deepa Mehta", party: "People's Democratic Alliance", votes: 98, color: "#22C55E", emoji: "👩‍💼" },
  { id: "C003", name: "Suresh Nair", party: "United Citizens Front", votes: 67, color: "#F59E0B", emoji: "🧑‍💼" },
  { id: "C004", name: "Kavita Joshi", party: "Independent Candidate", votes: 23, color: "#8B5CF6", emoji: "👩" },
];

const BLOCKS = [
  { num: 1, hash: "3AF91B82...C041", prev: "0000000000", voter: "VT002", ts: "10:30:15 AM", valid: true },
  { num: 2, hash: "7F0C81D1...B892", prev: "3AF91B82...", voter: "VT005", ts: "10:31:42 AM", valid: true },
  { num: 3, hash: "A1B2C3D4...E567", prev: "7F0C81D1...", voter: "VT007", ts: "10:33:09 AM", valid: true },
  { num: 4, hash: "F8E9D0C1...A234", prev: "A1B2C3D4...", voter: "VT011", ts: "10:35:22 AM", valid: true },
  { num: 5, hash: "B5A4C3D2...9821", prev: "F8E9D0C1...", voter: "VT014", ts: "10:37:55 AM", valid: true },
  { num: 6, hash: "E1F2A3B4...C567", prev: "B5A4C3D2...", voter: "VT018", ts: "10:40:11 AM", valid: true },
];

// ─── FINGERPRINT MODAL ────────────────────────────────────────────────────────
const FingerprintModal = ({ onClose, onSuccess, title = "Scan Fingerprint" }) => {
  const [stage, setStage] = useState("idle"); // idle, connecting, scanning, success, failed
  
  const startScan = () => {
    setStage("connecting");
    setTimeout(() => setStage("scanning"), 1200);
    setTimeout(() => {
      const success = Math.random() > 0.15;
      setStage(success ? "success" : "failed");
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}>✕</button>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {/* Scanner visual */}
          <div style={{ 
            width: 150, height: 150, borderRadius: "50%",
            background: stage === "success" ? "rgba(34,197,94,0.08)" : stage === "failed" ? "rgba(239,68,68,0.08)" : "rgba(37,99,235,0.06)",
            border: `2px ${stage === "scanning" ? "solid" : "dashed"} ${stage === "success" ? "#22C55E" : stage === "failed" ? "#EF4444" : "#2563EB"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative",
            boxShadow: stage === "scanning" ? "0 0 30px rgba(37,99,235,0.2)" : "none",
            transition: "all 0.3s ease",
          }}>
            <FingerprintSvg size={80} color={stage === "success" ? "#22C55E" : stage === "failed" ? "#EF4444" : "#2563EB"} animate={stage === "scanning"} />
            {stage === "scanning" && (
              <div style={{ position: "absolute", inset: -12, borderRadius: "50%", border: "2px solid #2563EB", opacity: 0.4, animation: "ripple 1.5s ease-out infinite" }}/>
            )}
          </div>
          
          {/* Status */}
          <div style={{ textAlign: "center" }}>
            {stage === "idle" && <><p style={{ fontWeight: 600, color: "var(--text)" }}>Arduino Fingerprint Module Ready</p><p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Place finger on sensor and click scan</p></>}
            {stage === "connecting" && <><p style={{ fontWeight: 600, color: "var(--blue-mid)" }} className="animate-pulse">Connecting to Arduino device...</p><p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Please wait</p></>}
            {stage === "scanning" && <><p style={{ fontWeight: 600, color: "var(--blue-mid)" }} className="animate-pulse">Scanning fingerprint...</p><p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Keep your finger on the sensor</p></>}
            {stage === "success" && (
              <div>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", border: "2px solid #22C55E" }}>
                  <span style={{ fontSize: 22 }}>✓</span>
                </div>
                <p style={{ fontWeight: 700, color: "#22C55E", fontSize: 16 }}>Fingerprint Captured Successfully!</p>
                <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Biometric template stored in database</p>
              </div>
            )}
            {stage === "failed" && (
              <div>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", border: "2px solid #EF4444" }}>
                  <span style={{ fontSize: 22 }}>✗</span>
                </div>
                <p style={{ fontWeight: 700, color: "#EF4444", fontSize: 16 }}>Fingerprint Not Matched</p>
                <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Please try again or contact admin</p>
              </div>
            )}
          </div>
          
          {/* Arduino info */}
          {(stage === "connecting" || stage === "scanning") && (
            <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "10px 16px", border: "1px solid var(--border)", fontSize: 13, color: "var(--text2)", display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", flexShrink: 0, animation: "pulse 1s ease infinite" }}/>
              Arduino Mega 2560 • COM3 • AS608 Sensor Connected
            </div>
          )}
          
          <div style={{ display: "flex", gap: 12, width: "100%" }}>
            {stage === "idle" && <button className="btn btn-primary" style={{ flex: 1 }} onClick={startScan}><FingerprintSvg size={16} color="white"/> Scan Fingerprint</button>}
            {stage === "failed" && <><button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStage("idle")}>Retry</button><button className="btn btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button></>}
            {stage === "success" && <button className="btn btn-success" style={{ flex: 1 }} onClick={() => { onSuccess && onSuccess(); onClose(); }}>Continue →</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SIMPLE BAR CHART ─────────────────────────────────────────────────────────
const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, padding: "10px 0" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)" }}>{d.value}</span>
          <div style={{ width: "100%", background: "var(--border)", borderRadius: 8, overflow: "hidden", height: 120 }}>
            <div style={{
              width: "100%", height: `${(d.value / max) * 100}%`,
              background: d.color, borderRadius: 8,
              marginTop: `${100 - (d.value / max) * 100}%`,
              transition: "height 0.8s ease",
            }}/>
          </div>
          <span style={{ fontSize: 11, color: "var(--text3)", textAlign: "center" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const segments = data.map(d => {
    const pct = d.value / total;
    const start = cumulative;
    cumulative += pct;
    return { ...d, pct, start };
  });

  const getPath = (startPct, endPct) => {
    const r = 40, cx = 50, cy = 50;
    const startA = startPct * 360 - 90;
    const endA = endPct * 360 - 90;
    const start = { x: cx + r * Math.cos(startA * Math.PI / 180), y: cy + r * Math.sin(startA * Math.PI / 180) };
    const end = { x: cx + r * Math.cos(endA * Math.PI / 180), y: cy + r * Math.sin(endA * Math.PI / 180) };
    const largeArc = (endPct - startPct) > 0.5 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg viewBox="0 0 100 100" style={{ width: 120, height: 120, flexShrink: 0 }}>
        {segments.map((s, i) => (
          <path key={i} d={getPath(s.start, s.start + s.pct)} fill={s.color} opacity={0.85}/>
        ))}
        <circle cx="50" cy="50" r="24" fill="white"/>
        <text x="50" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="sans-serif" fill="#0F172A">{total}</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }}/>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>{d.label}: <strong style={{ color: "var(--text)" }}>{d.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const LandingPage = ({ navigate }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: "blockchain", title: "Secure Blockchain Storage", desc: "Every vote is cryptographically hashed and stored in an immutable blockchain ledger.", color: "#2563EB" },
    { icon: "fingerprint", title: "Fingerprint Authentication", desc: "Biometric identity verification using Arduino AS608 sensor ensures genuine voters.", color: "#22C55E" },
    { icon: "user", title: "One Person, One Vote", desc: "Duplicate voting is strictly prevented through unique voter ID and biometric binding.", color: "#F59E0B" },
    { icon: "chart", title: "Transparent Results", desc: "Election results are publicly verifiable and tamper-resistant.", color: "#8B5CF6" },
  ];

  const steps = [
    { num: "01", title: "Register Voter", desc: "Admin pre-registers voter with ID and biometric capture", icon: "user" },
    { num: "02", title: "Capture Fingerprint", desc: "Arduino fingerprint module captures biometric template", icon: "fingerprint" },
    { num: "03", title: "Verify Identity", desc: "Fingerprint matched against stored biometric template", icon: "lock" },
    { num: "04", title: "Cast Vote", desc: "Authenticated voter selects preferred candidate", icon: "vote" },
    { num: "05", title: "Store on Blockchain", desc: "Vote hashed and added to immutable blockchain ledger", icon: "blockchain" },
    { num: "06", title: "View Results", desc: "Transparent, real-time results visible to all stakeholders", icon: "chart" },
  ];

  return (
    <div className="page" style={{ minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <Logo dark={!scrolled} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[["Home","landing"],["Results","results"],["Blockchain Logs","blockchain"]].map(([label, page]) => (
            <button key={label} onClick={() => navigate(page)} className="btn btn-ghost btn-sm" style={{ color: scrolled ? "var(--text2)" : "rgba(255,255,255,0.8)", background: "transparent", border: "none" }}>{label}</button>
          ))}
          <button onClick={() => navigate("voter-register")} className="btn btn-ghost btn-sm" style={{ color: scrolled ? "var(--text2)" : "rgba(255,255,255,0.8)", background: "transparent", border: "none" }}>Voter Registration</button>
          <button onClick={() => navigate("admin-login")} className="btn btn-primary btn-sm">Admin Login</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
       minHeight: "100vh", width: "100vw", marginLeft: "calc(-1 * ((100vw - 100%) / 2))", background: "linear-gradient(135deg, #0F1E4A 0%, #1E3A8A 55%, #163356 100%)",
        display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center",
        padding: "100px 60px 60px", gap: 60, position: "relative", overflow: "hidden",
      }}>
        {/* BG pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}/>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(rgba(34,197,94,0.08), transparent 70%)" }}/>
        
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 30, padding: "6px 16px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }}/>
            <span style={{ fontSize: 13, color: "#22C55E", fontWeight: 600 }}>Election System Active</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
            Secure Blockchain<br/>
            <span style={{ color: "#22C55E" }}>Based E-Voting</span><br/>
            System
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Transparent, tamper-proof and biometric verified digital voting platform powered by blockchain technology and Arduino fingerprint authentication.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => navigate("admin-login")} className="btn btn-primary btn-lg" style={{ fontSize: 15 }}>Admin Login →</button>
            <button onClick={() => navigate("voter-register")} className="btn btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1.5px solid rgba(255,255,255,0.25)" }}>Register as Voter</button>
            <button onClick={() => navigate("results")} className="btn btn-lg" style={{ background: "transparent", color: "rgba(255,255,255,0.7)", border: "1.5px solid rgba(255,255,255,0.15)" }}>View Results</button>
          </div>
          
          {/* Stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {[["330", "Total Voters"], ["4", "Candidates"], ["330", "Votes Cast"], ["100%", "Secure"]].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "white" }}>{v}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ position: "relative", zIndex: 1 }} className="animate-float">
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32, backdropFilter: "blur(8px)" }}>
            <BlockchainIllustration />
            <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "center" }}>
              {["🔐 Encrypted","⛓️ Blockchain","🔏 Biometric"].map(t => (
                <div key={t} className="chain-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section style={{ padding: "80px 60px", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue-mid)" }}>Why BlockVote</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "var(--text)", marginTop: 8 }}>Built for Security & Transparency</h2>
          <p style={{ fontSize: 16, color: "var(--text2)", marginTop: 8 }}>Enterprise-grade security for democratic processes</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: 28, transition: "transform 0.2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}12`, border: `1px solid ${f.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <SvgIcon name={f.icon} size={24} color={f.color} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 60px", background: "white", borderTop: "1px solid var(--border)" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-dark)" }}>Process Flow</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: "var(--text)", marginTop: 8 }}>How BlockVote Works</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, maxWidth: 960, margin: "0 auto" }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: "relative", padding: "28px", background: "var(--surface2)", borderRadius: 16, border: "1px solid var(--border)" }}>
              <div style={{ position: "absolute", top: -14, left: 28, background: "linear-gradient(135deg, var(--blue-mid), var(--blue))", color: "white", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 800 }}>{s.num}</div>
              <div style={{ marginTop: 12, marginBottom: 14, color: "var(--blue-mid)" }}><SvgIcon name={s.icon} size={28} /></div>
              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{s.title}</h4>
              <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.6 }}>{s.desc}</p>
              {i < steps.length - 1 && i % 3 !== 2 && (
                <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", fontSize: 18, zIndex: 1 }}>→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--navy)", padding: "48px 60px 32px", color: "white" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40 }}>
          <div>
            <Logo dark size="md" />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, marginTop: 16, lineHeight: 1.7 }}>Secure Blockchain-Based E-Voting System with Biometric Authentication. A Pre-Final Year Engineering Project.</p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <div style={{ padding: "4px 12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6, fontSize: 12, color: "#22C55E" }}>🔒 Secure</div>
              <div style={{ padding: "4px 12px", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 6, fontSize: 12, color: "#60A5FA" }}>⛓️ Blockchain</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Project Info</h4>
            {[["Project", "BlockVote"],["Department", "Information Technology Engineering"],["Type", " Pre-Final Year Engineering Project"],["Year", "2026–2027"]].map(([k, v]) => (
              <div key={k} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}><span style={{ color: "rgba(255,255,255,0.25)" }}>{k}:</span> {v}</div>
            ))}
          </div>
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Team Members</h4>
            {["Himanshi Bhat ","Bhagyalaxmi Erla ","Riddhi Pednekar "].map(m => (
              <div key={m} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{m[0]}</div>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 BlockVote —  Pre-Final Year  Engineering Project</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Information Technology Engineering Department</p>
        </div>
      </footer>
    </div>
  );
};

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
const AdminLogin = ({ navigate }) => {
  const [form, setForm] = useState({ id: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!form.id || !form.pass) { setError("Please enter Admin ID and Password."); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      if (form.id === "admin" && form.pass === "admin123") { navigate("dashboard"); }
      else { setError("Invalid credentials. Use admin / admin123"); setLoading(false); }
    }, 1200);
  };

  return (
    <div className="page" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      {/* Left visual */}
      <div style={{ background: "linear-gradient(135deg, #0F1E4A, #1E3A8A)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60 }}>
        <Logo dark size="lg" />
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <BlockchainIllustration />
        </div>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14 }}>
          {["Encrypted Admin Access","Two-Factor Security","Role-Based Permissions","Full Audit Trail"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(34,197,94,0.2)", border: "1px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, color: "#22C55E" }}>✓</span>
              </div>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 60, background: "var(--bg)" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 30, padding: "5px 14px", marginBottom: 20 }}>
              <SvgIcon name="lock" size={13} color="var(--blue-mid)" />
              <span style={{ fontSize: 12, color: "var(--blue-mid)", fontWeight: 600 }}>Secure Admin Portal</span>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 800, color: "var(--text)" }}>Admin Login</h1>
            <p style={{ fontSize: 14, color: "var(--text2)", marginTop: 6 }}>Sign in to manage elections and voters</p>
          </div>

          <div className="card" style={{ padding: 32 }}>
            <div className="form-group">
              <label className="form-label">Admin ID</label>
              <input className="form-input" placeholder="Enter Admin ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter Password" value={form.pass} onChange={e => setForm({ ...form, pass: e.target.value })} onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            {error && (
              <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "var(--red)", marginBottom: 16 }}>
                ⚠ {error}
              </div>
            )}
            <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 20 }}>Demo: admin / admin123</div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }} onClick={handleLogin} disabled={loading}>
              {loading ? <span className="animate-spin">⟳</span> : <><SvgIcon name="lock" size={16} color="white"/> Login to Dashboard</>}
            </button>
          </div>
          <button onClick={() => navigate("landing")} className="btn btn-ghost btn-sm" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>← Back to Home</button>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN LAYOUT ─────────────────────────────────────────────────────────────
const AdminLayout = ({ children, active, navigate }) => {
  const navItems = [
    { key: "dashboard", icon: "home", label: "Dashboard" },
    { key: "voters", icon: "user", label: "Manage Voters" },
    { key: "candidates", icon: "award", label: "Manage Candidates" },
    { key: "election-control", icon: "settings", label: "Election Control" },
    { key: "blockchain", icon: "database", label: "Blockchain Logs" },
    { key: "results", icon: "chart", label: "Results" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: "24px 20px", borderBottom: "1px solid var(--border)" }}>
          <Logo size="sm" />
          <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 6, padding: "3px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 2s infinite" }}/>
            <span style={{ fontSize: 11, color: "var(--accent-dark)", fontWeight: 700 }}>Election Open</span>
          </div>
        </div>
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 14px", marginBottom: 6 }}>Main Menu</div>
          {navItems.map(item => (
            <button key={item.key} className={`nav-link ${active === item.key ? "active" : ""}`} onClick={() => navigate(item.key)}>
              <SvgIcon name={item.icon} size={17} />{item.label}
            </button>
          ))}
          <div style={{ margin: "20px 0 10px", borderTop: "1px solid var(--border)" }}/>
          <button className="nav-link" onClick={() => navigate("voter-booth")} style={{ color: "var(--blue-mid)" }}>
            <SvgIcon name="fingerprint" size={17} />Voter Booth
          </button>
          <button className="nav-link" onClick={() => navigate("landing")} style={{ color: "var(--red)" }}>
            <SvgIcon name="logout" size={17} />Logout
          </button>
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "var(--surface2)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-mid), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>A</div>
            <div><div style={{ fontSize: 13, fontWeight: 600 }}>Admin</div><div style={{ fontSize: 11, color: "var(--text3)" }}>admin@blockvote.gov</div></div>
          </div>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
};

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ navigate }) => {
  const stats = [
    { label: "Total Voters", value: "330", change: "+12 today", icon: "user", color: "#2563EB" },
    { label: "Total Candidates", value: "4", change: "Final list", icon: "award", color: "#22C55E" },
    { label: "Votes Cast", value: "330", change: "100% participation", icon: "vote", color: "#F59E0B" },
    { label: "Blockchain Blocks", value: "330", change: "All verified ✓", icon: "database", color: "#8B5CF6" },
  ];

  const chartData = CANDIDATES.map(c => ({ label: c.name.split(" ")[0], value: c.votes, color: c.color }));

  return (
    <AdminLayout active="dashboard" navigate={navigate}>
      <div className="page">
        <div style={{ marginBottom: 28 }}>
          <h1 className="section-title">Election Dashboard</h1>
          <p className="section-sub">Overview of BlockVote 2025 General Election</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>{s.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: "var(--text)" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{s.change}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgIcon name={s.icon} size={20} color={s.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Vote Distribution</h3>
            <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Candidate-wise vote count</p>
            <BarChart data={chartData} />
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Participation Share</h3>
            <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Votes by candidate percentage</p>
            <DonutChart data={CANDIDATES.map(c => ({ label: c.name.split(" ")[0], value: c.votes, color: c.color }))} />
          </div>
        </div>

        {/* Election status + recent activity */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Election Status</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--text2)" }}>Election Status</span>
                <span className="badge badge-green">● Open</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--text2)" }}>Voting Started</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>08:00 AM Today</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "var(--text2)" }}>Voting Ends</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>05:00 PM Today</span>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "var(--text2)" }}>Voter Turnout</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent-dark)" }}>100%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: "100%", background: "linear-gradient(90deg, #22C55E, #16A34A)" }}/></div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => navigate("election-control")}>End Election</button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => navigate("election-control")}>Settings</button>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Recent Blockchain Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BLOCKS.slice(0, 4).map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "var(--surface2)", borderRadius: 10, border: "1px solid var(--border)" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #1E3A8A, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: "white", fontWeight: 700 }}>#{b.num}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace" }}>{b.hash}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)" }}>Voter {b.voter} • {b.ts}</div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: 11 }}>✓ Valid</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// ─── MANAGE VOTERS ────────────────────────────────────────────────────────────
const ManageVoters = ({ navigate }) => {
  const [voters, setVoters] = useState(VOTERS);
  const [search, setSearch] = useState("");
  const [fpModal, setFpModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ id: "", name: "", age: "", area: "", phone: "", address: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };
  const filtered = voters.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.id.includes(search));

  return (
    <AdminLayout active="voters" navigate={navigate}>
      <div className="page">
        {toast && (
          <div style={{ position: "fixed", top: 20, right: 20, background: "#22C55E", color: "white", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 200, boxShadow: "0 4px 20px rgba(34,197,94,0.4)", animation: "slideUp 0.3s ease" }}>
            ✓ {toast}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div><h1 className="section-title">Manage Voters</h1><p className="section-sub">Register and manage voter records</p></div>
          <button className="btn btn-primary" onClick={() => setAddModal(true)}><SvgIcon name="plus" size={16} color="white"/> Add Voter</button>
        </div>

        {/* Fingerprint Registration Card */}
        <div className="card" style={{ padding: 24, marginBottom: 20, background: "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(34,197,94,0.03))", border: "1.5px dashed rgba(37,99,235,0.25)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <FingerprintSvg size={64} color="var(--blue-mid)" />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Fingerprint Enrollment Station</h3>
              <p style={{ fontSize: 14, color: "var(--text2)" }}>Capture voter biometric data using Arduino AS608 fingerprint sensor. Connect the device and click Scan Fingerprint to enroll.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button className="btn btn-primary btn-sm" onClick={() => setFpModal(true)}><FingerprintSvg size={14} color="white"/> Scan Fingerprint</button>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text3)" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }}/>
                  Arduino Connected • COM3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, borderBottom: "1px solid var(--border)" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <SvgIcon name="search" size={15} color="var(--text3)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input className="form-input" placeholder="Search voters..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, marginBottom: 0 }} />
            </div>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>{filtered.length} voters</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Voter ID</th><th>Name</th><th>Age</th><th>Area</th><th>Phone</th><th>Fingerprint</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr key={i}>
                  <td><code style={{ fontSize: 12, background: "var(--surface2)", padding: "2px 6px", borderRadius: 4 }}>{v.id}</code></td>
                  <td><strong>{v.name}</strong></td>
                  <td>{v.age}</td>
                  <td>{v.area}</td>
                  <td style={{ color: "var(--text2)" }}>{v.phone}</td>
                  <td>
                    {v.fp ? <span className="badge badge-green"><FingerprintSvg size={12} color="var(--accent-dark)"/> Registered</span>
                      : <span className="badge badge-red">Not Enrolled</span>}
                  </td>
                  <td>
                    <span className={`badge ${v.status === "Voted" ? "badge-gold" : "badge-gray"}`}>{v.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}><SvgIcon name="edit" size={13} /></button>
                      <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px", color: "var(--red)" }} onClick={() => { setVoters(voters.filter((_, j) => j !== i)); showToast("Voter deleted"); }}><SvgIcon name="trash" size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {fpModal && <FingerprintModal title="Register Voter Fingerprint" onClose={() => setFpModal(false)} onSuccess={() => showToast("Fingerprint Captured Successfully")} />}

        {addModal && (
          <div className="modal-overlay" onClick={() => setAddModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>Add New Voter</h3>
                <button onClick={() => setAddModal(false)} className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}>✕</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["Voter ID","id","VT006"],["Full Name","name",""],["Age","age",""],["Area / Constituency","area",""],["Phone Number","phone",""],["Address","address",""]].map(([l, k, ph]) => (
                  <div key={k} className="form-group" style={{ marginBottom: 0, gridColumn: k === "address" ? "1 / -1" : "" }}>
                    <label className="form-label">{l}</label>
                    <input className="form-input" placeholder={ph} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => {
                  setVoters([...voters, { ...form, status: "Not Voted", fp: false }]);
                  setAddModal(false); showToast("Voter added successfully");
                }}>Add Voter</button>
                <button className="btn btn-ghost" onClick={() => setAddModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// ─── MANAGE CANDIDATES ────────────────────────────────────────────────────────
const ManageCandidates = ({ navigate }) => {
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [addModal, setAddModal] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  return (
    <AdminLayout active="candidates" navigate={navigate}>
      <div className="page">
        {toast && <div style={{ position: "fixed", top: 20, right: 20, background: "#22C55E", color: "white", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 200, boxShadow: "0 4px 20px rgba(34,197,94,0.4)" }}>✓ {toast}</div>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div><h1 className="section-title">Manage Candidates</h1><p className="section-sub">Add and manage election candidates</p></div>
          <button className="btn btn-primary" onClick={() => setAddModal(true)}><SvgIcon name="plus" size={16} color="white"/> Add Candidate</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {candidates.map((c, i) => (
            <div key={i} className="card" style={{ overflow: "hidden" }}>
              <div style={{ height: 100, background: `linear-gradient(135deg, ${c.color}15, ${c.color}30)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
                {c.emoji}
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</h3>
                    <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{c.party}</p>
                  </div>
                  <code style={{ fontSize: 11, background: "var(--surface2)", padding: "2px 6px", borderRadius: 4, color: "var(--text3)" }}>{c.id}</code>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0" }}>
                  <div style={{ flex: 1, height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(c.votes / 200) * 100}%`, background: c.color, borderRadius: 3 }}/>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.votes} votes</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}><SvgIcon name="edit" size={13} /> Edit</button>
                  <button className="btn btn-ghost btn-sm" style={{ padding: "6px 10px", color: "var(--red)" }} onClick={() => { setCandidates(candidates.filter((_, j) => j !== i)); showToast("Candidate removed"); }}><SvgIcon name="trash" size={13} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {addModal && (
          <div className="modal-overlay" onClick={() => setAddModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>Add New Candidate</h3>
                <button onClick={() => setAddModal(false)} className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }}>✕</button>
              </div>
              <div className="form-group"><label className="form-label">Candidate Name</label><input className="form-input" placeholder="Full name"/></div>
              <div className="form-group"><label className="form-label">Party Name</label><input className="form-input" placeholder="Political party name"/></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Candidate Photo</label>
                  <div style={{ border: "2px dashed var(--border)", borderRadius: 10, padding: "20px 14px", textAlign: "center", cursor: "pointer", color: "var(--text3)", fontSize: 13 }}>📷 Upload Photo</div>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Party Symbol</label>
                  <div style={{ border: "2px dashed var(--border)", borderRadius: 10, padding: "20px 14px", textAlign: "center", cursor: "pointer", color: "var(--text3)", fontSize: 13 }}>🏴 Upload Symbol</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setAddModal(false); showToast("Candidate added"); }}>Add Candidate</button>
                <button className="btn btn-ghost" onClick={() => setAddModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// ─── ELECTION CONTROL ─────────────────────────────────────────────────────────
const ElectionControl = ({ navigate }) => {
  const [status, setStatus] = useState("open");
  const [toast, setToast] = useState("");
  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(""), 3500); };

  return (
    <AdminLayout active="election-control" navigate={navigate}>
      <div className="page">
        {toast && <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "success" ? "#22C55E" : "#EF4444", color: "white", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, zIndex: 200 }}>✓ {toast.msg}</div>}
        
        <h1 className="section-title">Election Control Panel</h1>
        <p className="section-sub">Manage election lifecycle and system controls</p>

        {/* Status Banner */}
        <div className="card" style={{ padding: 28, marginBottom: 24, background: status === "open" ? "linear-gradient(135deg, rgba(34,197,94,0.05), rgba(34,197,94,0.1))" : "linear-gradient(135deg, rgba(239,68,68,0.05), rgba(239,68,68,0.1))", border: `1.5px solid ${status === "open" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: status === "open" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)", border: `2px solid ${status === "open" ? "#22C55E" : "#EF4444"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
              {status === "open" ? "🗳️" : "🔒"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>Election Status</h2>
                <span className={`badge ${status === "open" ? "badge-green" : "badge-red"}`} style={{ fontSize: 14, padding: "4px 14px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "currentColor", animation: status === "open" ? "pulse 1.5s infinite" : "none" }}/>
                  {status === "open" ? "OPEN" : "CLOSED"}
                </span>
              </div>
              <p style={{ color: "var(--text2)", marginTop: 6, fontSize: 14 }}>
                {status === "open" ? "Election is currently active. Voters can cast their votes at the booth." : "Election has ended. No more votes can be cast. Results are finalized."}
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 24 }}>
          {[
            { title: "Start Election", desc: "Open the election for voting. Voters will be able to cast votes once started.", icon: "▶", color: "#22C55E", action: () => { setStatus("open"); showToast("Election Started Successfully!"); } },
            { title: "End Election", desc: "Close the election. No more votes can be cast. Results will be finalized.", icon: "⏹", color: "#EF4444", action: () => { setStatus("closed"); showToast("Election Ended. Results Finalized.", "error"); } },
            { title: "Reset Election", desc: "Reset all votes and restart. Warning: This action cannot be undone.", icon: "↺", color: "#F59E0B", action: () => { setStatus("open"); showToast("Election Reset Successfully!"); } },
          ].map((ctrl, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ctrl.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{ctrl.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{ctrl.title}</h3>
              <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20, lineHeight: 1.6 }}>{ctrl.desc}</p>
              <button className="btn btn-sm" style={{ background: `${ctrl.color}15`, color: ctrl.color, border: `1.5px solid ${ctrl.color}40`, fontWeight: 700 }} onClick={ctrl.action}>{ctrl.title}</button>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Election Configuration</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["Election Title", "BlockVote 2025 General Election"],["Election Date", "2025-01-15"],["Start Time", "08:00"],["End Time", "17:00"],["Constituency", "Mumbai Municipal"],["Election Type", "Local Body Election"]].map(([l, v]) => (
              <div key={l} className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">{l}</label>
                <input className="form-input" defaultValue={v} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 20 }}>Save Configuration</button>
        </div>
      </div>
    </AdminLayout>
  );
};

// ─── BLOCKCHAIN LOGS ──────────────────────────────────────────────────────────
const BlockchainLogs = ({ navigate, isAdmin = true }) => {
  const Wrap = isAdmin ? AdminLayout : ({ children }) => <div className="page">{children}</div>;
  
  return (
    <Wrap active="blockchain" navigate={navigate}>
      <div className="page">
        {!isAdmin && (
          <nav style={{ background: "var(--navy)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo dark size="sm" />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("landing")} className="btn btn-ghost btn-sm" style={{ color: "rgba(255,255,255,0.7)", background: "transparent", border: "none" }}>← Home</button>
              <button onClick={() => navigate("results")} className="btn btn-primary btn-sm">View Results</button>
            </div>
          </nav>
        )}
        
        <div style={{ maxWidth: 900, margin: "0 auto", padding: isAdmin ? 0 : 32 }}>
          <div style={{ marginBottom: 28 }}>
            <h1 className="section-title">Blockchain Vote Ledger</h1>
            <p className="section-sub">Immutable record of all votes stored on blockchain</p>
          </div>

          {/* Info banner */}
          <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(34,197,94,0.04))", border: "1.5px solid rgba(37,99,235,0.2)", borderRadius: 14, padding: "18px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>⛓️</div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Tamper-Proof Blockchain Storage</h3>
              <p style={{ fontSize: 13, color: "var(--text2)" }}>All votes are cryptographically hashed and chained. Any modification attempt is immediately detectable. Total integrity: <strong style={{ color: "#22C55E" }}>100% ✓</strong></p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
            {[["Total Blocks", "330", "#2563EB"],["Verified", "330", "#22C55E"],["Chain Length", "28.4 KB", "#F59E0B"],["Integrity", "100%", "#8B5CF6"]].map(([l, v, c]) => (
              <div key={l} className="card" style={{ padding: "16px 18px" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: c }}>{v}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {BLOCKS.map((b, i) => (
              <div key={i} className="card block-card" style={{ padding: 22, animationDelay: `${i * 0.08}s`, display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, var(--blue), var(--blue-mid))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 12px rgba(37,99,235,0.25)" }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontWeight: 700, textTransform: "uppercase" }}>Block</span>
                  <span style={{ fontSize: 16, color: "white", fontWeight: 800 }}>#{b.num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{b.hash}</span>
                    <span className="badge badge-green" style={{ fontSize: 11 }}>✓ Valid</span>
                  </div>
                  <div style={{ display: "flex", gap: 20 }}>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>Prev: <code style={{ color: "var(--text2)" }}>{b.prev}</code></span>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>Voter: <code style={{ color: "var(--blue-mid)" }}>{b.voter}</code></span>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>⏰ {b.ts}</span>
                  </div>
                </div>
                {i < BLOCKS.length - 1 && (
                  <div style={{ position: "absolute", left: 47, marginTop: 72, width: 2, height: 14, background: "var(--border)" }}/>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "28px", color: "var(--text3)", fontSize: 14 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 30, padding: "10px 20px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }}/>
              <span>Showing latest 6 blocks • <strong>330 total blocks</strong> on chain • All verified ✓</span>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

// ─── RESULTS PAGE ─────────────────────────────────────────────────────────────
const ResultsPage = ({ navigate, isAdmin = false }) => {
  const total = CANDIDATES.reduce((s, c) => s + c.votes, 0);
  const winner = CANDIDATES.reduce((max, c) => c.votes > max.votes ? c : max, CANDIDATES[0]);

  const Wrap = isAdmin ? AdminLayout : ({ children }) => <div>{children}</div>;

  return (
    <Wrap active="results" navigate={navigate}>
      <div className="page">
        {!isAdmin && (
          <nav style={{ background: "var(--navy)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo dark size="sm" />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("landing")} className="btn btn-ghost btn-sm" style={{ color: "rgba(255,255,255,0.7)", background: "transparent", border: "none" }}>← Home</button>
              <button onClick={() => navigate("blockchain")} className="btn btn-outline btn-sm">Blockchain Logs</button>
            </div>
          </nav>
        )}
        <div style={{ padding: isAdmin ? 0 : 32 }}>
          <div style={{ marginBottom: 28 }}>
            <h1 className="section-title">Election Results</h1>
            <p className="section-sub">BlockVote 2025 General Election — Final Results</p>
          </div>

          {/* Winner banner */}
          <div style={{ background: "linear-gradient(135deg, #0F1E4A, #1E3A8A)", borderRadius: 18, padding: 28, marginBottom: 24, color: "white", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(34,197,94,0.1)" }}/>
            <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "3px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>🏆</div>
              <div>
                <div style={{ fontSize: 13, color: "#22C55E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>🎉 Winner — BlockVote 2025</div>
                <h2 style={{ fontSize: 28, fontWeight: 800 }}>{winner.name}</h2>
                <p style={{ color: "rgba(255,255,255,0.65)", marginTop: 4 }}>{winner.party}</p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: "#22C55E" }}>{winner.votes}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>votes ({((winner.votes / total) * 100).toFixed(1)}%)</div>
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
            {[...CANDIDATES].sort((a, b) => b.votes - a.votes).map((c, i) => (
              <div key={i} className="card" style={{ padding: "20px 24px", border: i === 0 ? `1.5px solid ${c.color}40` : "" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</span>
                        <span style={{ fontSize: 13, color: "var(--text2)", marginLeft: 10 }}>{c.party}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: c.color }}>{c.votes}</span>
                        <span style={{ fontSize: 13, color: "var(--text3)" }}>({((c.votes / total) * 100).toFixed(1)}%)</span>
                        {i === 0 && <span className="badge badge-green">🥇 Winner</span>}
                        {i === 1 && <span className="badge badge-blue">🥈 Runner-up</span>}
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(c.votes / total) * 100}%`, background: `linear-gradient(90deg, ${c.color}, ${c.color}bb)` }}/>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Vote Count Comparison</h3>
              <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>Bar chart — all candidates</p>
              <BarChart data={[...CANDIDATES].sort((a,b) => b.votes-a.votes).map(c => ({ label: c.name.split(" ")[0], value: c.votes, color: c.color }))} />
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Vote Share Distribution</h3>
              <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 16 }}>Pie chart — percentage breakdown</p>
              <DonutChart data={CANDIDATES.map(c => ({ label: c.name.split(" ")[0], value: c.votes, color: c.color }))} />
              <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--surface2)", borderRadius: 10, fontSize: 13, color: "var(--text2)" }}>
                Total votes cast: <strong>{total}</strong> • Turnout: <strong style={{ color: "#22C55E" }}>100%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
};

// ─── VOTER REGISTRATION ───────────────────────────────────────────────────────
const VoterRegister = ({ navigate }) => {
  const [form, setForm] = useState({ name: "", id: "", phone: "", email: "", address: "" });
  const [fpModal, setFpModal] = useState(false);
  const [fpDone, setFpDone] = useState(false);
  const [success, setSuccess] = useState(false);

  if (success) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div className="card" style={{ padding: 48, maxWidth: 460, textAlign: "center" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 24px" }}>✓</div>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#22C55E", marginBottom: 8 }}>Registration Successful!</h2>
        <p style={{ color: "var(--text2)", marginBottom: 8 }}>Your voter registration is complete.</p>
        <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 10, padding: 14, margin: "16px 0 24px" }}>
          <div style={{ fontSize: 13, color: "var(--text2)" }}><strong>Fingerprint Registered Successfully ✓</strong><br/>Biometric template stored securely in the database.</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("landing")}>Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{ background: "var(--navy)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo dark size="sm" />
        <button onClick={() => navigate("landing")} className="btn btn-ghost btn-sm" style={{ color: "rgba(255,255,255,0.7)", background: "transparent", border: "none" }}>← Back to Home</button>
      </nav>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800 }}>Voter Registration</h1>
          <p style={{ color: "var(--text2)", marginTop: 8 }}>Register yourself for the BlockVote 2025 election</p>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 4 }}>
            {[["Full Name","name","text"],["Voter ID","id","text"],["Phone Number","phone","tel"],["Email Address","email","email"]].map(([l,k,t]) => (
              <div key={k} className="form-group" style={{ marginBottom: 4 }}>
                <label className="form-label">{l}</label>
                <input className="form-input" type={t} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} />
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea className="form-input" rows={2} value={form.address} onChange={e => setForm({...form,address:e.target.value})} style={{ resize: "none" }}/>
          </div>

          {/* Fingerprint section */}
          <div style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(34,197,94,0.03))", border: `1.5px dashed ${fpDone ? "#22C55E" : "rgba(37,99,235,0.3)"}`, borderRadius: 14, padding: 24, marginTop: 8, textAlign: "center" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Biometric Fingerprint Registration</h3>
            <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 20 }}>Your fingerprint will be captured using Arduino fingerprint sensor for identity verification during voting.</p>
            {fpDone ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", color: "#22C55E" }}>
                <FingerprintSvg size={40} color="#22C55E" />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700 }}>Fingerprint Registered Successfully ✓</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>Biometric template stored</div>
                </div>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={() => setFpModal(true)}>
                <FingerprintSvg size={16} color="white"/> Scan Fingerprint
              </button>
            )}
          </div>

          <button className="btn btn-success" style={{ width: "100%", justifyContent: "center", padding: 14, marginTop: 24 }} onClick={() => fpDone && setSuccess(true)}>
            {fpDone ? "Complete Registration →" : "Complete Fingerprint Scan to Continue"}
          </button>
        </div>
      </div>

      {fpModal && <FingerprintModal title="Register Your Fingerprint" onClose={() => setFpModal(false)} onSuccess={() => setFpDone(true)} />}
    </div>
  );
};

// ─── VOTER BOOTH ──────────────────────────────────────────────────────────────
const VoterBooth = ({ navigate }) => {
  const [step, setStep] = useState("search"); // search, verify, vote, done
  const [voterId, setVoterId] = useState("");
  const [voter, setVoter] = useState(null);
  const [fpModal, setFpModal] = useState(false);
  const [fpResult, setFpResult] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [error, setError] = useState("");

  const searchVoter = () => {
    const found = VOTERS.find(v => v.id === voterId.toUpperCase());
    if (!found) { setError("Voter ID not found in database."); return; }
    setVoter(found); setError(""); setStep("verify");
  };

  const castVote = () => {
    setConfirmModal(false);
    setStep("done");
  };

  if (step === "done") return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div className="card" style={{ padding: 56, maxWidth: 500, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🗳️</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#22C55E", marginBottom: 8 }}>Vote Recorded Successfully!</h2>
        <p style={{ color: "var(--text2)", marginBottom: 20 }}>Your vote has been encrypted and stored on the blockchain.</p>
        <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 12, padding: 18, marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: "var(--text2)" }}>
            <div>Voter: <strong>{voter?.name}</strong></div>
            <div style={{ marginTop: 4 }}>Candidate: <strong>{selectedCandidate?.name}</strong></div>
            <div style={{ marginTop: 4 }}>Status: <strong style={{ color: "#22C55E" }}>Voted ✓</strong></div>
            <div style={{ marginTop: 4, fontFamily: "monospace", fontSize: 11, color: "var(--text3)" }}>Block Hash: E1F2A3B4...{Math.random().toString(16).substr(2,6).toUpperCase()}</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => { setStep("search"); setVoterId(""); setVoter(null); setFpResult(null); setSelectedCandidate(null); }}>Next Voter</button>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{ background: "var(--navy)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo dark size="sm" />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 14 }}>Voting Booth Terminal</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 20, padding: "4px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", animation: "pulse 1.5s infinite" }}/>
            <span style={{ fontSize: 12, color: "#22C55E", fontWeight: 700 }}>Election Open</span>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 40 }}>
          {[["Search Voter", "search"],["Verify Identity", "verify"],["Cast Vote", "vote"]].map(([label, s], i) => {
            const steps = ["search","verify","vote"];
            const idx = steps.indexOf(step);
            const thisIdx = steps.indexOf(s);
            const done = idx > thisIdx;
            const active = idx === thisIdx;
            return (
              <div key={s} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: done ? "#22C55E" : active ? "var(--blue-mid)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: done || active ? "white" : "var(--text3)", fontWeight: 700, fontSize: 14 }}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--text)" : "var(--text3)", whiteSpace: "nowrap" }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: 80, height: 2, background: done ? "#22C55E" : "var(--border)", marginBottom: 22, marginInline: 8 }}/>}
              </div>
            );
          })}
        </div>

        {/* Step 1: Search */}
        {step === "search" && (
          <div className="card" style={{ padding: 36, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Search Voter</h2>
            <p style={{ color: "var(--text2)", marginBottom: 28 }}>Enter the Voter ID to begin the verification process</p>
            <div style={{ maxWidth: 320, margin: "0 auto" }}>
              <input className="form-input" placeholder="Enter Voter ID (e.g. VT001)" value={voterId} onChange={e => setVoterId(e.target.value)} onKeyDown={e => e.key === "Enter" && searchVoter()} style={{ textAlign: "center", fontSize: 16, marginBottom: 14 }} />
              {error && <div style={{ color: "var(--red)", fontSize: 13, marginBottom: 12 }}>⚠ {error}</div>}
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={searchVoter}>Search Voter</button>
              <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 12 }}>Try: VT001, VT002, VT003</p>
            </div>
          </div>
        )}

        {/* Step 2: Verify */}
        {step === "verify" && voter && (
          <div className="card" style={{ padding: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Voter Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 24, background: "var(--surface2)", borderRadius: 14, border: "1px solid var(--border)", marginBottom: 24 }}>
              {[["Voter ID", voter.id],["Full Name", voter.name],["Constituency", voter.area],["Age", voter.age],["Phone", voter.phone],["Voting Status", voter.status]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{l}</div>
                  <div style={{ fontSize: 15, fontWeight: l === "Voting Status" ? 700 : 500, color: l === "Voting Status" ? (v === "Voted" ? "#F59E0B" : "#22C55E") : "var(--text)" }}>
                    {l === "Voting Status" ? (v === "Voted" ? "⚠ Already Voted" : "✓ Not Yet Voted") : v}
                  </div>
                </div>
              ))}
            </div>

            {voter.status === "Voted" ? (
              <div style={{ background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.25)", borderRadius: 14, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🚫</div>
                <h3 style={{ fontWeight: 700, color: "var(--red)", marginBottom: 4 }}>Duplicate Voting Not Allowed</h3>
                <p style={{ fontSize: 14, color: "var(--text2)" }}>This voter has already cast their vote in this election.</p>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 14 }} onClick={() => { setStep("search"); setVoterId(""); setVoter(null); }}>Search Another Voter</button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Step 2: Fingerprint Verification</h3>
                <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 20 }}>Voter must place their registered finger on the Arduino sensor to authenticate</p>
                {fpResult === "success" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                    <FingerprintSvg size={44} color="#22C55E" />
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: 700, color: "#22C55E", fontSize: 16 }}>Authentication Successful ✓</div>
                      <div style={{ fontSize: 13, color: "var(--text2)" }}>Identity verified • Proceeding to voting</div>
                    </div>
                  </div>
                ) : fpResult === "failed" ? (
                  <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: 20, marginBottom: 20 }}>
                    <p style={{ fontWeight: 700, color: "var(--red)" }}>Fingerprint Not Matched ✗</p>
                    <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 4 }}>Identity could not be verified. Please try again.</p>
                  </div>
                ) : null}
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                  <button className="btn btn-primary" onClick={() => setFpModal(true)}>
                    <FingerprintSvg size={16} color="white"/> Scan Fingerprint
                  </button>
                  {fpResult === "success" && (
                    <button className="btn btn-success" onClick={() => setStep("vote")}>Proceed to Vote →</button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Vote */}
        {step === "vote" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800 }}>Cast Your Vote</h2>
              <p style={{ color: "var(--text2)", marginTop: 4 }}>Select one candidate — your vote is final and cannot be changed</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {CANDIDATES.map((c, i) => (
                <div key={i} className="card" style={{ padding: 28, cursor: "pointer", border: selectedCandidate?.id === c.id ? `2px solid ${c.color}` : "1px solid var(--border)", transition: "all 0.2s", transform: selectedCandidate?.id === c.id ? "scale(1.01)" : "scale(1)" }}
                  onClick={() => setSelectedCandidate(c)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: `${c.color}15`, border: `2px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{c.emoji}</div>
                    {selectedCandidate?.id === c.id && <div style={{ width: 24, height: 24, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 13, fontWeight: 700 }}>✓</div>}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{c.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 3 }}>{c.party}</p>
                  <div style={{ marginTop: 16, padding: "8px 0 0", borderTop: "1px solid var(--border)" }}>
                    <button className="btn btn-sm" style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}40`, width: "100%", justifyContent: "center", fontWeight: 700 }} onClick={e => { e.stopPropagation(); setSelectedCandidate(c); setConfirmModal(true); }}>
                      Vote for {c.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {fpModal && (
        <FingerprintModal title="Verify Voter Identity" onClose={() => setFpModal(false)} onSuccess={() => setFpResult("success")} />
      )}

      {confirmModal && selectedCandidate && (
        <div className="modal-overlay" onClick={() => setConfirmModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🗳️</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Confirm Your Vote</h3>
            <p style={{ color: "var(--text2)", marginBottom: 20 }}>Are you sure you want to vote for</p>
            <div style={{ background: "var(--surface2)", borderRadius: 14, padding: 20, border: "1px solid var(--border)", marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{selectedCandidate.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedCandidate.name}</div>
              <div style={{ color: "var(--text2)", fontSize: 14, marginTop: 4 }}>{selectedCandidate.party}</div>
            </div>
            <p style={{ fontSize: 13, color: "var(--red)", marginBottom: 20 }}>⚠ This action cannot be undone. Your vote is final.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn btn-success" style={{ flex: 1, justifyContent: "center" }} onClick={castVote}>✓ Confirm Vote</button>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirmModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP ROUTER
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "landing":         return <LandingPage navigate={navigate} />;
      case "admin-login":     return <AdminLogin navigate={navigate} />;
      case "dashboard":       return <Dashboard navigate={navigate} />;
      case "voters":          return <ManageVoters navigate={navigate} />;
      case "candidates":      return <ManageCandidates navigate={navigate} />;
      case "election-control":return <ElectionControl navigate={navigate} />;
      case "blockchain":      return <BlockchainLogs navigate={navigate} isAdmin={false} />;
      case "results":         return <ResultsPage navigate={navigate} isAdmin={false} />;
      case "voter-register":  return <VoterRegister navigate={navigate} />;
      case "voter-booth":     return <VoterBooth navigate={navigate} />;
      default:                return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {renderPage()}
    </>
  );
}
