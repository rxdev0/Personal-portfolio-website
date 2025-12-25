'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export function FluxCaseStudy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A0A0A] text-white py-20"
        >
            {/* Background Parallax Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-purple-500/10" />
            </div>

            <motion.div
                style={{ y, opacity }}
                className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                        <span className="text-[#7b2cbf]">Flux:</span> AI<br />
                        powered<br />
                        <span className="text-white/40">discovery tool</span>
                    </h2>

                    <div className="space-y-6 max-w-lg">
                        <p className="text-2xl md:text-3xl font-light leading-snug text-white/90">
                            Music discovery platform for artists & listeners, shipped as a real product.
                        </p>

                        <div className="grid grid-cols-2 gap-8 text-sm pt-4 border-t border-white/10">
                            <div>
                                <p className="text-white/40 mb-1">Role</p>
                                <p className="font-medium">Founder & Dev</p>
                            </div>
                            <div>
                                <p className="text-white/40 mb-1">Date</p>
                                <p className="font-medium">December 2025</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="https://fluxbeats.vercel.app"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 group"
                            >
                                <span className="font-medium">View project</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Visual/Image Side - Abstract representation since we don't have the image yet */}
                <div className="relative h-[400px] md:h-[600px] w-full bg-neutral-900/50 rounded-3xl border border-white/5 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Mock UI Elements for "Flux" */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-2xl z-10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                            <div className="h-32 w-full bg-white/5 rounded-lg border border-white/5" />
                            <div className="grid grid-cols-3 gap-3">
                                <div className="h-20 bg-white/5 rounded-lg" />
                                <div className="h-20 bg-white/5 rounded-lg" />
                                <div className="h-20 bg-white/5 rounded-lg" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Floating Elements for Depth */}
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                        className="absolute top-20 right-10 w-24 h-24 bg-accent/20 rounded-2xl blur-xl"
                    />
                    <motion.div
                        style={{ y: useTransform(scrollYProgress, [0, 1], [150, -150]) }}
                        className="absolute bottom-20 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
                    />
                </div>
            </motion.div>
        </section>
    );
}
