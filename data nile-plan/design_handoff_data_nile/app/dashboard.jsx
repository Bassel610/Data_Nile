// Live dashboard control panel — embedded in the landing page

const Dashboard = ({ chartVariant = 'river', tableVariant = 'rows' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [projectFilter, setProjectFilter] = useState('all');
  const [liveAppCount, setLiveAppCount] = useState(1247);
  const [pulseId, setPulseId] = useState(null);

  // Simulated live applications ticking up
  useEffect(() => {
    const id = setInterval(() => {
      setLiveAppCount(x => x + Math.floor(Math.random() * 3) + 1);
      setPulseId('apps');
      setTimeout(() => setPulseId(null), 600);
    }, 3800);
    return () => clearInterval(id);
  }, []);

  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return PROJECTS;
    return PROJECTS.filter(p => p.status === projectFilter);
  }, [projectFilter]);

  const stats = [
    { label: 'Active projects', val: 34, delta: '+4', trend: [22,24,28,26,30,32,34], id: 'proj' },
    { label: 'Analysts hired this week', val: 12, delta: '+3', trend: [5,7,6,9,11,10,12], id: 'hired' },
    { label: 'Avg. match score', val: '92.4%', delta: '+1.8pt', trend: [88,89,90,91,90,92,92.4], id: 'match' },
    { label: 'Applications today', val: liveAppCount, delta: 'live', trend: [820,940,1010,1120,1180,1220,liveAppCount], id: 'apps' },
  ];

  return (
    <div style={{
      background: 'var(--paper)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-l)', overflow: 'hidden',
      boxShadow: '0 30px 80px -30px rgba(20,30,50,0.22), 0 1px 0 rgba(255,255,255,0.8) inset',
    }}>
      {/* Window chrome */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding: '12px 16px', borderBottom: '1px solid var(--line-soft)',
        background: 'var(--sand-2)',
      }}>
        <div style={{display:'flex', alignItems:'center', gap: 10}}>
          <div style={{display:'flex', gap: 6}}>
            <span style={{width: 10, height: 10, borderRadius: '50%', background: 'var(--terracotta)', opacity: 0.6}}/>
            <span style={{width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', opacity: 0.6}}/>
            <span style={{width: 10, height: 10, borderRadius: '50%', background: 'var(--reed)', opacity: 0.6}}/>
          </div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', marginLeft: 6}}>
            datanile.app / admin / dashboard
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)'}}>
          <span style={{display:'inline-flex', alignItems:'center', gap: 5}}>
            <Icon.Dot s={6} fill="var(--reed)"/> LIVE
          </span>
          <Icon.Bell s={13}/>
          <Icon.Settings s={13}/>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap: 2, padding: '0 16px', borderBottom: '1px solid var(--line-soft)', background: 'var(--paper)'}}>
        {[
          {k: 'overview', l: 'Overview'},
          {k: 'projects', l: 'Projects', c: filteredProjects.length},
          {k: 'analysts', l: 'Analysts', c: ANALYSTS.length},
          {k: 'applications', l: 'Applications', c: APPLICATIONS.length, live: true},
        ].map(t => (
          <button key={t.k} onClick={() => setActiveTab(t.k)} style={{
            padding: '14px 16px', background: 'transparent', border: 'none',
            borderBottom: `2px solid ${activeTab === t.k ? 'var(--ink)' : 'transparent'}`,
            color: activeTab === t.k ? 'var(--ink)' : 'var(--ink-3)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: activeTab === t.k ? 600 : 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            marginBottom: -1, transition: 'all .15s ease'
          }}>
            {t.l}
            {t.c !== undefined && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 6px',
                background: t.live ? 'color-mix(in oklch, var(--reed) 20%, transparent)' : 'var(--sand-2)',
                color: t.live ? 'var(--reed)' : 'var(--ink-3)',
                borderRadius: 3,
              }}>{t.c}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && <OverviewPanel stats={stats} pulseId={pulseId} chartVariant={chartVariant}/>}
      {activeTab === 'projects' && <ProjectsPanel variant={tableVariant} filter={projectFilter} setFilter={setProjectFilter} rows={filteredProjects}/>}
      {activeTab === 'analysts' && <AnalystsPanel/>}
      {activeTab === 'applications' && <ApplicationsPanel/>}
    </div>
  );
};

// ========== OVERVIEW ==========
const OverviewPanel = ({ stats, pulseId, chartVariant }) => {
  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr', gap: 0}}>
      {/* KPI strip */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--line-soft)'}}>
        {stats.map((s, i) => (
          <div key={s.id} style={{
            padding: '20px 22px',
            borderRight: i < stats.length - 1 ? '1px solid var(--line-soft)' : 'none',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em'}}>{s.label}</div>
            <div style={{display:'flex', alignItems:'baseline', justifyContent: 'space-between', marginTop: 10}}>
              <div style={{fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1, letterSpacing: '-0.02em',
                transition: 'color .3s', color: pulseId === s.id ? 'var(--reed)' : 'var(--ink)'}}>
                {s.val}
              </div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: s.delta === 'live' ? 'var(--reed)' : 'var(--ink-2)', display:'flex', alignItems:'center', gap: 4}}>
                {s.delta === 'live' && <span style={{width: 5, height: 5, borderRadius: '50%', background: 'var(--reed)', animation: 'pulse 1.2s infinite'}}/>}
                {s.delta}
              </div>
            </div>
            <div style={{marginTop: 14}}>
              <Spark vals={s.trend} color="var(--nile-mid)" w={100} h={24}/>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + side panel */}
      <div style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', minHeight: 280}}>
        <div style={{padding: '22px 24px', borderRight: '1px solid var(--line-soft)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: 16}}>
            <div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em'}}>Flow · last 7 days</div>
              <div style={{fontFamily: 'var(--font-display)', fontSize: 22, marginTop: 4}}>Match, apply, hire</div>
            </div>
            <div style={{display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 11}}>
              <LegendDot color="var(--nile-mid)" label="Matches"/>
              <LegendDot color="var(--reed)" label="Apps"/>
              <LegendDot color="var(--gold)" label="Hires"/>
            </div>
          </div>
          <FlowChart data={FLOW_SERIES} variant={chartVariant} keys={['matches','applications','hires']} height={180}/>
        </div>
        <div style={{padding: '22px 24px', display:'flex', flexDirection:'column', gap: 14}}>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em'}}>Live feed</div>
          <LiveFeed/>
        </div>
      </div>
    </div>
  );
};

const LegendDot = ({ color, label }) => (
  <span style={{display:'inline-flex', alignItems:'center', gap: 5, color: 'var(--ink-2)'}}>
    <span style={{width: 8, height: 8, borderRadius: '50%', background: color}}/>{label}
  </span>
);

const LiveFeed = () => {
  const [events, setEvents] = useState([
    { id: 1, t: 'now',   who: 'Amira Saleh',     what: 'applied to cohort analysis', tone: 'nile' },
    { id: 2, t: '2m',    who: 'Acacia Financial', what: 'posted a new project', tone: 'gold' },
    { id: 3, t: '5m',    who: 'Marcus Okafor',   what: 'delivered milestone 2', tone: 'reed' },
    { id: 4, t: '11m',   who: 'Leila Haddad',    what: 'accepted offer · $85/hr', tone: 'nile' },
    { id: 5, t: '22m',   who: 'Sofia Moretti',   what: 'submitted for review', tone: 'reed' },
  ]);

  useEffect(() => {
    const pool = [
      { who: 'Ravi Chandran',    what: 'applied to churn model', tone: 'nile' },
      { who: 'Jordan Pierce',    what: 'sent a proposal', tone: 'gold' },
      { who: 'Noon Commerce',    what: 'posted a new project', tone: 'gold' },
      { who: 'Harbor Logistics', what: 'shortlisted 3 analysts', tone: 'reed' },
    ];
    const id = setInterval(() => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      setEvents(ev => [{id: Math.random(), t: 'now', ...next}, ...ev.slice(0, 6)]);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{display:'flex', flexDirection:'column', gap: 2, overflow: 'hidden'}}>
      {events.map((e, i) => (
        <div key={e.id} style={{
          display:'flex', gap: 10, padding: '10px 0',
          borderBottom: i < events.length - 1 ? '1px dashed var(--line-soft)' : 'none',
          fontSize: 13, opacity: 1 - i * 0.08,
          animation: i === 0 ? 'slideIn .5s ease' : 'none',
        }}>
          <div style={{width: 36, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', flexShrink: 0, paddingTop: 3}}>{e.t}</div>
          <div style={{flex: 1}}>
            <span style={{fontWeight: 600}}>{e.who}</span>
            <span style={{color: 'var(--ink-2)'}}> {e.what}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ========== PROJECTS ==========
const ProjectsPanel = ({ variant, filter, setFilter, rows }) => {
  const statusTone = s => ({ active: 'reed', review: 'gold', draft: 'neutral' })[s];

  const filters = [
    { k: 'all', l: 'All', n: PROJECTS.length },
    { k: 'active', l: 'Active', n: PROJECTS.filter(p => p.status === 'active').length },
    { k: 'review', l: 'In review', n: PROJECTS.filter(p => p.status === 'review').length },
    { k: 'draft', l: 'Drafts', n: PROJECTS.filter(p => p.status === 'draft').length },
  ];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding: '16px 22px', borderBottom: '1px solid var(--line-soft)'}}>
        <div style={{display:'flex', gap: 6}}>
          {filters.map(f => (
            <Chip key={f.k} active={filter === f.k} onClick={() => setFilter(f.k)}>
              {f.l} <span style={{opacity: 0.6, marginLeft: 4}}>{f.n}</span>
            </Chip>
          ))}
        </div>
        <div style={{display:'flex', gap: 8, alignItems:'center'}}>
          <Btn kind="ghost" size="sm" icon={<Icon.Sort s={13}/>}>Sort</Btn>
          <Btn kind="primary" size="sm" icon={<Icon.Plus s={13}/>}>New project</Btn>
        </div>
      </div>

      {variant === 'cards' ? (
        <div style={{padding: 22, display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14}}>
          {rows.map(p => <ProjectCard key={p.id} p={p} tone={statusTone(p.status)}/>)}
        </div>
      ) : (
        <div>
          <div style={{display:'grid', gridTemplateColumns: '2.5fr 1.5fr 1fr 1.5fr 1fr 0.8fr', padding: '10px 22px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--line-soft)'}}>
            <div>Project</div><div>Analyst</div><div>Budget</div><div>Progress</div><div>Due</div><div>Status</div>
          </div>
          {rows.map(p => (
            <div key={p.id} style={{
              display:'grid', gridTemplateColumns: '2.5fr 1.5fr 1fr 1.5fr 1fr 0.8fr',
              padding: '14px 22px', borderBottom: '1px solid var(--line-soft)',
              alignItems: 'center', fontSize: 13, transition: 'background .15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--sand-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div>
                <div style={{fontWeight: 600}}>{p.title}</div>
                <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 2}}>{p.co}</div>
              </div>
              <div style={{color: 'var(--ink-2)'}}>{p.analyst}</div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 12.5}}>{p.budget}</div>
              <div>
                <div style={{display:'flex', alignItems:'center', gap: 8}}>
                  <div style={{flex: 1, height: 4, background: 'var(--sand-2)', borderRadius: 2, overflow: 'hidden'}}>
                    <div style={{width: `${p.progress}%`, height: '100%', background: p.progress > 70 ? 'var(--reed)' : 'var(--nile-mid)', borderRadius: 2, transition: 'width 1s'}}/>
                  </div>
                  <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)', minWidth: 28, textAlign: 'right'}}>{p.progress}%</span>
                </div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)', marginTop: 3}}>{p.done}/{p.tasks} tasks</div>
              </div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-2)'}}>{p.due}</div>
              <div><Tag tone={statusTone(p.status)}>{p.status}</Tag></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ p, tone }) => (
  <div style={{padding: 16, border: '1px solid var(--line)', borderRadius: 10, background: 'var(--paper)'}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 10}}>
      <div>
        <div style={{fontSize: 12, color: 'var(--ink-3)'}}>{p.co}</div>
        <div style={{fontWeight: 600, marginTop: 4, fontSize: 14.5}}>{p.title}</div>
      </div>
      <Tag tone={tone}>{p.status}</Tag>
    </div>
    <div style={{marginTop: 16, display:'flex', justifyContent:'space-between', fontSize: 12, color: 'var(--ink-2)'}}>
      <span>{p.analyst}</span>
      <span style={{fontFamily: 'var(--font-mono)'}}>{p.budget}</span>
    </div>
    <div style={{marginTop: 10, height: 4, background: 'var(--sand-2)', borderRadius: 2, overflow: 'hidden'}}>
      <div style={{width: `${p.progress}%`, height: '100%', background: 'var(--nile-mid)'}}/>
    </div>
    <div style={{display:'flex', justifyContent:'space-between', marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink-3)'}}>
      <span>{p.progress}% · {p.done}/{p.tasks}</span><span>Due {p.due}</span>
    </div>
  </div>
);

// ========== ANALYSTS (inside dashboard — condensed) ==========
const AnalystsPanel = () => {
  const [q, setQ] = useState('');
  const [skill, setSkill] = useState(null);
  const results = ANALYSTS.filter(a =>
    (!q || a.name.toLowerCase().includes(q.toLowerCase()) || a.title.toLowerCase().includes(q.toLowerCase()) || a.skills.some(s => s.toLowerCase().includes(q.toLowerCase()))) &&
    (!skill || a.skills.includes(skill))
  );
  return (
    <div>
      <div style={{padding: '14px 22px', display:'flex', gap: 12, alignItems:'center', borderBottom: '1px solid var(--line-soft)'}}>
        <div style={{display:'flex', alignItems:'center', gap: 8, padding: '8px 12px', border:'1px solid var(--line)', borderRadius: 8, flex: 1, maxWidth: 360, background: 'var(--sand)'}}>
          <Icon.Search s={14}/>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, title, skills…"
            style={{border:'none', outline:'none', background:'transparent', flex:1, fontSize: 13, fontFamily: 'var(--font-sans)', color: 'var(--ink)'}}/>
        </div>
        <div style={{display:'flex', gap: 6, flexWrap:'wrap'}}>
          {['SQL','Python','dbt','Tableau'].map(s => (
            <Chip key={s} active={skill === s} onClick={() => setSkill(skill === s ? null : s)}>{s}</Chip>
          ))}
        </div>
      </div>
      <div style={{padding: 22, display:'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14}}>
        {results.map(a => <AnalystCard key={a.id} a={a} variant="compact" onHire={() => {}}/>)}
        {results.length === 0 && <div style={{padding: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 14, gridColumn: '1 / -1'}}>No analysts match.</div>}
      </div>
    </div>
  );
};

// ========== APPLICATIONS ==========
const ApplicationsPanel = () => {
  return (
    <div>
      <div style={{padding: '14px 22px', borderBottom: '1px solid var(--line-soft)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontSize: 13, color: 'var(--ink-2)'}}>Sorted by <strong>match score</strong> · live ranking</div>
        <div style={{display:'flex', gap: 8}}>
          <Btn kind="ghost" size="sm" icon={<Icon.Filter s={13}/>}>Filter</Btn>
        </div>
      </div>
      <div>
        {APPLICATIONS.map(a => {
          const analyst = ANALYSTS.find(x => x.name === a.analyst) || ANALYSTS[0];
          return (
            <div key={a.id} style={{
              display:'grid', gridTemplateColumns: 'auto 1fr auto auto auto', gap: 14,
              padding: '14px 22px', borderBottom: '1px solid var(--line-soft)', alignItems: 'center',
              transition: 'background .15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--sand-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Avatar init={analyst.init} color={analyst.color} size={36}/>
              <div>
                <div style={{fontWeight: 600, fontSize: 14}}>{a.analyst}</div>
                <div style={{fontSize: 12, color: 'var(--ink-3)', marginTop: 2}}>applied to {a.role}</div>
              </div>
              <div style={{fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)'}}>{a.at}</div>
              <div style={{display:'flex', alignItems:'center', gap: 8}}>
                <div style={{fontFamily: 'var(--font-display)', fontSize: 20, color: a.match >= 92 ? 'var(--reed)' : 'var(--ink)'}}>{a.match}</div>
                <div style={{fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-3)'}}>match</div>
              </div>
              <div style={{display: 'flex', gap: 6}}>
                <Btn kind="secondary" size="sm">Skip</Btn>
                <Btn kind="primary" size="sm">Review</Btn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Object.assign(window, { Dashboard });
