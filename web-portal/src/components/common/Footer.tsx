import React from 'react';
import { Smartphone, Layers, Server, ShieldCheck, Terminal, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/70">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">NovaStack</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Modern enterprise microservices ecosystem connecting hardware device intelligence with accounting infrastructure.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Kubernetes Ready • Multi-Stage Docker</span>
            </div>
          </div>

          {/* Col 2: Microservices */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Microservices
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#mobile-service" className="hover:text-brand-600 transition-colors flex items-center justify-between group">
                  <span>Mobile Service</span>
                  <span className="text-[11px] text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded font-mono group-hover:text-brand-600">8082</span>
                </a>
              </li>
              <li>
                <a href="#accounting-service" className="hover:text-brand-600 transition-colors flex items-center justify-between group">
                  <span>Accounting Service</span>
                  <span className="text-[11px] text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded font-mono group-hover:text-brand-600">8081</span>
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-600 transition-colors">
                  Management Portal
                </Link>
              </li>
              <li>
                <a href="#architecture" className="hover:text-brand-600 transition-colors">
                  System Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: API Documentation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              API Documentation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="http://localhost:8082/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mobile Swagger UI</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8081/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Accounting Swagger UI</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8082/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Mobile Health Endpoint</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:8081/health"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Accounting Health Endpoint</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-4">
              Enterprise Specs
            </h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Engineered with clean layered design patterns, Zod schema validation, correlation ID logging, and multi-cloud Kubernetes deployment readiness.
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">TypeScript</span>
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">Node.js</span>
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">Docker</span>
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">Kubernetes</span>
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">React</span>
              <span className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NovaStack Architecture. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Ports: 8081 (Accounting) / 8082 (Mobile)</span>
            <span>Local Cluster</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
