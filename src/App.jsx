import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// RESPONSIVE HOOK
// ═══════════════════════════════════════════════════════════════════════════════
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

// ═══════════════════════════════════════════════════════════════════════════════
// ABA DIGITAL MARKETPLACE - GOVERNMENT PRESENTATION DEMO
// Updated with research-backed statistics from comprehensive market analysis
// ═══════════════════════════════════════════════════════════════════════════════

// ENTERPRISE COLOR SCHEME - Navy + Gold + White
const NAVY = '#002868';
const GOLD = '#C9A227';
const LIGHT_NAVY = '#E8EDF5';
const SUCCESS = '#28a745';
const WHITE = '#ffffff';
const DANGER = '#dc3545';

// ═══════════════════════════════════════════════════════════════════════════════
// REAL STATISTICS FROM RESEARCH (Sources: Wikipedia, Techpoint, ICIR, ThisDay)
// ═══════════════════════════════════════════════════════════════════════════════
const STATS = {
  // Market Scale
  ariariaShops: 37000,
  annualTradeVolume: 144000000000, // ₦144 billion
  shoemakers: 110000,
  garmentMakers: 50000,
  marketAge: 47, // years (established 1970s)

  // Power Crisis
  shopsWithoutPower: 32000,
  monthlyGeneratorCost: 8000, // per trader
  annualGeneratorSpend: 1000000000, // ₦1 billion collectively
  powerlineArtisans: 70000,

  // State Economy
  abiaPopulation: 4000000,
  literacyRate: 90,
  abiaIGR2018: 15000000000, // ₦15 billion
  oilGDPShare: 39,
  manufacturingGDPShare: 2,
  agricultureGDPShare: 27,
  economicRanking: 35, // out of 37 states

  // Government Project
  phase2Sections: 14,
  newShopBlockCapacity: 480,
  dailyWasteTruckloads: 270,

  // International
  armyBootsOrdered: 50000,
  internationalBuyers: ['Cameroon', 'Ghana', 'Gabon', 'South Africa', 'Zambia', 'Europe'],
};

// Animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

// Format currency
const fmt = (n) => `₦${n.toLocaleString()}`;
const fmtB = (n) => `₦${(n / 1000000000).toFixed(0)}B`;
const fmtM = (n) => `₦${(n / 1000000).toFixed(0)}M`;

// AI Feature Configurations
const AI_LANGUAGES = {
  igbo: { name: 'Igbo', greeting: 'Nnọọ', thanks: 'Daalụ', flag: '🟢' },
  yoruba: { name: 'Yoruba', greeting: 'Ẹ káàbọ̀', thanks: 'Ẹ ṣeun', flag: '🟡' },
  hausa: { name: 'Hausa', greeting: 'Sannu', thanks: 'Na gode', flag: '🔴' },
  pidgin: { name: 'Pidgin', greeting: 'How far', thanks: 'Thank you o', flag: '🔵' },
  english: { name: 'English', greeting: 'Welcome', thanks: 'Thank you', flag: '⚪' },
};

// Sample data for demo
const traders = [
  { id: 1, name: "Okechukwu Footwear", market: "Ariaria", rating: 4.8, reviews: 156, orders: 523, verified: true, madeInAba: true, initials: "OF" },
  { id: 2, name: "Mama Ada Shoes", market: "Ariaria", rating: 4.5, reviews: 89, orders: 312, verified: true, madeInAba: true, initials: "MA" },
  { id: 3, name: "Chisom Leather Works", market: "Cemetery", rating: 4.9, reviews: 234, orders: 687, verified: true, madeInAba: true, initials: "CL" },
];

const products = [
  { id: 1, name: "Men's Leather Loafers", price: 12500, category: "Footwear", seller: traders[0], rating: 5, madeInAba: true, color: "#8B4513", icon: "👞" },
  { id: 2, name: "Ladies Sandals", price: 4500, category: "Footwear", seller: traders[1], rating: 4, madeInAba: true, color: "#D2691E", icon: "👡" },
  { id: 3, name: "Executive Bag", price: 25000, category: "Bags", seller: traders[2], rating: 5, madeInAba: true, color: "#654321", icon: "💼" },
  { id: 4, name: "Oxford Shoes", price: 18000, category: "Footwear", seller: traders[0], rating: 5, madeInAba: true, color: "#2F2F2F", icon: "👔" },
  { id: 5, name: "Ladies Handbag", price: 15000, category: "Bags", seller: traders[2], rating: 5, madeInAba: true, color: "#8B0000", icon: "👜" },
  { id: 6, name: "Palm Slippers", price: 2500, category: "Footwear", seller: traders[0], rating: 4, madeInAba: true, color: "#228B22", icon: "🩴" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const Badge = ({ children, gold, success, danger, green }) => (
  <span style={{
    display: 'inline-block',
    padding: '4px 10px',
    fontSize: 11,
    fontWeight: 'bold',
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: danger ? DANGER : success ? SUCCESS : gold ? GOLD : green ? '#006400' : NAVY,
    color: WHITE
  }}>{children}</span>
);

// Made in Aba Premium Badge
const MadeInAbaBadge = ({ size = 'small' }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: size === 'large' ? '8px 16px' : '4px 10px',
    background: 'linear-gradient(135deg, #006400 0%, #228B22 100%)',
    borderRadius: size === 'large' ? 8 : 4,
    color: WHITE,
    fontSize: size === 'large' ? 14 : 11,
    fontWeight: 'bold',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  }}>
    <span>🇳🇬</span>
    <span>Made in Aba</span>
  </div>
);

const Btn = ({ children, onClick, primary, small, disabled, full }) => (
  <button onClick={onClick} disabled={disabled} style={{
    padding: small ? '10px 20px' : '14px 32px',
    backgroundColor: primary ? GOLD : WHITE,
    color: primary ? WHITE : NAVY,
    border: `2px solid ${primary ? GOLD : NAVY}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: small ? 13 : 16,
    fontWeight: 'bold',
    borderRadius: 6,
    opacity: disabled ? 0.5 : 1,
    width: full ? '100%' : 'auto',
    transition: 'all 0.2s'
  }}>{children}</button>
);

const Card = ({ children, style }) => (
  <div style={{
    border: '1px solid #e0e0e0',
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    ...style
  }}>{children}</div>
);

const Stat = ({ value, label, sub, large }) => (
  <Card style={{ textAlign: 'center', flex: 1 }}>
    <div style={{ fontSize: large ? 36 : 28, fontWeight: 'bold', color: NAVY }}>{value}</div>
    <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 12, color: SUCCESS, fontWeight: 'bold', marginTop: 4 }}>{sub}</div>}
  </Card>
);

const ProductImg = ({ product, size = 100 }) => {
  const gradients = {
    '👞': 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
    '👡': 'linear-gradient(135deg, #DEB887 0%, #F4A460 100%)',
    '💼': 'linear-gradient(135deg, #654321 0%, #8B7355 100%)',
    '👔': 'linear-gradient(135deg, #2F2F2F 0%, #4a4a4a 100%)',
    '👜': 'linear-gradient(135deg, #8B0000 0%, #CD5C5C 100%)',
    '🩴': 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
  };
  return (
    <div style={{
      width: size, height: size,
      background: gradients[product.icon] || product.color,
      borderRadius: 12,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ fontSize: size * 0.45, marginBottom: 2 }}>{product.icon}</div>
      <div style={{ fontSize: size * 0.11, textAlign: 'center', padding: '2px 8px', color: WHITE, fontWeight: 'bold', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
        {product.name.split(' ').slice(0, 2).join(' ')}
      </div>
    </div>
  );
};

const CatIcon = ({ name, size = 60 }) => {
  const cats = { Footwear: { color: '#8B4513', letter: '👞' }, Bags: { color: '#654321', letter: '👜' }, Fashion: { color: '#4A4A4A', letter: '👔' }, Leather: { color: '#5D4037', letter: '🧥' } };
  const cat = cats[name] || cats.Footwear;
  return (
    <div style={{ width: size, height: size, backgroundColor: cat.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.5, margin: '0 auto', border: `3px solid ${GOLD}`, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>{cat.letter}</div>
  );
};

const GovPhoto = ({ size = 100 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    border: `4px solid ${GOLD}`,
    backgroundColor: NAVY,
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    overflow: 'hidden'
  }}>
    <img
      src="/images/governor-otti.jpg"
      alt="Gov. Alex Otti, OFR - Executive Governor of Abia State"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 15%'
      }}
    />
  </div>
);

const TrustBadges = () => (
  <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', padding: '16px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', margin: '20px 0' }}>
    {[{ icon: '🔒', text: '256-bit SSL' }, { icon: '🛡️', text: 'NDPR Compliant' }, { icon: '🏦', text: 'Bank-Level Security' }, { icon: '✓', text: 'NITDA Aligned' }].map((b, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#666' }}><span>{b.icon}</span><span>{b.text}</span></div>
    ))}
  </div>
);

const LiveIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: SUCCESS }}>
    <div style={{ width: 8, height: 8, backgroundColor: SUCCESS, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
    <span>Demo Mode</span>
  </div>
);

const SourceTag = ({ source }) => (
  <span style={{ fontSize: 10, color: '#999', fontStyle: 'italic' }}> — Source: {source}</span>
);

// AI Chat Bubble Component
const ChatBubble = ({ message, isUser, language, time }) => (
  <div style={{
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: 12
  }}>
    <div style={{
      maxWidth: '75%',
      padding: '12px 16px',
      borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      backgroundColor: isUser ? '#DCF8C6' : WHITE,
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {!isUser && language && (
        <div style={{ fontSize: 10, color: GOLD, fontWeight: 'bold', marginBottom: 4 }}>
          {AI_LANGUAGES[language]?.flag} AI Assistant • {AI_LANGUAGES[language]?.name}
        </div>
      )}
      <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>{message}</div>
      <div style={{ fontSize: 10, color: '#999', marginTop: 4, textAlign: 'right' }}>{time}</div>
    </div>
  </div>
);

// Voice Wave Animation Component
const VoiceWave = ({ active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 24 }}>
    {[...Array(5)].map((_, i) => (
      <div key={i} style={{
        width: 4,
        backgroundColor: active ? SUCCESS : '#ccc',
        borderRadius: 2,
        height: active ? `${12 + Math.sin(i * 0.8) * 8}px` : 8,
        animation: active ? `wave 0.5s ease-in-out ${i * 0.1}s infinite alternate` : 'none',
        transition: 'height 0.2s'
      }} />
    ))}
    <style>{`@keyframes wave { from { height: 8px; } to { height: 20px; } }`}</style>
  </div>
);

// Language Selector Component
const LanguageSelector = ({ selected, onChange }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
    {Object.entries(AI_LANGUAGES).map(([key, lang]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        style={{
          padding: '8px 16px',
          borderRadius: 20,
          border: selected === key ? `2px solid ${NAVY}` : '2px solid #ddd',
          backgroundColor: selected === key ? LIGHT_NAVY : WHITE,
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: selected === key ? 'bold' : 'normal',
          color: NAVY,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        {lang.flag} {lang.name}
      </button>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

const Nav = ({ screen, setScreen, cart, isMobile }) => (
  <div style={{ backgroundColor: NAVY, padding: '0', color: WHITE }}>
    {/* State Banner Strip */}
    <div style={{
      background: 'linear-gradient(90deg, #006400 0%, #228B22 100%)',
      padding: isMobile ? '4px 12px' : '6px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: isMobile ? 9 : 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 8 }}>
        <span>🦁</span>
        <span style={{ fontWeight: 'bold' }}>ABIA STATE{!isMobile && ' GOVERNMENT'}</span>
        {!isMobile && <span style={{ opacity: 0.8 }}>• God's Own State</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>🇳🇬{!isMobile && ' Nigeria'}</span>
      </div>
    </div>

    {/* Main Navigation */}
    <div style={{ padding: isMobile ? '8px 12px' : '12px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? 8 : 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 16, cursor: 'pointer' }} onClick={() => setScreen('research')}>
          {/* Mini Governor Photo in Nav */}
          <div style={{
            width: isMobile ? 36 : 44,
            height: isMobile ? 36 : 44,
            borderRadius: '50%',
            border: `2px solid ${GOLD}`,
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img
              src="/images/governor-otti.jpg"
              alt="Gov. Otti"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: isMobile ? 14 : 18 }}>ABA {isMobile ? 'MARKETPLACE' : 'DIGITAL MARKETPLACE'}</div>
            {!isMobile && <div style={{ fontSize: 10, opacity: 0.8 }}>An Initiative of His Excellency Dr. Alex Otti, OFR</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: isMobile ? 8 : 12, alignItems: 'center' }}>
          {!isMobile && <LiveIndicator />}
          {cart.length > 0 && (
            <button onClick={() => setScreen('checkout')} style={{ backgroundColor: GOLD, color: WHITE, border: 'none', padding: isMobile ? '6px 10px' : '8px 16px', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? 11 : 14 }}>Cart ({cart.length})</button>
          )}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: isMobile ? 4 : 8, padding: isMobile ? '10px 8px' : '12px 24px', fontSize: isMobile ? 10 : 11, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: isMobile ? 'center' : 'flex-start' }}>
      {[
        ['research', '🏛️', 'Overview', 'Intro'],
        ['why-aba', '📍', 'Why Aba', 'Why'],
        ['quick-wins', '🎯', 'Quick Wins', 'Wins'],
        ['pilot', '💰', 'Pilot Ask', 'Pilot'],
        ['operating', '♻️', 'Sustainability', 'Model'],
        ['next-steps', '➡️', 'Next Steps', 'Next'],
        ['ai-platform', '🤖', 'AI Platform', 'AI'],
        ['onboarding', '📝', 'Seller Signup', 'Signup'],
        ['home', '🏠', 'Home', 'Home'],
        ['listings', '📦', 'Products', 'Shop'],
        ['seller', '👤', 'Sellers', 'Seller'],
        ['dashboard', '📊', 'Dashboard', 'Stats'],
        ['memory', '📜', 'Legacy', 'Legacy']
      ].map(([id, icon, label, shortLabel]) => (
        <span
          key={id}
          onClick={() => setScreen(id)}
          style={{
            cursor: 'pointer',
            backgroundColor: screen === id ? GOLD : 'rgba(255,255,255,0.1)',
            color: screen === id ? NAVY : WHITE,
            padding: isMobile ? '6px 8px' : '8px 14px',
            borderRadius: isMobile ? 12 : 20,
            fontWeight: screen === id ? 'bold' : 'normal',
            transition: 'all 0.2s ease',
            border: screen === id ? 'none' : '1px solid rgba(255,255,255,0.2)',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: isMobile ? 2 : 6,
            fontSize: isMobile ? 8 : 11,
            minWidth: isMobile ? 44 : 'auto'
          }}
        >
          <span style={{ fontSize: isMobile ? 14 : 13 }}>{icon}</span>
          <span>{isMobile ? shortLabel : label}</span>
        </span>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 0: RESEARCH FOUNDATION (NEW - Shows homework)
// ═══════════════════════════════════════════════════════════════════════════════

// Abia State Coat of Arms Component
const AbiaCoatOfArms = ({ size = 60 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #006400 0%, #228B22 100%)',
    border: `3px solid ${GOLD}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  }}>
    <div style={{ textAlign: 'center', color: WHITE }}>
      <div style={{ fontSize: size * 0.35, fontWeight: 'bold' }}>🦁</div>
      <div style={{ fontSize: size * 0.12, fontWeight: 'bold', marginTop: -4 }}>ABIA</div>
    </div>
  </div>
);

const ResearchScreen = ({ setScreen }) => (
  <div>
    {/* Executive Header with Governor */}
    <Card style={{
      padding: 0,
      marginBottom: 24,
      overflow: 'hidden',
      border: `3px solid ${GOLD}`,
      background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`
    }}>
      {/* State Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #006400 0%, #228B22 50%, #006400 100%)',
        padding: '8px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <AbiaCoatOfArms size={36} />
          <div style={{ color: WHITE }}>
            <div style={{ fontSize: 11, fontWeight: 'bold', letterSpacing: 1 }}>ABIA STATE GOVERNMENT</div>
            <div style={{ fontSize: 9, opacity: 0.9 }}>God's Own State</div>
          </div>
        </div>
        <div style={{ color: GOLD, fontSize: 10, fontWeight: 'bold' }}>
          🇳🇬 FEDERAL REPUBLIC OF NIGERIA
        </div>
      </div>

      {/* Main Executive Section */}
      <div style={{ padding: 32, color: WHITE }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Governor Photo - PROMINENT */}
          <div style={{ textAlign: 'center' }}>
            <GovPhoto size={140} />
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 10, opacity: 0.8 }}>HIS EXCELLENCY</div>
              <div style={{ fontSize: 14, fontWeight: 'bold' }}>DR. ALEX CHIOMA OTTI, OFR</div>
              <div style={{ fontSize: 11, color: GOLD }}>Executive Governor, Abia State</div>
            </div>
          </div>

          {/* Vision Statement */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ fontSize: 12, color: GOLD, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>
              THE GOVERNOR'S DIGITAL ECONOMY VISION
            </div>
            <div style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 1.4, marginBottom: 16 }}>
              "Transforming Aba into Africa's Premier Manufacturing & E-Commerce Hub"
            </div>
            <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.6, marginBottom: 20 }}>
              A proposal to digitize Aba's ₦144 billion marketplace — creating Nigeria's first
              AI-powered, government-backed trading platform that speaks Igbo, Yoruba, Hausa, and Pidgin.
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Badge gold>🏛️ GADA Initiative</Badge>
              <Badge success>🤖 AI-Powered</Badge>
              <Badge>🇳🇬 Made in Abia</Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: 24,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.2)',
          flexWrap: 'wrap',
          gap: 16
        }}>
          {[
            { value: STATS.ariariaShops.toLocaleString(), label: 'Shops in Ariaria' },
            { value: fmtB(STATS.annualTradeVolume), label: 'Annual Trade' },
            { value: '160,000+', label: 'Artisans' },
            { value: '90%+', label: 'Literacy Rate' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: GOLD }}>{item.value}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>

    {/* Igbo Proverb */}
    <div style={{
      background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`,
      color: WHITE,
      padding: 20,
      borderRadius: 12,
      textAlign: 'center',
      marginBottom: 24,
      border: `2px solid ${GOLD}`
    }}>
      <div style={{ fontSize: 22, fontStyle: 'italic', marginBottom: 8 }}>"Igwe bụ ike"</div>
      <div style={{ fontSize: 14, opacity: 0.9 }}>Unity is strength — When we digitize together, Aba becomes unstoppable</div>
    </div>

    {/* Research Foundation Header */}
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2 }}>EVIDENCE-BASED PROPOSAL</div>
      <div style={{ fontSize: 24, fontWeight: 'bold', color: NAVY, marginTop: 8 }}>Research Foundation</div>
      <div style={{ fontSize: 14, color: '#666' }}>This proposal is grounded in comprehensive research on Abia State and the Aba marketplace.</div>
    </div>

    {/* Key Research Stats */}
    <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>KEY RESEARCH FINDINGS</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      {[
        { stat: STATS.ariariaShops.toLocaleString(), label: 'Shops in Ariaria', source: 'Techpoint Africa', icon: '🏪' },
        { stat: fmtB(STATS.annualTradeVolume), label: 'Annual Trade Volume', source: 'Industry Reports', icon: '💰' },
        { stat: STATS.shoemakers.toLocaleString() + '+', label: 'Shoemakers in Aba', source: 'Wikipedia/ICIR', icon: '👞' },
        { stat: STATS.garmentMakers.toLocaleString() + '+', label: 'Garment Makers', source: 'Wikipedia', icon: '👔' },
      ].map((item, i) => (
        <Card key={i} style={{ textAlign: 'center', padding: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY }}>{item.stat}</div>
          <div style={{ fontSize: 13, color: GOLD, fontWeight: 'bold' }}>{item.label}</div>
          <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>{item.source}</div>
        </Card>
      ))}
    </div>

    {/* The Problem - with real data */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${DANGER}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>THE POWER CRISIS (Research-Backed)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 16 }}>
        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#fff5f5', borderRadius: 8 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: DANGER }}>{STATS.shopsWithoutPower.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: '#666' }}>of {STATS.ariariaShops.toLocaleString()} shops had NO POWER</div>
          <div style={{ fontSize: 11, color: '#999' }}>After failed 2019 federal solar project</div>
        </div>
        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#fff5f5', borderRadius: 8 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: DANGER }}>{fmtB(STATS.annualGeneratorSpend)}</div>
          <div style={{ fontSize: 13, color: '#666' }}>Spent on generators YEARLY</div>
          <div style={{ fontSize: 11, color: '#999' }}>₦8,000/month per trader × 70,000 artisans</div>
        </div>
        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#fff5f5', borderRadius: 8 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: DANGER }}>35th</div>
          <div style={{ fontSize: 13, color: '#666' }}>of 37 states in economic growth</div>
          <div style={{ fontSize: 11, color: '#999' }}>2020 ranking — room for improvement</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#666', textAlign: 'center' }}>Source: ICIR Nigeria investigative report on Ariaria Market power project</div>
    </Card>

    {/* International Recognition */}
    <Card style={{ marginBottom: 24, padding: 24, backgroundColor: LIGHT_NAVY }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>INTERNATIONAL RECOGNITION</div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: GOLD, marginBottom: 8 }}>"The China of Africa"</div>
          <div style={{ fontSize: 14, color: '#444', marginBottom: 12 }}>Ariaria is called this due to its scale and variety of locally manufactured goods.</div>
          <div style={{ fontSize: 13, color: '#666' }}>
            <strong>International buyers from:</strong> {STATS.internationalBuyers.join(', ')}
          </div>
        </div>
        <div style={{ padding: 20, backgroundColor: NAVY, color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>{STATS.armyBootsOrdered.toLocaleString()}</div>
          <div style={{ fontSize: 12 }}>Pairs of boots ordered by</div>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>Nigerian Army</div>
          <div style={{ fontSize: 10, opacity: 0.8 }}>Made-in-Nigeria validation</div>
        </div>
      </div>
    </Card>

    {/* Government Momentum */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${SUCCESS}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>GOVERNMENT MOMENTUM (Current)</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {[
          { title: 'Phase II A-Line Flagged Off', detail: 'October 2025 — Governor Otti personally launched', status: 'ACTIVE' },
          { title: '14 Market Sections', detail: 'Approved for redevelopment (July 2025)', status: 'APPROVED' },
          { title: '480-Shop Modern Blocks', detail: 'With elevators, fire alarms, electronic doors', status: 'BUILDING' },
          { title: 'Aba IPP (Power Plant)', detail: 'Geometric Power — dedicated power for Aba', status: 'ONLINE' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, backgroundColor: WHITE, borderRadius: 8, border: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{item.title}</div>
              <Badge success>{item.status}</Badge>
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>{item.detail}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 16 }}>Source: People of Abia, ThisDay Live, Official Government Communications</div>
    </Card>

    {/* Research Sources */}
    <Card style={{ marginBottom: 24, padding: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 12 }}>📚 RESEARCH SOURCES CONSULTED</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {[
          'Wikipedia - Abia State',
          'Kingmakers State of States Database',
          'Techpoint Africa - Aba Tech Scene',
          'ICIR Nigeria - Ariaria Power Investigation',
          'ThisDay Live - Ariaria Changing Face',
          'People of Abia - Government Updates',
          'Business Day - Governor Otti Initiatives',
          'SATRA - Nigerian Army Footwear Orders'
        ].map((source, i) => (
          <div key={i} style={{ fontSize: 12, color: '#666', padding: 8, backgroundColor: '#f9f9f9', borderRadius: 4 }}>✓ {source}</div>
        ))}
      </div>
    </Card>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn primary onClick={() => setScreen('why-aba')}>Begin Presentation: Why Aba →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 1: WHY ABA, WHY NOW (Updated with real stats)
// ═══════════════════════════════════════════════════════════════════════════════

const WhyAba = ({ setScreen }) => (
  <div>
    <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE, padding: 40, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>THE OPPORTUNITY</div>
      <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>Aba: Nigeria's Hidden Industrial Giant</div>
      <div style={{ fontSize: 16, opacity: 0.9 }}>{fmtB(STATS.annualTradeVolume)} annual trade. {STATS.ariariaShops.toLocaleString()} shops. Zero digital infrastructure.</div>
    </div>

    {/* The Scale - Real Numbers */}
    <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
      {[
        { stat: STATS.ariariaShops.toLocaleString(), label: 'Shops in Ariaria Alone', desc: "One of the largest markets in West Africa", icon: '🏪', source: 'Techpoint Africa' },
        { stat: STATS.shoemakers.toLocaleString() + '+', label: 'Shoemakers', desc: 'Plus 50,000+ garment makers — massive skilled workforce', icon: '👞', source: 'Wikipedia' },
        { stat: fmtB(STATS.annualTradeVolume), label: 'Annual Trade Volume', desc: 'Economic engine for Southeast Nigeria', icon: '💰', source: 'Industry Reports' }
      ].map((item, i) => (
        <Card key={i} style={{ flex: 1, textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: NAVY }}>{item.stat}</div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: GOLD, margin: '8px 0' }}>{item.label}</div>
          <div style={{ fontSize: 13, color: '#666' }}>{item.desc}</div>
          <div style={{ fontSize: 10, color: '#999', marginTop: 8 }}>Source: {item.source}</div>
        </Card>
      ))}
    </div>

    {/* Igbo Proverb */}
    <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE, padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 20, fontStyle: 'italic' }}>"Ahịa dị mma na-ere onwe ya"</div>
      <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>A good market sells itself — Igbo Proverb</div>
    </div>

    {/* The Gap */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${GOLD}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 12 }}>THE PROBLEM: INVISIBLE ECONOMY</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: DANGER, marginBottom: 8 }}>TODAY: No Digital Infrastructure</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#444', lineHeight: 1.8 }}>
            <li><strong>No trader registry</strong> — government doesn't know who operates</li>
            <li><strong>Cash-only</strong> — no audit trail, no transaction data</li>
            <li><strong>No buyer protection</strong> — trust barriers limit growth</li>
            <li><strong>Revenue leakage</strong> — levy collection is manual, incomplete</li>
            <li><strong>No e-commerce</strong> — buyers must physically visit Aba</li>
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: SUCCESS, marginBottom: 8 }}>TOMORROW: Digital Layer</div>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#444', lineHeight: 1.8 }}>
            <li><strong>NIN-verified registry</strong> — permanent state asset</li>
            <li><strong>Escrow payments</strong> — buyer confidence, records</li>
            <li><strong>Real-time dashboard</strong> — first visibility into activity</li>
            <li><strong>Automated levies</strong> — improved collection</li>
            <li><strong>Online catalog</strong> — reach buyers nationwide</li>
          </ul>
        </div>
      </div>
    </Card>

    {/* The Thesis */}
    <Card style={{ marginBottom: 24, padding: 24, backgroundColor: LIGHT_NAVY, border: `2px solid ${NAVY}` }}>
      <div style={{ fontSize: 20, fontWeight: 'bold', color: NAVY, textAlign: 'center', lineHeight: 1.6 }}>
        "A digital layer turns informal trade into visible economic infrastructure — <br/>
        <span style={{ color: GOLD }}>measurable, taxable, and investable.</span>"
      </div>
    </Card>

    {/* Why Now */}
    <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>WHY NOW — THE WINDOW</div>
    <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      {[
        { title: 'Market Rebuild Active', desc: 'Phase II A-Line just flagged off. New infrastructure = new systems. Traders expect modernization.', timing: 'Oct 2025', source: 'People of Abia' },
        { title: 'GADA Mandate', desc: 'Greater Aba Development Agency provides institutional home for this initiative.', timing: 'Active', source: 'Government' },
        { title: 'First-Mover Advantage', desc: 'No Nigerian state has done this at scale. Abia can lead or follow.', timing: 'Now', source: 'Market Analysis' }
      ].map((item, i) => (
        <Card key={i} style={{ flex: 1, padding: 20 }}>
          <div style={{ fontSize: 12, color: GOLD, fontWeight: 'bold', marginBottom: 4 }}>{item.timing}</div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: '#666' }}>{item.desc}</div>
        </Card>
      ))}
    </div>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn onClick={() => setScreen('research')}>← Research</Btn>
      <span style={{ margin: '0 16px' }} />
      <Btn primary onClick={() => setScreen('quick-wins')}>Next: Quick Wins →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 2: 30/90 DAY QUICK WINS
// ═══════════════════════════════════════════════════════════════════════════════

const QuickWins = ({ setScreen }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2 }}>EXECUTION ROADMAP</div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY, marginTop: 8 }}>Quick Wins: 30 and 90 Days</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Conservative targets. Measurable outcomes. Announcement-ready results.</div>
    </div>

    {/* 30 Day */}
    <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
      <div style={{ backgroundColor: NAVY, color: WHITE, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>30 DAYS</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Foundation & First Traders</div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: GOLD }}>✓</div>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
          {[
            { metric: '500', label: 'Verified Sellers', desc: 'NIN-verified, catalogued' },
            { metric: '2,000+', label: 'Product Listings', desc: 'Photographed, priced, live' },
            { metric: 'A-Line', label: 'Pilot Zone', desc: 'Aligned with Phase II rebuild' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, backgroundColor: LIGHT_NAVY, borderRadius: 8 }}>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: NAVY }}>{item.metric}</div>
              <div style={{ fontSize: 14, fontWeight: 'bold', color: GOLD }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ backgroundColor: '#f0f9f0', border: '2px solid #28a745', borderRadius: 8, padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: SUCCESS }}>📢 ANNOUNCEMENT READY</div>
          <div style={{ fontSize: 16, color: NAVY, marginTop: 4 }}>"Abia launches Nigeria's first verified trader marketplace — 500 Aba artisans now discoverable online."</div>
        </div>
      </div>
    </Card>

    {/* 90 Day */}
    <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
      <div style={{ backgroundColor: GOLD, color: WHITE, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>90 DAYS</div>
            <div style={{ fontSize: 13, opacity: 0.9 }}>Scale & First Revenue</div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 'bold', opacity: 0.8 }}>⚡</div>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
          {[
            { metric: '2,000', label: 'Verified Sellers' },
            { metric: '10,000+', label: 'Product Listings' },
            { metric: '3', label: 'Logistics Partners' },
            { metric: 'LIVE', label: 'Gov Dashboard' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, backgroundColor: LIGHT_NAVY, borderRadius: 8 }}>
              <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY }}>{item.metric}</div>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: GOLD }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ backgroundColor: '#f0f9f0', border: '2px solid #28a745', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: SUCCESS }}>📊 FIRST DASHBOARD</div>
            <div style={{ fontSize: 14, color: '#444', marginTop: 4 }}>Real-time visibility into Aba market activity — traders, products, orders.</div>
          </div>
          <div style={{ backgroundColor: '#fff8e6', border: '2px solid #ffc107', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#856404' }}>💰 FIRST REVENUE</div>
            <div style={{ fontSize: 14, color: '#444', marginTop: 4 }}>Platform fees and registration revenue begin. Proof of sustainability.</div>
          </div>
        </div>
      </div>
    </Card>

    {/* Deliverables */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${NAVY}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>WHAT GOVERNMENT RECEIVES AT 90 DAYS</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {[
          '✓ NIN-verified trader registry (permanent state asset)',
          '✓ Live analytics dashboard (orders, revenue, activity)',
          '✓ Monthly economic activity reports',
          '✓ Catalogued product database with photos',
          '✓ Payment infrastructure (escrow-enabled)',
          '✓ Foundation for scale to all Aba markets'
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 14, color: '#444', padding: 8, backgroundColor: LIGHT_NAVY, borderRadius: 4 }}>{item}</div>
        ))}
      </div>
    </Card>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn onClick={() => setScreen('why-aba')}>← Back</Btn>
      <span style={{ margin: '0 16px' }} />
      <Btn primary onClick={() => setScreen('pilot')}>Next: Pilot Proposal →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 3: PILOT ASK
// ═══════════════════════════════════════════════════════════════════════════════

const PilotAsk = ({ setScreen }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2 }}>THE ASK</div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY, marginTop: 8 }}>90-Day Pilot Proposal</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Limited scope. Low risk. Measurable outcomes.</div>
    </div>

    {/* Pilot Parameters */}
    <Card style={{ marginBottom: 24, padding: 32, backgroundColor: NAVY, color: WHITE, textAlign: 'center' }}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>PILOT PARAMETERS</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap', marginTop: 20 }}>
        <div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: GOLD }}>90</div>
          <div style={{ fontSize: 14 }}>Days Duration</div>
        </div>
        <div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: GOLD }}>1</div>
          <div style={{ fontSize: 14 }}>Market Zone (A-Line)</div>
        </div>
        <div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: GOLD }}>2</div>
          <div style={{ fontSize: 14 }}>Categories</div>
        </div>
      </div>
      <div style={{ marginTop: 24, padding: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'inline-block' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>✓ REVERSIBLE &nbsp;&nbsp; ✓ MEASURABLE &nbsp;&nbsp; ✓ LOW RISK</div>
      </div>
    </Card>

    {/* Scope */}
    <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
      <Card style={{ flex: 1, padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>📍 PILOT LOCATION</div>
        <div style={{ fontSize: 24, fontWeight: 'bold', color: GOLD, marginBottom: 8 }}>Ariaria A-Line</div>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          Aligned with the Phase II reconstruction just flagged off. High trader density, maximum visibility.
        </div>
        <div style={{ marginTop: 16, padding: 12, backgroundColor: LIGHT_NAVY, borderRadius: 8 }}>
          <div style={{ fontSize: 13, color: NAVY }}>Est. traders in zone: <strong>2,000-3,000</strong></div>
          <div style={{ fontSize: 13, color: NAVY }}>Target onboarding: <strong>500-2,000</strong></div>
        </div>
      </Card>
      <Card style={{ flex: 1, padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>📦 PILOT CATEGORIES</div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#8B4513', color: WHITE, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>👞</div>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>Footwear</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>110,000+ makers</div>
          </div>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#654321', color: WHITE, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>👜</div>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>Bags</div>
            <div style={{ fontSize: 11, opacity: 0.9 }}>Leather goods</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          Aba's signature products. High demand, clear "Made in Aba" identity.
        </div>
      </Card>
    </div>

    {/* Budget */}
    <Card style={{ marginBottom: 24, padding: 24, border: `3px solid ${GOLD}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>PILOT INVESTMENT</div>
          <div style={{ fontSize: 14, color: '#666' }}>All-inclusive: platform, onboarding, training, support, reporting</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: NAVY }}>₦35-50M</div>
          <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold' }}>90-day pilot budget</div>
        </div>
      </div>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { item: 'Platform Development', pct: '40%' },
          { item: 'Trader Onboarding', pct: '25%' },
          { item: 'Training & Support', pct: '20%' },
          { item: 'Contingency', pct: '15%' }
        ].map((b, i) => (
          <div key={i} style={{ textAlign: 'center', padding: 12, backgroundColor: LIGHT_NAVY, borderRadius: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY }}>{b.pct}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{b.item}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* Success Criteria */}
    <Card style={{ marginBottom: 24, padding: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>✅ PILOT SUCCESS CRITERIA</div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { metric: '500+', label: 'Traders Onboarded', target: 'Minimum viable registry' },
          { metric: '2,000+', label: 'Products Listed', target: 'Searchable catalog' },
          { metric: '100+', label: 'Transactions', target: 'Payment system works' },
          { metric: 'Live', label: 'Dashboard', target: 'Government visibility' }
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: 16, border: `2px solid ${SUCCESS}`, borderRadius: 8 }}>
            <div style={{ fontSize: 28, fontWeight: 'bold', color: SUCCESS }}>{s.metric}</div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{s.target}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn onClick={() => setScreen('quick-wins')}>← Back</Btn>
      <span style={{ margin: '0 16px' }} />
      <Btn primary onClick={() => setScreen('operating')}>Next: Sustainability →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 4: OPERATING MODEL
// ═══════════════════════════════════════════════════════════════════════════════

const OperatingModel = ({ setScreen }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2 }}>SUSTAINABILITY</div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY, marginTop: 8 }}>Operating Model & Continuity</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>"This platform must work beyond any administration."</div>
    </div>

    {/* Ownership */}
    <Card style={{ marginBottom: 24, padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 20 }}>OWNERSHIP & GOVERNANCE</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, padding: 20, backgroundColor: NAVY, color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏛️</div>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>Abia State Government</div>
          <div style={{ fontSize: 13, color: GOLD, marginTop: 8 }}>OWNER</div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>Full ownership of platform, data, trader registry. Permanent state asset.</div>
        </div>
        <div style={{ flex: 1, padding: 20, backgroundColor: GOLD, color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚙️</div>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>GADA Program Office</div>
          <div style={{ fontSize: 13, opacity: 0.9, marginTop: 8 }}>OPERATOR</div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.8 }}>Small team (3-5) under Greater Aba Development Agency. Day-to-day operations.</div>
        </div>
        <div style={{ flex: 1, padding: 20, backgroundColor: WHITE, border: `2px solid ${NAVY}`, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🤝</div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY }}>Technical Partner</div>
          <div style={{ fontSize: 13, color: GOLD, marginTop: 8 }}>BUILD + HANDOVER</div>
          <div style={{ fontSize: 12, marginTop: 8, color: '#666' }}>Platform development, training, documentation. Full knowledge transfer.</div>
        </div>
      </div>
    </Card>

    {/* Revenue Model */}
    <Card style={{ marginBottom: 24, padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>💰 PATH TO SUSTAINABILITY</div>
      <div style={{ display: 'flex', gap: 20 }}>
        {[
          { source: 'Transaction Levy', rate: '1-1.5%', potential: '₦20-30M/yr', desc: 'On marketplace transactions' },
          { source: 'Registration Fees', rate: '₦2-5K', potential: '₦10-20M/yr', desc: 'Annual trader verification' },
          { source: 'Premium Listings', rate: '₦1-3K/mo', potential: '₦10-15M/yr', desc: 'Featured placement' },
          { source: 'Data Services', rate: 'Variable', potential: '₦5-10M/yr', desc: 'Market reports, analytics' }
        ].map((r, i) => (
          <div key={i} style={{ flex: 1, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{r.source}</div>
            <div style={{ fontSize: 20, color: GOLD, fontWeight: 'bold', margin: '8px 0' }}>{r.potential}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{r.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: 16, backgroundColor: '#f0f9f0', border: '2px solid #28a745', borderRadius: 8, textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: SUCCESS }}>PROJECTED BREAK-EVEN: MONTH 18-24</div>
        <div style={{ fontSize: 13, color: '#444', marginTop: 4 }}>Platform generates enough revenue to cover operating costs</div>
      </div>
    </Card>

    {/* Access for All */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${SUCCESS}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>📱 ACCESS FOR ALL TRADERS</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, padding: 20, backgroundColor: '#25D366', color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💬</div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>WhatsApp</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>Register & order via chat</div>
        </div>
        <div style={{ flex: 1, padding: 20, backgroundColor: '#333', color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📞</div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>USSD</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>*384*ABA# — No internet</div>
        </div>
        <div style={{ flex: 1, padding: 20, backgroundColor: NAVY, color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🧑‍💼</div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>Market Agents</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>In-person 2-min onboarding</div>
        </div>
        <div style={{ flex: 1, padding: 20, backgroundColor: GOLD, color: WHITE, borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🌐</div>
          <div style={{ fontSize: 16, fontWeight: 'bold' }}>Web & Mobile</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>Full-featured apps</div>
        </div>
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: '#666', textAlign: 'center' }}>
        With 90%+ literacy rate in Abia, traders can adopt digital tools quickly.
      </div>
    </Card>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn onClick={() => setScreen('pilot')}>← Back</Btn>
      <span style={{ margin: '0 16px' }} />
      <Btn primary onClick={() => setScreen('next-steps')}>Next: Next Steps →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// SCREEN 5: NEXT STEPS (NEW - Clear CTA)
// ═══════════════════════════════════════════════════════════════════════════════

const NextSteps = ({ setScreen }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 32 }}>
      <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2 }}>THE PATH FORWARD</div>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY, marginTop: 8 }}>Next Steps</div>
      <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>Clear milestones to move from concept to reality.</div>
    </div>

    {/* Timeline */}
    <Card style={{ marginBottom: 24, padding: 32, backgroundColor: NAVY, color: WHITE }}>
      <div style={{ display: 'flex', gap: 0 }}>
        {[
          { step: '1', title: 'Approval', desc: 'Approve pilot scope', timing: 'This Meeting', icon: '✓' },
          { step: '2', title: 'MOU', desc: 'Formalize partnership', timing: 'Week 1-2', icon: '📝' },
          { step: '3', title: 'Kick-Off', desc: 'Team mobilization', timing: 'Week 3', icon: '🚀' },
          { step: '4', title: 'First Traders', desc: '500 traders live', timing: 'Day 30', icon: '👥' },
          { step: '5', title: 'Dashboard', desc: 'Government analytics', timing: 'Day 60', icon: '📊' },
          { step: '6', title: 'Review', desc: 'Assess & decide scale', timing: 'Day 90', icon: '🎯' },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
            {i < 5 && <div style={{ position: 'absolute', top: 20, left: '50%', width: '100%', height: 4, backgroundColor: GOLD }} />}
            <div style={{ width: 44, height: 44, backgroundColor: GOLD, borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, position: 'relative', zIndex: 1 }}>{item.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>{item.title}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{item.desc}</div>
            <div style={{ fontSize: 11, color: GOLD, marginTop: 4 }}>{item.timing}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* Risk Mitigation */}
    <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${SUCCESS}` }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>🛡️ RISK MITIGATION</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {[
          { concern: 'What if it fails?', mitigation: '90-day pilot is reversible. Clear success criteria. No commitment to scale until proven.' },
          { concern: 'How do we track progress?', mitigation: 'Weekly reports. Monthly reviews. Live dashboard access for government.' },
          { concern: 'What about costs?', mitigation: 'Milestone-based payments. Government pays as deliverables arrive.' },
          { concern: 'What happens after pilot?', mitigation: 'Full handover documentation. GADA team trained. Platform is state property.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: 16, backgroundColor: LIGHT_NAVY, borderRadius: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>❓ {item.concern}</div>
            <div style={{ fontSize: 13, color: '#444' }}>✓ {item.mitigation}</div>
          </div>
        ))}
      </div>
    </Card>

    {/* The Ask Summary */}
    <Card style={{ marginBottom: 24, padding: 32, border: `3px solid ${GOLD}`, textAlign: 'center' }}>
      <div style={{ fontSize: 20, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>SUMMARY: THE ASK</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 14, color: '#666' }}>Investment</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: NAVY }}>₦35-50M</div>
        </div>
        <div>
          <div style={{ fontSize: 14, color: '#666' }}>Duration</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: NAVY }}>90 Days</div>
        </div>
        <div>
          <div style={{ fontSize: 14, color: '#666' }}>Scope</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: NAVY }}>A-Line</div>
        </div>
      </div>
      <div style={{ fontSize: 16, color: '#444', marginBottom: 24 }}>
        A low-risk pilot to prove the concept. If successful, scale to all of Ariaria and beyond.
      </div>
      <div style={{ padding: 16, backgroundColor: LIGHT_NAVY, borderRadius: 8, display: 'inline-block' }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>DECISION REQUESTED</div>
        <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Approval to proceed with pilot scope and MOU preparation</div>
      </div>
    </Card>

    {/* Closing Quote */}
    <Card style={{ marginBottom: 24, padding: 24, background: `linear-gradient(135deg, ${LIGHT_NAVY} 0%, ${WHITE} 100%)`, border: `2px solid ${NAVY}` }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <GovPhoto size={100} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, fontStyle: 'italic', lineHeight: 1.6 }}>
            "This platform belongs to Abia State — not to any administration. What we build today, our successors will inherit tomorrow."
          </div>
          <div style={{ fontSize: 13, color: GOLD, fontWeight: 'bold', marginTop: 12 }}>
            A legacy that outlasts any single government.
          </div>
        </div>
      </div>
    </Card>

    <div style={{ textAlign: 'center', marginTop: 32 }}>
      <Btn onClick={() => setScreen('operating')}>← Back</Btn>
      <span style={{ margin: '0 16px' }} />
      <Btn primary onClick={() => setScreen('ai-platform')}>Next: AI Platform →</Btn>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// AI-POWERED PLATFORM SCREENS
// ═══════════════════════════════════════════════════════════════════════════════

const AIPlatform = ({ setScreen }) => {
  const [activeDemo, setActiveDemo] = useState('overview');
  const [selectedLang, setSelectedLang] = useState('igbo');
  const [voiceActive, setVoiceActive] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);

  // Simulated conversation data for different scenarios
  const conversations = {
    trader: {
      igbo: [
        { isUser: true, message: "Achọrọ m itinye akpụkpọ ụkwụ ọhụrụ m", time: "10:30 AM" },
        { isUser: false, message: "Nnọọ! 👋 Achọpụtara m na ị chọrọ itinye ngwaahịa ọhụrụ. Biko zite foto akpụkpọ ụkwụ ahụ, m ga-enyere gị aka.", time: "10:30 AM", language: 'igbo' },
        { isUser: true, message: "[📸 Photo sent]", time: "10:31 AM" },
        { isUser: false, message: "Mara mma! 👞 Ahụrụ m Men's Leather Oxford. Ego ole ka ị ga-eresị ya?", time: "10:31 AM", language: 'igbo' },
        { isUser: true, message: "₦18,000", time: "10:32 AM" },
        { isUser: false, message: "✅ Ngwaahịa gị anọwo na marketplace! \n\n📦 Men's Leather Oxford\n💰 ₦18,000\n🏷️ Made in Aba\n\nNdi mmadu nwere ike ịhụ ya ugbu a.", time: "10:32 AM", language: 'igbo' },
      ],
      english: [
        { isUser: true, message: "I want to list my new shoes", time: "10:30 AM" },
        { isUser: false, message: "Welcome! 👋 I see you want to list a new product. Please send a photo of the shoes, I'll help you create the listing.", time: "10:30 AM", language: 'english' },
        { isUser: true, message: "[📸 Photo sent]", time: "10:31 AM" },
        { isUser: false, message: "Beautiful! 👞 I can see it's a Men's Leather Oxford. What price would you like to set?", time: "10:31 AM", language: 'english' },
        { isUser: true, message: "₦18,000", time: "10:32 AM" },
        { isUser: false, message: "✅ Your product is now live on the marketplace!\n\n📦 Men's Leather Oxford\n💰 ₦18,000\n🏷️ Made in Aba\n\nBuyers can see it now.", time: "10:32 AM", language: 'english' },
      ],
      pidgin: [
        { isUser: true, message: "I wan put my new shoe for sale", time: "10:30 AM" },
        { isUser: false, message: "How far! 👋 I don see say you wan list product. Abeg send photo of the shoe, I go help you.", time: "10:30 AM", language: 'pidgin' },
        { isUser: true, message: "[📸 Photo sent]", time: "10:31 AM" },
        { isUser: false, message: "E fine well well! 👞 Na Men's Leather Oxford I dey see. How much you wan sell am?", time: "10:31 AM", language: 'pidgin' },
        { isUser: true, message: "₦18,000", time: "10:32 AM" },
        { isUser: false, message: "✅ Your product don enter marketplace!\n\n📦 Men's Leather Oxford\n💰 ₦18,000\n🏷️ Made in Aba\n\nCustomer fit see am now.", time: "10:32 AM", language: 'pidgin' },
      ],
      yoruba: [
        { isUser: true, message: "Mo fẹ́ fi bàtà tuntun mi sílẹ̀", time: "10:30 AM" },
        { isUser: false, message: "Ẹ káàbọ̀! 👋 Mo ti rí pé o fẹ́ fi ọjà sílẹ̀. Jọ̀wọ́ fi àwòrán bàtà náà ránṣẹ́.", time: "10:30 AM", language: 'yoruba' },
        { isUser: true, message: "[📸 Àwòrán]", time: "10:31 AM" },
        { isUser: false, message: "Ó dára púpọ̀! 👞 Mo rí pé ó jẹ́ Men's Leather Oxford. Iye wo ni o fẹ́ tà á?", time: "10:31 AM", language: 'yoruba' },
        { isUser: true, message: "₦18,000", time: "10:32 AM" },
        { isUser: false, message: "✅ Ọjà rẹ ti wà lórí marketplace!\n\n📦 Men's Leather Oxford\n💰 ₦18,000\n🏷️ Made in Aba", time: "10:32 AM", language: 'yoruba' },
      ],
      hausa: [
        { isUser: true, message: "Ina so in saka sabon takalmi na", time: "10:30 AM" },
        { isUser: false, message: "Sannu! 👋 Na gani kana son saka kaya. Don Allah aiko hoton takalmin.", time: "10:30 AM", language: 'hausa' },
        { isUser: true, message: "[📸 Hoto]", time: "10:31 AM" },
        { isUser: false, message: "Kyakkyawa! 👞 Ina ganin Men's Leather Oxford ne. Nawa za ka sayar?", time: "10:31 AM", language: 'hausa' },
        { isUser: true, message: "₦18,000", time: "10:32 AM" },
        { isUser: false, message: "✅ Kayan ka yanzu yana kan marketplace!\n\n📦 Men's Leather Oxford\n💰 ₦18,000\n🏷️ Made in Aba", time: "10:32 AM", language: 'hausa' },
      ],
    },
    buyer: {
      igbo: [
        { isUser: true, message: "Achọrọ m akpụkpọ ụkwụ maka agbamakwụkwọ", time: "2:15 PM" },
        { isUser: false, message: "Nnọọ! 👋 Achọpụtara m akpụkpọ ụkwụ maka agbamakwụkwọ. Enwere anyị ọtụtụ nhọrọ mara mma. Ego ole ka ị nwere?", time: "2:15 PM", language: 'igbo' },
        { isUser: true, message: "₦15,000 - ₦25,000", time: "2:16 PM" },
        { isUser: false, message: "Mara mma! Nke a bụ nhọrọ 3 kachasị mma:\n\n👞 Executive Oxford - ₦18,000 ⭐4.9\n👞 Classic Derby - ₦22,000 ⭐4.8\n👞 Wedding Special - ₦24,500 ⭐5.0\n\nỌ bụrụ nke ị chọrọ ịhụ?", time: "2:16 PM", language: 'igbo' },
        { isUser: true, message: "Gosi m Executive Oxford", time: "2:17 PM" },
        { isUser: false, message: "📦 Executive Oxford\n💰 ₦18,000\n⭐ 4.9 (156 reviews)\n📍 Okechukwu Footwear, Ariaria\n✓ NIN Verified Seller\n🏷️ Made in Aba\n\nỊ chọrọ ịzụta ya? M nwere ike inyere gị aka itinye order.", time: "2:17 PM", language: 'igbo' },
      ],
      english: [
        { isUser: true, message: "I need wedding shoes", time: "2:15 PM" },
        { isUser: false, message: "Welcome! 👋 I found wedding shoes for you. We have many beautiful options. What's your budget?", time: "2:15 PM", language: 'english' },
        { isUser: true, message: "₦15,000 - ₦25,000", time: "2:16 PM" },
        { isUser: false, message: "Great! Here are the top 3 options:\n\n👞 Executive Oxford - ₦18,000 ⭐4.9\n👞 Classic Derby - ₦22,000 ⭐4.8\n👞 Wedding Special - ₦24,500 ⭐5.0\n\nWhich one would you like to see?", time: "2:16 PM", language: 'english' },
        { isUser: true, message: "Show me Executive Oxford", time: "2:17 PM" },
        { isUser: false, message: "📦 Executive Oxford\n💰 ₦18,000\n⭐ 4.9 (156 reviews)\n📍 Okechukwu Footwear, Ariaria\n✓ NIN Verified Seller\n🏷️ Made in Aba\n\nWould you like to buy it? I can help you place an order.", time: "2:17 PM", language: 'english' },
      ],
      pidgin: [
        { isUser: true, message: "I need shoe for wedding", time: "2:15 PM" },
        { isUser: false, message: "How far! 👋 I don find wedding shoe for you. How much you get for pocket?", time: "2:15 PM", language: 'pidgin' },
        { isUser: true, message: "₦15,000 - ₦25,000", time: "2:16 PM" },
        { isUser: false, message: "Sharp! See top 3 options wey dey:\n\n👞 Executive Oxford - ₦18,000 ⭐4.9\n👞 Classic Derby - ₦22,000 ⭐4.8\n👞 Wedding Special - ₦24,500 ⭐5.0\n\nWhich one you wan check?", time: "2:16 PM", language: 'pidgin' },
        { isUser: true, message: "Make I see Executive Oxford", time: "2:17 PM" },
        { isUser: false, message: "📦 Executive Oxford\n💰 ₦18,000\n⭐ 4.9 (156 reviews)\n📍 Okechukwu Footwear, Ariaria\n✓ NIN Verified Seller\n🏷️ Made in Aba\n\nYou wan buy am? I fit help you order.", time: "2:17 PM", language: 'pidgin' },
      ],
      yoruba: [
        { isUser: true, message: "Mo nílò bàtà fún ìgbéyàwó", time: "2:15 PM" },
        { isUser: false, message: "Ẹ káàbọ̀! 👋 Mo ti rí bàtà ìgbéyàwó fún ẹ. Owó mélòó ni o ní?", time: "2:15 PM", language: 'yoruba' },
        { isUser: true, message: "₦15,000 - ₦25,000", time: "2:16 PM" },
        { isUser: false, message: "Ó dára! Èyí ni àwọn 3 tí ó dára jùlọ:\n\n👞 Executive Oxford - ₦18,000 ⭐4.9\n👞 Classic Derby - ₦22,000 ⭐4.8\n👞 Wedding Special - ₦24,500 ⭐5.0", time: "2:16 PM", language: 'yoruba' },
      ],
      hausa: [
        { isUser: true, message: "Ina bukatar takalmi na aure", time: "2:15 PM" },
        { isUser: false, message: "Sannu! 👋 Na samu takalmin aure. Nawa kake da shi?", time: "2:15 PM", language: 'hausa' },
        { isUser: true, message: "₦15,000 - ₦25,000", time: "2:16 PM" },
        { isUser: false, message: "Kyau! Ga mafi kyau 3:\n\n👞 Executive Oxford - ₦18,000 ⭐4.9\n👞 Classic Derby - ₦22,000 ⭐4.8\n👞 Wedding Special - ₦24,500 ⭐5.0", time: "2:16 PM", language: 'hausa' },
      ],
    }
  };

  const currentConvo = conversations[activeDemo === 'trader' ? 'trader' : 'buyer'][selectedLang] || conversations[activeDemo === 'trader' ? 'trader' : 'buyer']['english'];

  return (
    <div>
      {/* Hero Section */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE, padding: 40, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 14, color: GOLD, fontWeight: 'bold', letterSpacing: 2, marginBottom: 12 }}>TECHNOLOGY DIFFERENTIATOR</div>
        <div style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 12 }}>🤖 AI-Powered Commerce Platform</div>
        <div style={{ fontSize: 16, opacity: 0.9, maxWidth: 700, margin: '0 auto' }}>
          The first Nigerian marketplace with AI agents that speak Igbo, Yoruba, Hausa, and Pidgin English.
          Traders list products via WhatsApp. Buyers shop conversationally.
        </div>
      </div>

      {/* AI Capabilities Overview */}
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>AI PLATFORM CAPABILITIES</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { icon: '💬', title: 'WhatsApp AI', desc: 'Chat to list or buy products', highlight: true },
          { icon: '🗣️', title: 'Voice AI', desc: 'Speak in your language', highlight: false },
          { icon: '📸', title: 'Image AI', desc: 'Auto-detect products from photos', highlight: false },
          { icon: '🌍', title: '5 Languages', desc: 'Igbo, Yoruba, Hausa, Pidgin, English', highlight: true },
        ].map((cap, i) => (
          <Card key={i} style={{
            textAlign: 'center',
            padding: 20,
            border: cap.highlight ? `3px solid ${GOLD}` : '1px solid #e0e0e0',
            backgroundColor: cap.highlight ? LIGHT_NAVY : WHITE
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{cap.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY }}>{cap.title}</div>
            <div style={{ fontSize: 13, color: '#666' }}>{cap.desc}</div>
          </Card>
        ))}
      </div>

      {/* Demo Section */}
      <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#25D366', color: WHITE, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>💬 WhatsApp AI Demo</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>See how AI assists traders and buyers in their preferred language</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setActiveDemo('trader')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: activeDemo === 'trader' ? WHITE : 'rgba(255,255,255,0.2)',
                  color: activeDemo === 'trader' ? '#25D366' : WHITE,
                  border: 'none',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                👨‍💼 Trader View
              </button>
              <button
                onClick={() => setActiveDemo('buyer')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: activeDemo === 'buyer' ? WHITE : 'rgba(255,255,255,0.2)',
                  color: activeDemo === 'buyer' ? '#25D366' : WHITE,
                  border: 'none',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🛒 Buyer View
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {/* Language Selector */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>Select Language / Họrọ Asụsụ:</div>
            <LanguageSelector selected={selectedLang} onChange={setSelectedLang} />
          </div>

          {/* Chat Window */}
          <div style={{
            backgroundColor: '#ECE5DD',
            borderRadius: 12,
            padding: 20,
            minHeight: 350,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4cfc4\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}>
            {/* Chat Header */}
            <div style={{
              backgroundColor: '#075E54',
              color: WHITE,
              padding: 12,
              borderRadius: '12px 12px 0 0',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{ width: 40, height: 40, backgroundColor: GOLD, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 'bold' }}>Aba Marketplace AI</div>
                <div style={{ fontSize: 11, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <VoiceWave active={voiceActive} />
                  <span>{voiceActive ? 'Listening...' : 'Online • Speaks ' + AI_LANGUAGES[selectedLang].name}</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {currentConvo.map((msg, i) => (
                <ChatBubble key={i} {...msg} />
              ))}
              {typingIndicator && (
                <div style={{ display: 'flex', gap: 4, padding: '12px 16px', backgroundColor: WHITE, borderRadius: 18, width: 'fit-content' }}>
                  <div style={{ width: 8, height: 8, backgroundColor: '#999', borderRadius: '50%', animation: 'bounce 1s infinite' }} />
                  <div style={{ width: 8, height: 8, backgroundColor: '#999', borderRadius: '50%', animation: 'bounce 1s infinite 0.2s' }} />
                  <div style={{ width: 8, height: 8, backgroundColor: '#999', borderRadius: '50%', animation: 'bounce 1s infinite 0.4s' }} />
                  <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }`}</style>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div style={{
              display: 'flex',
              gap: 8,
              marginTop: 16,
              backgroundColor: WHITE,
              padding: 8,
              borderRadius: 24
            }}>
              <button
                onClick={() => setVoiceActive(!voiceActive)}
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: voiceActive ? SUCCESS : '#f0f0f0',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: voiceActive ? WHITE : '#666'
                }}
              >
                🎤
              </button>
              <input
                type="text"
                placeholder={`Type in ${AI_LANGUAGES[selectedLang].name}...`}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  padding: '0 12px'
                }}
              />
              <button style={{
                width: 40, height: 40,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: '#25D366',
                cursor: 'pointer',
                fontSize: 18,
                color: WHITE
              }}>
                ➤
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* AI Use Cases */}
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>AI USE CASES</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 24 }}>
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40 }}>👨‍💼</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>For Traders</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#444', lineHeight: 1.8 }}>
                <li><strong>Photo → Listing:</strong> Send product photo, AI creates full listing</li>
                <li><strong>Voice Updates:</strong> "Mark my brown leather bag as sold"</li>
                <li><strong>Order Notifications:</strong> Instant WhatsApp alerts for new orders</li>
                <li><strong>Inventory Help:</strong> "What's my best selling item this month?"</li>
                <li><strong>Price Suggestions:</strong> AI recommends competitive pricing</li>
              </ul>
            </div>
          </div>
        </Card>
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 40 }}>🛒</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>For Buyers</div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: '#444', lineHeight: 1.8 }}>
                <li><strong>Natural Search:</strong> "Show me size 43 black wedding shoes under ₦20k"</li>
                <li><strong>Bulk Orders:</strong> "I need 50 pairs of palm slippers for my store"</li>
                <li><strong>Track Orders:</strong> "Where is my order?" in any language</li>
                <li><strong>Negotiate:</strong> AI facilitates price discussion with seller</li>
                <li><strong>Recommendations:</strong> Personalized suggestions based on history</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Government AI Dashboard Preview */}
      <Card style={{ marginBottom: 24, padding: 24, borderLeft: `6px solid ${NAVY}` }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>🏛️ Government "Ask AI" Dashboard</div>
        <div style={{ backgroundColor: LIGHT_NAVY, padding: 20, borderRadius: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Ask anything about Aba market activity..."
              defaultValue="What were the top selling products last month?"
              style={{
                flex: 1,
                padding: '16px 20px',
                border: `2px solid ${NAVY}`,
                borderRadius: 30,
                fontSize: 15,
                outline: 'none'
              }}
            />
            <button style={{
              padding: '16px 24px',
              backgroundColor: NAVY,
              color: WHITE,
              border: 'none',
              borderRadius: 30,
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              🤖 Ask AI
            </button>
          </div>
          <div style={{ backgroundColor: WHITE, padding: 20, borderRadius: 12, border: '1px solid #ddd' }}>
            <div style={{ fontSize: 13, color: GOLD, fontWeight: 'bold', marginBottom: 8 }}>🤖 AI Response</div>
            <div style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>
              Based on transaction data from the last 30 days, the top selling products were:
              <ol style={{ margin: '12px 0', paddingLeft: 20 }}>
                <li><strong>Men's Leather Loafers</strong> - 342 units (₦4.3M revenue)</li>
                <li><strong>Executive Bags</strong> - 289 units (₦7.2M revenue)</li>
                <li><strong>Palm Slippers</strong> - 567 units (₦1.4M revenue)</li>
              </ol>
              Footwear remains the dominant category at 68% of all transactions.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            "Total transactions this week?",
            "Which market zone is most active?",
            "Show me revenue trends",
            "New trader registrations",
          ].map((q, i) => (
            <span key={i} style={{
              padding: '8px 16px',
              backgroundColor: WHITE,
              border: '1px solid #ddd',
              borderRadius: 20,
              fontSize: 12,
              color: '#666',
              cursor: 'pointer'
            }}>
              {q}
            </span>
          ))}
        </div>
      </Card>

      {/* Voice & Accessibility */}
      <Card style={{ marginBottom: 24, padding: 24, backgroundColor: LIGHT_NAVY }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>🗣️ Voice AI & Accessibility</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, textAlign: 'center', padding: 20, backgroundColor: WHITE, borderRadius: 12 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎙️</div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>Voice Commands</div>
            <div style={{ fontSize: 13, color: '#666' }}>
              Speak to list products, check orders, or update inventory. Perfect for traders who prefer talking over typing.
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: 20, backgroundColor: WHITE, borderRadius: 12 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>👁️</div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>Low Vision Support</div>
            <div style={{ fontSize: 13, color: '#666' }}>
              AI reads product listings aloud. Voice-first experience for accessibility.
            </div>
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: 20, backgroundColor: WHITE, borderRadius: 12 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📱</div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>Low-Data Mode</div>
            <div style={{ fontSize: 13, color: '#666' }}>
              AI compresses images and works on 2G networks. No smartphone required - USSD fallback available.
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Architecture (Simplified) */}
      <Card style={{ marginBottom: 24, padding: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>⚙️ Technology Stack (Simplified)</div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          {[
            { name: 'WhatsApp Business API', desc: 'Direct integration' },
            { name: 'AI Language Models', desc: 'Nigerian language support' },
            { name: 'Image Recognition', desc: 'Product detection' },
            { name: 'Voice Processing', desc: 'Speech to text/text to speech' },
            { name: 'Secure Cloud', desc: 'Nigerian data residency' },
          ].map((tech, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16 }}>
              <div style={{
                width: 60, height: 60,
                backgroundColor: NAVY,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                color: WHITE,
                fontWeight: 'bold',
                fontSize: 18
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: NAVY }}>{tech.name}</div>
              <div style={{ fontSize: 11, color: '#666' }}>{tech.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Competitive Advantage */}
      <Card style={{ marginBottom: 24, padding: 24, border: `3px solid ${GOLD}` }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16, textAlign: 'center' }}>🏆 Why This Is Unique</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { title: 'First in Nigeria', desc: 'No other marketplace has AI that speaks Nigerian languages' },
            { title: 'WhatsApp Native', desc: 'Works in the app traders already use every day' },
            { title: 'Voice-First', desc: 'Designed for traders who prefer speaking over typing' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, backgroundColor: LIGHT_NAVY, borderRadius: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 'bold', color: GOLD, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: '#444' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Btn onClick={() => setScreen('next-steps')}>← Back</Btn>
        <span style={{ margin: '0 16px' }} />
        <Btn primary onClick={() => setScreen('home')}>View Platform Demo →</Btn>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// AI SEARCH COMPONENT (Buyer-facing product search)
// ═══════════════════════════════════════════════════════════════════════════════

const AISearchBox = ({ setScreen, setCat }) => {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedLang, setSelectedLang] = useState('english');

  // Sample AI responses based on query keywords
  const getAIResponse = (q) => {
    const lower = q.toLowerCase();

    if (lower.includes('wedding') || lower.includes('agbamakwụkwọ') || lower.includes('igbeyawo')) {
      return {
        understanding: selectedLang === 'igbo'
          ? "Achọpụtara m na ị chọrọ akpụkpọ ụkwụ maka agbamakwụkwọ..."
          : selectedLang === 'pidgin'
          ? "I understand say you dey find shoe for wedding..."
          : "I understand you're looking for wedding footwear...",
        products: [
          { name: 'Executive Wedding Oxford', price: 24500, seller: 'Okechukwu Footwear', rating: 5, reviews: 89, icon: '👞', match: '98%' },
          { name: 'Classic Formal Derby', price: 22000, seller: 'Chisom Leather Works', rating: 4.9, reviews: 156, icon: '👞', match: '95%' },
          { name: 'Premium Wedding Loafers', price: 18000, seller: 'Mama Ada Shoes', rating: 4.8, reviews: 67, icon: '👞', match: '92%' },
        ],
        suggestion: "For weddings, I recommend our Executive Oxford - it's our best seller for special occasions. Sizes 39-46 available."
      };
    }

    if (lower.includes('bag') || lower.includes('akpa') || lower.includes('handbag')) {
      return {
        understanding: "I found leather bags matching your request...",
        products: [
          { name: 'Executive Leather Bag', price: 25000, seller: 'Chisom Leather Works', rating: 5, reviews: 234, icon: '💼', match: '97%' },
          { name: 'Ladies Designer Handbag', price: 15000, seller: 'Chisom Leather Works', rating: 4.9, reviews: 178, icon: '👜', match: '94%' },
          { name: 'Travel Duffle Bag', price: 32000, seller: 'Okechukwu Footwear', rating: 4.7, reviews: 45, icon: '🧳', match: '89%' },
        ],
        suggestion: "All our bags are genuine leather, handcrafted in Aba. Would you like to see more options or filter by price?"
      };
    }

    if (lower.includes('bulk') || lower.includes('wholesale') || lower.includes('shop') || lower.includes('store')) {
      return {
        understanding: "I see you're interested in bulk/wholesale orders...",
        products: [
          { name: 'Palm Slippers (Wholesale)', price: 2500, seller: 'Okechukwu Footwear', rating: 4.8, reviews: 312, icon: '🩴', match: '99%', bulk: 'Min: 50 pairs' },
          { name: 'Rubber Sandals (Bulk)', price: 1800, seller: 'Mama Ada Shoes', rating: 4.6, reviews: 189, icon: '👡', match: '96%', bulk: 'Min: 100 pairs' },
          { name: 'School Shoes (Wholesale)', price: 4500, seller: 'Chisom Leather Works', rating: 4.9, reviews: 567, icon: '👞', match: '94%', bulk: 'Min: 30 pairs' },
        ],
        suggestion: "For bulk orders, you get 15-25% discount. I can connect you directly with verified wholesalers. What quantity do you need?"
      };
    }

    if (lower.includes('size') || lower.includes('43') || lower.includes('42') || lower.includes('44')) {
      const size = lower.match(/\d{2}/)?.[0] || '43';
      return {
        understanding: `Looking for products in size ${size}...`,
        products: [
          { name: `Men's Loafers (Size ${size})`, price: 12500, seller: 'Okechukwu Footwear', rating: 4.8, reviews: 156, icon: '👞', match: '100%', inStock: true },
          { name: `Oxford Shoes (Size ${size})`, price: 18000, seller: 'Chisom Leather Works', rating: 5, reviews: 234, icon: '👔', match: '100%', inStock: true },
          { name: `Palm Slippers (Size ${size})`, price: 2500, seller: 'Mama Ada Shoes', rating: 4.5, reviews: 89, icon: '🩴', match: '100%', inStock: true },
        ],
        suggestion: `Great news! Size ${size} is available from multiple sellers. All items ship within 24-48 hours.`
      };
    }

    // Default response
    return {
      understanding: "Let me find products for you...",
      products: [
        { name: "Men's Leather Loafers", price: 12500, seller: 'Okechukwu Footwear', rating: 4.8, reviews: 156, icon: '👞', match: '85%' },
        { name: 'Executive Bag', price: 25000, seller: 'Chisom Leather Works', rating: 5, reviews: 234, icon: '💼', match: '82%' },
        { name: 'Ladies Sandals', price: 4500, seller: 'Mama Ada Shoes', rating: 4.5, reviews: 89, icon: '👡', match: '80%' },
      ],
      suggestion: "Try being more specific! For example: 'I need black wedding shoes size 43' or 'bulk palm slippers for my store'"
    };
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setSearching(true);
    setResults(null);

    // Simulate AI processing time
    setTimeout(() => {
      setResults(getAIResponse(query));
      setSearching(false);
    }, 1200);
  };

  const sampleQueriesByLang = {
    english: [
      "I need wedding shoes size 43",
      "Show me leather bags under ₦20,000",
      "Bulk order 50 palm slippers",
      "Office shoes for men, black"
    ],
    igbo: [
      "Achọrọ m akpụkpọ ụkwụ maka agbamakwụkwọ",
      "Gosi m akpa leather",
      "Akpụkpọ ụkwụ nwoke size 43",
      "Akwa maka ọrụ"
    ],
    yoruba: [
      "Mo nilo bata fun igbeyawo size 43",
      "Fi bag awọ han mi",
      "Bata okunrin dudu fun ọfiisi",
      "Aso ibile fun ayeye"
    ],
    hausa: [
      "Ina bukatar takalmi na bikin aure size 43",
      "Nuna mini jaka na fata",
      "Takalmin maza bakar fata",
      "Riga na ofis"
    ],
    pidgin: [
      "I wan buy wedding shoe size 43",
      "Show me leather bag abeg",
      "I need bulk slippers for my shop",
      "Black shoe for office work"
    ]
  };

  const sampleQueries = sampleQueriesByLang[selectedLang] || sampleQueriesByLang.english;

  return (
    <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden', border: `3px solid ${GOLD}` }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`,
        padding: 20,
        color: WHITE
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>🤖</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>AI Shopping Assistant</div>
            <div style={{ fontSize: 12, opacity: 0.9 }}>Tell me what you need in English, Igbo, Pidgin, Yoruba, or Hausa</div>
          </div>
        </div>
      </div>

      {/* Search Area */}
      <div style={{ padding: 20 }}>
        {/* Language indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
          {Object.entries(AI_LANGUAGES).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setSelectedLang(key)}
              style={{
                padding: '4px 12px',
                borderRadius: 16,
                border: selectedLang === key ? `2px solid ${NAVY}` : '1px solid #ddd',
                backgroundColor: selectedLang === key ? LIGHT_NAVY : WHITE,
                fontSize: 11,
                cursor: 'pointer',
                color: NAVY
              }}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={
              selectedLang === 'igbo' ? "Gịnị ka ị chọrọ? (e.g., Achọrọ m akpụkpọ ụkwụ...)" :
              selectedLang === 'yoruba' ? "Kini o n wa? (e.g., Mo nilo bata fun igbeyawo...)" :
              selectedLang === 'hausa' ? "Me kake nema? (e.g., Ina bukatar takalmi...)" :
              selectedLang === 'pidgin' ? "Wetin you dey find? (e.g., I wan buy shoe...)" :
              "What are you looking for? (e.g., I need wedding shoes size 43...)"
            }
            style={{
              flex: 1,
              padding: '14px 20px',
              border: `2px solid ${NAVY}`,
              borderRadius: 30,
              fontSize: 14,
              outline: 'none'
            }}
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            style={{
              padding: '14px 24px',
              backgroundColor: GOLD,
              color: WHITE,
              border: 'none',
              borderRadius: 30,
              fontWeight: 'bold',
              cursor: searching ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            {searching ? '🔍 Searching...' : '🤖 Find Products'}
          </button>
        </div>

        {/* Sample Queries */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: results ? 20 : 0 }}>
          <span style={{ fontSize: 12, color: '#666', marginRight: 4 }}>Try:</span>
          {sampleQueries.map((text, i) => (
            <button
              key={i}
              onClick={() => setQuery(text)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: 16,
                fontSize: 11,
                color: '#555',
                cursor: 'pointer'
              }}
            >
              "{text}"
            </button>
          ))}
        </div>

        {/* AI Results */}
        {searching && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
            <div style={{ color: NAVY, fontWeight: 'bold' }}>AI is analyzing your request...</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>Searching {STATS.ariariaShops.toLocaleString()} shops in Aba</div>
          </div>
        )}

        {results && !searching && (
          <div style={{ backgroundColor: LIGHT_NAVY, borderRadius: 12, padding: 20 }}>
            {/* AI Understanding */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, backgroundColor: GOLD, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🤖</div>
              <div>
                <div style={{ fontSize: 12, color: GOLD, fontWeight: 'bold' }}>AI ASSISTANT</div>
                <div style={{ fontSize: 14, color: NAVY }}>{results.understanding}</div>
              </div>
            </div>

            {/* Products */}
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY, marginBottom: 12 }}>🎯 Top Matches for You:</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16, overflowX: 'auto' }}>
              {results.products.map((p, i) => (
                <div key={i} style={{
                  backgroundColor: WHITE,
                  borderRadius: 12,
                  padding: 16,
                  minWidth: 200,
                  border: i === 0 ? `2px solid ${GOLD}` : '1px solid #ddd',
                  position: 'relative'
                }}>
                  {i === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: -8,
                      right: 12,
                      backgroundColor: GOLD,
                      color: WHITE,
                      padding: '2px 8px',
                      borderRadius: 10,
                      fontSize: 10,
                      fontWeight: 'bold'
                    }}>
                      BEST MATCH
                    </div>
                  )}
                  <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>{p.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: NAVY, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 'bold', color: GOLD }}>₦{p.price.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{p.seller}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>
                    {'★'.repeat(Math.floor(p.rating))} <span style={{ color: '#666' }}>({p.reviews})</span>
                  </div>
                  {p.bulk && <div style={{ fontSize: 10, color: SUCCESS, marginTop: 4, fontWeight: 'bold' }}>{p.bulk}</div>}
                  {p.inStock && <div style={{ fontSize: 10, color: SUCCESS, marginTop: 4 }}>✓ In Stock</div>}
                  <div style={{
                    marginTop: 8,
                    padding: '4px 8px',
                    backgroundColor: LIGHT_NAVY,
                    borderRadius: 4,
                    fontSize: 10,
                    textAlign: 'center',
                    color: NAVY,
                    fontWeight: 'bold'
                  }}>
                    {p.match} Match
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggestion */}
            <div style={{
              backgroundColor: WHITE,
              borderRadius: 8,
              padding: 12,
              borderLeft: `4px solid ${GOLD}`,
              fontSize: 13,
              color: '#444'
            }}>
              <strong style={{ color: NAVY }}>💡 AI Tip:</strong> {results.suggestion}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <Btn small primary onClick={() => setScreen('listings')}>View All Products</Btn>
              <Btn small>💬 Chat with AI on WhatsApp</Btn>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEMO SCREENS (Marketplace Demo)
// ═══════════════════════════════════════════════════════════════════════════════

const Home = ({ setScreen, setCat }) => (
  <div>
    <Card style={{ padding: 24, marginBottom: 20, background: `linear-gradient(135deg, ${LIGHT_NAVY} 0%, ${WHITE} 100%)`, border: `2px solid ${NAVY}` }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <GovPhoto size={110} />
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 12, color: GOLD, fontWeight: 'bold', letterSpacing: 1 }}>A MESSAGE FROM HIS EXCELLENCY</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: NAVY, margin: '8px 0' }}>Dr. Alex Chioma Otti, OFR</div>
          <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6, fontStyle: 'italic' }}>
            "Through GADA, we are building the digital infrastructure to transform Aba into a billion-dollar fashion and manufacturing ecosystem. This marketplace connects our skilled artisans to buyers across Nigeria and the world."
          </div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>Governor, Abia State | God's Own State</div>
        </div>
      </div>
    </Card>

    <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE, padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 20 }}>
      <div style={{ fontSize: 18, fontStyle: 'italic' }}>"Ahịa dị mma na-ere onwe ya"</div>
      <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>A good market sells itself — Igbo Proverb</div>
    </div>

    <Card style={{ marginBottom: 20, padding: 24, textAlign: 'center', backgroundColor: NAVY, color: WHITE }}>
      <div style={{ fontSize: 14, marginBottom: 16, opacity: 0.9 }}>PLATFORM PROJECTION (Based on {STATS.ariariaShops.toLocaleString()} shops)</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>{fmtB(STATS.annualTradeVolume)}</div>
          <div style={{ fontSize: 12 }}>Market Trade Volume (Annual)</div>
        </div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>{STATS.ariariaShops.toLocaleString()}</div>
          <div style={{ fontSize: 12 }}>Shops in Ariaria</div>
        </div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>{(STATS.shoemakers + STATS.garmentMakers).toLocaleString()}+</div>
          <div style={{ fontSize: 12 }}>Artisans (Shoes + Garments)</div>
        </div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>{STATS.literacyRate}%+</div>
          <div style={{ fontSize: 12 }}>Literacy Rate</div>
        </div>
      </div>
    </Card>

    <TrustBadges />

    <AISearchBox setScreen={setScreen} setCat={setCat} />

    <Card style={{ textAlign: 'center', padding: 40, marginBottom: 24, backgroundColor: '#f8f9fa' }}>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY, marginBottom: 12 }}>Shop Directly From Aba's Finest Traders</div>
      <div style={{ fontSize: 15, color: '#666', marginBottom: 20 }}>NIN-verified sellers • Authentic Made-in-Aba goods • Escrow-protected payments</div>
      <Btn primary onClick={() => setScreen('listings')}>BROWSE PRODUCTS</Btn>
    </Card>

    <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>SHOP BY CATEGORY</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
      {[['Footwear', '110,000+ makers'], ['Bags', 'Leather goods'], ['Fashion', '50,000+ tailors'], ['Leather', 'Raw materials']].map(([name, count]) => (
        <Card key={name} style={{ textAlign: 'center', cursor: 'pointer', padding: 20 }} onClick={() => { setCat(name); setScreen('listings'); }}>
          <CatIcon name={name} size={70} />
          <div style={{ fontSize: 16, fontWeight: 'bold', marginTop: 12, color: NAVY }}>{name}</div>
          <div style={{ fontSize: 13, color: GOLD }}>{count}</div>
        </Card>
      ))}
    </div>

    <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>FEATURED PRODUCTS</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
      {products.slice(0, 3).map(p => (
        <Card key={p.id}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><ProductImg product={p} size={110} /></div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{p.name}</div>
          <div style={{ fontSize: 18, color: GOLD, fontWeight: 'bold', margin: '4px 0' }}>{fmt(p.price)}</div>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>{p.seller.name}</div>
          <Badge>✓ VERIFIED</Badge>
          {p.madeInAba && <Badge gold>MADE IN ABA</Badge>}
        </Card>
      ))}
    </div>

    <Card style={{ marginBottom: 24, padding: 24 }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>ACCESS ANYWHERE</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
        {[['📱', 'Mobile App', 'Android & iOS'], ['💬', 'WhatsApp', 'Order via chat'], ['📞', 'USSD', '*384*ABA#'], ['🌐', 'Web', 'Full features']].map(([icon, title, desc]) => (
          <div key={title}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{title}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{desc}</div>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ textAlign: 'center', padding: 20, backgroundColor: NAVY, color: WHITE, borderRadius: 12 }}>
      <div style={{ fontSize: 14, marginBottom: 4 }}>An Initiative of the Abia State Government</div>
      <div style={{ fontSize: 12, opacity: 0.8 }}>Powered by Greater Aba Development Agency (GADA)</div>
    </div>
  </div>
);

const Listings = ({ setScreen, setSeller, cart, setCart, cat }) => {
  const filtered = products.filter(p => cat === 'all' || p.category === cat || (cat === 'Leather' && p.category === 'Bags'));
  return (
    <div>
      <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>Home › {cat === 'all' ? 'All Products' : cat}</div>
      <div style={{ fontSize: 24, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>{cat === 'all' ? 'ALL PRODUCTS' : cat.toUpperCase()}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {filtered.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, cursor: 'pointer' }} onClick={() => { setSeller(p.seller); setScreen('seller'); }}>
              <ProductImg product={p} size={120} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{p.name}</div>
            <div style={{ fontSize: 20, color: GOLD, fontWeight: 'bold', margin: '4px 0' }}>{fmt(p.price)}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{p.seller.name}</div>
            <div style={{ fontSize: 12, marginBottom: 10 }}>{'★'.repeat(p.rating)}{'☆'.repeat(5-p.rating)}</div>
            <div style={{ marginBottom: 12 }}><Badge>✓ VERIFIED</Badge>{p.madeInAba && <Badge gold>MADE IN ABA</Badge>}</div>
            <Btn small full onClick={() => setCart([...cart, p])}>Add to Cart</Btn>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Seller = ({ setScreen, seller, cart, setCart }) => {
  const sp = products.filter(p => p.seller.id === seller.id);
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ width: 90, height: 90, backgroundColor: NAVY, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: WHITE, fontSize: 28, fontWeight: 'bold' }}>{seller.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: NAVY }}>{seller.name}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>{'★'.repeat(5)} {seller.rating} ({seller.reviews} reviews)</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>📍 {seller.market} Market, Aba, Abia State</div>
            <Badge>✓ NIN VERIFIED</Badge>
            <Badge>ID: ABM-2024-00{seller.id}56</Badge>
            {seller.madeInAba && <Badge gold>MADE IN ABA</Badge>}
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Stat value={seller.orders} label="Orders Completed" sub="+23% this month" />
        <Stat value="94%" label="Positive Reviews" />
        <Stat value="6hrs" label="Avg Response" />
        <Stat value="2022" label="Member Since" />
      </div>
      <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>PRODUCTS</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {sp.map(p => (
          <Card key={p.id}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}><ProductImg product={p} size={100} /></div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>{p.name}</div>
            <div style={{ fontSize: 18, color: GOLD, fontWeight: 'bold' }}>{fmt(p.price)}</div>
            <Btn small full style={{ marginTop: 10 }} onClick={() => setCart([...cart, p])}>Add</Btn>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SELLER ONBOARDING VISUAL WALKTHROUGH
// ═══════════════════════════════════════════════════════════════════════════════

const SellerOnboarding = ({ setScreen }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      icon: '📱',
      title: 'Phone Verification',
      subtitle: 'Secure OTP Authentication',
      description: 'Seller enters phone number and receives a one-time password via SMS for verification.',
      fields: ['Phone Number', 'OTP Code'],
      badge: null,
      color: '#4CAF50',
      mockup: {
        title: 'Enter Your Phone',
        content: (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Phone Number</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                +234 803 XXX XXXX
              </div>
            </div>
            <div style={{ padding: '14px', backgroundColor: GOLD, color: WHITE, borderRadius: 8, textAlign: 'center', fontWeight: 'bold' }}>
              Send OTP →
            </div>
          </div>
        )
      }
    },
    {
      id: 2,
      icon: '🪪',
      title: 'NIN Verification',
      subtitle: 'Government Identity Check',
      description: 'Upload National Identification Number for identity verification via NIMC database.',
      fields: ['NIN Number', 'Date of Birth', 'Full Name'],
      badge: '✓ Identity Verified',
      color: '#2196F3',
      mockup: {
        title: 'Verify Your Identity',
        content: (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>NIN Number</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                12345678901
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Date of Birth</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                15 / 03 / 1985
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#e8f5e9', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: SUCCESS }}>✓</span>
              <span style={{ fontSize: 12, color: SUCCESS }}>Connected to NIMC Database</span>
            </div>
          </div>
        )
      }
    },
    {
      id: 3,
      icon: '🏪',
      title: 'Business Profile',
      subtitle: 'Shop Information',
      description: 'Enter business details including shop name, category, market location, and contact information.',
      fields: ['Shop Name', 'Category', 'Market/Location', 'Shop Address'],
      badge: null,
      color: '#FF9800',
      mockup: {
        title: 'Your Business',
        content: (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Shop Name</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                Chukwu Quality Shoes
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Category</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                <span>Footwear</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Market Location</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                <span>Ariaria International Market</span>
                <span>▼</span>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: 4,
      icon: '📋',
      title: 'CAC Registration',
      subtitle: 'Optional Business Verification',
      description: 'Registered businesses can add CAC number for additional credibility and "Registered Business" badge.',
      fields: ['CAC Number', 'Business Type', 'Registration Date'],
      badge: '✓ CAC Verified',
      color: '#9C27B0',
      optional: true,
      mockup: {
        title: 'Business Registration',
        content: (
          <div>
            <div style={{ padding: '10px', backgroundColor: '#fff3e0', borderRadius: 8, marginBottom: 16, fontSize: 11 }}>
              💡 Optional: Add your CAC number for a "Registered Business" badge
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>CAC/BN Number</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                BN 12345678
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '12px', backgroundColor: '#f5f5f5', borderRadius: 8, textAlign: 'center', fontSize: 12, cursor: 'pointer' }}>
                Skip for Now
              </div>
              <div style={{ flex: 1, padding: '12px', backgroundColor: NAVY, color: WHITE, borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>
                Verify CAC
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: 5,
      icon: '🏦',
      title: 'Bank Account',
      subtitle: 'Payment Setup',
      description: 'Link bank account for receiving payments. Funds from sales are deposited directly after escrow release.',
      fields: ['Bank Name', 'Account Number', 'Account Name'],
      badge: '✓ Bank Linked',
      color: '#00BCD4',
      mockup: {
        title: 'Payment Account',
        content: (
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Select Bank</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                <span>First Bank of Nigeria</span>
                <span>▼</span>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>Account Number</div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd' }}>
                3012345678
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#e8f5e9', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: '#666' }}>Account Name</div>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: SUCCESS }}>CHUKWU EMMANUEL OBIORA</div>
            </div>
          </div>
        )
      }
    },
    {
      id: 6,
      icon: '📸',
      title: 'Upload Products',
      subtitle: 'List Your Items',
      description: 'Add products with photos, descriptions, prices, and inventory. AI assists with descriptions and pricing suggestions.',
      fields: ['Product Photos', 'Name & Description', 'Price', 'Stock Quantity'],
      badge: null,
      color: '#E91E63',
      mockup: {
        title: 'Add Your Products',
        content: (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
              {['👟', '👞', '+'].map((item, i) => (
                <div key={i} style={{
                  aspectRatio: '1',
                  backgroundColor: i < 2 ? '#f5f5f5' : '#fff',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: i < 2 ? 28 : 24,
                  border: '2px dashed #ddd'
                }}>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }}>
                Men's Leather Oxford Shoes
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }}>
                ₦25,000
              </div>
              <div style={{ flex: 1, padding: '12px 16px', backgroundColor: '#f5f5f5', borderRadius: 8, border: '1px solid #ddd', fontSize: 13 }}>
                Stock: 24
              </div>
            </div>
          </div>
        )
      }
    },
    {
      id: 7,
      icon: '✅',
      title: 'Verification Complete!',
      subtitle: 'You\'re Ready to Sell',
      description: 'Seller profile is now verified and live. Products are visible to buyers across Nigeria.',
      fields: [],
      badge: '🏆 VERIFIED SELLER',
      color: SUCCESS,
      mockup: {
        title: 'Welcome, Verified Seller!',
        content: (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 40
            }}>
              ✓
            </div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>
              Chukwu Quality Shoes
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              <span style={{ padding: '4px 10px', backgroundColor: SUCCESS, color: WHITE, borderRadius: 12, fontSize: 10 }}>✓ NIN Verified</span>
              <span style={{ padding: '4px 10px', backgroundColor: NAVY, color: WHITE, borderRadius: 12, fontSize: 10 }}>✓ CAC Verified</span>
              <span style={{ padding: '4px 10px', backgroundColor: GOLD, color: WHITE, borderRadius: 12, fontSize: 10 }}>✓ Bank Linked</span>
            </div>
            <div style={{ padding: '14px', backgroundColor: GOLD, color: NAVY, borderRadius: 8, fontWeight: 'bold' }}>
              🚀 Start Selling Now
            </div>
          </div>
        )
      }
    }
  ];

  const step = steps[currentStep];

  return (
    <div>
      {/* Header */}
      <Card style={{ padding: 24, marginBottom: 20, background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: GOLD, marginBottom: 4 }}>SELLER ONBOARDING PROCESS</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>How Traders Join the Platform</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 8 }}>7-step verification process ensuring trust and accountability</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 'bold', color: GOLD }}>2,847</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Sellers Onboarded (Pilot)</div>
          </div>
        </div>
      </Card>

      {/* Progress Bar */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: NAVY }}>Registration Progress</div>
          <div style={{ fontSize: 12, color: '#666' }}>Step {currentStep + 1} of {steps.length}</div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {steps.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setCurrentStep(i)}
              style={{
                flex: 1,
                height: 8,
                backgroundColor: i <= currentStep ? GOLD : '#e0e0e0',
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {steps.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setCurrentStep(i)}
              style={{
                fontSize: 16,
                cursor: 'pointer',
                opacity: i === currentStep ? 1 : 0.4,
                transition: 'all 0.2s ease'
              }}
            >
              {s.icon}
            </div>
          ))}
        </div>
      </Card>

      {/* Main Content - Step Detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Left: Step Info */}
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              backgroundColor: step.color + '20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30
            }}>
              {step.icon}
            </div>
            <div>
              <div style={{ fontSize: 10, color: step.color, fontWeight: 'bold' }}>STEP {step.id}</div>
              <div style={{ fontSize: 20, fontWeight: 'bold', color: NAVY }}>{step.title}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{step.subtitle}</div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 20 }}>
            {step.description}
          </p>

          {step.fields.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 'bold', color: NAVY, marginBottom: 10 }}>Information Collected:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {step.fields.map(field => (
                  <span key={field} style={{
                    padding: '6px 12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 16,
                    fontSize: 12,
                    color: '#555'
                  }}>
                    {field}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step.badge && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: step.color + '15',
              borderRadius: 8,
              border: `1px solid ${step.color}40`,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <span style={{ fontSize: 20 }}>🏅</span>
              <div>
                <div style={{ fontSize: 10, color: '#666' }}>Badge Earned</div>
                <div style={{ fontSize: 14, fontWeight: 'bold', color: step.color }}>{step.badge}</div>
              </div>
            </div>
          )}

          {step.optional && (
            <div style={{ marginTop: 12, padding: '10px', backgroundColor: '#fff8e1', borderRadius: 8, fontSize: 12, color: '#f57c00' }}>
              ⚡ This step is optional but increases seller credibility
            </div>
          )}
        </Card>

        {/* Right: Phone Mockup */}
        <Card style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
          <div style={{
            width: 280,
            backgroundColor: WHITE,
            borderRadius: 32,
            padding: 12,
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            border: '8px solid #1a1a1a'
          }}>
            {/* Phone Header */}
            <div style={{
              backgroundColor: NAVY,
              borderRadius: '20px 20px 0 0',
              padding: '12px 16px',
              color: WHITE
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 10 }}>9:41</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span style={{ fontSize: 10 }}>📶</span>
                  <span style={{ fontSize: 10 }}>🔋</span>
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 'bold' }}>{step.mockup.title}</div>
              <div style={{ fontSize: 10, opacity: 0.8 }}>Aba Marketplace</div>
            </div>
            {/* Phone Content */}
            <div style={{ padding: 16, minHeight: 280 }}>
              {step.mockup.content}
            </div>
            {/* Phone Footer */}
            <div style={{
              height: 4,
              width: 100,
              backgroundColor: '#1a1a1a',
              borderRadius: 2,
              margin: '8px auto'
            }} />
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <Card style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Btn
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
          >
            ← Previous Step
          </Btn>
          <div style={{ display: 'flex', gap: 8 }}>
            {steps.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setCurrentStep(i)}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: i === currentStep ? GOLD : '#e0e0e0',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
          <Btn
            primary
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            style={{ opacity: currentStep === steps.length - 1 ? 0.5 : 1 }}
          >
            Next Step →
          </Btn>
        </div>
      </Card>

      {/* Key Benefits */}
      <Card style={{ padding: 24, marginTop: 20, backgroundColor: '#f8f9fa' }}>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>Why This Process Matters</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            ['🛡️', 'Trust & Safety', 'NIN verification prevents fraud and builds buyer confidence'],
            ['📊', 'Tax Visibility', 'Formal registration enables government revenue tracking'],
            ['💰', 'Secure Payments', 'Bank linking ensures sellers receive funds safely'],
            ['🏆', 'Credibility', 'Verified badges increase sales by 3x on average']
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: NAVY, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const Dashboard = ({ setScreen }) => {
  const revenue = useCounter(18400000);
  const tradersCount = useCounter(2847);
  const orders = useCounter(1205);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const sampleResponses = {
    'revenue': {
      title: 'Revenue Analysis',
      content: 'Total platform revenue this month: ₦18.4M. Breakdown: Transaction fees (₦12.1M), Registration fees (₦4.2M), Premium listings (₦2.1M). Revenue is up 23% from last month.'
    },
    'traders': {
      title: 'Trader Statistics',
      content: 'Currently 2,847 verified traders on the platform. 156 new registrations this week. Top performing zone: A-Line (68% of traders). Verification rate: 94%.'
    },
    'products': {
      title: 'Product Insights',
      content: 'Top 3 categories: Footwear (45%), Bags (28%), Fashion (27%). Most searched: "wedding shoes", "leather bag", "palm slippers". Average price point: ₦12,500.'
    },
    'default': {
      title: 'Market Overview',
      content: 'The Aba Digital Marketplace has 2,847 traders with 12,450 active listings. Weekly transaction volume: ₦156M. Customer satisfaction: 4.7/5. Platform uptime: 99.8%.'
    }
  };

  const handleAskAI = () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      const query = aiQuery.toLowerCase();
      if (query.includes('revenue') || query.includes('money') || query.includes('income')) {
        setAiResponse(sampleResponses.revenue);
      } else if (query.includes('trader') || query.includes('seller') || query.includes('vendor')) {
        setAiResponse(sampleResponses.traders);
      } else if (query.includes('product') || query.includes('item') || query.includes('sell')) {
        setAiResponse(sampleResponses.products);
      } else {
        setAiResponse(sampleResponses.default);
      }
      setAiLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY }}>🤖 AI-Powered Analytics Dashboard</div>
          <div style={{ fontSize: 14, color: '#666' }}>Abia State Digital Economy Command Center</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Btn small>📄 Export PDF</Btn>
          <Btn small>📊 Export Excel</Btn>
        </div>
      </div>

      {/* Ask AI Section */}
      <Card style={{ marginBottom: 24, padding: 24, border: `3px solid ${GOLD}`, backgroundColor: LIGHT_NAVY }}>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>🤖 Ask AI About Your Data</div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
            placeholder="Ask anything: 'Show revenue trends', 'How many traders joined this week?', 'Top products?'"
            style={{
              flex: 1,
              padding: '14px 20px',
              border: `2px solid ${NAVY}`,
              borderRadius: 30,
              fontSize: 14,
              outline: 'none'
            }}
          />
          <button
            onClick={handleAskAI}
            disabled={aiLoading}
            style={{
              padding: '14px 28px',
              backgroundColor: NAVY,
              color: WHITE,
              border: 'none',
              borderRadius: 30,
              fontWeight: 'bold',
              cursor: aiLoading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            {aiLoading ? '⏳ Thinking...' : '🤖 Ask AI'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: aiResponse ? 16 : 0 }}>
          {['Total revenue this month?', 'How many new traders?', 'Top selling products?', 'Show market activity'].map((q, i) => (
            <button
              key={i}
              onClick={() => { setAiQuery(q); }}
              style={{
                padding: '8px 14px',
                backgroundColor: WHITE,
                border: '1px solid #ddd',
                borderRadius: 20,
                fontSize: 12,
                color: '#666',
                cursor: 'pointer'
              }}
            >
              {q}
            </button>
          ))}
        </div>
        {aiResponse && (
          <div style={{ backgroundColor: WHITE, padding: 20, borderRadius: 12, border: '1px solid #ddd' }}>
            <div style={{ fontSize: 13, color: GOLD, fontWeight: 'bold', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🤖</span> AI Response: {aiResponse.title}
            </div>
            <div style={{ fontSize: 14, color: '#333', lineHeight: 1.6 }}>{aiResponse.content}</div>
          </div>
        )}
      </Card>

      <Card style={{ padding: 32, marginBottom: 24, background: `linear-gradient(135deg, ${NAVY} 0%, #001a4d 100%)`, color: WHITE, textAlign: 'center' }}>
        <div style={{ fontSize: 16, marginBottom: 20, opacity: 0.9, letterSpacing: 1 }}>REVENUE POTENTIAL (Based on Research)</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>Abia IGR (2018)</div>
            <div style={{ fontSize: 48, fontWeight: 'bold' }}>{fmtB(STATS.abiaIGR2018)}</div>
          </div>
          <div style={{ fontSize: 48, opacity: 0.5 }}>→</div>
          <div>
            <div style={{ fontSize: 14, opacity: 0.7 }}>With Digital Commerce Layer</div>
            <div style={{ fontSize: 64, fontWeight: 'bold', color: GOLD }}>₦50B+</div>
          </div>
        </div>
        <div style={{ marginTop: 24, padding: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'inline-block' }}>
          <span style={{ fontSize: 14 }}>Market trade volume: </span>
          <span style={{ fontSize: 24, fontWeight: 'bold', color: GOLD }}>{fmtB(STATS.annualTradeVolume)}/year</span>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <Stat large value={`₦${(revenue/1000000).toFixed(1)}M`} label="Demo Revenue" sub="Projection" />
        <Stat large value={tradersCount.toLocaleString()} label="Demo Traders" sub="Target: 2,000 in pilot" />
        <Stat large value={orders.toLocaleString()} label="Demo Orders" sub="Weekly projection" />
        <Stat large value="89%" label="Target Fulfillment" />
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>MARKET POTENTIAL</div>
          {[
            ['Ariaria (A-Line Pilot)', '3,000', 88],
            ['Ariaria (Full)', STATS.ariariaShops.toLocaleString(), 100],
            ['Ngwa Road', '8,000', 22],
            ['Cemetery Market', '5,000', 14]
          ].map(([name, count, width]) => (
            <div key={name} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span>{name}</span><strong>{count}</strong></div>
              <div style={{ backgroundColor: '#eee', height: 12, borderRadius: 6 }}>
                <div style={{ backgroundColor: NAVY, height: 12, borderRadius: 6, width: `${width}%` }} />
              </div>
            </div>
          ))}
        </Card>
        <Card style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: NAVY, marginBottom: 16 }}>ARTISAN WORKFORCE</div>
          {[
            ['Shoemakers', STATS.shoemakers.toLocaleString(), 69],
            ['Garment Makers', STATS.garmentMakers.toLocaleString(), 31],
            ['Bag Makers', '15,000', 9],
            ['Other Leather', '10,000', 6]
          ].map(([name, count, width]) => (
            <div key={name} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}><span>{name}</span><strong>{count}</strong></div>
              <div style={{ backgroundColor: '#eee', height: 12, borderRadius: 6 }}>
                <div style={{ backgroundColor: GOLD, height: 12, borderRadius: 6, width: `${width}%` }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

const Memory = ({ setScreen }) => (
  <div>
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 28, fontWeight: 'bold', color: NAVY }}>"THE PLATFORM REMEMBERS"</div>
      <div style={{ fontSize: 16, color: '#666' }}>Institutional Memory Across Administrations</div>
    </div>

    <Card style={{ padding: 24, marginBottom: 24, background: LIGHT_NAVY, border: `2px solid ${NAVY}` }}>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <GovPhoto size={110} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: NAVY, marginBottom: 8 }}>A Legacy That Outlasts Any Administration</div>
          <div style={{ fontSize: 15, color: '#444', lineHeight: 1.6, fontStyle: 'italic' }}>
            "This platform belongs to Abia State — not to any political party or administration. What we build today, our successors will inherit tomorrow. Every trader registered, every transaction recorded — preserved forever for Ndi Abia."
          </div>
          <div style={{ fontSize: 13, color: GOLD, fontWeight: 'bold', marginTop: 12 }}>— Dr. Alex Chioma Otti, OFR • Governor, Abia State</div>
        </div>
      </div>
    </Card>

    <div style={{ background: `linear-gradient(135deg, ${NAVY}, #001a4d)`, color: WHITE, padding: 20, borderRadius: 12, textAlign: 'center', marginBottom: 24 }}>
      <div style={{ fontSize: 18, fontStyle: 'italic' }}>"Onye a ha na a chọ ụzọ, ka a na a họrọ"</div>
      <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>The path you choose today shapes tomorrow's journey</div>
    </div>

    <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: NAVY }}>WHAT ENDURES</div>
    <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
      {[
        { value: STATS.ariariaShops.toLocaleString(), label: 'Shops to Register', desc: 'NIN verified profiles' },
        { value: fmtB(STATS.annualTradeVolume), label: 'Trade to Capture', desc: 'Transaction records' },
        { value: '∞', label: 'Data Preserved', desc: 'Forever accessible' },
        { value: '4+', label: 'Administrations', desc: 'Will inherit this' }
      ].map((s, i) => (
        <Card key={i} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: NAVY }}>{s.value}</div>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>{s.label}</div>
          <div style={{ fontSize: 12, color: '#666' }}>{s.desc}</div>
        </Card>
      ))}
    </div>

    <Card style={{ padding: 24, textAlign: 'center', backgroundColor: LIGHT_NAVY }}>
      <div style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 16, color: NAVY }}>
        "This platform belongs to Abia State — not to any administration. The project will outlive our government but will stand forever as testimony to our vision, ambition and success."
      </div>
    </Card>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

export default function App() {
  const [screen, setScreen] = useState('research');
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState('all');
  const [seller, setSeller] = useState(traders[0]);
  const isMobile = useIsMobile();

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: 1000, margin: '0 auto', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Nav screen={screen} setScreen={setScreen} cart={cart} isMobile={isMobile} />
      <div style={{ padding: isMobile ? 12 : 24 }}>
        {screen === 'research' && <ResearchScreen setScreen={setScreen} />}
        {screen === 'why-aba' && <WhyAba setScreen={setScreen} />}
        {screen === 'quick-wins' && <QuickWins setScreen={setScreen} />}
        {screen === 'pilot' && <PilotAsk setScreen={setScreen} />}
        {screen === 'operating' && <OperatingModel setScreen={setScreen} />}
        {screen === 'next-steps' && <NextSteps setScreen={setScreen} />}
        {screen === 'ai-platform' && <AIPlatform setScreen={setScreen} />}
        {screen === 'onboarding' && <SellerOnboarding setScreen={setScreen} />}
        {screen === 'home' && <Home setScreen={setScreen} setCat={setCat} />}
        {screen === 'listings' && <Listings setScreen={setScreen} setSeller={setSeller} cart={cart} setCart={setCart} cat={cat} />}
        {screen === 'seller' && <Seller setScreen={setScreen} seller={seller} cart={cart} setCart={setCart} />}
        {screen === 'dashboard' && <Dashboard setScreen={setScreen} />}
        {screen === 'memory' && <Memory setScreen={setScreen} />}
      </div>

      {/* Enhanced Footer with Governor, QR, and Contact */}
      <div style={{ backgroundColor: NAVY, color: WHITE }}>
        {/* Main Footer Content */}
        <div style={{ padding: '32px 24px', display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Governor Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <GovPhoto size={70} />
            <div>
              <div style={{ fontSize: 10, opacity: 0.7 }}>AN INITIATIVE OF</div>
              <div style={{ fontSize: 14, fontWeight: 'bold' }}>HIS EXCELLENCY DR. ALEX OTTI, OFR</div>
              <div style={{ fontSize: 11, color: GOLD }}>Executive Governor, Abia State</div>
            </div>
          </div>

          {/* Center - Title & Tagline */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>ABA DIGITAL MARKETPLACE</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Powered by Greater Aba Development Agency (GADA)</div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
              <Badge gold>🤖 AI-Powered</Badge>
              <Badge success>🇳🇬 Made in Abia</Badge>
            </div>
          </div>

          {/* QR Code & Contact */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 80,
              height: 80,
              backgroundColor: WHITE,
              borderRadius: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 8px',
              padding: 8
            }}>
              {/* Simulated QR Code Pattern */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, marginBottom: 4 }}>
                {[1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1].map((fill, i) => (
                  <div key={i} style={{ width: 8, height: 8, backgroundColor: fill ? NAVY : 'transparent' }} />
                ))}
              </div>
              <div style={{ fontSize: 6, color: NAVY, fontWeight: 'bold' }}>SCAN ME</div>
            </div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>Share this demo</div>
          </div>
        </div>

        {/* Contact Bar */}
        <div style={{
          background: 'linear-gradient(90deg, #006400 0%, #228B22 100%)',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 32,
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ fontSize: 16 }}>💬</span>
            <span>WhatsApp: +234 XXX XXX XXXX</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ fontSize: 16 }}>📧</span>
            <span>info@abamarketplace.gov.ng</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ fontSize: 16 }}>🌐</span>
            <span>abamarketplace.gov.ng</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ padding: '12px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 10 }}>
          <div style={{ opacity: 0.6 }}>
            🦁 Abia State Government • God's Own State • 🇳🇬 Federal Republic of Nigeria
          </div>
          <div style={{ opacity: 0.4, marginTop: 4 }}>
            Statistics sourced from: Wikipedia, Techpoint Africa, ICIR Nigeria, ThisDay Live, People of Abia
          </div>
        </div>
      </div>
    </div>
  );
}
