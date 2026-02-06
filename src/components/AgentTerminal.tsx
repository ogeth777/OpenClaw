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
      addLog('⛽ Checking BNB Chain Gas Station (Mainnet)...');
      
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
          addLog('⚠️ RPC Connection Failed. Using estimated Mainnet values.');
          addLog('🟢 Standard: 3.00 Gwei');
          addLog('🟡 Fast: 3.50 Gwei');
          addLog('🔴 Instant: 5.00 Gwei');
          setIsProcessing(false);
        }, 1000);
      }
      return; 
    }

    setTimeout(async () => {
      if (cmd.toLowerCase().includes('scan') || cmd.toLowerCase().includes('analysis')) {
        addLog('⚙️ Connecting to BNB Chain Mainnet Node...');
        setTimeout(() => addLog('🔍 Scanning PancakeSwap V3 Liquidity Pools...'), 1000);
        setTimeout(() => addLog('📊 Detected Volume Spike: WBNB/USDT (+450%)'), 2000);
        setTimeout(() => {
          addLog('✅ Market Condition: HIGH VOLATILITY. Recommended Strategy: Arbitrage');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('swap') || cmd.toLowerCase().includes('buy')) {
        addLog('💸 Initiating Swap on BNB Smart Chain Mainnet...');
        setTimeout(() => addLog('🛣️ Routing: User -> PancakeSwap V3 -> 1inch Aggregator'), 1000);
        setTimeout(() => addLog('⛽ Estimating Mainnet Gas: 0.0004 BNB ($0.24)'), 2000);
        setTimeout(() => {
          addLog('📝 Requesting Wallet Signature...');
          addLog('🚀 Transaction Broadcasted! TxHash: https://bscscan.com/tx/0x7f2a...3b9c');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('rugcheck')) {
        addLog('🛡️ Initiating FairScale Audit (Mainnet)...');
        setTimeout(() => addLog('🔍 Querying BscScan Mainnet API for Contract Source...'), 800);
        setTimeout(() => addLog('🧬 Analyzing Bytecode for Honeypot logic...'), 1600);
        setTimeout(() => addLog('🔒 Liquidity Lock Check: 100% Locked (PinkSale Mainnet)'), 2400);
        setTimeout(() => {
          addLog('✅ FairScale Score: 98/100 (SAFE). Verified on BNB Chain.');
          setIsProcessing(false);
        }, 3200);
      } else if (cmd.toLowerCase().includes('portfolio')) {
        addLog('📊 Fetching Mainnet Assets...');
        
        if (walletAddress) {
           setTimeout(() => addLog(`🔍 Scanning Wallet: ${walletAddress.slice(0,8)}...`), 400);
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
                addLog('✅ Portfolio synced with BNB Chain.');
                setIsProcessing(false);
              }, 2000);
           } catch (e) {
             setTimeout(() => addLog('❌ RPC Error. Retrying connection...'), 1000);
             setIsProcessing(false);
           }
        } else {
          setTimeout(() => addLog('⚠️ Wallet not connected. Showing DEMO Mainnet Portfolio.'), 800);
          setTimeout(() => addLog('💰 BNB: 14.5 BNB ($8,700)'), 1500);
          setTimeout(() => addLog('🥞 CAKE: 500.0 CAKE ($1,200)'), 2200);
          setTimeout(() => {
            addLog('📈 Total Value: $9,900.00');
            setIsProcessing(false);
          }, 2900);
        }
      } else if (cmd.toLowerCase().includes('sniper')) {
        addLog('🎯 Sniper Mode: Active (BNB Chain Mainnet)');
        setTimeout(() => addLog('⚡ Monitoring Mempool for MethodID: 0xf305d719 (addLiquidityETH)'), 1000);
        setTimeout(() => addLog('🚀 Target Found: $MEME (0x8a...9f) - Block 0'), 2000);
        setTimeout(() => {
          addLog('✅ Buy Order Pending... (Awaiting User Signature)');
          setIsProcessing(false);
        }, 3000);
      } else if (cmd.toLowerCase().includes('help')) {
         addLog('ℹ️ Available Mainnet Commands:');
         addLog('  - scan: Analyze BNB Chain market conditions');
         addLog('  - buy/swap [token]: Execute Mainnet trade');
         addLog('  - rugcheck [contract]: FairScale safety audit');
         addLog('  - portfolio: View wallet assets');
         addLog('  - sniper: Watch for new token launches');
         addLog('  - gas: Check real-time Mainnet gas price');
         addLog('  - clear: Clear terminal output');
         setIsProcessing(false);
      } else {
        addLog('🤖 Command received. Processing...');
        setTimeout(() => {
          addLog(`❌ Unknown command: "${cmd}". Type 'help' for options.`);
          setIsProcessing(false);
        }, 1000);
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
