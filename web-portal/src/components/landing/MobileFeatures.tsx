import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlusCircle, 
  Search, 
  Zap, 
  Layers, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: PlusCircle,
    color: 'from-blue-500 to-sky-400',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
    title: 'Device Registration',
    endpoint: 'POST /devices',
    description: 'Seamlessly register mobile devices with strict Zod payload validation, duplicate IMEI/hardware prevention, and timestamping.'
  },
  {
    icon: Search,
    color: 'from-sky-500 to-indigo-500',
    iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
    title: 'Device Information Lookup',
    endpoint: 'GET /devices/:id',
    description: 'Instant multi-key resolution by internal database UUID or native hardware deviceId with rich status payloads.'
  },
  {
    icon: Zap,
    color: 'from-indigo-500 to-purple-500',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    title: 'Fast Filter & Search',
    endpoint: 'GET /devices?manufacturer=&status=',
    description: 'High-speed index filtering across manufacturers like Apple, Samsung, Google, and device operational statuses.'
  },
  {
    icon: Layers,
    color: 'from-cyan-500 to-blue-500',
    iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
    title: 'Enterprise API Integration',
    endpoint: 'OpenAPI 3.0 / Swagger',
    description: 'Interactive API Explorer hosted on port 8082 with typed schemas, request examples, and client SDK generation compatibility.'
  },
  {
    icon: Activity,
    color: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    title: 'Real-Time Telemetry & Health',
    endpoint: 'GET /health',
    description: 'Built-in liveness and readiness monitoring reporting process uptime, memory consumption, and host architecture.'
  },
  {
    icon: ShieldCheck,
    color: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    title: 'Reliable Microservice Layer',
    endpoint: 'Port 8082 (Isolated)',
    description: 'Fully isolated execution boundary with structured Winston correlation ID tracing and graceful shutdown hooks.'
  }
];

export const MobileFeatures: React.FC = () => {
  return (
    <section id="mobile-service" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold border border-brand-200/60">
            <span>Mobile Microservice Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High-Performance Device Management
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Everything your operations team needs to catalog, monitor, and query hardware devices across your mobile fleet.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${feature.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {feature.endpoint}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                  <span>Explore in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
