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
        items: ["TypeScript", "Prisma", "Node.js"]
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

interface TechStackProps {
    isCorporate?: boolean;
}

export function TechStack({ isCorporate }: TechStackProps) {
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
                    {stack.map((group, idx) => (
                        <TechGroup
                            key={group.category}
                            group={group}
                            idx={idx}
                            scrollYProgress={scrollYProgress}
                            isCorporate={isCorporate}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TechGroup({ group, idx, scrollYProgress, isCorporate }: {
    group: { category: string, items: string[] },
    idx: number,
    scrollYProgress: any,
    isCorporate?: boolean
}) {
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [idx % 2 === 0 ? 50 : 100, idx % 2 === 0 ? -50 : -100]
    );

    return (
        <motion.div
            style={{ y }}
            className="space-y-6 p-8 rounded-3xl bg-white/2 border border-white/5 hover:border-accent/30 transition-colors relative hover:z-[50]"
        >
            <h3 className="text-2xl font-bold text-accent mb-4">{group.category}</h3>
            <div className="grid grid-cols-1 gap-4">
                {group.items.map((item) => (
                    <TechItem key={item} item={item} isCorporate={isCorporate} />
                ))}
            </div>
        </motion.div>
    );
}

function TechItem({ item, isCorporate }: { item: string, isCorporate?: boolean }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02, zIndex: 100 }} // Lift z-index on hover to prevent clipping
            className="group relative"
        >
            <div className="absolute inset-0 bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            <div
                className="relative bg-neutral-900/50 p-4 rounded-xl border border-white/5 shadow-sm group-hover:border-accent/30 transition-colors cursor-default overflow-visible"
            >
                <span className="font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>

                {/* Tooltip */}
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-[#7b2cbf] text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap z-[100] pointer-events-none hidden lg:block">
                    {/* Simple conditional logic for tooltip text to make it feel "real" */}
                    {isCorporate ? (
                        // Professional/Corporate Tooltips
                        item === "HTML" ? "Semantic Markup" :
                            item === "CSS" ? "Responsive Design" :
                                item === "JavaScript" ? "Interactive Scripting" :
                                    item === "React" ? "Frontend Library" :
                                        item === "Next.js" ? "Full-stack Framework" :
                                            item === "Tailwind CSS" ? "Utility-first CSS" :
                                                item === "TypeScript" ? "Type-safe Code" :
                                                    item === "Prisma" ? "ORM & Data Modeling" :
                                                        item === "Node.js" ? "Server-side Runtime" :
                                                            item === "PostgreSQL" ? "Relational Database" :
                                                                item === "Python" ? "Backend Development & AI" :
                                                                    item === "Edge AI" ? "AI Inference Integration" :
                                                                        item === "Cybersecurity" ? "Secure Architecture" :
                                                                            item === "Figma" ? "UI/UX Design" :
                                                                                "Professional Tool"
                    ) : (
                        // Real/Casual Tooltips
                        item === "Next.js" ? "Prisma and Next.js get the job done" :
                            item === "Node.js" ? "Barely use this anymore, tbh" :
                                item === "Python" ? "Learned for backend, barely used" :
                                    item === "Tailwind CSS" ? "Faster CSS, plain and simple" :
                                        item === "Edge AI" ? "For AI implementation" :
                                            item === "React" ? "Component wizardry" :
                                                item === "TypeScript" ? "No more any" :
                                                    "Daily driver"
                    )}
                    {/* Tiny arrow */}
                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-6 border-transparent border-r-[#7b2cbf]" />
                </span>
            </div>
        </motion.div>
    )
}
