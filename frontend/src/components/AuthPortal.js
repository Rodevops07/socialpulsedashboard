import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react'; // Example using lucide-react icons

const AuthPortal = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  // 🧱 VANTA SETUP
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        window.VANTA.RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          // 🎨 UI COLOR SYNC
          backgroundColor: 0x020617, // Matches your deep navy bg
          color: 0x22d3ee // Matches cyan-400 for the rings
        })
      );
    }
    // CLEANUP: Stop the effect when component unmounts
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    /* 1. This is the main container that holds the Vanta effect */
    <div ref={vantaRef} className="min-h-screen w-full relative overflow-hidden">
      
      {/* 2. This overlay ensures the content is readable over the moving rings */}
      <div className="absolute inset-0 bg-[#020617]/40 backdrop-blur-[2px] z-0" />

      {/* 3. The Content Layer (relative z-10 puts it above the background) */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          
          {/* LEFT SIDE: Value Proposition & Branding */}
          <div className="hidden md:flex flex-col space-y-6 p-8">
            <div className="space-y-2">
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic drop-shadow-2xl">
                Social<span className="text-cyan-400">Pulse</span>
              </h1>
              <p className="text-cyan-400 font-black tracking-[0.4em] text-[10px] uppercase opacity-80">
                Next-Gen Cloud Intelligence
              </p>
            </div>

            <div className="space-y-6 bg-black/20 p-6 rounded-2xl backdrop-blur-md border border-white/5">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">Cross-Platform Sync</h3>
                  <p className="text-white/40 text-sm leading-relaxed">Aggregate metrics from Twitter, LinkedIn, and Instagram in one unified stream.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-xl">🧠</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Sentiment Pulse</h3>
                  <p className="text-white/40 text-sm leading-relaxed">Real-time heuristic analysis transforms raw numbers into actionable brand scores.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 group-hover:scale-110 transition-transform">
                  <span className="text-xl">📄</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">Encrypted Audit Trail</h3>
                  <p className="text-white/40 text-sm leading-relaxed">Generate verifiable data exports and PDF reports, securely synced with Firestore.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center gap-3 bg-cyan-950/20 w-fit px-4 py-2 rounded-full border border-cyan-500/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-[9px] text-cyan-400/80 uppercase font-black tracking-widest">Global Cloud Nodes: Online</span>
            </div>
          </div>

          {/* RIGHT SIDE: The Login Card */}
          <div className="liquid-glass p-10 space-y-8 backdrop-blur-3xl border-white/10 relative overflow-hidden group shadow-2xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all duration-700"></div>
              
              <div className="text-center space-y-2 relative">
                  <h2 className="text-white font-black tracking-[0.3em] text-[10px] uppercase opacity-50">Identity Verification</h2>
                  <div className="h-[2px] w-8 bg-cyan-500 mx-auto"></div>
              </div>

              <button 
                onClick={onLogin}
                className="w-full bg-white text-black py-4 px-6 rounded-xl font-black flex items-center justify-center gap-4 hover:bg-cyan-400 hover:text-black transition-all active:scale-95 shadow-xl"
              >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt=""/>
                  CONTINUE WITH GOOGLE
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[10px] font-black text-white/20 uppercase tracking-widest">OR</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-cyan-400 transition-colors">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-black/40 border border-white/10 text-white rounded-xl p-4 pl-12 text-sm placeholder:text-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
                  />
                </div>
                <button className="w-full bg-transparent text-white/60 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all uppercase">
                  Continue with Work Email
                </button>
              </div>

              <p className="text-[8px] text-center text-white/10 uppercase font-bold tracking-[0.2em] pt-4">
                Secure 256-bit Cloud Encryption Active
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPortal;