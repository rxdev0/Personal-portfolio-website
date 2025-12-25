'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy } from 'lucide-react';

export function Contact({ isCorporate }: { isCorporate?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('yayinkuthiala.in@gmail.com');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Listen for global event to show the same toast when CTA in navbar is clicked
    useEffect(() => {
        const handler = () => handleCopyEmail();
        if (typeof window !== 'undefined') {
            window.addEventListener('showEmailToast', handler as EventListener);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('showEmailToast', handler as EventListener);
            }
        };
    }, []);

    return (
        <section
            id="contact"
            ref={containerRef}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#1a052b] to-[#2e0a4d] text-white py-24"
        >
            {/* Background Texture/Gradient Parallax */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-900/40 via-transparent to-transparent" />
            </div>

            <motion.div
                style={{ y }}
                className="container mx-auto px-6 text-center relative z-10"
            >
                {/* Main Heading */}
                {isCorporate ? (
                    <>
                        <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                            Have a project that could benefit
                        </h2>
                        <h2 className="text-6xl md:text-8xl font-serif italic mb-12 text-purple-200">
                            from my expertise?!
                        </h2>
                    </>
                ) : (
                    <>
                        <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                            Working on something that
                        </h2>
                        <h2 className="text-6xl md:text-8xl font-serif italic mb-12 text-purple-200">
                            demands high standards?
                        </h2>
                    </>
                )}

                {/* CTA Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyEmail}
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#7b2cbf] text-white font-bold text-lg hover:bg-white hover:text-[#7b2cbf] transition-all duration-300 shadow-[0_0_20px_rgba(123,44,191,0.5)] hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                >
                    Holla at me
                </motion.button>
            </motion.div>

            {/* Custom Footer Integrated */}
            <div className="absolute bottom-6 left-0 w-full px-6 lg:px-12 flex justify-between items-end text-xs md:text-sm font-medium text-white/20 select-none pointer-events-none z-20">
                {isCorporate ? (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2">
                            <span className="block md:inline">© 2012-2025 • Available</span>
                            <span className="block md:inline">for enterprise projects</span>
                        </div>
                        <div className="ml-auto text-right pointer-events-auto max-w-xs md:max-w-none">
                            <span className="block md:inline">Privacy policy • Enterprise inquiries:</span>
                            <span className="block md:inline"><a href="mailto:yayinkuthiala.in@gmail.com" className="underline">yayinkuthiala.in@gmail.com</a></span>
                        </div>
                    </>
                ) : (
                    <>
                        <p>I don't care about &copy; 2012-2025</p>
                        <p>Privacy policy, Cache & shit</p>
                    </>
                )}
            </div>

            {/* Custom Toast Popup */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : 50 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white text-black rounded-full shadow-2xl flex items-center gap-3 font-medium pointer-events-none"
            >
                <div className="p-1 bg-green-500 rounded-full text-white">
                    <Copy className="w-3 h-3" />
                </div>
                Email's Copied, hit me up
            </motion.div>
        </section>
    );
}
