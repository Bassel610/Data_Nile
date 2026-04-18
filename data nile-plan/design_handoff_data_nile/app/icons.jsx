// Simple geometric icons — strokes & basic shapes only
const Icon = {
  Search: ({s=16}) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5l3 3"/>
    </svg>
  ),
  Arrow: ({s=16, dir='right'}) => {
    const rot = { right:0, up:-90, down:90, left:180 }[dir];
    return <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{transform:`rotate(${rot}deg)`}}>
      <path d="M3 8h10M9 4l4 4-4 4"/>
    </svg>;
  },
  Plus: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 3v10M3 8h10"/></svg>,
  Close: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>,
  Check: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3 3 7-7"/></svg>,
  Dot: ({s=8, fill='currentColor'}) => <svg width={s} height={s} viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={fill}/></svg>,
  Filter: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 4h12M4 8h8M6 12h4"/></svg>,
  Sort: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 3v10M4 13l-2-2M4 13l2-2M12 13V3M12 3l-2 2M12 3l2 2"/></svg>,
  Spark: ({s=12}) => <svg width={s} height={s} viewBox="0 0 12 12" fill="currentColor"><path d="M6 0l1.5 4.5L12 6l-4.5 1.5L6 12l-1.5-4.5L0 6l4.5-1.5z"/></svg>,
  Ankh: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <ellipse cx="7" cy="4" rx="2.8" ry="3"/><path d="M7 7v6M4 9h6"/>
    </svg>
  ),
  Wave: ({s=18}) => (
    <svg width={s*2} height={s} viewBox="0 0 36 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M0 9 Q 4.5 2, 9 9 T 18 9 T 27 9 T 36 9"/>
    </svg>
  ),
  Reed: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M7 14V3M7 3c0-2 1.5-2.5 3-2 .5 2-1 3-3 3zM7 3c0-2-1.5-2.5-3-2-.5 2 1 3 3 3z"/>
    </svg>
  ),
  Sun: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.5"/>
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.8 2.8l1 1M10.2 10.2l1 1M2.8 11.2l1-1M10.2 3.8l1-1"/>
    </svg>
  ),
  Pyramid: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M7 2l5 10H2z"/><path d="M7 2v10M2 12l5-4 5 4"/>
    </svg>
  ),
  Database: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
      <ellipse cx="7" cy="3" rx="4.5" ry="1.5"/>
      <path d="M2.5 3v4c0 .8 2 1.5 4.5 1.5S11.5 7.8 11.5 7V3"/>
      <path d="M2.5 7v4c0 .8 2 1.5 4.5 1.5S11.5 11.8 11.5 11V7"/>
    </svg>
  ),
  User: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="7" cy="4.5" r="2.2"/><path d="M2 12c1-2.5 3-3.5 5-3.5s4 1 5 3.5"/>
    </svg>
  ),
  Shield: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M7 1.5l5 1.5v4c0 3-2 5-5 6-3-1-5-3-5-6v-4z"/>
    </svg>
  ),
  Bolt: ({s=14}) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 1L3 8h3l-1 5 5-7H7z"/>
    </svg>
  ),
  Menu: ({s=16}) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 5h10M3 11h10"/></svg>,
  External: ({s=12}) => <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M5 2H2v8h8V7M7 2h3v3M5 7l5-5"/></svg>,
  Bell: ({s=14}) => <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10V6.5A4 4 0 017 2.5a4 4 0 014 4V10h1H2z M6 12a1 1 0 002 0"/></svg>,
  Settings: ({s=14}) => <svg width={s} height={s} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="7" cy="7" r="2"/><path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4" strokeLinecap="round"/></svg>,
};

window.Icon = Icon;
