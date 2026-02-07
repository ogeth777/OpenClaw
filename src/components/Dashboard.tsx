import { Shield, TrendingUp, Wallet, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { web3Service } from '../services/Web3Service';

export const Dashboard = ({ walletAddress }: { walletAddress?: string }) => {
  const [gasPrice, setGasPrice] = useState<string>('3.1');
  const [blockNumber, setBlockNumber] = useState<string>('35124156');
  const [balance, setBalance] = useState<{ bnb: string; usd: string }>({ bnb: '0.0000', usd: '0.00' });

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) {
        // Reset to zero if disconnected
        setBalance({ bnb: '0.0000', usd: '0.00' });
        return;
      }

      try {
        const bnbValStr = await web3Service.getBalance(walletAddress);
        const bnbVal = parseFloat(bnbValStr);
        const bnbStr = bnbVal.toFixed(4);
        
        // Approximate USD value (BNB ~ $620)
        const usdVal = (bnbVal * 620).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        setBalance({ bnb: bnbStr, usd: usdVal });
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      }
    };

    fetchBalance();
    // Refresh balance every 10 seconds
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [walletAddress]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Gas Price
        const gasPriceGwei = await web3Service.getGasPrice();
        setGasPrice(gasPriceGwei);

        // Fetch Block Number (Web3Service doesn't have getBlockNumber yet, so keep fetch or add it)
        // Let's add getBlockNumber to Web3Service or keep using fetch here for now. 
        // For simplicity, I'll keep the fetch for block number as I didn't add it to Web3Service yet.
        const blockResponse = await fetch('https://bsc-dataseed.binance.org/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1
          })
        });
        const blockData = await blockResponse.json();
        const currentBlock = parseInt(blockData.result, 16);
        setBlockNumber(currentBlock.toString());

      } catch (err) {
        console.error('Failed to fetch network data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric Card 1: Portfolio */}
      <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-bnb-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-bnb-yellow/10 rounded-lg">
            <Wallet className="w-5 h-5 text-bnb-yellow" />
          </div>
          <span className="text-xs text-green-400 font-mono">{walletAddress ? '+2.4%' : '0.0%'}</span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Balance</div>
        <div className="text-2xl font-bold text-white">${balance.usd}</div>
        <div className="text-xs text-gray-500 mt-1">{balance.bnb} BNB</div>
      </div>

      {/* Metric Card 2: FairScore */}
      <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-cyber-cyan/10 rounded-lg">
            <Shield className="w-5 h-5 text-cyber-cyan" />
          </div>
          <span className="text-xs text-cyber-cyan font-mono">TIER 1</span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">FairScale Score</div>
        <div className="text-2xl font-bold text-white">850/1000</div>
        <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-cyber-cyan h-full w-[85%] shadow-[0_0_10px_#00F0FF]" />
        </div>
      </div>

      {/* Metric Card 3: APY */}
      <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-cyber-purple/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-cyber-purple" />
          </div>
          <span className="text-xs text-cyber-purple font-mono">OPTIMIZED</span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Avg. APY</div>
        <div className="text-2xl font-bold text-white">18.4%</div>
        <div className="text-xs text-gray-500 mt-1">Via PancakeSwap V3</div>
      </div>

      {/* Metric Card 4: Network Status */}
      <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-cyber-pink/10 rounded-lg">
            <Activity className="w-5 h-5 text-cyber-pink" />
          </div>
          <span className="text-xs text-cyber-pink font-mono">
            {parseFloat(gasPrice) < 3 ? 'LOW GAS' : parseFloat(gasPrice) < 5 ? 'NORMAL' : 'HIGH GAS'}
          </span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">BNB Chain Status</div>
        <div className="text-2xl font-bold text-white">{gasPrice} Gwei</div>
        <div className="text-xs text-gray-500 mt-1">Block: #{blockNumber}</div>
      </div>
    </div>
  );
};
