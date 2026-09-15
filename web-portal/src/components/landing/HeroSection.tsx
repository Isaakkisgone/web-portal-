import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  ArrowRight, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  Wifi,
  BatteryCharging,
  Layers
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-sky-50/30 to-white">
      {/* Soft Background Radial Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-sky-200/40 to-brand-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-gradient-to-bl from-blue-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-brand-600">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Next-Gen Microservice Architecture</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-slate-600 font-normal">Port 8082</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Smart Device <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-sky-500 to-indigo-600">
                Information Platform
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              The Mobile Service provides lightning-fast, highly-available access to hardware device telemetry, specification lookups, and inventory tracking with enterprise-grade reliability.
            </p>

            {/* Feature Highlights List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Latency Lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>OpenAPI 3.0 Documented</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Docker & K8s Ready</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#mobile-service"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-brand-600 hover:bg-brand-500 active:bg-brand-700 rounded-xl shadow-lg shadow-brand-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Mobile Service</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-sm hover:shadow transition-all duration-200"
              >
                <Code2 className="w-4 h-4 text-slate-500" />
                <span>View APIs & Console</span>
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-bold text-slate-900">12,450+</p>
                <p className="text-xs text-slate-500">Devices Synced</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">&lt; 15ms</p>
                <p className="text-xs text-slate-500">Response Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">99.99%</p>
                <p className="text-xs text-slate-500">Availability</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Smartphone Mockup with Glassmorphic Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Background Ring */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-gradient-to-tr from-brand-300/30 via-sky-200/20 to-transparent blur-2xl pointer-events-none" />

            {/* Smartphone Mockup Canvas */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="relative z-10 w-[290px] sm:w-[320px] rounded-[48px] p-3 bg-slate-900 shadow-2xl shadow-slate-900/30 border-4 border-slate-800"
            >
              {/* Screen Shell */}
              <div className="relative w-full h-[580px] bg-slate-950 rounded-[40px] overflow-hidden flex flex-col justify-between p-5 text-white border border-slate-700/50">
                
                {/* Dynamic Island / Speaker Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5" />
                    <span className="font-semibold">5G</span>
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* Simulated Screen Content */}
                <div className="space-y-4 my-auto">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-[11px] text-brand-300 font-medium">
                    <Cpu className="w-3 h-3 text-brand-400" />
                    <span>Mobile Service Active</span>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Device Model</p>
                    <h3 className="text-2xl font-bold tracking-tight text-white">iPhone 16 Pro</h3>
                    <p className="text-xs text-emerald-400 font-mono mt-0.5">DEV-IPH-001 • ACTIVE</p>
                  </div>

                  {/* Telemetry Cards inside phone */}
                  <div className="space-y-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">OS Version</span>
                      <span className="text-xs font-semibold text-white">iOS 18.2</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Manufacturer</span>
                      <span className="text-xs font-semibold text-white">Apple Inc.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Heartbeat Ping</span>
                      <span className="text-xs font-semibold text-emerald-400">4ms • Healthy</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar Pill */}
                <div className="flex justify-center pb-1">
                  <div className="w-32 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Floating Info Card 1: Top Right */}
            <motion.div
              animate={{ y: [4, -8, 4] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 0.3 }}
              className="absolute -top-4 -right-2 sm:-right-8 z-20 glass-panel rounded-2xl p-3.5 shadow-xl shadow-slate-200/50 max-w-[200px] border border-white/80 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Real-Time Sync</p>
                  <p className="text-xs font-bold text-slate-800">Port 8082 Live</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Card 2: Bottom Left */}
            <motion.div
              animate={{ y: [-4, 6, -4] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut', delay: 0.7 }}
              className="absolute -bottom-6 -left-2 sm:-left-10 z-20 glass-panel rounded-2xl p-3.5 shadow-xl shadow-slate-200/50 max-w-[210px] border border-white/80 hidden sm:block"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-brand-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-medium">Zod Validated</p>
                  <p className="text-xs font-bold text-slate-800">Hardware ID Verified</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
