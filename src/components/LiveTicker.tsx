import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TokenData {
  name: string;
  price: string;
  change: string;
}

export const LiveTicker = () => {
  const [tokens, setTokens] = useState<TokenData[]>([
    { name: 'BNB', price: '...', change: '0.00%' },
    { name: 'CAKE', price: '...', change: '0.00%' },
    { name: 'BTC', price: '...', change: '0.00%' },
    { name: 'ETH', price: '...', change: '0.00%' },
    { name: 'SOL', price: '...', change: '0.00%' },
    { name: 'CLAW', price: '0.0042', change: '+15.4%' },
    { name: 'DOGE', price: '...', change: '0.00%' },
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Binance API for 24hr ticker data
        const symbols = ["BNBUSDT", "CAKEUSDT", "BTCUSDT", "ETHUSDT", "SOLUSDT", "DOGEUSDT"];
        const query = JSON.stringify(symbols);
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${query}`);
        const data = await response.json();

        const updatedTokens = data.map((item: any) => {
          const symbol = item.symbol.replace('USDT', '');
          const price = parseFloat(item.lastPrice);
          const change = parseFloat(item.priceChangePercent);
          
          return {
            name: symbol,
            price: price < 1 ? price.toFixed(4) : price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
          };
        });

        // Insert CLAW token (mock)
        const clawToken = { name: 'CLAW', price: '0.0042', change: '+15.4%' };
        
        // Combine real data with mock CLAW
        const finalTokens = [
          updatedTokens.find((t: any) => t.name === 'BNB'),
          updatedTokens.find((t: any) => t.name === 'CAKE'),
          clawToken,
          updatedTokens.find((t: any) => t.name === 'BTC'),
          updatedTokens.find((t: any) => t.name === 'ETH'),
          updatedTokens.find((t: any) => t.name === 'SOL'),
          updatedTokens.find((t: any) => t.name === 'DOGE'),
        ].filter(Boolean) as TokenData[];

        setTokens(finalTokens);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

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
