'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    type: 'Live' | 'Concept' | 'Case Study';
}

const projects: Project[] = [
    {
        title: "Flux",
        description: "Music discovery platform for artists and listeners. Built as a real product to solve discovery fragmentation.",
        tags: ["React", "Next.js", "Recoil", "Node.js", "Prisma", "PostgreSQL"],
        link: "https://fluxbeats.vercel.app",
        type: "Live"
    },
    {
        title: "Vyperion",
        description: "Premium landing page concept for Viper V3 Pro mouse. Focused on spacing, typography, and clean animations.",
        tags: ["Tailwind CSS", "Figma", "Design System"],
        link: "#", // Placeholder
        type: "Concept"
    },
    {
        title: "Sonara",
        description: "Music app UI/UX concept with light-grey theme and persistent bottom player.",
        tags: ["UI/UX", "Mobile Design", "Prototyping"],
        link: "#",
        type: "Concept"
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-24 px-6 lg:px-12 bg-muted/30">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground">Real products and experiments.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl p-8 border border-muted hover:border-accent/50 transition-colors duration-300 shadow-sm hover:shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                                    {project.type}
                                </span>
                                <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-accent transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </Link>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-sm px-3 py-1 rounded-md bg-muted text-foreground/80 font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
