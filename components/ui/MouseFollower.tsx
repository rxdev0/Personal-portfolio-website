'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inXrayZone, setInXrayZone] = useState(false);

  // Check if device is mobile (touch device)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
        'ontouchstart' in window
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fluid spring animation for cursor following
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [isVisible, cursorX, cursorY]
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const inZone = !!target.closest('.cursor-xray-zone');
    setInXrayZone(inZone);
  }, []);

  useEffect(() => {
    // Don't attach mouse listeners on mobile
    if (isMobile) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Track hovering on interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .cursor-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      observer.disconnect();
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseOver, isMobile]);

  // Don't render custom cursor on mobile devices
  if (isMobile || !isVisible) return null;

  const blendMode = inXrayZone ? 'difference' : 'normal';

  return (
    <>
      {/* Main cursor circle - follows with fluid delay */}
      <motion.div
        className="fixed pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: blendMode,
        }}
      >
        <div
          className={`rounded-full border-2 border-[#7b2cbf] transition-all duration-200 ${
            isHovering ? 'w-12 h-12' : 'w-10 h-10'
          }`}
          style={{
            boxShadow: isHovering
              ? '0 0 25px rgba(123, 44, 191, 0.5), inset 0 0 15px rgba(123, 44, 191, 0.15)'
              : '0 0 20px rgba(123, 44, 191, 0.4), inset 0 0 10px rgba(123, 44, 191, 0.1)',
          }}
        />
      </motion.div>

      {/* Inner dot - follows cursor exactly, always visible */}
      <div
        className="fixed pointer-events-none z-[99999] w-1 h-1 rounded-full bg-[#7b2cbf]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
