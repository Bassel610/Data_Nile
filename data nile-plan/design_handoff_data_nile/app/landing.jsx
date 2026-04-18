// Landing sections matching the repo: Hero/Slider, About, Video, Services, Contact
const { useState: uS, useEffect: uE, useMemo: uM, useRef: uR } = React;

// ---------- Nav ----------
const Nav = ({ onConnect }) => (
  <nav style={{
    position: 'sticky', top: 0, zIndex: 50,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '18px clamp(24px,5vw,64px)',
    background: 'color-mix(in oklch, var(--sand) 88%, transparent)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--line-soft)',
  }}>
    <div style={{display:'flex', alignItems:'center', gap: 10}}>
      <Logo/>
      <div style={{fontFamily:'var(--font-display)', fontSize: 22, letterSpacing: '-0.01em'}}>Data Nile</div>
    </div>
    <div style={{display: 'flex', gap: 28, fontSize: 14, color: 'var(--ink-2)'}}>
      {[{l:'Home', id:'home'},{l:'About', id:'about'},{l:'Services', id:'services'},{l:'Contact', id:'connect'}].map(n => (
        <a key={n.id} href={`#${n.id}`} style={{color: 'inherit', textDecoration: 'none'}}>{n.l}</a>
      ))}
    </div>
    <Btn kind="primary" size="sm" onClick={onConnect} icon={<Icon.Arrow s={12}/>}>Connect</Btn>
  </nav>
);

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M6 22 Q 12 14, 18 22 T 30 22" stroke="var(--nile-deep)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M6 16 Q 12 8, 18 16 T 30 16" stroke="var(--nile-mid)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    <path d="M6 28 Q 12 20, 18 28 T 30 28" stroke="var(--nile-teal)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
  </svg>
);

// ---------- Hero / Slider ----------
const HeroSlider = ({ onConnect }) => {
  const [c] = DataNileStore.useContent();
  const slides = [
    { kicker: 'Vetted data talent', title: c.heroTitle, sub: c.heroSub, tint: 'var(--nile-deep)' },
    { kicker: 'Shortlist in one hour', title: <>Three analysts, <em style={{fontStyle:'italic', color:'var(--terracotta)'}}>ranked by fit.</em></>, sub: 'Our matching engine screens thousands of profiles against your stack, industry, and timeline.', tint: 'var(--terracotta)' },
    { kicker: 'One contract, one dashboard', title: <>No agencies. <em style={{fontStyle:'italic', color:'var(--reed)'}}>No overhead.</em></>, sub: 'Post a project, approve milestones, pay on delivery. Everything flows through one place.', tint: 'var(--reed)' },
  ];
  const [i, setI] = uS(0);
  uE(() => {
    const id = setInterval(() => setI(x => (x + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="home" style={{position: 'relative', overflow: 'hidden', background: 'var(--sand)', padding: 'clamp(60px, 8vw, 110px) clamp(24px, 5vw, 64px) clamp(40px, 5vw, 80px)'}}>
      <NileFlow speed={0.8} opacity={0.3}/>
      <div style={{position: 'relative', maxWidth: 1280, margin: '0 auto', display:'grid', gridTemplateColumns:'1.15fr 1fr', gap: 60, alignItems: 'center', minHeight: 520}}>
        <div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 11.5, color: slides[i].tint,
            letterSpacing: '0.18em', textTransform: 'uppercase', display:'flex', alignItems:'center', gap: 10, transition: 'color .6s'}}>
            <Icon.Wave s={14}/> {slides[i].kicker}
          </div>
          <h1 key={i} style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(44px, 6.5vw, 88px)', lineHeight: 0.98, letterSpacing: '-0.035em',
            margin: '24px 0 0', textWrap: 'balance',
            animation: 'fadeUp .7s ease',
          }}>{slides[i].title}</h1>
          <p style={{fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', marginTop: 24, maxWidth: 560, textWrap: 'pretty'}}>{slides[i].sub}</p>
          <div style={{display:'flex', gap: 12, marginTop: 36, flexWrap:'wrap'}}>
            <Btn kind="primary" size="lg" icon={<Icon.Arrow s={14}/>} onClick={onConnect}>Connect with us</Btn>
            <Btn kind="secondary" size="lg" onClick={() => document.getElementById('about').scrollIntoView({behavior:'smooth'})}>Learn more</Btn>
          </div>
          <div style={{display:'flex', gap: 8, marginTop: 42}}>
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} style={{
                width: idx === i ? 36 : 10, height: 4, borderRadius: 2,
                background: idx === i ? 'var(--ink)' : 'var(--line)',
                border: 'none', cursor: 'pointer', padding: 0, transition: 'all .4s'
              }}/>
            ))}
          </div>
        </div>
        <HeroVisual/>
      </div>
    </section>
  );
};

const HeroVisual = () => (
  <div style={{position: 'relative', height: 520}}>
    <div style={{position: 'absolute', right: 10, top: -20, opacity: 0.1, color: 'var(--nile-deep)'}}>
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M90 20 L170 160 L10 160 Z"/>
        <path d="M90 20 L90 160 M10 160 L90 120 L170 160"/>
        <path d="M30 160 L90 60 L150 160"/>
      </svg>
    </div>
    {[
      { a: ANALYSTS[0], top: 30,  left: 30,  rot: -3, z: 3 },
      { a: ANALYSTS[4], top: 200, left: 70,  rot: 2,  z: 2 },
      { a: ANALYSTS[1], top: 350, left: 10,  rot: -1, z: 1 },
    ].map((c, i) => (
      <div key={i} style={{
        position: 'absolute', top: c.top, left: c.left, width: 340,
        transform: `rotate(${c.rot}deg)`, zIndex: c.z,
        animation: `floaty 8s ease-in-out ${i * -2}s infinite`,
      }}>
        <HeroCard a={c.a}/>
      </div>
    ))}
  </div>
);

const HeroCard = ({ a }) => (
  <div style={{
    padding: 14, background: 'var(--paper)', border: '1px solid var(--line)',
    borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center',
    boxShadow: '0 20px 50px -20px rgba(20,30,50,0.25)',
  }}>
    <Avatar init={a.init} color={a.color} size={46}/>
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <div style={{fontWeight: 600, fontSize: 14}}>{a.name}</div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--ink-3)'}}>${a.rate}/hr</div>
      </div>
      <div style={{fontSize: 12, color: 'var(--ink-2)', marginTop: 2}}>{a.title}</div>
      <div style={{display:'flex', gap: 4, marginTop: 8}}>{a.skills.slice(0,3).map(s => <Tag key={s}>{s}</Tag>)}</div>
    </div>
  </div>
);

// ---------- About ----------
const AboutSection = () => {
  const [c] = DataNileStore.useContent();
  return (
    <section id="about" style={{padding: 'clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)', background: 'var(--sand-2)', borderTop: '1px solid var(--line-soft)'}}>
      <div style={{maxWidth: 1280, margin: '0 auto', display:'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'start'}}>
        <div style={{position: 'sticky', top: 100}}>
          <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--nile-deep)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display:'flex', alignItems:'center', gap: 8}}>
            <span style={{display:'inline-block', width: 24, height: 1, background: 'var(--nile-deep)'}}/>About
          </div>
          <div style={{fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--ink-3)', lineHeight: 1.5, textWrap:'pretty'}}>
            "The river doesn't hurry, yet it arrives."
          </div>
        </div>
        <div>
          <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, textWrap: 'balance'}}>{c.about.title}</h2>
          <p style={{fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.6, marginTop: 28, textWrap: 'pretty'}}>{c.about.description}</p>
          <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)'}}>
            {[{n:'2,400+', l:'vetted analysts'},{n:'94%', l:'retention rate'},{n:'3.2 days', l:'avg. time to hire'}].map(s => (
              <div key={s.l}>
                <div style={{fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1, letterSpacing: '-0.02em'}}>{s.n}</div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.1em'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Video ----------
const VideoSection = () => (
  <section style={{padding: 'clamp(60px, 7vw, 100px) clamp(24px, 5vw, 64px)', background: 'var(--sand)'}}>
    <div style={{maxWidth: 1280, margin: '0 auto'}}>
      <div style={{
        position: 'relative', aspectRatio: '16/8.5', borderRadius: 'var(--radius-l)',
        background: 'linear-gradient(135deg, var(--nile-deep), var(--nile-mid) 60%, var(--nile-teal))',
        overflow: 'hidden', boxShadow: '0 30px 80px -30px rgba(20,30,50,0.35)',
      }}>
        <NileFlow speed={0.6} opacity={0.45}/>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--paper)'}}>
          <button style={{
            width: 84, height: 84, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', cursor: 'pointer',
            display:'flex', alignItems:'center', justifyContent: 'center', transition: 'all .2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}>
            <svg width="22" height="24" viewBox="0 0 22 24" fill="white"><path d="M0 0 L22 12 L0 24 Z"/></svg>
          </button>
          <div style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform:'uppercase', marginTop: 28, opacity: 0.8}}>Our story · 2 min</div>
          <div style={{fontFamily:'var(--font-display)', fontSize: 'clamp(26px, 3.2vw, 40px)', marginTop: 10, textWrap:'balance', maxWidth: 640, textAlign:'center', lineHeight: 1.2, padding: '0 40px'}}>
            How three companies built their data teams in under a week.
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Services ----------
const Services = () => {
  const [c] = DataNileStore.useContent();
  return (
    <section id="services" style={{padding: 'clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)', background: 'var(--sand-2)', borderTop: '1px solid var(--line-soft)'}}>
      <div style={{maxWidth: 1280, margin: '0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 40, flexWrap:'wrap', marginBottom: 48}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display:'flex', alignItems:'center', gap: 8}}>
              <span style={{display:'inline-block', width: 24, height: 1, background: 'var(--terracotta)'}}/>What we do
            </div>
            <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.6vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, textWrap: 'balance', maxWidth: 700}}>
              {c.services.title}
            </h2>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius-l)', overflow: 'hidden', background: 'var(--paper)'}}>
          {c.services.items.map((s, i) => (
            <div key={i} style={{
              padding: 'clamp(28px, 3vw, 44px)',
              borderRight: (i + 1) % 4 !== 0 ? '1px solid var(--line)' : 'none',
              borderBottom: '1px solid var(--line)',
              transition: 'background .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--sand)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em'}}>0{i+1}</div>
              <div style={{fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 14, letterSpacing: '-0.01em', lineHeight: 1.2, textWrap: 'balance'}}>{s.t}</div>
              <div style={{fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, marginTop: 14, textWrap: 'pretty'}}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Contact (modal form, driven by admin-editable fields) ----------
const ContactModal = ({ open, onClose }) => {
  const [c] = DataNileStore.useContent();
  const [values, setValues] = uS({});
  const [sent, setSent] = uS(false);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    // Append to invites
    const content = DataNileStore.getContent();
    const entry = { id: 'i' + Date.now(), at: 'just now', ...values };
    DataNileStore.setContent({ ...content, invites: [entry, ...content.invites] });
    setSent(true);
    setTimeout(() => { setSent(false); setValues({}); onClose(); }, 1800);
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(20,20,30,0.55)', backdropFilter: 'blur(6px)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      animation: 'fadeIn .25s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--paper)', borderRadius: 16, width: '100%', maxWidth: 540,
        maxHeight: '90vh', overflow: 'auto',
        boxShadow: '0 30px 80px -20px rgba(0,0,0,0.4)',
      }}>
        <div style={{padding: '22px 28px', borderBottom: '1px solid var(--line-soft)', display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--nile-deep)', letterSpacing: '0.14em', textTransform: 'uppercase'}}>Connect</div>
            <div style={{fontFamily: 'var(--font-display)', fontSize: 26, marginTop: 4}}>Let's flow together.</div>
          </div>
          <button onClick={onClose} style={{border: 'none', background: 'var(--sand-2)', width: 34, height: 34, borderRadius: '50%', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.Close s={16}/>
          </button>
        </div>
        {sent ? (
          <div style={{padding: 60, textAlign: 'center'}}>
            <div style={{width: 54, height: 54, borderRadius: '50%', background: 'var(--reed)', color: 'var(--paper)', display:'inline-flex', alignItems:'center', justifyContent:'center', margin: '0 auto'}}><Icon.Check s={22}/></div>
            <div style={{fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 18}}>Downstream.</div>
            <div style={{fontSize: 14, color: 'var(--ink-2)', marginTop: 8}}>We'll be in touch within a day.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{padding: '24px 28px 28px'}}>
            {c.contactForm.map(f => (
              <div key={f.id} style={{marginBottom: 18}}>
                <label style={{display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8}}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea required value={values[f.id] || ''} onChange={e => setValues(v => ({...v, [f.id]: e.target.value}))}
                    rows="3" style={{width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: 14, background: 'var(--sand)', color: 'var(--ink)', resize: 'vertical'}}/>
                ) : f.type === 'select' ? (
                  <select required value={values[f.id] || ''} onChange={e => setValues(v => ({...v, [f.id]: e.target.value}))}
                    style={{width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: 14, background: 'var(--sand)', color: 'var(--ink)'}}>
                    <option value="">Choose…</option>
                    {f.value.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                ) : (
                  <input required type={f.id === 'email' ? 'email' : 'text'} value={values[f.id] || ''} onChange={e => setValues(v => ({...v, [f.id]: e.target.value}))}
                    style={{width: '100%', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 8, fontFamily: 'var(--font-sans)', fontSize: 14, background: 'var(--sand)', color: 'var(--ink)'}}/>
                )}
              </div>
            ))}
            <Btn kind="primary" size="lg" style={{width: '100%', justifyContent: 'center'}} icon={<Icon.Arrow s={14}/>}>Send</Btn>
          </form>
        )}
      </div>
    </div>
  );
};

// ---------- Contact CTA Band ----------
const ContactBand = ({ onConnect }) => (
  <section id="connect" style={{padding: 'clamp(70px, 9vw, 120px) clamp(24px, 5vw, 64px)', background: 'var(--ink)', color: 'var(--paper)', position: 'relative', overflow: 'hidden'}}>
    <NileFlow speed={0.5} opacity={0.3}/>
    <div style={{position: 'relative', maxWidth: 1280, margin: '0 auto', display:'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center'}}>
      <div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14, display:'flex', alignItems:'center', gap: 8}}>
          <span style={{display:'inline-block', width: 24, height: 1, background: 'var(--gold)'}}/>Contact
        </div>
        <h2 style={{fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(36px, 4.8vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.025em', margin: 0, textWrap: 'balance'}}>
          Your data team is three clicks away.
        </h2>
        <p style={{fontSize: 17, opacity: 0.75, marginTop: 20, maxWidth: 520, textWrap:'pretty', lineHeight: 1.55}}>
          Tell us what you're building, and we'll send a shortlist within the day.
        </p>
      </div>
      <div style={{display:'flex', justifyContent: 'flex-end'}}>
        <Btn kind="gold" size="lg" onClick={onConnect} icon={<Icon.Arrow s={14}/>}>Connect with us</Btn>
      </div>
    </div>
  </section>
);

// ---------- Footer ----------
const Footer = () => (
  <footer style={{padding: '48px clamp(24px,5vw,64px) 32px', background: 'var(--sand)', borderTop: '1px solid var(--line)'}}>
    <div style={{maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20}}>
      <div style={{display:'flex', alignItems:'center', gap: 10}}>
        <Logo/>
        <div style={{fontFamily:'var(--font-display)', fontSize: 20}}>Data Nile</div>
        <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginLeft: 16}}>© 2026 · Flowing since forever</span>
      </div>
      <div style={{display:'flex', gap: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)'}}>
        <a href="Data Nile Admin.html" style={{color: 'inherit', textDecoration: 'none', display:'inline-flex', alignItems:'center', gap: 5}}>
          Admin <Icon.External s={10}/>
        </a>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Nav, HeroSlider, AboutSection, VideoSection, Services, ContactModal, ContactBand, Footer, Logo });
