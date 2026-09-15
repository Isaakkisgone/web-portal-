import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, Activity, ShieldCheck } from 'lucide-react';

const stats = [
  {
    icon: Smartphone,
    value: '12,450+',
    label: 'Devices Managed',
    description: 'Active smartphones, tablets, and enterprise scanners enrolled in cluster.'
  },
  {
    icon: Zap,
    value: '8.5M+',
    label: 'API Requests',
    description: 'Handled concurrently with sub-20ms median latency across endpoints.'
  },
  {
    icon: Activity,
    value: '99.98%',
    label: 'Daily Activity',
    description: 'Continuous health check pings and telemetry synchronization.'
  },
  {
    icon: ShieldCheck,
    value: '99.99%',
    label: 'System Availability',
    description: 'Engineered for high availability with Kubernetes rolling deployments.'
  }
];

export const StatisticsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
