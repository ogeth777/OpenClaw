import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export const AgentTerminal = ({ walletAddress }: { walletAddress?: string }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState('');
  const [gasPrice, setGasPrice] = useState<string>('0.05');
  const logsEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGas = async () => {
      try {
        const response = await fetch('https://bsc-dataseed.binance.org/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
            id: 1
          })
        });
        const data = await response.json();
        const gasPriceWei = parseInt(data.result, 16);
        const gasPriceGwei = (gasPriceWei / 1e9).toFixed(2);
        setGasPrice(gasPriceGwei);
      } catch (err) {
        console.error('Failed to fetch gas price:', err);
      }
    };
    
    fetchGas();
    const interval = setInterval(fetchGas, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const autonomousThoughts = [
      "Scanning BSC mempool for new liquidity pairs...",
      "Analyzing volume/liquidity ratio for top 20 tokens...",
      "Monitoring whale wallet 0x4f...a12b",
      "Calculated FairScale Trust Score for 5 new contracts.",
      "Arbitrage scan: No profitable paths found > 0.5% slippage.",
      "Syncing with BSC mainnet block height...",
      "Updating gas price heuristics...",
      "Verifying contract source code on BscScan..."
    ];

    const interval = setInterval(() => {
      // 30% chance to log something every 8 seconds
      if (Math.random() > 0.7) {
        const randomThought = autonomousThoughts[Math.floor(Math.random() * autonomousThoughts.length)];
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [SYSTEM] ${randomThought}`]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs, isProcessing]);

  const addLog = (text: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${text}`]);
  };

  const handleCommand = async (e: React.FormEvent) => {
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

    // Mock AI Processing (with real data fetching for gas)
    if (cmd.toLowerCase().includes('gas')) {
      addLog('⛽ Checking BNB Chain Gas Station (Live Data)...');
      
      try {
        const response = await fetch('https://bsc-dataseed.binance.org/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
            id: 1
          })
        });
        
        const data = await response.json();
        const gasPriceWei = parseInt(data.result, 16);
        const gasPriceGwei = gasPriceWei / 1e9;
        
        const standard = gasPriceGwei;
        const fast = standard * 1.1; 
        const instant = standard * 1.5;

        setTimeout(async () => {
          addLog(`🟢 Standard: ${standard.toFixed(2)} Gwei`);
          addLog(`🟡 Fast: ${fast.toFixed(2)} Gwei`);
          addLog(`🔴 Instant: ${instant.toFixed(2)} Gwei`);
          setIsProcessing(false);
        }, 800);
      } catch (err) {
        setTimeout(() => {
          addLog('⚠️ RPC Connection Failed. Using estimated values.');
          addLog('🟢 Standard: 0.05 Gwei');
          addLog('🟡 Fast: 0.06 Gwei');
          addLog('🔴 Instant: 0.10 Gwei');
          setIsProcessing(false);
        }, 1000);
      }
      return; // Exit early as we handled this command specifically
    }

    setTimeout(async () => {
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
      } else if (cmd.toLowerCase().includes('rugcheck')) {
        addLog('🛡️ Initiating FairScale Safety Scan...');
        setTimeout(() => addLog('🔍 Analyzing contract source code...'), 800);
        setTimeout(() => addLog('📊 Checking liquidity lock status...'), 1600);
        setTimeout(() => addLog('⚠️ Warning: Mint authority is enabled'), 2400);
        setTimeout(() => {
          addLog('❌ Risk Level: HIGH (Score: 24/100). Trade aborted.');
          setIsProcessing(false);
        }, 3200);
      } else if (cmd.toLowerCase().includes('portfolio')) {
        addLog('📊 Fetching cross-chain assets...');
        
        if (walletAddress) {
           setTimeout(() => addLog(`🔍 Analyzing wallet: ${walletAddress.slice(0,8)}...`), 400);
           try {
             const response = await fetch('https://bsc-dataseed.binance.org/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  jsonrpc: '2.0',
                  method: 'eth_getBalance',
                  params: [walletAddress, "latest"],
                  id: 1
                })
              });
              const data = await response.json();
              const balanceWei = parseInt(data.result, 16);
              const balanceBNB = (balanceWei / 1e18).toFixed(4);
              
              setTimeout(() => addLog(`💰 BNB Balance: ${balanceBNB} BNB`), 1200);
              setTimeout(() => {
                addLog('✅ Data verified on-chain.');
                setIsProcessing(false);
              }, 2000);
           } catch (e) {
             setTimeout(() => addLog('❌ RPC Error. Retrying...'), 1000);
             setIsProcessing(false);
           }
        } else {
          setTimeout(() => addLog('⚠️ Wallet not connected. Showing DEMO portfolio.'), 800);
          setTimeout(() => addLog('💰 BNB Chain: 14.5 BNB ($8,700)'), 1500);
          setTimeout(() => addLog('🥞 CAKE Staked: 500 CAKE ($1,200)'), 2200);
          setTimeout(() => {
            addLog('📈 Total Net Worth: $9,900 (+4.2% today)');
            setIsProcessing(false);
          }, 2900);
        }
      } else if (cmd.toLowerCase().includes('sniper')) {
        addLog('🎯 Sniper Mode Activated. Watching mempool...');
        setTimeout(() => addLog('⚡ Pending liquidity add detected: $PEPE-BNB'), 1000);
        setTimeout(() => addLog('🚀 Front-running simulation... Success rate: 94%'), 2000);
        setTimeout(() => {
          addLog('✅ Ready to engage. Waiting for trigger...');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('gas')) {
        addLog('⛽ Checking BNB Chain Gas Station...');
        setTimeout(() => {
          addLog('🟢 Standard: 3 Gwei');
          addLog('🟡 Fast: 5 Gwei');
          addLog('🔴 Instant: 7 Gwei');
          setIsProcessing(false);
        }, 1000);
      } else if (cmd.toLowerCase().includes('help')) {
         addLog('ℹ️ Available commands:');
         addLog('  - scan: Analyze market conditions');
         addLog('  - swap/buy [amount] [token]: Execute trade');
         addLog('  - rugcheck [token]: Check safety score');
         addLog('  - portfolio: Show asset summary');
         addLog('  - sniper: Watch for new launches');
         addLog('  - gas: Check network fees');
         addLog('  - clear: Clear terminal');
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
          <div className="px-3 py-1 rounded bg-white/5 text-xs font-mono text-gray-400 border border-white/5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
            GAS: {gasPrice} Gwei
          </div>
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
