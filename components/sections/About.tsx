'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function About() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const backgroundTextY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative py-32 px-6 lg:px-12 bg-[#0A0A0A] overflow-hidden"
        >
            {/* Parallax Background Text */}
            <motion.div
                style={{ y: backgroundTextY }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]"
            >
                <span className="text-[18vw] font-black leading-none whitespace-nowrap">
                    CREATION INNOVATION BUILDING
                </span>
            </motion.div>

            <div className="container mx-auto max-w-4xl text-center relative z-10">
                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-12 text-accent">About Me</h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-foreground mb-12">
                        I'm exploring the boundaries of <span className="text-white/60">Full-Stack Development,</span> UI/UX, and <span className="text-white/60">Cybersecurity.</span>
                    </p>

                    <p className="text-xl leading-relaxed text-muted-foreground mb-16 max-w-2xl mx-auto">
                        Currently, I'm focused on building <span className="text-foreground font-semibold underline decoration-accent/30 underline-offset-4">Flux</span> and refining my craft as a founder.
                        Driven by curiosity and a relentless drive for continuous improvement.
                    </p>

                    <div className="inline-block px-6 md:px-10 py-5 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/40 transition-colors group">
                        <p className="text-lg md:text-xl font-medium text-foreground">
                            I’m 13 — and I build products that <span className="inline-block whitespace-nowrap">
                                <span className="relative inline-block cursor-default">
                                    <span className="relative z-10 text-accent transition-colors duration-300">ship</span>
                                    <span className="absolute inset-0 bg-accent/50 blur-md rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                                </span>.
                            </span>
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
