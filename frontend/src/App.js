import AuthPortal from './components/AuthPortal';
import Explorer from './components/Explorer';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';


// --- COMPONENTS ---


const CloudStatus = () => {
  return (
    <div className="fixed bottom-6 right-8 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-black text-white/90 uppercase tracking-widest leading-none">
          System Operational
        </span>
        <span className="text-[7px] text-cyan-400/60 font-mono uppercase mt-1">
          Region: AWS-Mumbai-1 • Latency: 24ms
        </span>
      </div>
    </div>
  );
};

// --- DATA HELPERS ---

const generateGrowthData = () => [
  { day: 'Mon', value: Math.floor(Math.random() * 100) },
  { day: 'Tue', value: Math.floor(Math.random() * 150) },
  { day: 'Wed', value: Math.floor(Math.random() * 200) },
  { day: 'Thu', value: Math.floor(Math.random() * 250) },
  { day: 'Fri', value: Math.floor(Math.random() * 300) },
];

const trendingAccounts = [
  { name: 'Microsoft', handle: 'microsoft', avatar: 'https://github.com/microsoft.png', trend: '+12%' },
  { name: 'Google', handle: 'google', avatar: 'https://github.com/google.png', trend: '+8%' },
  { name: 'Dan Abramov', handle: 'gaearon', avatar: 'https://github.com/gaearon.png', trend: '+15%' },
  { name: 'Evan You', handle: 'yyx990803', avatar: 'https://github.com/yyx990803.png', trend: '+22%' },
  { name: 'Shadcn', handle: 'shadcn', avatar: 'https://github.com/shadcn.png', trend: '+30%' },
  { name: 'Meta', handle: 'facebook', avatar: 'https://github.com/facebook.png', trend: '+5%' },
];

const calculatePulse = (platforms) => {
  if (!platforms || platforms.length === 0) return 0;
  const totalEngagement = platforms.reduce((acc, p) => {
    const metricValue = p.metrics ? Object.values(p.metrics)[0] : 0;
    return acc + (metricValue / 10000);
  }, 0);
  const average = totalEngagement / platforms.length;
  return Math.min(Math.max(average - 0.5, -1), 1);
};

// --- MAIN APP ---

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [authStep, setAuthStep] = useState('select');
    const [authMode, setAuthMode] = useState('login');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('microsoft');
    const [view, setView] = useState('dashboard');
    const [settingsTab, setSettingsTab] = useState('theme');
    const [sentiment, setSentiment] = useState(0);
    const [theme, setTheme] = useState('navy');

    // ✅ FIXED: handleGoogleLogin restored
    const handleGoogleLogin = async () => {
      try {
        console.log("Contacting Google Cloud Auth...");
        const result = await signInWithPopup(auth, googleProvider);
        setUserProfile(result.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth Error:", error.message);
        alert("Cloud Login Failed: " + error.message);
      }
    };

    // ✅ FIXED: fetchCloudData uses dynamic target
    const fetchCloudData = (target) => {
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}/api/social/stats?username=${target}`)
        .then(res => res.json())
        .then(json => {
          const pulseScore = calculatePulse(json.platforms);
          setSentiment(pulseScore);
          setData(json);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch failed:", err);
          setLoading(false);
        });
    };

    // Sync auth state with Firebase
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUserProfile(user);
        } else {
          setIsAuthenticated(false);
          setUserProfile(null);
        }
      });
      return () => unsubscribe();
    }, []);

    useEffect(() => {
      fetchCloudData(search);
    }, []);

    const handleExplorerSelect = (handle) => {
      setSearch(handle);
      fetchCloudData(handle);
      setView('dashboard');
    };

    const handleLogout = () => signOut(auth);

    const exportReport = () => {
      if (!data) return;
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("SocialPulse: Cloud Analytics Report", 14, 22);
      const tableRows = data.platforms.map(p => [
        p.name, p.handle,
        p.metrics ? Object.values(p.metrics)[0].toLocaleString() : "0",
        p.trend, `${(Math.random() * 5 + 2).toFixed(1)}%`
      ]);
      autoTable(doc, {
        startY: 80,
        head: [["Platform", "Handle", "Metric", "Trend", "Engagement"]],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [15, 23, 42] }
      });
      doc.save(`${data.influencer.name}_Cloud_Report.pdf`);
    };

    // 1. GATED ACCESS
    if (!isAuthenticated) {
      return (
        <div className={`transition-all duration-1000 ${theme === 'beach' ? 'bg-vestrahorn' : 'bg-navy'}`}>
          <AuthPortal
            step={authStep}
            setStep={setAuthStep}
            mode={authMode}
            setMode={setAuthMode}
            onLogin={handleGoogleLogin}
          />
        </div>
      );
    }

    // 2. LOADING STATE
    if (!data) {
      return (
        <div className="h-screen bg-[#020617] flex items-center justify-center text-cyan-400 font-black tracking-[0.5em] animate-pulse">
          SYNCING CLOUD...
        </div>
      );
    }

  // 3. MAIN DASHBOARD RENDER
  return (
    <div className={`min-h-screen p-6 lg:p-12 transition-all duration-1000 ${theme === 'beach' ? 'bg-vestrahorn' : 'bg-[#020617]'}`}>
      <CloudStatus />

      <div className="max-w-7xl mx-auto">
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white drop-shadow-2xl">
                Social<span className="text-cyan-400">Pulse</span>
            </h1>
            <nav className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
              {['dashboard', 'explorer', 'settings'].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === v ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}
                >
                  {v}
                </button>
              ))}
              <button onClick={handleLogout} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-500/10">Logout</button>
            </nav>
          </div>

          <div className="w-full md:w-96 flex bg-white/5 border border-white/10 rounded-2xl p-1 backdrop-blur-md">
            <input
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-white placeholder:text-white/20"
              placeholder="search handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => fetchCloudData(search)} className="bg-cyan-500 text-white px-6 py-2 rounded-xl font-bold transition-all text-xs hover:bg-cyan-400 shadow-lg shadow-cyan-500/20">
              Analyze
            </button>
          </div>
        </div>

        <div className="mt-4">
          {view === 'settings' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="lg:col-span-1 liquid-glass p-4 h-fit text-white">
                <button onClick={() => setSettingsTab('theme')} className={`settings-nav-item w-full ${settingsTab === 'theme' ? 'settings-nav-active' : 'settings-nav-inactive'}`}>🎨 Appearance</button>
                <button onClick={() => setSettingsTab('api')} className={`settings-nav-item w-full ${settingsTab === 'api' ? 'settings-nav-active' : 'settings-nav-inactive'}`}>🔑 API Docs</button>
              </div>
              <div className="lg:col-span-3 liquid-glass p-10 min-h-[400px]">
                <div className="col-span-full mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                  <div className={`liquid-glass p-6 border-l-4 transition-all duration-500 ${
                    sentiment > 0.2 ? 'border-green-400' : sentiment < -0.2 ? 'border-red-400' : 'border-cyan-400'
                  }`}>
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">AI Sentiment Analysis</p>
                        <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                          {sentiment > 0.2 ? 'Positive Trend' : sentiment < -0.2 ? 'Critical Zone' : 'Neutral Pulse'}
                        </h2>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-cyan-400">{(sentiment * 100).toFixed(0)}%</p>
                        <p className="text-[8px] text-white/20 uppercase font-bold">Pulse Score</p>
                      </div>
                    </div>
                  </div>
                </div>

                {settingsTab === 'theme' ? (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-white">Interface Theme</h3>
                    <div className="flex items-center gap-4 text-white">
                      <span className="text-sm font-medium">Beach</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={theme === 'navy'} onChange={() => setTheme(theme === 'navy' ? 'beach' : 'navy')} />
                        <div className="toggle-bg"></div>
                        <div className="toggle-dot"></div>
                      </label>
                      <span className="text-sm font-medium text-cyan-400">Navy</span>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert">
                    <h3 className="text-xl font-bold mb-4 text-white">Cloud Gateway v2.1</h3>
                    <div className="bg-black/20 p-4 rounded-xl font-mono text-xs text-cyan-400"><p>// Secure Handshake Active</p></div>
                  </div>
                )}
              </div>
            </div>
          ) : view === 'dashboard' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 animate-in fade-in duration-700">
              <div className="lg:col-span-1 liquid-glass p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={data.influencer.avatar}
                    className="w-24 h-24 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500 object-cover"
                    alt="Target Avatar"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-[#020617] rounded-full"></div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">
                      {data.influencer.name}
                  </h2>
                  <p className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
                      {data.influencer.handle}
                  </p>
                </div>

                <div className="w-full h-px bg-white/5 mb-6"></div>

                <div className="text-left w-full space-y-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <p className="text-[8px] text-white/20 uppercase font-black tracking-widest">Authorized Operator</p>
                        <p className="text-[11px] text-white font-bold uppercase tracking-tight">
                            {userProfile?.displayName || "Sherwin Shaji"}
                        </p>
                        <p className="text-[7px] text-cyan-400/40 font-mono">
                            ID: {userProfile?.uid?.slice(0, 8).toUpperCase() || "ADMIN-01"}
                        </p>
                    </div>

                    <div className={`p-3 rounded-xl border ${sentiment > 0 ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <p className="text-[8px] text-white/40 uppercase font-black mb-1 tracking-tighter">AI Pulse Result</p>
                        <p className={`text-[10px] font-black ${sentiment > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {sentiment > 0 ? '↑ POSITIVE SIGNAL' : '↓ VOLATILITY DETECTED'}
                        </p>
                    </div>
                </div>

                <button
                  onClick={exportReport}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
                >
                    Generate Audit
                </button>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.platforms.map((p, i) => (
                  <div key={i} className="liquid-glass p-8 group hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">{p.name}</p>
                        <h3 className="text-4xl font-black text-white tracking-tighter">
                            {p.metrics ? Object.values(p.metrics)[0].toLocaleString() : "0"}
                        </h3>
                      </div>
                      <span className="text-cyan-400 text-[10px] font-black bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 uppercase">
                        {p.trend}
                      </span>
                    </div>
                    <div className="h-20 w-full opacity-50 group-hover:opacity-100 transition-opacity">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={generateGrowthData()}>
                            <Line type="monotone" dataKey="value" stroke="#22d3ee" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Explorer onSelectUser={handleExplorerSelect} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;