import React, { useState, useEffect } from 'react';
import { Leaf, ArrowRight, Shield, Zap, Heart } from 'lucide-react';

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating animation for leaves
  const FloatingLeaf = ({ delay, duration, left, top }) => (
    <div
      className="absolute opacity-20 hidden lg:block pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <Leaf size={60} color="#8B9D83" strokeWidth={1.5} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>

      {/* Floating Leaves Background */}
      <FloatingLeaf delay={0} duration={8} left={5} top={15} />
      <FloatingLeaf delay={1} duration={9} left={92} top={12} />
      <FloatingLeaf delay={2} duration={10} left={8} top={65} />
      <FloatingLeaf delay={1.5} duration={8.5} left={88} top={75} />
      <FloatingLeaf delay={0.5} duration={9.5} left={15} top={85} />
      <FloatingLeaf delay={3} duration={11} left={85} top={45} />

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-[#8B9D83] p-2 sm:p-2.5 rounded-full">
              <Leaf size={20} className="sm:w-6 sm:h-6" color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-black">PlantCare AI</span>
          </div>
          <button className="text-sm sm:text-base text-black hover:text-[#8B9D83] transition-colors font-medium">
            About
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24 flex items-center justify-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center w-full">

          {/* Title */}
          <div className="w-full flex flex-col items-center text-center space-y-4 sm:space-y-6">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#244C1A] leading-tight ${
                isVisible ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.15s" }}
            >
              Detect Plant Diseases
              <span className="block text-[#3B6B28] mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-semibold">
                With AI Precision
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto px-4 ${
                isVisible ? "animate-slideUp" : "opacity-0"
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              Upload a photo of your plant's leaf and get instant diagnosis with treatment recommendations — powered by advanced machine learning.
            </p>
            <br />
            <br />

            {/* CTA Button */}
            <div
              className={`${isVisible ? "animate-slideUp" : "opacity-0"} mt-2`}
              style={{ animationDelay: "0.45s" }}
            >
              <button
                onClick={() => window.location.href = "/home"}
                className="group bg-[#244C1A] text-white hover:bg-[#3B6B28] px-6 sm:px-8 md:px-12 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center gap-2 sm:gap-3"
              >
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <br />
              <br />
            </div>
          </div>

          {/* Feature Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-12 sm:mt-16 md:mt-20 lg:mt-24 w-full max-w-6xl">
            {[
              {
                icon: <Zap className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" strokeWidth={1.6} />,
                title: "Instant Detection",
                description: "Get results in seconds with our advanced AI model",
                delay: "0.6s",
              },
              {
                icon: <Shield className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" strokeWidth={1.6} />,
                title: "Accurate Diagnosis",
                description: "Trained on thousands of plant disease images",
                delay: "0.75s",
              },
              {
                icon: <Heart className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" strokeWidth={1.6} />,
                title: "Save Your Plants",
                description: "Receive actionable treatment recommendations",
                delay: "0.9s",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl sm:rounded-2xl md:rounded-3xl px-5 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:py-12 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.04] flex flex-col items-center text-center h-full ${
                  isVisible ? "animate-slideUp" : "opacity-0"
                }`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="mb-3 sm:mb-4 md:mb-6 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-[#F1F7ED] text-[#244C1A]">
                  {feature.icon}
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#244C1A] mb-2 sm:mb-3">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;