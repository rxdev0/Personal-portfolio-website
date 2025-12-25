'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function MouseFollower() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHoveringText, setIsHoveringText] = useState(false);
    const [enabled, setEnabled] = useState(true);

    // Soft spring for trailing effect - flows behind cursor, catches up when static
    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Disable on touch devices and small screens
    useEffect(() => {
        const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
        if (isTouch || (typeof window !== 'undefined' && window.innerWidth < 640)) {
            setEnabled(false);
            return;
        }

        const handleResize = () => {
            if (window.innerWidth < 640) setEnabled(false);
            else setEnabled(true);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over text-heavy elements or interactive elements
            if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'BUTTON', 'LI'].includes(target.tagName) || target.closest('a') || target.closest('button')) {
                setIsHoveringText(true);
            } else {
                setIsHoveringText(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY, enabled]);

    if (!enabled) return null;

    return (
        <motion.div
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-9999 transition-[backdrop-filter] duration-200 ${isHoveringText ? 'backdrop-blur-[1px]' : 'backdrop-blur-sm'
                }`}
        />
    );
}
