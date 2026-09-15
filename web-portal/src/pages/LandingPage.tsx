import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { MobileFeatures } from '../components/landing/MobileFeatures';
import { InteractiveShowcase } from '../components/landing/InteractiveShowcase';
import { StatisticsSection } from '../components/landing/StatisticsSection';
import { AccountingSection } from '../components/landing/AccountingSection';
import { ArchitectureSection } from '../components/landing/ArchitectureSection';
import { TechStackSection } from '../components/landing/TechStackSection';

export const LandingPage: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* 1. Hero Section focusing on Mobile Service */}
      <HeroSection />

      {/* 2. Mobile Service Features */}
      <MobileFeatures />

      {/* 3. Interactive Mobile Showcase */}
      <InteractiveShowcase />

      {/* 4. Statistics Counters */}
      <StatisticsSection />

      {/* 5. Accounting Service Section */}
      <AccountingSection />

      {/* 6. Visual Architecture Diagram */}
      <ArchitectureSection />

      {/* 7. Technology Stack */}
      <TechStackSection />
    </main>
  );
};
