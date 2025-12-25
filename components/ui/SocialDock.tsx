'use client';

import { Linkedin, Mail, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function SocialDock() {
    return (
        <aside
            className="absolute left-8 top-0 bottom-0 z-40 hidden md:flex flex-col items-center justify-between pt-8 pb-16 w-10 pointer-events-none"
        >
            {/* Logo */}
            <div className="pointer-events-auto">
                <Link href="/" className="relative block w-10 h-10 hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="Yayin"
                        fill
                        sizes="60px"
                        className="object-contain mix-blend-darken"
                        priority
                    />
                </Link>
            </div>

            {/* Decorative vertical line with dots - slightly shorter */}
            <div className="flex-1 flex flex-col items-center my-10 max-h-[45vh]">
                <div className="w-1 h-1 rounded-full bg-gray-500 mb-2" />
                <div className="w-px flex-1 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-500" />
                <div className="w-1 h-1 rounded-full bg-gray-500 mt-2" />
            </div>

            {/* Social Icons */}
            <div className="flex flex-col gap-5 pointer-events-auto items-center">
                <Link
                    href="https://www.linkedin.com/in/yayinkuthiala/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors"
                    aria-label="LinkedIn"
                >
                    <Linkedin size={18} />
                </Link>
                <Link
                    href="mailto:yayinkuthiala.in@gmail.com"
                    className="text-gray-400 hover:text-accent transition-colors"
                    aria-label="Email"
                >
                    <Mail size={18} />
                </Link>
                <Link
                    href="https://github.com/rxdev0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent transition-colors"
                    aria-label="GitHub"
                >
                    <Github size={18} />
                </Link>
            </div>
        </aside>
    );
}
