'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
}

export default function Home() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const createSparkle = (): Sparkle => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3000 + 2000,
    });

    const addSparkle = () => {
      const newSparkle = createSparkle();
      setSparkles(prev => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
      }, newSparkle.duration);
    };

    // Create initial sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => addSparkle(), i * 200);
    }

    // Continue adding sparkles
    const interval = setInterval(addSparkle, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none animate-pulse"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            opacity: sparkle.opacity,
            animation: `sparkle ${sparkle.duration}ms ease-in-out`,
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg shadow-white/50 animate-ping"></div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-bounce">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Hello World
            </span>
          </h1>
          <div className="flex justify-center space-x-4 text-4xl animate-pulse">
            <span className="text-yellow-300">✨</span>
            <span className="text-pink-300">🌟</span>
            <span className="text-blue-300">💫</span>
            <span className="text-purple-300">⭐</span>
            <span className="text-cyan-300">✨</span>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mt-8 font-light">
            Welcome to a sparkling new world!
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

