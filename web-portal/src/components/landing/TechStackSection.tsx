import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Send, 
  Server, 
  Box, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const technologies = [
  {
    name: 'React.js 18',
    category: 'Frontend Framework',
    description: 'Component-driven UI architecture with hooks, state-driven rendering, and React Router DOM.',
    icon: Code2,
    badge: 'v18.3',
    color: 'from-blue-500 to-sky-400',
    iconBg: 'bg-blue-50 text-blue-600'
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling Engine',
    description: 'Utility-first CSS framework styled with custom soft gradients, glassmorphism, and responsive breakpoints.',
    icon: Palette,
    badge: 'v3.4',
    color: 'from-teal-500 to-emerald-400',
    iconBg: 'bg-teal-50 text-teal-600'
  },
  {
    name: 'Axios HTTP Client',
    category: 'API Integration',
    description: 'Promise-based HTTP client handling JSON serializing, request interceptors, and timeout recovery.',
    icon: Send,
    badge: 'v1.7',
    color: 'from-indigo-500 to-purple-400',
    iconBg: 'bg-indigo-50 text-indigo-600'
  },
  {
    name: 'Node.js & Express',
    category: 'Backend Microservices',
    description: 'Clean layered architecture (Controller, Service, Repository) with strict TypeScript typing.',
    icon: Server,
    badge: 'v24 / Port 8081 & 8082',
    color: 'from-emerald-500 to-teal-400',
    iconBg: 'bg-emerald-50 text-emerald-600'
  },
  {
    name: 'Docker Containers',
    category: 'Containerization',
    description: 'Multi-stage lean Alpine container images running with non-root security privileges and health checks.',
    icon: Box,
    badge: 'Compose Ready',
    color: 'from-sky-500 to-blue-600',
    iconBg: 'bg-sky-50 text-sky-600'
  },
  {
    name: 'Kubernetes (K8s)',
    category: 'Cloud Orchestration',
    description: 'Declarative manifests with Deployments, ClusterIP Services, ConfigMaps, and rolling update strategies.',
    icon: Layers,
    badge: 'v1.30+',
    color: 'from-blue-600 to-indigo-600',
    iconBg: 'bg-indigo-50 text-indigo-600'
  }
];

export const TechStackSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
            <span>Modern Production Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered with Modern Industry Standards
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Every layer of this full-stack development environment is constructed using battle-tested enterprise technologies.
          </p>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ y: -3 }}
                className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tech.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {tech.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider block mb-1">
                    {tech.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {tech.name}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Integrated in local workspace</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
