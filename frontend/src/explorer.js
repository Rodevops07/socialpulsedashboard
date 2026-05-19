import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';

const Explorer = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 20 DATA NODES
  const trendingAccounts = [
    { name: 'OpenAI', handle: 'openai', avatar: 'https://github.com/openai.png', trend: '+45.2%', color: '#10a37f' },
    { name: 'Nvidia', handle: 'nvidia', avatar: 'https://github.com/nvidia.png', trend: '+38.4%', color: '#76b900' },
    { name: 'Shadcn', handle: 'shadcn', avatar: 'https://github.com/shadcn.png', trend: '+30.0%', color: '#ffffff' },
    { name: 'Tailwind Labs', handle: 'tailwindlabs', avatar: 'https://github.com/tailwindlabs.png', trend: '+25.6%', color: '#38bdf8' },
    { name: 'Evan You', handle: 'yyx990803', avatar: 'https://github.com/yyx990803.png', trend: '+22.4%', color: '#42b883' },
    { name: 'Vercel', handle: 'vercel', avatar: 'https://github.com/vercel.png', trend: '+18.9%', color: '#ffffff' },
    { name: 'Dan Abramov', handle: 'gaearon', avatar: 'https://github.com/gaearon.png', trend: '+15.1%', color: '#61dafb' },
    { name: 'SpaceX', handle: 'spacex', avatar: 'https://github.com/spacex.png', trend: '+14.8%', color: '#ffffff' },
    { name: 'Microsoft', handle: 'microsoft', avatar: 'https://github.com/microsoft.png', trend: '+12.5%', color: '#00a4ef' },
    { name: 'Tesla', handle: 'tesla', avatar: 'https://github.com/tesla.png', trend: '+11.3%', color: '#e81d23' },
    { name: 'GitHub', handle: 'github', avatar: 'https://github.com/github.png', trend: '+9.5%', color: '#ffffff' },
    { name: 'Google', handle: 'google', avatar: 'https://github.com/google.png', trend: '+8.2%', color: '#4285f4' },
    { name: 'Apple', handle: 'apple', avatar: 'https://github.com/apple.png', trend: '+6.2%', color: '#ffffff' },
    { name: 'Meta', handle: 'facebook', avatar: 'https://github.com/facebook.png', trend: '+5.7%', color: '#0668E1' },
    { name: 'Amazon', handle: 'amazon', avatar: 'https://github.com/amazon.png', trend: '+4.1%', color: '#ff9900' },
    { name: 'Netflix', handle: 'netflix', avatar: 'https://github.com/netflix.png', trend: '+3.8%', color: '#e50914' },
    { name: 'Linux', handle: 'torvalds', avatar: 'https://github.com/torvalds.png', trend: '+2.1%', color: '#f5f5f5' },
    { name: 'Supabase', handle: 'supabase', avatar: 'https://github.com/supabase.png', trend: '+28.4%', color: '#3ecf8e' },
    { name: 'Docker', handle: 'docker', avatar: 'https://github.com/docker.png', trend: '+10.2%', color: '#2496ed' },
    { name: 'Android', handle: 'android', avatar: 'https://github.com/android.png', trend: '+7.4%', color: '#3ddc84' },
  ];

  const filteredAccounts = trendingAccounts.filter(acc => 
    acc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    acc.handle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white drop-shadow-md">
            Network <span className="text-cyan-400">Discovery</span>
          </h2>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">
            20 Nodes Active • Real-time Stream
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search Network..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/40 border border-white/10 text-white rounded-full py-3 pl-12 pr-6 text-sm w-full md:w-80 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>
      </div>

      {/* Grid: 4 columns on large screens to show more data at once */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAccounts.map((account, i) => (
          <div 
            key={i} 
            onClick={() => onSelectUser(account.handle)}
            className="liquid-glass p-5 group cursor-pointer hover:border-cyan-500/50 transition-all relative overflow-hidden animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <img src={account.avatar} className="w-10 h-10 rounded-lg border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-sm truncate group-hover:text-cyan-400 transition-colors">{account.name}</h3>
                <p className="text-[10px] text-white/30 truncate">@{account.handle}</p>
              </div>
              <span className="ml-auto text-[9px] font-black text-green-400 bg-green-400/10 px-2 py-1 rounded">
                {account.trend}
              </span>
            </div>

            <div className="h-10 w-full opacity-20 group-hover:opacity-100 transition-all duration-700 relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[...Array(8)].map(() => ({ v: 30 + Math.random() * 70 }))}>
                  <Line type="monotone" dataKey="v" stroke={account.color || "#22d3ee"} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorer;