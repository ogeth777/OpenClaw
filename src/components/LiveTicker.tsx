import { motion } from 'framer-motion';

const tokens = [
  { name: 'BNB', price: '320.50', change: '+2.4%' },
  { name: 'CAKE', price: '2.85', change: '+1.2%' },
  { name: 'BTC', price: '45,230.00', change: '+0.8%' },
  { name: 'ETH', price: '2,450.00', change: '+1.5%' },
  { name: 'SOL', price: '98.50', change: '-0.5%' },
  { name: 'CLAW', price: '0.0042', change: '+15.4%' },
  { name: 'DOGE', price: '0.08', change: '-1.2%' },
];

export const LiveTicker = () => {
  return (
    <div className="w-full overflow-hidden bg-black/40 border-y border-white/10 py-2 backdrop-blur-sm">
      <motion.div 
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30, 
          ease: "linear" 
        }}
      >
        {[...tokens, ...tokens, ...tokens, ...tokens].map((token, i) => (
          <div key={i} className="flex items-center gap-2 font-mono text-sm">
            <span className="font-bold text-cyan-400">{token.name}</span>
            <span className="text-white">${token.price}</span>
            <span className={`${token.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
              {token.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
