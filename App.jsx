import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Download, 
  Shield, 
  Layout, 
  Zap, 
  Power, 
  Search, 
  Cpu, 
  Lock, 
  Globe, 
  Fingerprint,
  Activity,
  Plus,
  X,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';

/**
 * ملاحظة تقنية لمشكلة الـ Build:
 * الخطأ "react-scripts: command not found" يعني أن المكتبات غير مثبتة.
 * تأكد من وجود ملف package.json يحتوي على "react-scripts" في قسم "dependencies".
 * وتأكد من تشغيل "npm install" قبل "npm run build".
 */

// --- Configuration ---
const CLIENT_ID = "1459865756463534140";
const REDIRECT_URI = "https://zenith.fwh.is/index.php"; 
const AUTH_URL = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+email+guilds`;

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Scripts State (Initial Mock Data)
  const [scripts, setScripts] = useState([
    { id: 1, title: 'Universal Fly V2', author: 'SAWYER', size: '124KB', type: 'ELITE', status: 'Safe', date: '2026-01-10' },
    { id: 2, title: 'Anti-Cheat Bypass', author: 'HUSTLER', size: '2.1MB', type: 'CRITICAL', status: 'Undetected', date: '2026-01-11' },
    { id: 3, title: 'Inventory Stealer', author: 'PHANTOM', size: '45KB', type: 'STEALTH', status: 'Active', date: '2026-01-08' },
    { id: 4, title: 'Silent Aim V3', author: 'ZENITH_DEV', size: '890KB', type: 'PREMIUM', status: 'Updated', date: '2026-01-11' },
  ]);

  // Form State for New Script
  const [newScript, setNewScript] = useState({
    title: '',
    type: 'FREE'
  });

  useEffect(() => {
    const checkAuth = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          // Mock Server Response for UI presentation
          setUser({
            username: "Elite_User",
            avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=zenith-user",
            role: "ACCESS_LEVEL_10",
            id: "882319457221"
          });
          // Clean URL without refreshing
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (err) {
        console.error("Auth initialization failed", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newScript.title) return;
    
    const scriptToAdd = {
      id: Date.now(),
      title: newScript.title,
      author: user?.username || "Anonymous",
      size: Math.floor(Math.random() * 500) + "KB",
      type: newScript.type,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setScripts([scriptToAdd, ...scripts]);
    setIsModalOpen(false);
    setNewScript({ title: '', type: 'FREE' });
  };

  const filteredScripts = scripts.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
      <div className="w-16 h-16 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-[#e0e0e0] font-sans selection:bg-emerald-500/30 overflow-x-hidden ltr">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

      {!user ? (
        /* --- Login Screen --- */
        <div className="min-h-screen flex items-center justify-center p-6 relative text-center">
          <div className="max-w-md w-full z-10 space-y-12">
            <div className="space-y-6">
              <div className="w-24 h-24 bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                <Terminal className="text-emerald-500" size={40} />
              </div>
              <h1 className="text-6xl font-black italic tracking-tighter text-white uppercase">ZENITH<span className="text-emerald-500">.RAW</span></h1>
              <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.7em]">System Access Gateway</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-2xl">
              <h2 className="text-white text-xl font-bold mb-10 tracking-tight uppercase">Security Gateway</h2>
              <a href={AUTH_URL} className="group w-full bg-[#5865F2] hover:bg-[#4752C4] py-6 rounded-3xl flex items-center justify-center gap-4 text-white font-black text-xs tracking-widest transition-all">
                <Globe size={20} /> LOGIN WITH DISCORD
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* --- Dashboard Screen --- */
        <>
          <nav className="fixed top-0 w-full z-[100] bg-black/60 backdrop-blur-3xl border-b border-white/5">
            <div className="max-w-7xl mx-auto h-24 px-8 flex justify-between items-center">
              <div className="flex items-center gap-12">
                <h1 className="text-2xl font-black italic text-white tracking-tighter cursor-default">ZENITH<span className="text-emerald-500">.RAW</span></h1>
                <div className="hidden lg:flex gap-10">
                  <span className="text-[10px] font-black text-emerald-500 tracking-widest border-b-2 border-emerald-500 pb-1 cursor-pointer">DATABASE</span>
                  <span className="text-[10px] font-black text-gray-500 hover:text-white transition-all tracking-widest cursor-pointer uppercase">Executors</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <Plus size={16} /> PUBLISH SCRIPT
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user.username}</p>
                    <p className="text-[8px] font-black text-emerald-500 uppercase opacity-60">Session Active</p>
                  </div>
                  <img src={user.avatar} className="w-12 h-12 rounded-2xl border-2 border-white/5 shadow-xl" alt="Avatar" />
                </div>
              </div>
            </div>
          </nav>

          <main className="pt-40 pb-24 px-8 max-w-7xl mx-auto">
            {/* Stats Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="lg:col-span-2">
                <h2 className="text-8xl md:text-[9rem] font-black italic tracking-tighter text-white uppercase leading-none mb-6 select-none">
                  THE <span className="text-emerald-500">GUTTER</span>
                </h2>
                <p className="text-gray-500 max-w-xl text-xs font-bold leading-loose uppercase tracking-widest">
                  Secure script repository. Members can now contribute to the database using the encrypted publishing module. All uploads are screened for integrity.
                </p>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/10 p-10 rounded-[3rem] flex items-center justify-between shadow-2xl">
                <div>
                  <p className="text-[10px] font-black text-emerald-500 uppercase mb-2">Live Registry</p>
                  <p className="text-4xl font-black text-white italic">{scripts.length} SCRIPTS</p>
                </div>
                <Activity className="text-emerald-500/20" size={60} />
              </div>
            </div>

            {/* Search Module */}
            <div className="mb-16 relative group">
              <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH FOR EXPLOITS, SCRIPTS, TOOLS..." 
                className="w-full bg-white/[0.02] border border-white/5 p-7 pl-16 rounded-3xl outline-none focus:border-emerald-500/30 transition-all text-[12px] font-black uppercase tracking-widest text-white placeholder:text-gray-800" 
              />
            </div>

            {/* Scripts Listing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredScripts.map(script => (
                <div key={script.id} className="bg-white/[0.01] border border-white/5 p-12 rounded-[4rem] group hover:bg-emerald-500/[0.02] hover:border-emerald-500/20 transition-all relative">
                  <div className="flex justify-between items-start mb-10">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500">
                      {script.type}
                    </span>
                    <ShieldCheck size={20} className={script.status === 'Safe' ? 'text-emerald-500' : 'text-yellow-500'} />
                  </div>
                  <h3 className="text-4xl font-black italic text-white mb-2 tracking-tighter uppercase leading-none group-hover:text-emerald-400 transition-colors">
                    {script.title}
                  </h3>
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em] mb-12 italic">By: {script.author}</p>
                  <div className="flex justify-between items-center pt-8 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-800 uppercase tracking-widest mb-1">Packet Size</span>
                      <span className="text-xs font-mono text-white opacity-60">{script.size}</span>
                    </div>
                    <button className="w-14 h-14 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all shadow-lg">
                      <Download size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Publishing Modal Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
              <div className="bg-[#0a0a0a] border border-white/5 w-full max-w-xl rounded-[4rem] p-12 relative z-10 shadow-3xl">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-gray-600 hover:text-white transition-colors">
                  <X size={24} />
                </button>
                
                <div className="mb-10 text-center">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-500">
                    <UploadCloud size={32} />
                  </div>
                  <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Publish Script</h2>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mt-2">Add your code to the Zenith database</p>
                </div>

                <form onSubmit={handlePublish} className="space-y-6">
                  <div>
                    <label className="text-[9px] font-black text-emerald-500 uppercase tracking-widest ml-4 mb-2 block">Script Title</label>
                    <input 
                      autoFocus
                      required
                      type="text" 
                      placeholder="e.g. MEGA KILLER V2" 
                      className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-xs font-black uppercase text-white outline-none focus:border-emerald-500/30"
                      value={newScript.title}
                      onChange={(e) => setNewScript({...newScript, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-[9px] font-black text-emerald-500 uppercase tracking-widest ml-4 mb-2 block">Access Level</label>
                    <select 
                      className="w-full bg-white/5 border border-white/5 p-6 rounded-2xl text-xs font-black uppercase text-white outline-none focus:border-emerald-500/30 appearance-none cursor-pointer"
                      value={newScript.type}
                      onChange={(e) => setNewScript({...newScript, type: e.target.value})}
                    >
                      <option value="FREE">FREE_USER</option>
                      <option value="PREMIUM">PREMIUM_ONLY</option>
                      <option value="ELITE">ELITE_LEVEL</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-emerald-500 text-black py-6 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-emerald-400 transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)]">
                    INITIALIZE_UPLOAD
                  </button>
                </form>
              </div>
            </div>
          )}

          <footer className="py-24 text-center mt-32 border-t border-white/5">
             <h4 className="text-3xl font-black italic text-white mb-6 tracking-tighter select-none">ZENITH<span className="text-emerald-500">.RAW</span></h4>
             <div className="flex justify-center gap-12 text-gray-800 mb-10">
                <Shield size={24} />
                <Cpu size={24} />
                <Lock size={24} />
             </div>
             <p className="text-[8px] font-black text-gray-800 uppercase tracking-[0.5em]">Global Underground Scripting Infrastructure © 2026</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
