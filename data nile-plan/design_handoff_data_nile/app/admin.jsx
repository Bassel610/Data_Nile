// Admin dashboard — mirrors the repo's sections
const { useState: aS, useEffect: aE, useMemo: aM, useRef: aR } = React;

// ---------- Password gate ----------
const ADMIN_PW = 'datanile'; // demo password
const PasswordGate = ({ onAuth }) => {
  const [pw, setPw] = aS('');
  const [err, setErr] = aS(false);
  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PW) {
      sessionStorage.setItem('datanile_auth', '1');
      onAuth();
    } else {
      setErr(true); setTimeout(() => setErr(false), 2000);
    }
  };
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sand-2)', padding: 20}}>
      <div style={{maxWidth: 420, width: '100%', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 16, padding: 40, boxShadow: '0 30px 60px -30px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 28}}>
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <path d="M6 22 Q 12 14, 18 22 T 30 22" stroke="var(--nile-deep)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M6 16 Q 12 8, 18 16 T 30 16" stroke="var(--nile-mid)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
          </svg>
          <div style={{fontFamily:'var(--font-display)', fontSize: 22}}>Data Nile · Admin</div>
        </div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform:'uppercase', letterSpacing: '0.12em', marginBottom: 6}}>Password required</div>
        <div style={{fontFamily:'var(--font-display)', fontSize: 28, lineHeight: 1.2, marginBottom: 24}}>Enter the key to the control room.</div>
        <form onSubmit={submit}>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} autoFocus placeholder="••••••••"
            style={{width: '100%', padding: '14px 16px', border: `1px solid ${err ? 'var(--terracotta)' : 'var(--line)'}`, borderRadius: 10, fontSize: 15, background: 'var(--sand)', color: 'var(--ink)', letterSpacing: err ? 0 : '0.2em', transition: 'border .2s'}}/>
          {err && <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--terracotta)', marginTop: 8}}>Wrong password. Try again.</div>}
          <Btn kind="primary" size="lg" style={{width: '100%', justifyContent: 'center', marginTop: 16}} icon={<Icon.Arrow s={14}/>}>Unlock</Btn>
        </form>
        <div style={{marginTop: 28, paddingTop: 20, borderTop: '1px dashed var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)'}}>
          Hint — demo password: <strong style={{color:'var(--ink-2)'}}>datanile</strong>
        </div>
      </div>
    </div>
  );
};

// ---------- Sidebar ----------
const SECTIONS = [
  { k: 'home',     l: 'Manage Home Page', icon: 'Database' },
  { k: 'images',   l: 'Manage Images',    icon: 'Pyramid' },
  { k: 'layout',   l: 'Manage Layout',    icon: 'Sun' },
  { k: 'invites',  l: 'Invites',          icon: 'Bell' },
  { k: 'password', l: 'Reset Password',   icon: 'Shield' },
];

const Sidebar = ({ active, setActive, onLogout }) => (
  <aside style={{
    width: 260, background: 'var(--ink)', color: 'var(--paper)', flexShrink: 0,
    display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh'
  }}>
    <div style={{padding: '24px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
      <div style={{display:'flex', alignItems:'center', gap: 10}}>
        <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
          <path d="M6 22 Q 12 14, 18 22 T 30 22" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M6 16 Q 12 8, 18 16 T 30 16" stroke="var(--paper)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
        </svg>
        <div>
          <div style={{fontFamily:'var(--font-display)', fontSize: 18, lineHeight: 1}}>Data Nile</div>
          <div style={{fontFamily:'var(--font-mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.15em', textTransform:'uppercase', marginTop: 3}}>Admin Console</div>
        </div>
      </div>
    </div>
    <nav style={{flex: 1, padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 2}}>
      {SECTIONS.map(s => (
        <button key={s.k} onClick={() => setActive(s.k)} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
          border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
          background: active === s.k ? 'rgba(255,255,255,0.08)' : 'transparent',
          color: active === s.k ? 'var(--gold)' : 'var(--paper)',
          fontSize: 13.5, fontWeight: active === s.k ? 600 : 400,
          borderLeft: `2px solid ${active === s.k ? 'var(--gold)' : 'transparent'}`,
          transition: 'all .15s'
        }}>
          {React.createElement(Icon[s.icon] || Icon.Dot, { s: 14 })}
          {s.l}
        </button>
      ))}
    </nav>
    <div style={{padding: 18, borderTop: '1px solid rgba(255,255,255,0.08)'}}>
      <button onClick={onLogout} style={{width: '100%', padding: '10px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: 'var(--paper)', fontSize: 13, cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap: 8}}>
        <Icon.Close s={12}/> Log out
      </button>
      <a href="Data Nile.html" target="_blank" style={{display: 'flex', justifyContent:'center', alignItems:'center', gap: 6, marginTop: 10, fontFamily:'var(--font-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.6)', textDecoration: 'none'}}>
        view landing <Icon.External s={10}/>
      </a>
    </div>
  </aside>
);

// ---------- Toast ----------
const useToast = () => {
  const [t, setT] = aS(null);
  const show = (msg, tone = 'ok') => {
    setT({ msg, tone });
    setTimeout(() => setT(null), 2400);
  };
  const ui = t && (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 500,
      padding: '14px 18px', background: 'var(--ink)', color: 'var(--paper)',
      borderRadius: 10, fontSize: 13, display:'flex', alignItems:'center', gap: 10,
      boxShadow: '0 20px 50px -20px rgba(0,0,0,0.5)', animation: 'slideInR .3s ease'
    }}>
      <div style={{width: 22, height: 22, borderRadius:'50%', background: t.tone === 'ok' ? 'var(--reed)' : 'var(--terracotta)', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Icon.Check s={13}/>
      </div>
      {t.msg}
    </div>
  );
  return [ui, show];
};

// ---------- Section wrapper ----------
const Panel = ({ kicker, title, sub, children, actions }) => (
  <div style={{padding: 'clamp(28px, 4vw, 56px)', maxWidth: 1100}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 20, marginBottom: 36, flexWrap:'wrap'}}>
      <div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--nile-deep)', letterSpacing: '0.14em', textTransform: 'uppercase', display:'flex', alignItems:'center', gap: 8, marginBottom: 12}}>
          <span style={{display:'inline-block', width: 20, height: 1, background: 'var(--nile-deep)'}}/>{kicker}
        </div>
        <h1 style={{fontFamily:'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px, 3.6vw, 46px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, textWrap: 'balance'}}>{title}</h1>
        {sub && <p style={{fontSize: 15, color: 'var(--ink-2)', marginTop: 10, maxWidth: 620, textWrap:'pretty', lineHeight: 1.55}}>{sub}</p>}
      </div>
      {actions}
    </div>
    {children}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{padding: 28, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, ...style}}>{children}</div>
);

const Field = ({ label, children, hint }) => (
  <div style={{marginBottom: 18}}>
    <label style={{display:'block', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8}}>{label}</label>
    {children}
    {hint && <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', marginTop: 6}}>{hint}</div>}
  </div>
);

const Input = (props) => (
  <input {...props} style={{width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, background: 'var(--sand)', color: 'var(--ink)', ...props.style}}/>
);
const Textarea = (props) => (
  <textarea {...props} style={{width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, background: 'var(--sand)', color: 'var(--ink)', fontFamily: 'var(--font-sans)', resize: 'vertical', minHeight: 90, ...props.style}}/>
);
const Select = (props) => (
  <select {...props} style={{width: '100%', padding: '11px 14px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, background: 'var(--sand)', color: 'var(--ink)', ...props.style}}>{props.children}</select>
);

// ---------- Manage Home Page ----------
const ManageHome = ({ toast }) => {
  const [c, setC] = DataNileStore.useContent();
  const [hero, setHero] = aS({ t: c.heroTitle, s: c.heroSub });
  const [about, setAbout] = aS(c.about);
  const [services, setServices] = aS(c.services);
  const [form, setForm] = aS(c.contactForm);

  const saveHero = () => { setC({ heroTitle: hero.t, heroSub: hero.s }); toast('Hero updated'); };
  const saveAbout = () => { setC({ about }); toast('About saved'); };
  const saveServices = () => { setC({ services }); toast('Services saved'); };
  const saveForm = () => { setC({ contactForm: form }); toast('Contact form saved'); };

  return (
    <Panel kicker="Home page" title="Manage home page content" sub="Edit what visitors see on the landing page — hero, about, services and the contact form.">
      <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        {/* Hero */}
        <Card>
          <SubHead title="Hero" onSave={saveHero}/>
          <Field label="Headline">
            <Textarea value={hero.t} onChange={e => setHero(h => ({...h, t: e.target.value}))} rows="2"/>
          </Field>
          <Field label="Subtitle">
            <Textarea value={hero.s} onChange={e => setHero(h => ({...h, s: e.target.value}))}/>
          </Field>
        </Card>

        {/* About */}
        <Card>
          <SubHead title="About section" onSave={saveAbout}/>
          <Field label="Title"><Input value={about.title} onChange={e => setAbout(a => ({...a, title: e.target.value}))}/></Field>
          <Field label="Description"><Textarea value={about.description} rows="4" onChange={e => setAbout(a => ({...a, description: e.target.value}))}/></Field>
        </Card>

        {/* Services */}
        <Card>
          <SubHead title="Our Services" onSave={saveServices}/>
          <Field label="Section title"><Input value={services.title} onChange={e => setServices(s => ({...s, title: e.target.value}))}/></Field>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12, marginTop: 8}}>Items</div>
          {services.items.map((it, i) => (
            <div key={i} style={{padding: 14, background: 'var(--sand)', border: '1px solid var(--line-soft)', borderRadius: 10, marginBottom: 10, display: 'grid', gridTemplateColumns: '1fr 1.8fr auto', gap: 12, alignItems: 'start'}}>
              <Input value={it.t} onChange={e => setServices(s => ({...s, items: s.items.map((x, j) => j===i ? {...x, t: e.target.value} : x)}))}/>
              <Textarea rows="2" value={it.d} onChange={e => setServices(s => ({...s, items: s.items.map((x, j) => j===i ? {...x, d: e.target.value} : x)}))}/>
              <button onClick={() => setServices(s => ({...s, items: s.items.filter((_, j) => j !== i)}))} style={{padding: 8, background: 'transparent', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer', color: 'var(--terracotta)'}}><Icon.Close s={14}/></button>
            </div>
          ))}
          <Btn kind="secondary" size="sm" icon={<Icon.Plus s={12}/>} onClick={() => setServices(s => ({...s, items: [...s.items, {t: 'New service', d: 'Describe it'}]}))}>Add service</Btn>
        </Card>

        {/* Contact form builder */}
        <Card>
          <SubHead title="Contact form fields" onSave={saveForm}/>
          <div style={{fontSize: 13, color: 'var(--ink-2)', marginBottom: 16}}>Build the fields visitors see when they click Connect.</div>
          {form.map((f, i) => (
            <div key={f.id} style={{padding: 14, background: 'var(--sand)', border: '1px solid var(--line-soft)', borderRadius: 10, marginBottom: 10, display: 'grid', gridTemplateColumns: '120px 1fr 1fr auto', gap: 10, alignItems: 'start'}}>
              <Select value={f.type} onChange={e => setForm(fs => fs.map((x, j) => j===i ? {...x, type: e.target.value} : x))}>
                <option value="input">Input</option>
                <option value="textarea">Textarea</option>
                <option value="select">Dropdown</option>
              </Select>
              <Input placeholder="Label" value={f.label} onChange={e => setForm(fs => fs.map((x, j) => j===i ? {...x, label: e.target.value} : x))}/>
              {f.type === 'select' ? (
                <Input placeholder="Option 1, Option 2, …" value={f.value.join(', ')} onChange={e => setForm(fs => fs.map((x, j) => j===i ? {...x, value: e.target.value.split(',').map(s => s.trim())} : x))}/>
              ) : (
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', padding: '11px 0'}}>— user fills in —</div>
              )}
              <button onClick={() => setForm(fs => fs.filter((_, j) => j !== i))} style={{padding: 8, background: 'transparent', border: '1px solid var(--line)', borderRadius: 6, cursor: 'pointer', color: 'var(--terracotta)'}}><Icon.Close s={14}/></button>
            </div>
          ))}
          <Btn kind="secondary" size="sm" icon={<Icon.Plus s={12}/>} onClick={() => setForm(fs => [...fs, {id: 'f' + Date.now(), type: 'input', label: 'New field', value: ['']}])}>Add field</Btn>
        </Card>
      </div>
    </Panel>
  );
};

const SubHead = ({ title, onSave }) => (
  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--line-soft)'}}>
    <div style={{fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '-0.01em'}}>{title}</div>
    <Btn kind="primary" size="sm" onClick={onSave} icon={<Icon.Check s={13}/>}>Save changes</Btn>
  </div>
);

// ---------- Manage Images ----------
const ManageImages = ({ toast }) => {
  const categories = [
    { k: 'slider', l: 'Slider' },
    { k: 'gallery', l: 'Gallery' },
    { k: 'stored', l: 'Stored photos' },
    { k: 'logos', l: 'Logos' },
  ];
  const placeholders = {
    slider:  ['oklch(0.55 0.10 230)', 'oklch(0.58 0.12 45)', 'oklch(0.55 0.10 150)'],
    gallery: ['oklch(0.76 0.12 75)', 'oklch(0.48 0.09 225)', 'oklch(0.55 0.10 150)', 'oklch(0.58 0.12 45)'],
    stored:  ['oklch(0.62 0.08 195)', 'oklch(0.35 0.08 235)'],
    logos:   ['oklch(0.32 0.07 235)', 'oklch(0.20 0.02 250)'],
  };
  return (
    <Panel kicker="Images" title="Manage images" sub="Drop in hero slider imagery, gallery shots, logos, and the photo library.">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18}}>
        {categories.map(c => (
          <Card key={c.k}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center', marginBottom: 16}}>
              <div style={{fontFamily: 'var(--font-display)', fontSize: 20}}>{c.l}</div>
              <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)'}}>{placeholders[c.k].length} items</span>
            </div>
            <div style={{
              border: '1.5px dashed var(--line)', borderRadius: 10, padding: 24,
              background: 'var(--sand)', textAlign: 'center', cursor: 'pointer',
              transition: 'all .2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--nile-deep)'; e.currentTarget.style.background = 'color-mix(in oklch, var(--nile-deep) 4%, var(--sand))'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--sand)'; }}
            onClick={() => toast('Drag & drop (demo)')}>
              <div style={{color:'var(--nile-deep)'}}><Icon.Plus s={22}/></div>
              <div style={{fontSize: 13, color: 'var(--ink-2)', marginTop: 8}}>Drop files or click to browse</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', marginTop: 4}}>PNG, JPG, WebP · up to 10 MB</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 16}}>
              {placeholders[c.k].map((bg, i) => (
                <div key={i} style={{
                  aspectRatio: '1', borderRadius: 8, background: `linear-gradient(135deg, ${bg}, color-mix(in oklch, ${bg} 60%, var(--ink)))`,
                  position: 'relative', overflow: 'hidden', cursor: 'pointer',
                  border: i === 0 && c.k === 'logos' ? '2px solid var(--gold)' : 'none',
                }}>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 6, fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.9)'}}>
                    {c.k}_{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <div style={{marginTop: 18, display: 'flex', gap: 10}}>
        <Btn kind="primary" onClick={() => toast('Images uploaded')} icon={<Icon.Arrow s={13}/>}>Upload all</Btn>
        <Btn kind="secondary" onClick={() => toast('Gallery opened')}>Open full gallery</Btn>
      </div>
    </Panel>
  );
};

// ---------- Manage Layout (color palette) ----------
const COLOR_PALETTE = {
  '--nile-deep':   ['oklch(0.32 0.07 235)', 'oklch(0.28 0.08 260)', 'oklch(0.35 0.08 155)', 'oklch(0.30 0.09 20)',  'oklch(0.25 0.05 280)'],
  '--terracotta':  ['oklch(0.58 0.12 45)',  'oklch(0.62 0.14 30)',  'oklch(0.55 0.13 60)',  'oklch(0.50 0.15 15)',  'oklch(0.60 0.10 80)'],
  '--reed':        ['oklch(0.55 0.10 150)', 'oklch(0.58 0.12 140)', 'oklch(0.50 0.09 170)', 'oklch(0.62 0.11 130)', 'oklch(0.48 0.08 180)'],
  '--gold':        ['oklch(0.76 0.12 75)',  'oklch(0.80 0.14 70)',  'oklch(0.72 0.13 85)',  'oklch(0.78 0.11 60)',  'oklch(0.70 0.10 90)'],
  '--sand':        ['oklch(0.94 0.025 82)', 'oklch(0.96 0.02 90)',  'oklch(0.92 0.03 70)',  'oklch(0.93 0.02 200)', 'oklch(0.95 0.02 150)'],
  '--ink':         ['oklch(0.20 0.018 250)','oklch(0.15 0.02 250)', 'oklch(0.22 0.02 30)',  'oklch(0.18 0.01 150)', 'oklch(0.25 0.025 280)'],
};

const ManageLayout = ({ toast }) => {
  const [picked, setPicked] = aS(() => JSON.parse(localStorage.getItem('datanile_theme') || '{}'));

  const pick = (k, v) => {
    const next = { ...picked, [k]: v };
    setPicked(next);
    Object.entries(next).forEach(([kk, vv]) => document.documentElement.style.setProperty(kk, vv));
    localStorage.setItem('datanile_theme', JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('datanile:theme'));
  };
  const reset = () => {
    setPicked({});
    localStorage.removeItem('datanile_theme');
    Object.keys(COLOR_PALETTE).forEach(k => document.documentElement.style.removeProperty(k));
    window.dispatchEvent(new CustomEvent('datanile:theme'));
    toast('Theme reset');
  };

  return (
    <Panel kicker="Layout" title="Manage layout & theme"
      sub="Pick the palette visitors see on the landing page. Changes sync instantly."
      actions={<Btn kind="secondary" size="sm" onClick={reset}>Reset to defaults</Btn>}>
      <Card>
        <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
          {Object.entries(COLOR_PALETTE).map(([key, options]) => (
            <div key={key} style={{display:'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'center', padding: '12px 0', borderBottom: '1px dashed var(--line)'}}>
              <div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)'}}>{key}</div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', marginTop: 4}}>{picked[key] || options[0]}</div>
              </div>
              <div style={{display:'flex', gap: 10, alignItems:'center', flexWrap:'wrap'}}>
                {options.map(v => {
                  const active = (picked[key] || options[0]) === v;
                  return (
                    <button key={v} onClick={() => pick(key, v)} style={{
                      width: 40, height: 40, borderRadius: '50%', background: v,
                      border: active ? `2px solid var(--ink)` : '1px solid var(--line)',
                      outline: active ? '3px solid var(--sand)' : 'none', outlineOffset: -5,
                      cursor: 'pointer', padding: 0, transition: 'transform .15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}/>
                  );
                })}
                <label style={{display:'inline-flex', alignItems:'center', gap: 6, fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', cursor: 'pointer'}}>
                  <span style={{width: 28, height: 28, borderRadius: 6, border: '1.5px dashed var(--line)', display:'flex', alignItems:'center', justifyContent:'center'}}>+</span>
                  custom
                  <input type="color" style={{display:'none'}} onChange={e => pick(key, e.target.value)}/>
                </label>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{marginTop: 18}}>
        <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10}}>Preview</div>
        <Card style={{padding: 0, overflow: 'hidden'}}>
          <div style={{padding: 28, background: 'linear-gradient(135deg, var(--nile-deep), var(--nile-mid))', color: 'var(--paper)'}}>
            <div style={{fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '-0.015em'}}>The river flows.</div>
            <div style={{fontSize: 13, opacity: 0.8, marginTop: 6}}>This is how your landing hero will look.</div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: 16, gap: 10}}>
            {['nile-deep','terracotta','reed','gold'].map(t => (
              <div key={t} style={{padding: 14, borderRadius: 8, background: `var(--${t})`, color: 'var(--paper)', fontSize: 12, fontFamily: 'var(--font-mono)'}}>{t}</div>
            ))}
          </div>
        </Card>
      </div>
    </Panel>
  );
};

// ---------- Invites ----------
const Invites = ({ toast }) => {
  const [c, setC] = DataNileStore.useContent();
  const [selected, setSelected] = aS(null);
  const remove = (id) => {
    setC({ invites: c.invites.filter(i => i.id !== id) });
    if (selected && selected.id === id) setSelected(null);
    toast('Invite deleted');
  };

  return (
    <Panel kicker="Invites" title="Connect requests" sub="Every submission from the landing's Connect form lands here. Review and respond.">
      <div style={{display:'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18}}>
        <Card style={{padding: 0}}>
          <div style={{padding: '16px 22px', borderBottom: '1px solid var(--line-soft)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform:'uppercase', letterSpacing: '0.1em'}}>{c.invites.length} in inbox</div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--reed)', display:'flex', alignItems:'center', gap: 6}}>
              <Icon.Dot s={6} fill="var(--reed)"/> live
            </div>
          </div>
          {c.invites.length === 0 && (
            <div style={{padding: 48, textAlign: 'center', color: 'var(--ink-3)'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize: 20, color: 'var(--ink-2)'}}>No invites yet.</div>
              <div style={{fontSize: 13, marginTop: 6}}>Submissions will appear here in real time.</div>
            </div>
          )}
          {c.invites.map(inv => (
            <div key={inv.id} onClick={() => setSelected(inv)} style={{
              padding: '18px 22px', borderBottom: '1px solid var(--line-soft)', cursor: 'pointer',
              background: selected?.id === inv.id ? 'var(--sand)' : 'transparent', transition: 'background .15s'
            }}
            onMouseEnter={e => { if (selected?.id !== inv.id) e.currentTarget.style.background = 'color-mix(in oklch, var(--sand) 60%, transparent)'; }}
            onMouseLeave={e => { if (selected?.id !== inv.id) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: 10}}>
                <div style={{fontWeight: 600, fontSize: 14.5}}>{inv.name || '—'}</div>
                <div style={{fontFamily:'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)'}}>{inv.at}</div>
              </div>
              <div style={{fontSize: 12.5, color: 'var(--ink-2)', marginTop: 2}}>{inv.email || '—'}</div>
              {inv.msg && <div style={{fontSize: 13, color: 'var(--ink-2)', marginTop: 10, lineHeight: 1.5, display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{inv.msg}</div>}
              <div style={{display:'flex', gap: 6, marginTop: 10, flexWrap: 'wrap'}}>
                {inv.role && <Tag tone="nile">{inv.role}</Tag>}
                {inv.budget && inv.budget !== '—' && <Tag tone="gold">{inv.budget}</Tag>}
              </div>
            </div>
          ))}
        </Card>

        <Card>
          {selected ? (
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 10}}>
                <div>
                  <div style={{fontFamily:'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', textTransform:'uppercase', letterSpacing: '0.1em'}}>Invite · {selected.at}</div>
                  <div style={{fontFamily: 'var(--font-display)', fontSize: 24, marginTop: 6}}>{selected.name || '—'}</div>
                </div>
                <button onClick={() => setSelected(null)} style={{border: 'none', background: 'var(--sand-2)', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}><Icon.Close s={13}/></button>
              </div>
              <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
                {Object.entries(selected).filter(([k]) => !['id','at','name'].includes(k)).map(([k, v]) => (
                  <div key={k}>
                    <div style={{fontFamily:'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform:'uppercase', letterSpacing: '0.1em', marginBottom: 4}}>{k.replace(/_/g, ' ')}</div>
                    <div style={{fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, textWrap:'pretty'}}>{v || '—'}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--line-soft)'}}>
                <Btn kind="primary" size="sm" onClick={() => toast('Reply drafted')} icon={<Icon.Arrow s={12}/>}>Reply</Btn>
                <Btn kind="secondary" size="sm" onClick={() => remove(selected.id)} style={{color: 'var(--terracotta)', borderColor: 'color-mix(in oklch, var(--terracotta) 35%, transparent)'}}>Delete</Btn>
              </div>
            </div>
          ) : (
            <div style={{padding: 40, textAlign: 'center', color: 'var(--ink-3)'}}>
              <div style={{fontFamily:'var(--font-display)', fontSize: 20, color: 'var(--ink-2)'}}>Select an invite</div>
              <div style={{fontSize: 13, marginTop: 6}}>Pick one from the list to see full details.</div>
            </div>
          )}
        </Card>
      </div>
    </Panel>
  );
};

// ---------- Reset Password ----------
const ResetPwd = ({ toast }) => {
  const [p1, setP1] = aS('');
  const [p2, setP2] = aS('');
  const [err, setErr] = aS('');
  const submit = (e) => {
    e.preventDefault();
    if (!p1 || !p2) return setErr('Both fields are required.');
    if (p1 !== p2) return setErr('Passwords do not match.');
    if (p1.length < 6) return setErr('Use at least 6 characters.');
    setErr(''); setP1(''); setP2('');
    toast('Password reset');
  };
  return (
    <Panel kicker="Security" title="Reset admin password" sub="Change the password required to enter this console.">
      <Card style={{maxWidth: 500}}>
        <form onSubmit={submit}>
          <Field label="New password"><Input type="password" value={p1} onChange={e => setP1(e.target.value)} placeholder="At least 6 characters"/></Field>
          <Field label="Confirm password"><Input type="password" value={p2} onChange={e => setP2(e.target.value)} placeholder="Re-enter it"/></Field>
          {err && <div style={{fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--terracotta)', marginBottom: 14}}>{err}</div>}
          <Btn kind="primary" size="lg" style={{width: '100%', justifyContent: 'center'}} icon={<Icon.Check s={14}/>}>Update password</Btn>
        </form>
        <div style={{marginTop: 20, paddingTop: 18, borderTop: '1px dashed var(--line)', fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', lineHeight: 1.6}}>
          Tip — this is a demo. In production, passwords are hashed server-side and enforced with session tokens.
        </div>
      </Card>
    </Panel>
  );
};

// ---------- App ----------
const Admin = () => {
  const [authed, setAuthed] = aS(() => sessionStorage.getItem('datanile_auth') === '1');
  const [active, setActive] = aS(() => localStorage.getItem('datanile_admin_section') || 'home');
  const [toastUI, toast] = useToast();

  aE(() => { localStorage.setItem('datanile_admin_section', active); }, [active]);
  aE(() => {
    const saved = JSON.parse(localStorage.getItem('datanile_theme') || '{}');
    Object.entries(saved).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)}/>;

  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <Sidebar active={active} setActive={setActive} onLogout={() => { sessionStorage.removeItem('datanile_auth'); setAuthed(false); }}/>
      <main style={{flex: 1, background: 'var(--sand-2)', minWidth: 0}}>
        {active === 'home' && <ManageHome toast={toast}/>}
        {active === 'images' && <ManageImages toast={toast}/>}
        {active === 'layout' && <ManageLayout toast={toast}/>}
        {active === 'invites' && <Invites toast={toast}/>}
        {active === 'password' && <ResetPwd toast={toast}/>}
      </main>
      {toastUI}
    </div>
  );
};

const astyle = document.createElement('style');
astyle.textContent = `
  @keyframes slideInR { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  input:focus, textarea:focus, select:focus { outline: none; border-color: var(--nile-deep) !important; }
  button:hover { filter: brightness(1.02); }
`;
document.head.appendChild(astyle);

ReactDOM.createRoot(document.getElementById('root')).render(<Admin/>);
