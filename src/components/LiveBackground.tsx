import { motion } from 'framer-motion';

export const LiveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
      {/* Moving Grid */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg)',
             transformOrigin: 'top center',
           }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-bnb-yellow/10 rounded-full blur-[80px]"
      />

      {/* Digital Rain / Particles Effect (Simplified) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};
