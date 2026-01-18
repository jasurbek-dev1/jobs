import { motion } from 'framer-motion';
import { Code, Cpu, Database, Palette, Rocket, Zap } from 'lucide-react';

const icons = [Code, Cpu, Database, Palette, Rocket, Zap];

const Particle = ({ delay, duration, icon: Icon }: { delay: number; duration: number; icon: typeof Code }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  return (
    <motion.div
      className="absolute text-cyan-500/20"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        rotate: [0, 180, 360],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Icon size={24} />
    </motion.div>
  );
};

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {Array.from({ length: 15 }).map((_, i) => (
        <Particle
          key={i}
          delay={i * 0.5}
          duration={8 + Math.random() * 5}
          icon={icons[Math.floor(Math.random() * icons.length)]}
        />
      ))}

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
    </div>
  );
}
