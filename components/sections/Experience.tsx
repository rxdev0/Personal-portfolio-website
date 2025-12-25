'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function Experience() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);
    const cardY1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const cardY2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={containerRef}
            className="relative z-50 pt-32 pb-32 px-6 lg:px-12 bg-[#0A0A0A] overflow-hidden"
        >
            <div className="container mx-auto max-w-3xl relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-20 text-center"
                >
                    Journey
                </motion.h2>

                <div className="relative ml-4 md:ml-0">
                    {/* Background Progress Line */}
                    <div className="absolute -left-px top-0 w-0.5 h-full bg-white/5" />

                    {/* Animated Progress Line */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute -left-px top-0 w-0.5 bg-accent origin-top"
                    />

                    <div className="space-y-24">
                        <motion.div
                            style={{ y: cardY1 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="md:pl-12 relative"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(123,44,191,0.5)]" />

                            <div className="bg-white/3 border border-white/5 p-8 rounded-3xl hover:border-accent/30 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-foreground">Founder & Lead Developer</h3>
                                    <span className="text-sm font-medium text-muted-foreground bg-white/5 px-3 py-1 rounded-full">2025 - Present</span>
                                </div>
                                <h4 className="text-xl font-semibold text-accent mb-6">Flux</h4>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Founded and built Flux, a music discovery platform solving fragmentation in the industry.
                                    Led the full-stack development using Next.js, Prisma, and PostgreSQL.
                                    Manage product roadmap, design, and deployment.
                                </p>
                                <div className="mt-8 inline-flex items-center px-4 py-2 rounded-xl bg-accent/10 text-accent text-sm font-bold">
                                    Founder of Flux
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ y: cardY2 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="md:pl-12 relative"
                        >
                            <div className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-white/20" />

                            <div className="bg-white/3 border border-white/5 p-8 rounded-3xl hover:border-accent/30 transition-colors">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Freelance / Open Source</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Focused on minimal design and high-performance applications.
                                    Working on various UI/UX concepts and open source contributions. Always building.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
