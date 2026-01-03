'use client';

import { useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import HeroSplit from '@/components/sections/HeroSplit';
import { About } from '@/components/sections/About';

import { FluxCaseStudy } from '@/components/sections/FluxCaseStudy';
import { TechStack } from '@/components/sections/TechStack';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  const [isCorporate, setIsCorporate] = useState(false);

  const toggleCorporate = () => {
    setIsCorporate(!isCorporate);
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-accent/20 selection:text-accent">
      <Navbar isCorporate={isCorporate} />
      <HeroSplit isCorporate={isCorporate} toggleCorporate={toggleCorporate} />
      <FluxCaseStudy isCorporate={isCorporate} />

      <About />
      <TechStack isCorporate={isCorporate} />
      <Experience />
      <Contact isCorporate={isCorporate} />


    </main>
  );
}
