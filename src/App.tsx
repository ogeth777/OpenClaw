import React from 'react';
import { AgentTerminal } from './components/AgentTerminal';
import { Dashboard } from './components/Dashboard';
import { LiveBackground } from './components/LiveBackground';
import { LiveTicker } from './components/LiveTicker';
import { Zap } from 'lucide-react';

function App() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState('');

  const connectWallet = async () => {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      try {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("User rejected connection", error);
      }
    } else {
      // Fallback for simulation if no wallet
      setIsConnected(!isConnected);
    }
  };

  return (
    <div className="min-h-screen relative text-white">
      <div className="scanline" />
      <LiveBackground />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex flex-col gap-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 group">
                <div className="absolute inset-0 bg-cyber-cyan rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
                <img 
                  src="/logo.svg" 
                  alt="OpenClaw Logo" 
                  className="relative w-full h-full rounded-xl border border-cyber-cyan/50 object-cover shadow-2xl p-1 bg-black"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-black rounded-full border border-bnb-yellow flex items-center justify-center z-20">
                  <img src="/bnb.svg" alt="BNB" className="w-4 h-4 animate-spin-slow" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-widest flex items-center gap-2">
                  OPEN<span className="text-cyber-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">CLAW</span>
                </h1>
                <div className="text-xs text-gray-400 font-mono tracking-[0.3em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-bnb-yellow rounded-full animate-pulse"></span>
                  BNB AUTONOMOUS AGENT
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40 border border-white/10 hover:border-bnb-yellow/50 transition-colors backdrop-blur-md group">
                <img src="/bnb.svg" alt="BNB Chain" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-gray-300 group-hover:text-bnb-yellow transition-colors">BNB Chain Mainnet</span>
              </button>
              <button 
                onClick={connectWallet}
                className={`px-6 py-2 border font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] ${
                  isConnected 
                    ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                    : 'bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border-cyber-cyan/50 text-cyber-cyan'
                }`}
              >
                {isConnected ? (walletAddress ? `${walletAddress.slice(0,6)}...${walletAddress.slice(-4)}` : '0x7F...3A9C') : 'CONNECT WALLET'}
              </button>
            </div>
          </div>
          <LiveTicker />
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Dashboard & Status */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard walletAddress={isConnected ? walletAddress : undefined} />
            
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
            <AgentTerminal walletAddress={walletAddress} />
          </div>

        </main>
      </div>
      {/* Floating BNB Badge */}
      <div className="fixed bottom-6 right-6 z-50 group cursor-pointer">
        <div className="absolute inset-0 bg-bnb-yellow/20 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="relative flex items-center gap-3 px-5 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl hover:border-bnb-yellow/50 transition-all transform group-hover:scale-105">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-bnb-yellow rounded-full blur opacity-20 animate-pulse"></div>
            <img src="/bnb.svg" alt="BNB" className="relative w-full h-full animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-mono leading-none tracking-wider uppercase">Built on</span>
            <span className="text-sm font-bold text-white tracking-wide group-hover:text-bnb-yellow transition-colors">BNB Chain</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
