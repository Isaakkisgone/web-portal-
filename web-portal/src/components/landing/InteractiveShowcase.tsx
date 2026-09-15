import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Tablet, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Wifi, 
  Battery, 
  Activity,
  HardDrive,
  Clock,
  Layers
} from 'lucide-react';

interface ShowcaseDevice {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  osVersion: string;
  deviceId: string;
  status: string;
  battery: string;
  uptime: string;
  icon: 'phone' | 'tablet';
}

const sampleDevices: ShowcaseDevice[] = [
  {
    id: '1',
    name: 'Executive iPhone 16',
    model: 'iPhone 16 Pro Max',
    manufacturer: 'Apple',
    osVersion: 'iOS 18.2',
    deviceId: 'DEV-IPH-001',
    status: 'ACTIVE',
    battery: '94%',
    uptime: '14 days',
    icon: 'phone'
  },
  {
    id: '2',
    name: 'Field Operations Tablet',
    model: 'Galaxy Tab S9 Ultra',
    manufacturer: 'Samsung',
    osVersion: 'Android 14',
    deviceId: 'DEV-SAM-002',
    status: 'ACTIVE',
    battery: '82%',
    uptime: '28 days',
    icon: 'tablet'
  },
  {
    id: '3',
    name: 'QA Test Device',
    model: 'Pixel 9 Pro',
    manufacturer: 'Google',
    osVersion: 'Android 15',
    deviceId: 'DEV-PIX-003',
    status: 'ACTIVE',
    battery: '100%',
    uptime: '3 days',
    icon: 'phone'
  }
];

export const InteractiveShowcase: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<ShowcaseDevice>(sampleDevices[0]);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-sky-50/20 to-white relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-brand-600">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Interactive Device Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Telemetry at Your Fingertips
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Switch between cataloged devices below to see how the Mobile Service transforms raw hardware identifiers into structured operational telemetry.
          </p>

          {/* Device Switcher Pills */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm gap-1.5 mt-4">
            {sampleDevices.map((dev) => (
              <button
                key={dev.id}
                onClick={() => setSelectedDevice(dev)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedDevice.id === dev.id
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {dev.icon === 'phone' ? <Smartphone className="w-3.5 h-3.5" /> : <Tablet className="w-3.5 h-3.5" />}
                <span>{dev.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Phone Stage with Surrounding Floating Cards */}
        <div className="relative max-w-4xl mx-auto flex items-center justify-center min-h-[560px]">
          
          {/* Floating Card Left Top: Hardware & IMEI */}
          <motion.div
            key={`left-top-${selectedDevice.id}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block absolute left-2 top-12 z-20 glass-panel rounded-2xl p-5 shadow-xl shadow-slate-200/60 w-64 border border-white hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Hardware Registry</p>
                <p className="text-sm font-bold text-slate-900">{selectedDevice.manufacturer}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Model:</span>
                <span className="font-semibold text-slate-800">{selectedDevice.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ID:</span>
                <span className="font-mono text-brand-600 font-semibold">{selectedDevice.deviceId}</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card Left Bottom: Status & Uptime */}
          <motion.div
            key={`left-bot-${selectedDevice.id}`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden lg:block absolute left-4 bottom-12 z-20 glass-panel rounded-2xl p-5 shadow-xl shadow-slate-200/60 w-64 border border-white hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Health Status</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {selectedDevice.status}
                </span>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime:</span>
                <span className="font-semibold text-slate-800">{selectedDevice.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Battery:</span>
                <span className="font-semibold text-emerald-600">{selectedDevice.battery}</span>
              </div>
            </div>
          </motion.div>

          {/* Central Phone Mockup */}
          <div className="relative z-10 w-[280px] sm:w-[310px] rounded-[44px] p-3 bg-slate-900 shadow-2xl border-4 border-slate-800 transition-all duration-300">
            <div className="relative w-full h-[520px] bg-slate-950 rounded-[36px] overflow-hidden flex flex-col justify-between p-5 text-white border border-slate-700/50">
              
              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full flex items-center justify-between px-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3">
                <span>10:24</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-white" />
                  <span className="text-[10px]">{selectedDevice.battery}</span>
                </div>
              </div>

              {/* Dynamic Screen View */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedDevice.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 my-auto text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedDevice.model}</h4>
                    <p className="text-xs text-brand-400 font-mono mt-0.5">{selectedDevice.deviceId}</p>
                  </div>

                  {/* On-screen data tiles */}
                  <div className="grid grid-cols-2 gap-2 text-left pt-2">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] text-slate-400">OS</p>
                      <p className="text-xs font-bold text-white mt-0.5">{selectedDevice.osVersion}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                      <p className="text-[10px] text-slate-400">Brand</p>
                      <p className="text-xs font-bold text-white mt-0.5">{selectedDevice.manufacturer}</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Live Cluster Synchronized</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom bar */}
              <div className="flex justify-center pb-1">
                <div className="w-28 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Card Right Top: OS Specification */}
          <motion.div
            key={`right-top-${selectedDevice.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden lg:block absolute right-2 top-12 z-20 glass-panel rounded-2xl p-5 shadow-xl shadow-slate-200/60 w-64 border border-white hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Software Stack</p>
                <p className="text-sm font-bold text-slate-900">{selectedDevice.osVersion}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Validation:</span>
                <span className="font-semibold text-emerald-600">Passed Zod</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Port:</span>
                <span className="font-mono text-slate-800 font-semibold">8082</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Card Right Bottom: API Endpoint */}
          <motion.div
            key={`right-bot-${selectedDevice.id}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="hidden lg:block absolute right-4 bottom-12 z-20 glass-panel rounded-2xl p-5 shadow-xl shadow-slate-200/60 w-64 border border-white hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">REST API Query</p>
                <p className="text-xs font-mono font-bold text-slate-900">GET /devices/{selectedDevice.deviceId}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Directly queried via Axios client with correlation ID tracing.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
