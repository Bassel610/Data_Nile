const App = () => {
  const [contactOpen, setContactOpen] = React.useState(false);
  // Read theme from localStorage (from admin's Manage Layout) or defaults
  const [themeTokens, setThemeTokens] = React.useState({});
  React.useEffect(() => {
    const load = () => {
      const saved = JSON.parse(localStorage.getItem('datanile_theme') || '{}');
      Object.entries(saved).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
      setThemeTokens(saved);
    };
    load();
    window.addEventListener('storage', load);
    window.addEventListener('datanile:theme', load);
    return () => { window.removeEventListener('storage', load); window.removeEventListener('datanile:theme', load); };
  }, []);

  return (
    <div>
      <Nav onConnect={() => setContactOpen(true)}/>
      <HeroSlider onConnect={() => setContactOpen(true)}/>
      <AboutSection/>
      <VideoSection/>
      <Services/>
      <ContactBand onConnect={() => setContactOpen(true)}/>
      <Footer/>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)}/>
    </div>
  );
};

const gs = document.createElement('style');
gs.textContent = `
  @keyframes floaty { 0%,100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-8px) rotate(var(--r, 0deg)); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  html { scroll-behavior: smooth; }
  select:focus, input:focus, textarea:focus { outline: none; border-color: var(--ink-3) !important; }
`;
document.head.appendChild(gs);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
