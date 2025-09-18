'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [currentNope, setCurrentNope] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNope((prev) => (prev + 1) % 3);
        setIsVisible(true);
      }, 200);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const nopeTexts = ['Nope', 'Nope', 'Nope!'];
  const colors = ['text-red-500', 'text-blue-500', 'text-green-500'];
  const sizes = ['text-6xl', 'text-7xl', 'text-8xl'];
  const rotations = ['rotate-3', '-rotate-2', 'rotate-1'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full animate-ping" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Main "Nope Nope Nope!" text */}
        <div className="mb-8 relative">
          <h1 
            className={`font-bold transition-all duration-500 transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            } ${colors[currentNope]} ${sizes[currentNope]} ${rotations[currentNope]} animate-bounce hover:animate-pulse cursor-pointer select-none`}
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5)',
              filter: 'drop-shadow(0 0 10px currentColor)',
            }}
            onClick={() => {
              setCurrentNope(Math.floor(Math.random() * 3));
              setClickCount(prev => prev + 1);
              if (clickCount > 0 && clickCount % 5 === 0) {
                setShowFireworks(true);
                setTimeout(() => setShowFireworks(false), 2000);
              }
            }}
          >
            {nopeTexts[currentNope]}
          </h1>
          
          {/* Fireworks effect */}
          {showFireworks && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <p className="text-white/80 text-xl md:text-2xl font-light animate-pulse">
            Welcome to the land of{' '}
            <span className="font-bold text-yellow-400 animate-bounce inline-block gradient-text">
              NOPE
            </span>
          </p>
          {clickCount > 0 && (
            <p className="text-sm text-white/60 mt-2 animate-fade-in">
              Nope count: {clickCount} 🎯
            </p>
          )}
        </div>

        {/* Animated circles */}
        <div className="flex justify-center space-x-4 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                currentNope === i ? 'bg-yellow-400 scale-150' : 'bg-white/30'
              }`}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Fun interactive buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
          <button
            onClick={() => {
              setCurrentNope(Math.floor(Math.random() * 3));
              setClickCount(prev => prev + 1);
              // Add a little shake animation
              const button = document.querySelector('.shake-button');
              button?.classList.add('animate-shake');
              setTimeout(() => {
                button?.classList.remove('animate-shake');
              }, 500);
            }}
            className="shake-button bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95"
          >
            Click for more NOPE! 🚫
          </button>
          
          <button
            onClick={() => {
              setShowFireworks(true);
              setTimeout(() => setShowFireworks(false), 2000);
              setClickCount(prev => prev + 10);
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl active:scale-95"
          >
            MEGA NOPE! ✨
          </button>
        </div>

        {/* Reset button (only show after some clicks) */}
        {clickCount > 5 && (
          <div className="animate-fade-in">
            <button
              onClick={() => {
                setClickCount(0);
                setCurrentNope(0);
                setShowFireworks(false);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105"
            >
              Reset Nope Counter 🔄
            </button>
          </div>
        )}

        {/* Floating "nope" words */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute font-bold text-sm animate-bounce hover-glow ${
                i % 3 === 0 ? 'text-red-300/30' : 
                i % 3 === 1 ? 'text-blue-300/30' : 'text-green-300/30'
              }`}
              style={{
                left: `${5 + (i * 8)}%`,
                top: `${15 + (i * 6)}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + (i * 0.2)}s`,
                fontSize: `${0.8 + (i * 0.1)}rem`,
              }}
            >
              {i % 4 === 0 ? 'nope' : i % 4 === 1 ? 'nah' : i % 4 === 2 ? 'no way' : '🚫'}
            </div>
          ))}
        </div>

        {/* Achievement notification */}
        {clickCount >= 20 && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold animate-bounce z-50">
            🏆 Nope Master Achieved! 🏆
          </div>
        )}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-white/30 text-6xl animate-spin-slow">
        🚫
      </div>
      <div className="absolute top-4 right-4 text-white/30 text-6xl animate-spin-slow">
        ❌
      </div>
      <div className="absolute bottom-4 left-4 text-white/30 text-6xl animate-spin-slow">
        🙅‍♂️
      </div>
      <div className="absolute bottom-4 right-4 text-white/30 text-6xl animate-spin-slow">
        🙅‍♀️
      </div>
    </div>
  );
}







