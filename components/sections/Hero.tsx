'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-12 pt-20">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col gap-6 max-w-2xl"
                >
                    <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                        13 y/o Founder & <br className="hidden lg:block" />
                        <span className="text-muted-foreground">Full-Stack Learner</span>
                    </h1>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-medium text-accent">Amazon Certified | Founder of Flux</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Exploring UI/UX, Cybersecurity & Entrepreneurship. I build real products that people actually use.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 items-start sm:items-center">
                        <Link
                            href="#projects"
                            className="bg-accent hover:bg-[#ff8a5c] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,111,60,0.4)] flex items-center gap-2 group"
                        >
                            See My Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="text-sm text-muted-foreground italic">
                            Yep… I’m 13 😛
                        </p>
                    </div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-100 lg:h-150 w-full flex items-center justify-center"
                >
                    {/* Abstract Glow Background */}
                    <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full mix-blend-multiply animate-pulse" />

                    <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-sm">
                        <Image
                            src="/heroimg.png"
                            alt="Personal Signature Energy"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
