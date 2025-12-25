'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import { SocialDock } from '@/components/ui/SocialDock';

interface HeroSplitProps {
  isCorporate: boolean;
  toggleCorporate: () => void;
}

export default function HeroSplit({ isCorporate, toggleCorporate }: HeroSplitProps) {
  const [showCard, setShowCard] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Reduce content parallax slightly for 'Real' mode to avoid clash with large headline
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isCorporate ? "15%" : "10%"]);
  // Reduce heading parallax amplitude on Real mode (prevents overlap) and keep larger amplitude for Corporate
  const headingY = useTransform(scrollYProgress, [0, 1], ["0%", isCorporate ? "40%" : "18%"]);
  const floatingY1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const floatingY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section      id="hero"      ref={containerRef}
      className="relative flex min-h-screen w-full overflow-hidden flex-col md:flex-row"
    >
      <SocialDock />

      {/* Decorative Floating Elements */}
      <motion.div
        style={{ y: floatingY1 }}
        className="absolute top-20 left-[10%] w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none z-0"
      />
      <motion.div
        style={{ y: floatingY2 }}
        className="absolute bottom-20 right-[40%] w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none z-0"
      />

      {/* Left Side - Light */}
      <motion.div
        style={{ y: contentY }}
        className="w-full md:w-1/2 bg-[#E5E7EB] flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24 relative z-10"
      >
        {/* Toggle Switch */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8 text-sm font-medium text-gray-500 w-fit"
          onClick={toggleCorporate}
          aria-label={`Switch to ${isCorporate ? 'real' : 'corporate'} mode`}
          role="switch"
          aria-checked={isCorporate}
        >
          <span className={!isCorporate ? "text-black" : "text-gray-400"}>Real</span>
          <div className={`w-10 h-5 rounded-full relative px-1 flex items-center transition-colors ${isCorporate ? "bg-purple-600" : "bg-black"}`}>
            <motion.div
              layout
              className="w-3 h-3 bg-white rounded-full"
              animate={{ x: isCorporate ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
          <span className={isCorporate ? "text-black" : "text-gray-400"}>Corporate</span>
        </motion.button>

        {/* Headline */}
        <motion.h1
          key={isCorporate ? "corp-h1" : "real-h1"}
          style={{ y: headingY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-black mb-8 leading-[1.1]"
        >
          {isCorporate ? (
            <>I build digital products that <span className="font-serif italic font-normal">make a difference</span></>
          ) : (
            <>I build things your CFO will <span className="font-serif italic font-normal">actually</span> understand</>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          key={isCorporate ? "corp-p" : "real-p"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 max-w-xl mb-12 leading-relaxed"
        >
          {isCorporate ? (
            "I build scalable, user focused experiences that solve real problems."
          ) : (
            "Scalable code, Fast Delivery, clean UI, and a bit of AI where it actually matters. No filler, no fluff."
          )}
        </motion.p>

        {/* Buttons */}
        <motion.div
          key={isCorporate ? "corp-btn" : "real-btn"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
        >
          <a
            href="#projects"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-600/20"
          >
            {isCorporate ? "View projects" : "Scroll for work"}
          </a>

          <a
            href="https://www.linkedin.com/in/yayinkuthiala/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block text-purple-600 text-sm transition-colors hover:text-purple-700 whitespace-nowrap"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* Crossfade technique: normal text fades out while bold text fades in for a smooth weight transition */}
            <span className="inline-block transition-all duration-1000 ease-out transform group-hover:scale-105 group-hover:opacity-0 whitespace-nowrap">
              {isCorporate ? "Connect professionally" : "LinkedIn, if you must"}
            </span>
            <span className="absolute left-0 top-0 inline-block font-bold opacity-0 transition-opacity duration-1000 ease-in transform group-hover:scale-105 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
              {isCorporate ? "Connect professionally" : "LinkedIn, if you must"}
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Right Side - Dark / Image */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen bg-[#050505] relative overflow-hidden">
        <motion.div
          key="heroimg"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          // Increase the element height on small screens so parallax never exposes the container background
          className="absolute inset-0 bg-cover bg-center h-[160%] md:h-[120%]"
          style={{
              // Use the public/ asset path so Next serves the image correctly
              backgroundImage: `url('/heroimg.png')`,
              // Show the same image regardless of toggle state
              opacity: 1,
              mixBlendMode: 'normal',
              y: backgroundY,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
        />


        {/* Product Overlay Card */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.4 }}
              className="fixed bottom-8 right-8 md:bottom-12 md:right-12 bg-white rounded-xl p-6 max-w-xs shadow-2xl z-100"
            >
              <button
                onClick={() => setShowCard(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
                aria-label="Close card"
              >
                <X size={14} />
              </button>
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-red-500 border border-red-200 bg-red-50 rounded-full px-3 py-1">
                  New build
                </span>
                <h3 className="font-bold text-black text-lg leading-tight ml-2">
                  Flux: AI driven
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Music discovery platform for artists & listeners, shipped as a real product.
              </p>
              <div className="mt-4 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500">Live now</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
