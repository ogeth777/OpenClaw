import React from 'react';
import { Shield, TrendingUp, Wallet, Activity } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric Card 1: Portfolio */}
      <div className="glass-panel p-4 rounded-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-bnb-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-bnb-yellow/10 rounded-lg">
            <Wallet className="w-5 h-5 text-bnb-yellow" />
          </div>
          <span className="text-xs text-green-400 font-mono">+2.4%</span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Balance</div>
        <div className="text-2xl font-bold text-white">$12,450.00</div>
        <div className="text-xs text-gray-500 mt-1">45.2 BNB</div>
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
          <span className="text-xs text-cyber-pink font-mono">LOW GAS</span>
        </div>
        <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">BNB Chain Status</div>
        <div className="text-2xl font-bold text-white">3.1 Gwei</div>
        <div className="text-xs text-gray-500 mt-1">Block: #35124156</div>
      </div>
    </div>
  );
};
