'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const stack = [
    {
        category: "Frontend",
        items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
    },
    {
        category: "Backend",
        items: ["Node.js", "TypeScript", "Prisma"]
    },
    {
        category: "Database",
        items: ["PostgreSQL"]
    },
    {
        category: "Others",
        items: ["Python", "Edge AI", "Cybersecurity", "Figma"]
    }
];

export function TechStack() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section
            ref={containerRef}
            className="py-32 px-6 lg:px-12 bg-[#0A0A0A] relative overflow-hidden"
        >
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(123,44,191,0.1),transparent_50%)]" />
            </div>

            <div className="container mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-20 text-center tracking-tight"
                >
                    The <span className="text-accent">Toolkit</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stack.map((group, idx) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const y = useTransform(
                            scrollYProgress,
                            [0, 1],
                            [idx % 2 === 0 ? 50 : 100, idx % 2 === 0 ? -50 : -100]
                        );

                        return (
                            <motion.div
                                key={group.category}
                                style={{ y }}
                                className="space-y-6 p-8 rounded-3xl bg-white/2 border border-white/5 hover:border-accent/30 transition-colors"
                            >
                                <h3 className="text-2xl font-bold text-accent mb-4">{group.category}</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {group.items.map((item) => (
                                        <div
                                            key={item}
                                            className="group relative"
                                        >
                                            <div className="absolute inset-0 bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                                            <div
                                                className="relative bg-neutral-900/50 p-4 rounded-xl border border-white/5 shadow-sm hover:border-white/20 transition-all cursor-default overflow-hidden"
                                            >
                                                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
