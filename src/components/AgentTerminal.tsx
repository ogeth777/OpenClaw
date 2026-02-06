import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Wallet, Zap, Activity, Globe, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AgentTerminal = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState('');
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, isProcessing]);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input;
    setInput('');
    
    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      return;
    }

    addLog(`> User: ${cmd}`);
    setIsProcessing(true);

    // Mock AI Processing
    setTimeout(() => {
      if (cmd.toLowerCase().includes('scan') || cmd.toLowerCase().includes('analysis')) {
        addLog('⚙️ Initiating deep scan of BNB Chain mempool...');
        setTimeout(() => addLog('🔍 Detected high volume on PancakeSwap V3'), 1000);
        setTimeout(() => addLog('⚠️ Whale movement alert: 5,000 BNB transferred to Binance'), 2000);
        setTimeout(() => {
          addLog('✅ Scan complete. Market Sentiment: BULLISH (78/100)');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('swap') || cmd.toLowerCase().includes('buy')) {
        addLog('💸 Analyzing route for optimal slippage...');
        setTimeout(() => addLog('🛤️ Route found: BNB -> USDT -> CAKE'), 1000);
        setTimeout(() => addLog('📝 Constructing transaction...'), 2000);
        setTimeout(() => {
          addLog('🚀 Transaction Broadcasted! Hash: 0x7f...3a9c');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('help')) {
         addLog('ℹ️ Available commands:');
         addLog('  - scan: Analyze market conditions');
         addLog('  - buy [amount] [token]: Execute swap');
         addLog('  - clear: Clear terminal');
         addLog('  - status: Check agent health');
         setIsProcessing(false);
      } else {
        addLog('🤖 Command received. Analyzing intent...');
        setTimeout(() => {
          addLog(`✅ Executing logic for: "${cmd}"`);
          setIsProcessing(false);
        }, 1500);
      }
    }, 500);
  };

  return (
    <div className="glass-panel rounded-xl p-6 h-[600px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyber-cyan/10 rounded-lg">
            <Terminal className="w-5 h-5 text-cyber-cyan" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wider text-white">AGENT CLI</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-cyber-cyan font-mono">ONLINE // V3.0.1</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded bg-white/5 text-xs font-mono text-gray-400 border border-white/5">
            RAM: 64GB
          </div>
          <div className="px-3 py-1 rounded bg-white/5 text-xs font-mono text-gray-400 border border-white/5">
            LATENCY: 12ms
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 mb-4 scrollbar-hide p-2">
        <div className="text-gray-500">Initializing OpenClaw Protocol...</div>
        <div className="text-gray-500">Connected to BNB Smart Chain RPC...</div>
        <div className="text-gray-500">FairScale Reputation Module: ACTIVE</div>
        <div className="text-gray-500">Type 'help' for available commands.</div>
        <br />
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${log.startsWith('>') ? 'text-cyber-cyan font-bold' : 'text-green-400'}`}
          >
            {log}
          </motion.div>
        ))}
        {isProcessing && (
          <div className="text-cyber-pink animate-pulse">_ Processing...</div>
        )}
        <div ref={logsEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command (e.g., 'scan', 'buy 1 BNB')"
          className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 pl-12 text-white font-mono focus:outline-none focus:border-cyber-cyan transition-colors placeholder-gray-600"
          autoFocus
        />
        <span className="absolute left-4 top-3.5 text-cyber-cyan font-bold">{'>'}</span>
      </form>
    </div>
  );
};
