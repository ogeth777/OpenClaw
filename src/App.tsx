import React from 'react';
import { AgentTerminal } from './components/AgentTerminal';
import { Dashboard } from './components/Dashboard';
import { Cpu, Zap, Globe } from 'lucide-react';

function App() {
  const [isConnected, setIsConnected] = React.useState(false);

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 md:gap-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-bnb-yellow/20 rounded-xl flex items-center justify-center border border-bnb-yellow/50 shadow-[0_0_15px_rgba(240,185,11,0.3)]">
              <Cpu className="w-7 h-7 text-bnb-yellow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-widest flex items-center gap-2">
                OPEN<span className="text-cyber-cyan">CLAW</span>
              </h1>
              <div className="text-xs text-gray-400 font-mono tracking-[0.2em]">BNB AUTONOMOUS AGENT</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyber-cyan/50 transition-colors">
              <Globe className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">BNB Chain</span>
            </button>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className={`px-6 py-2 border font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] ${
                isConnected 
                  ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                  : 'bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan'
              }`}
            >
              {isConnected ? '0x7F...3A9C' : 'CONNECT WALLET'}
            </button>
          </div>
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Dashboard & Status */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard />
            
            {/* Active Strategies */}
            <div className="glass-panel p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-bnb-yellow" />
                  ACTIVE STRATEGIES
                </h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                  2 RUNNING
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Strategy 1 */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                      LP
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-cyber-cyan transition-colors">PancakeSwap Auto-Compound</div>
                      <div className="text-xs text-gray-400">BNB-CAKE • $5,000 Allocated</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-mono font-bold">+12.4%</div>
                    <div className="text-xs text-gray-500">Last 24h</div>
                  </div>
                </div>

                {/* Strategy 2 */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-pink/30 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold">
                      Arb
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-cyber-pink transition-colors">Flash Loan Arbitrage</div>
                      <div className="text-xs text-gray-400">Monitoring 12 Pools • High Risk</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-mono font-bold">+0.8%</div>
                    <div className="text-xs text-gray-500">Last 24h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Agent Terminal */}
          <div className="lg:col-span-1">
            <AgentTerminal />
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
