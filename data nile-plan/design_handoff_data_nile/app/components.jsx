// Shared UI components — variants supported via props
const { useState, useEffect, useMemo, useRef } = React;

// ========== Primitives ==========
const Chip = ({ children, active, onClick, tone }) => {
  const bg = active ? 'var(--ink)' : 'transparent';
  const fg = active ? 'var(--paper)' : 'var(--ink-2)';
  const bd = active ? 'var(--ink)' : 'var(--line)';
  return (
    <button onClick={onClick} style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
      textTransform: 'uppercase', padding: '6px 10px', border: `1px solid ${bd}`,
      background: bg, color: fg, borderRadius: 999, cursor: 'pointer',
      transition: 'all .18s ease'
    }}>{children}</button>
  );
};

const Tag = ({ children, tone = 'neutral' }) => {
  const tones = {
    neutral: { bg: 'var(--sand-2)', fg: 'var(--ink-2)', bd: 'var(--line)' },
    nile:    { bg: 'color-mix(in oklch, var(--nile-deep) 12%, transparent)', fg: 'var(--nile-deep)', bd: 'color-mix(in oklch, var(--nile-deep) 25%, transparent)' },
    reed:    { bg: 'color-mix(in oklch, var(--reed) 14%, transparent)', fg: 'var(--reed)', bd: 'color-mix(in oklch, var(--reed) 30%, transparent)' },
    gold:    { bg: 'color-mix(in oklch, var(--gold) 18%, transparent)', fg: 'color-mix(in oklch, var(--gold) 80%, var(--ink) 20%)', bd: 'color-mix(in oklch, var(--gold) 40%, transparent)' },
    terra:   { bg: 'color-mix(in oklch, var(--terracotta) 14%, transparent)', fg: 'var(--terracotta)', bd: 'color-mix(in oklch, var(--terracotta) 30%, transparent)' },
  };
  const t = tones[tone] || tones.neutral;
  return <span style={{
    fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.04em',
    padding: '3px 8px', background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
    borderRadius: 4, whiteSpace: 'nowrap', textTransform: 'uppercase', fontWeight: 500,
  }}>{children}</span>;
};

const Btn = ({ children, kind = 'primary', onClick, size = 'md', icon, style }) => {
  const sizes = {
    sm: { pad: '7px 12px', fs: 12 },
    md: { pad: '10px 16px', fs: 13 },
    lg: { pad: '14px 22px', fs: 15 },
  }[size];
  const kinds = {
    primary: { bg: 'var(--ink)', fg: 'var(--paper)', bd: 'var(--ink)' },
    secondary: { bg: 'transparent', fg: 'var(--ink)', bd: 'var(--line)' },
    ghost: { bg: 'transparent', fg: 'var(--ink)', bd: 'transparent' },
    nile: { bg: 'var(--nile-deep)', fg: 'var(--paper)', bd: 'var(--nile-deep)' },
    gold: { bg: 'var(--gold)', fg: 'var(--ink)', bd: 'var(--gold)' },
  }[kind];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: sizes.pad, fontSize: sizes.fs, fontWeight: 500,
      background: kinds.bg, color: kinds.fg, border: `1px solid ${kinds.bd}`,
      borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-sans)',
      transition: 'transform .12s ease, filter .18s ease', ...style
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >{icon}{children}</button>
  );
};

// ========== Flowing River SVG background (hero) ==========
const NileFlow = ({ speed = 1, opacity = 0.35 }) => {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf; const tick = () => { setT(x => x + 0.4 * speed); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [speed]);
  const path = (offset, amp, freq) => {
    const pts = [];
    for (let x = 0; x <= 1200; x += 20) {
      const y = 300 + Math.sin((x + t * (1 + offset * 0.3)) * freq) * amp + offset;
      pts.push(`${x},${y}`);
    }
    return `M0,600 L${pts.join(' L')} L1200,600 Z`;
  };
  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="none"
      style={{position: 'absolute', inset: 0, pointerEvents: 'none', opacity}}>
      <defs>
        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--nile-teal)" stopOpacity="0"/>
          <stop offset="1" stopColor="var(--nile-deep)" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
      <path d={path(-20, 18, 0.012)} fill="var(--nile-teal)" opacity="0.22"/>
      <path d={path(20, 22, 0.009)} fill="var(--nile-mid)" opacity="0.35"/>
      <path d={path(60, 28, 0.007)} fill="url(#riverGrad)" opacity="0.55"/>
    </svg>
  );
};

// ========== Chart: river / bars / area ==========
const FlowChart = ({ data, variant = 'river', height = 160, keys = ['matches','applications'], colors }) => {
  const pad = 16;
  const W = 560, H = height;
  const maxV = Math.max(...data.flatMap(d => keys.map(k => d[k])));
  const xFor = i => pad + (i / (data.length - 1)) * (W - pad * 2);
  const yFor = v => H - pad - (v / maxV) * (H - pad * 2);

  const palette = colors || ['var(--nile-mid)', 'var(--reed)', 'var(--gold)'];

  if (variant === 'bars') {
    const bw = (W - pad * 2) / (data.length * keys.length + data.length);
    return (
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {data.map((d, i) => keys.map((k, ki) => {
          const x = pad + i * (bw * keys.length + bw) + ki * bw;
          const h = (d[k] / maxV) * (H - pad * 2);
          return <rect key={`${i}-${k}`} x={x} y={H - pad - h} width={bw - 2} height={h} fill={palette[ki]} rx="1"/>;
        }))}
        {data.map((d, i) => (
          <text key={i} x={pad + i * (bw * keys.length + bw) + bw * keys.length / 2} y={H - 3}
            textAnchor="middle" fill="var(--ink-3)" fontSize="9" fontFamily="var(--font-mono)">{d.k}</text>
        ))}
      </svg>
    );
  }

  if (variant === 'area') {
    return (
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {keys.map((k, ki) => {
          const pts = data.map((d, i) => `${xFor(i)},${yFor(d[k])}`).join(' L');
          return (
            <g key={k}>
              <path d={`M${xFor(0)},${H-pad} L${pts} L${xFor(data.length-1)},${H-pad} Z`}
                fill={palette[ki]} opacity="0.2"/>
              <path d={`M${pts}`} fill="none" stroke={palette[ki]} strokeWidth="1.5"/>
            </g>
          );
        })}
        {data.map((d, i) => (
          <text key={i} x={xFor(i)} y={H - 3} textAnchor="middle" fill="var(--ink-3)" fontSize="9" fontFamily="var(--font-mono)">{d.k}</text>
        ))}
      </svg>
    );
  }

  // river variant — stacked flowing ribbons
  const series = keys.map((k, ki) => {
    const top = data.map((d, i) => ({ x: xFor(i), y: yFor(d[k]) - ki * 14 - 20 }));
    const bot = data.map((d, i) => ({ x: xFor(i), y: yFor(d[k]) - ki * 14 - 2 })).reverse();
    return { k, ki, top, bot };
  });
  const smooth = pts => pts.reduce((acc, p, i, a) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = a[i-1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} Q${cx},${prev.y} ${cx},${(prev.y + p.y)/2} T${p.x},${p.y}`;
  }, '');
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
      {series.map(s => (
        <path key={s.k} d={`${smooth(s.top)} L${smooth(s.bot).slice(1)} Z`}
          fill={palette[s.ki]} opacity={0.55 - s.ki * 0.1}/>
      ))}
      {series.map(s => (
        <path key={`l-${s.k}`} d={smooth(s.top)} fill="none" stroke={palette[s.ki]} strokeWidth="1.5" opacity="0.9"/>
      ))}
      {data.map((d, i) => (
        <text key={i} x={xFor(i)} y={H - 3} textAnchor="middle" fill="var(--ink-3)" fontSize="9" fontFamily="var(--font-mono)">{d.k}</text>
      ))}
    </svg>
  );
};

// ========== Sparkline ==========
const Spark = ({ vals, color = 'var(--nile-mid)', w = 80, h = 22 }) => {
  const max = Math.max(...vals), min = Math.min(...vals);
  const pts = vals.map((v, i) => `${(i / (vals.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(' L');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={`M${pts}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx={w} cy={h - ((vals[vals.length-1] - min) / (max - min || 1)) * h} r="2" fill={color}/>
    </svg>
  );
};

// ========== Avatar ==========
const Avatar = ({ init, color, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, color: 'var(--paper)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-mono)', fontSize: size * 0.36, fontWeight: 600,
    letterSpacing: '0.05em', flexShrink: 0,
    boxShadow: '0 1px 0 rgba(0,0,0,0.04) inset',
  }}>{init}</div>
);

// ========== Analyst Card ==========
const AnalystCard = ({ a, variant = 'editorial', onHire, isHired }) => {
  if (variant === 'compact') {
    return (
      <div style={{
        display: 'flex', gap: 14, padding: 'var(--pad-m)',
        border: '1px solid var(--line)', borderRadius: 'var(--radius-m)', background: 'var(--paper)',
        transition: 'all .2s ease', cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink-3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
        <Avatar init={a.init} color={a.color} size={42}/>
        <div style={{flex: 1, minWidth: 0}}>
          <div style={{display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline'}}>
            <div style={{fontWeight: 600, fontSize: 14}}>{a.name}</div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)'}}>${a.rate}/hr</div>
          </div>
          <div style={{fontSize: 12, color: 'var(--ink-2)', marginTop: 2}}>{a.title} · {a.loc}</div>
          <div style={{display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap'}}>
            {a.skills.slice(0, 3).map(s => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'bold') {
    return (
      <div style={{
        padding: 'var(--pad-m)', background: 'var(--ink)', color: 'var(--paper)',
        borderRadius: 'var(--radius-m)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{position:'absolute', top:-20, right:-20, opacity:0.1, fontSize: 160, lineHeight: 1, fontFamily: 'var(--font-display)', color: a.color}}>{a.init[0]}</div>
        <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
          <Avatar init={a.init} color={a.color} size={40}/>
          <div>
            <div style={{fontWeight: 600, fontSize: 15}}>{a.name}</div>
            <div style={{fontSize: 11.5, opacity: 0.65, fontFamily: 'var(--font-mono)'}}>{a.title}</div>
          </div>
        </div>
        <div style={{marginTop: 14, fontSize: 12.5, opacity: 0.8, lineHeight: 1.5}}>{a.bio}</div>
        <div style={{display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap'}}>
          {a.skills.map(s => (
            <span key={s} style={{fontFamily:'var(--font-mono)', fontSize:10, padding:'3px 7px', border:'1px solid rgba(255,255,255,0.2)', borderRadius: 3}}>{s}</span>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)'}}>
          <div style={{fontFamily: 'var(--font-display)', fontSize: 22}}>${a.rate}<span style={{fontSize:12, opacity:0.6, fontFamily:'var(--font-mono)'}}>/hr</span></div>
          <Btn kind="gold" size="sm" onClick={() => onHire(a)}>{isHired ? 'Hired ✓' : 'Hire →'}</Btn>
        </div>
      </div>
    );
  }

  // editorial — default, papyrus-styled
  return (
    <div style={{
      padding: 'var(--pad-m)', background: 'var(--paper)',
      border: '1px solid var(--line)', borderRadius: 'var(--radius-m)',
      position: 'relative', transition: 'all .2s ease',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink-3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems: 'flex-start', gap: 12}}>
        <div style={{display:'flex', gap: 12, alignItems: 'center'}}>
          <Avatar init={a.init} color={a.color} size={44}/>
          <div>
            <div style={{fontWeight:600, fontSize: 15, fontFamily: 'var(--font-display)'}}>{a.name}</div>
            <div style={{fontSize: 12, color: 'var(--ink-2)', marginTop: 2}}>{a.title}</div>
          </div>
        </div>
        <div style={{textAlign: 'right'}}>
          <div style={{fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1}}>${a.rate}
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)'}}>/hr</span></div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', marginTop: 4}}>★ {a.rating} · {a.jobs} jobs</div>
        </div>
      </div>
      <div style={{fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, marginTop: 14, textWrap: 'pretty'}}>{a.bio}</div>
      <div style={{display:'flex', gap: 5, flexWrap: 'wrap', marginTop: 14}}>
        {a.skills.map(s => <Tag key={s} tone="neutral">{s}</Tag>)}
      </div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--line)'}}>
        <div style={{display:'flex', alignItems:'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--reed)'}}>
          <Icon.Dot s={8} fill="var(--reed)"/>{a.avail}
        </div>
        <div style={{display: 'flex', gap: 6}}>
          <Btn kind="secondary" size="sm">View</Btn>
          <Btn kind="nile" size="sm" onClick={() => onHire(a)} icon={<Icon.Arrow s={12}/>}>{isHired ? 'Hired' : 'Hire'}</Btn>
        </div>
      </div>
    </div>
  );
};

// ========== Section header ==========
const SectionHeader = ({ kicker, title, sub, align = 'left' }) => (
  <div style={{textAlign: align, maxWidth: align === 'center' ? 720 : 'none', margin: align === 'center' ? '0 auto' : 0}}>
    {kicker && <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--nile-deep)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display:'flex', alignItems:'center', gap: 8, justifyContent: align==='center'?'center':'flex-start'}}>
      <span style={{display:'inline-block', width: 24, height: 1, background: 'var(--nile-deep)'}}/>{kicker}
    </div>}
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em',
      margin: 0, textWrap: 'balance',
    }}>{title}</h2>
    {sub && <p style={{fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginTop: 18, maxWidth: 620, textWrap: 'pretty', marginLeft: align==='center'?'auto':0, marginRight: align==='center'?'auto':0}}>{sub}</p>}
  </div>
);

Object.assign(window, { Chip, Tag, Btn, NileFlow, FlowChart, Spark, Avatar, AnalystCard, SectionHeader });
