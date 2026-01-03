'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar({ isCorporate }: { isCorporate?: boolean }) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const lastYRef = useRef(0);
    const pivotYRef = useRef(0);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = lastYRef.current;
        lastYRef.current = latest;

        const isScrollingDown = latest > previous;
        const isScrollingUp = latest < previous;

        if (isScrollingDown) {
            if (latest > 150) {
                setHidden(true);
            }
            pivotYRef.current = latest;
        } else if (isScrollingUp) {
            const scrollUpDistance = pivotYRef.current - latest;
            if (scrollUpDistance > 100) {
                setHidden(false);
            }
        }
    });

    const links = [
        { name: 'Home-ish', href: '#hero' },
        { name: 'Work', href: '#projects' },
        { name: 'About', href: '#about' },
    ];

    const [menuOpen, setMenuOpen] = useState(false);

    // Emit global event to trigger contact toast/copy
    const triggerContactToast = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('showEmailToast'));
        }
    };

    // Small logger that writes to console and also stores traces on window.__NAV_LOGS for easier sharing
    const logNav = (msg: string, payload?: any) => {
        // Only log in non-production builds to avoid polluting user sessions
        if (typeof window === 'undefined') return;
        if (process.env.NODE_ENV === 'production') return;

        try {
            if (!(window as any).__NAV_LOGS) (window as any).__NAV_LOGS = [];
            (window as any).__NAV_LOGS.push({ t: Date.now(), msg, payload });
        } catch (e) {
            // ignore
        }
        console.debug('[nav]', msg, payload ?? '');
    };

    // Scroll helper with retry + visibility check to account for fixed navbar
    const scrollToHashWithOffset = (href: string, smooth = true, attempt = 0): boolean => {
        if (typeof window === 'undefined') return false;
        let el = document.querySelector(href) as HTMLElement | null;
        // Fallback to getElementById if CSS selector fails (safer for ids)
        if (!el && href.startsWith('#')) {
            el = document.getElementById(href.slice(1));
        }
        if (!el) return false;

        const nav = document.querySelector('nav');
        // Scroll to the exact top of the element + a tiny nudge to handle sub-pixel rendering/parallax gaps
        const top = el.getBoundingClientRect().top + window.scrollY + 5;

        logNav('scrollToHashWithOffset', { href, attempt, top });
        window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });

        // After scrolling, verify element is visible; if not, retry a few times
        const verifyAndRetry = (triesLeft: number) => {
            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const visibleTop = rect.top >= 0;
            const visibleBottom = rect.top <= viewportHeight * 0.9; // allow some slack
            const visible = visibleTop && visibleBottom;
            logNav('verifyAndRetry', { href, triesLeft, rectTop: rect.top, rectBottom: rect.bottom, visible, viewportHeight });
            if (visible) return true;
            if (triesLeft <= 0) return false;
            // small nudge and retry
            const nudge = Math.max(5, 8 * (4 - triesLeft));
            const newTop = top - nudge;
            window.scrollTo({ top: newTop, behavior: 'smooth' });
            setTimeout(() => verifyAndRetry(triesLeft - 1), 300);
            return true;
        };

        // Start verification with 6 attempts
        verifyAndRetry(6);
        return true;
    };

    // Smooth navigate and close menu (for mobile links)
    const handleMenuNavigate = (href: string) => {
        // Close the menu first so overlay doesn't block scrolling
        setMenuOpen(false);

        // Delay the scroll slightly to allow the menu to close and layout to settle
        setTimeout(() => {
            const scrolled = scrollToHashWithOffset(href, true, 0);
            if (!scrolled) {
                // Fallback: set hash so on next paint the hashchange handler can act
                logNav('element-not-found-set-hash', { href });
                window.location.hash = href;
            }
        }, 220);
    };

    // When page loads or hash changes (e.g., after a hard refresh with #hash), adjust scroll to account for navbar
    useEffect(() => {
        const handleHash = () => {
            const href = window.location.hash;
            if (href) {
                // Wait longer for layout to settle (accounts for images, lazy loaded content)
                setTimeout(() => {
                    const scrolled = scrollToHashWithOffset(href, false, 0);
                    if (!scrolled) {
                        // If element isn't present yet, observe DOM additions briefly
                        logNav('hash-target-not-found-observing', { href });
                        const observer = new MutationObserver(() => {
                            // Try both querySelector and getElementById (safer on ids)
                            let el: Element | null = document.querySelector(href);
                            if (!el && href.startsWith('#')) el = document.getElementById(href.slice(1));
                            if (el) {
                                scrollToHashWithOffset(href, false);
                                observer.disconnect();
                            }
                        });
                        observer.observe(document.body, { childList: true, subtree: true });
                        // Safety stop after 6s
                        setTimeout(() => observer.disconnect(), 6000);
                    }
                }, 250);
            }
        };

        if (typeof window !== 'undefined') {
            handleHash();
            window.addEventListener('hashchange', handleHash);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', handleHash);
            }
        };
    }, []);

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -250 },
            }}
            // Keep the nav visible while the mobile menu is open so panel doesn't disappear during scroll
            animate={menuOpen ? "visible" : hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-8 left-0 right-0 flex justify-between items-center px-8 pointer-events-none"
            style={{ zIndex: 9999 }}
        >
            {/* Empty spacer - logo is in SocialDock */}
            <div className="w-10" />

            {/* Navbar Pill (hidden on small screens) */}
            <div className="hidden md:flex pointer-events-auto bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 shadow-2xl rounded-full px-6 py-3 gap-6 items-center">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-xs font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToHashWithOffset(link.href, true);
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* CTA / Mobile Menu Button */}
            <div className="pointer-events-auto">
                {/* Desktop CTA */}
                <div className="hidden md:block">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText('yayinkuthiala.in@gmail.com');
                            triggerContactToast();
                        }}
                        className="bg-accent hover:bg-accent/80 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors shadow-lg shadow-accent/20"
                    >
                        {isCorporate ? "Let's talk $" : "Let's talk shit"}
                    </button>
                </div>

                {/* Mobile Menu Button (top-right, opposite logo) - hidden while menuOpen */}
                {!menuOpen && (
                    <div className="md:hidden absolute right-4 top-8 pointer-events-auto" style={{ zIndex: 10010 }}>
                        <button
                            aria-label="Open menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(true)}
                            className="p-2 rounded-full bg-[#1a1a1a]/80 text-white shadow-lg"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile sliding side panel — expands from the right */}
            <motion.div
                className="md:hidden"
                initial={false}
                animate={{}}
            >
                {/* Backdrop */}
                <motion.div
                    aria-hidden={!menuOpen}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, pointerEvents: 'none' }}
                    animate={menuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 bg-black/40"
                    style={{ zIndex: 10000 }}
                />

                {/* Sliding panel */}
                <motion.aside
                    initial={{ width: 0 }}
                    animate={menuOpen ? { width: '65vw' } : { width: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                    className="fixed top-8 right-4 bottom-8 bg-[#0b0b0b] rounded-2xl overflow-hidden flex flex-col text-white shadow-2xl"
                    style={{ zIndex: 10010, pointerEvents: 'auto' }}
                >
                    <div className="p-4 flex items-center justify-between border-b border-white/5">
                        <div className="text-sm font-bold">Menu</div>
                        <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2 rounded-md bg-white/5">
                            <X size={16} />
                        </button>
                    </div>

                    <nav className="p-6 flex-1 overflow-y-auto">
                        <ul className="flex flex-col gap-4">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-lg font-semibold hover:underline pointer-events-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleMenuNavigate(link.href);
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-6 border-t border-white/5">
                        <button
                            className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-full pointer-events-auto"
                            onClick={() => {
                                // Ensure the email is copied immediately, then dispatch the global event
                                try {
                                    navigator.clipboard.writeText('yayinkuthiala.in@gmail.com');
                                } catch (e) {
                                    // ignore if clipboard isn't available
                                    logNav('clipboard-write-failed', { error: String(e) });
                                }
                                setMenuOpen(false);
                                triggerContactToast();
                            }}
                        >
                            {isCorporate ? "Let's talk $" : "Let's talk shit"}
                        </button>
                    </div>
                </motion.aside>
            </motion.div>
        </motion.nav>
    );
}
