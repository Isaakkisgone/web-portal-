import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Layers, 
  Smartphone, 
  DollarSign, 
  ArrowDown, 
  Server, 
  Box, 
  CheckCircle2, 
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-24 bg-slate-50/50 relative overflow-hidden border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-brand-600">
            <Cpu className="w-3.5 h-3.5 text-brand-500" />
            <span>Distributed System Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Decoupled Microservice Topology
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Both services operate independently in isolated runtimes, connected through clean REST contracts and managed through Kubernetes orchestration.
          </p>
        </div>

        {/* Interactive Visual Architecture Flow */}
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Level 1: Browser Client */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-600 flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-brand-600 uppercase tracking-wider">Client Layer</span>
                <h4 className="text-lg font-bold text-slate-900">Modern Browser Client</h4>
                <p className="text-xs text-slate-500">Desktop, Tablet, or Mobile Web Application</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>HTTP/2 • TLS 1.3</span>
            </div>
          </motion.div>

          {/* Flow Indicator */}
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Level 2: React UI Portal */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">Presentation & Management Layer</span>
                <h4 className="text-lg font-bold text-slate-900">React.js + Tailwind CSS Portal</h4>
                <p className="text-xs text-slate-500">Axios client dispatching typed REST calls to microservices</p>
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
              Port :5173
            </span>
          </motion.div>

          {/* Flow Indicator */}
          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Level 3: Microservices Tier (Two Independent Services) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Accounting Service */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border-2 border-emerald-100 shadow-sm space-y-4 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Accounting Service</h4>
                    <span className="text-xs font-mono text-emerald-600 font-bold">PORT 8081</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 font-mono bg-slate-50 p-3 rounded-xl">
                <p>• POST /accounts/create</p>
                <p>• GET /accounts/:id</p>
                <p>• GET /accounts</p>
                <p>• POST /accounts/download-image</p>
                <p>• GET /health</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Storage: ./storage/images</span>
                <span className="text-emerald-600 font-semibold">Swagger UI /api-docs</span>
              </div>
            </motion.div>

            {/* Mobile Service */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border-2 border-brand-100 shadow-sm space-y-4 hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Mobile Service</h4>
                    <span className="text-xs font-mono text-brand-600 font-bold">PORT 8082</span>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 font-mono bg-slate-50 p-3 rounded-xl">
                <p>• POST /devices</p>
                <p>• GET /devices</p>
                <p>• GET /devices/:id</p>
                <p>• Filter: ?manufacturer=&status=</p>
                <p>• GET /health</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Hardware Registry Store</span>
                <span className="text-brand-600 font-semibold">Swagger UI /api-docs</span>
              </div>
            </motion.div>

          </div>

          {/* Level 4: Container & Orchestration Infrastructure */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-800 text-sky-400 flex items-center justify-center">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Infrastructure</p>
                <p className="text-sm font-bold text-white">Docker Compose & Kubernetes Deployments</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">2 Pod Replicas</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">Liveness/Readiness Probes</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
