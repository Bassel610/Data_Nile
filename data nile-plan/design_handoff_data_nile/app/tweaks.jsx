// Tweaks panel — hidden by default; toolbar toggle reveals it
const Tweaks = ({ values, setValues, visible, onClose }) => {
  if (!visible) return null;

  const set = (k, v) => {
    const next = { ...values, [k]: v };
    setValues(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const Row = ({ label, children }) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14}}>
      <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em'}}>{label}</div>
      <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>{children}</div>
    </div>
  );
  const Pill = ({ k, v, cur }) => (
    <button onClick={() => set(k, v)} style={{
      padding: '6px 11px', fontSize: 12, fontFamily: 'var(--font-mono)',
      background: cur === v ? 'var(--ink)' : 'transparent',
      color: cur === v ? 'var(--paper)' : 'var(--ink-2)',
      border: `1px solid ${cur === v ? 'var(--ink)' : 'var(--line)'}`,
      borderRadius: 6, cursor: 'pointer', textTransform: 'lowercase'
    }}>{v}</button>
  );

  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, width: 300, zIndex: 9999,
      background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 12,
      boxShadow: '0 20px 60px -20px rgba(0,0,0,0.3)', padding: 18,
      fontFamily: 'var(--font-sans)', color: 'var(--ink)',
    }}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16}}>
        <div style={{fontFamily: 'var(--font-display)', fontSize: 18}}>Tweaks</div>
        <button onClick={onClose} style={{border: 'none', background: 'transparent', cursor:'pointer', color: 'var(--ink-3)'}}><Icon.Close s={14}/></button>
      </div>
      <Row label="Theme">
        {['papyrus','midnight','reed'].map(v => <Pill key={v} k="theme" v={v} cur={values.theme}/>)}
      </Row>
      <Row label="Typography">
        {['editorial','classical','technical'].map(v => <Pill key={v} k="font" v={v} cur={values.font}/>)}
      </Row>
      <Row label="Density">
        {['compact','cozy','spacious'].map(v => <Pill key={v} k="density" v={v} cur={values.density}/>)}
      </Row>
      <Row label="Analyst cards">
        {['editorial','compact','bold'].map(v => <Pill key={v} k="cardVariant" v={v} cur={values.cardVariant}/>)}
      </Row>
      <Row label="Project table">
        {['rows','cards'].map(v => <Pill key={v} k="tableVariant" v={v} cur={values.tableVariant}/>)}
      </Row>
      <Row label="Chart style">
        {['river','bars','area'].map(v => <Pill key={v} k="chartVariant" v={v} cur={values.chartVariant}/>)}
      </Row>
    </div>
  );
};

window.Tweaks = Tweaks;
