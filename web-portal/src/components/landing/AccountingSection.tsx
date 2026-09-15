import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Download, 
  Sliders, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Image as ImageIcon,
  ExternalLink,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const accountingFeatures = [
  {
    icon: CreditCard,
    title: 'Create Accounts',
    endpoint: 'POST /accounts/create',
    description: 'Instantly provision accounts with initial balances, unique account number generation, currency selection, and owner email.'
  },
  {
    icon: DollarSign,
    title: 'Manage Accounts',
    endpoint: 'GET /accounts/:id',
    description: 'Query balances, status states (Active, Suspended, Closed), and lifecycle timestamps across checking, savings, and investment accounts.'
  },
  {
    icon: Download,
    title: 'Image Download & Storage',
    endpoint: 'POST /accounts/download-image',
    description: 'Automated streaming download from configurable external URLs with MIME-type validation, size limits, and local server storage.'
  },
  {
    icon: Sliders,
    title: 'Configuration Hierarchy',
    endpoint: 'Dev / Test / Prod',
    description: 'Dynamic environment-aware configuration supporting environment variables, local files, and Kubernetes ConfigMaps.'
  }
];

export const AccountingSection: React.FC = () => {
  const [testUrl, setTestUrl] = useState('https://picsum.photos/400/300');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const simulateDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="accounting-service" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Accounting Microservice • Port 8081</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Enterprise Financial & Asset Management
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            The Accounting Service operates on port 8081, managing client ledger accounts, capital allocations, and an integrated asset pipeline for downloading and storing media files locally.
          </p>
        </div>

        {/* 2-Column Showcase: Dashboard Preview + Image Download Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Dashboard Mockup Card */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Accounting Ledger Console</h4>
                  <p className="text-xs text-slate-400 font-mono">Service: 8081 • Status: Online</p>
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            {/* Mock Table */}
            <div className="mt-6 space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
                    AC
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Acme Corp Operating Account</p>
                    <p className="text-xs text-slate-400 font-mono">ACC-10001 • BUSINESS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">$154,500.50</p>
                  <p className="text-[11px] text-slate-400">USD</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-xs text-sky-400">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Jane Doe Personal Savings</p>
                    <p className="text-xs text-slate-400 font-mono">ACC-10002 • SAVINGS</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-sky-400">$12,850.75</p>
                  <p className="text-[11px] text-slate-400">USD</p>
                </div>
              </div>
            </div>

            {/* Bottom Meta info */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Layered Architecture: Controller → Service → Repository</span>
              <Link to="/dashboard" className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
                <span>Manage Accounts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Feature Demo: Local Image Downloader */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">Local Image Downloader</h4>
                <p className="text-xs text-slate-500">Configurable URL & File System Storage</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Accounting Service includes an integrated image download feature that streams remote files into <code className="text-xs bg-slate-200/70 px-1 py-0.5 rounded text-slate-800 font-mono">/app/storage/images</code> with MIME validation.
            </p>

            <form onSubmit={simulateDownload} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Source Image URL
                </label>
                <input
                  type="url"
                  value={testUrl}
                  onChange={(e) => setTestUrl(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Test Download Operation</span>
              </button>
            </form>

            {downloadSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Download Triggered Successfully</p>
                  <p className="text-[11px] text-emerald-700 font-mono mt-0.5">Saved to: /storage/images/img_4a89b...jpg</p>
                </div>
              </motion.div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
              <span>Endpoint: POST /accounts/download-image</span>
              <span className="font-mono text-emerald-600 font-semibold">200 OK</span>
            </div>
          </div>

        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accountingFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{f.title}</h4>
                  <p className="text-xs font-mono text-emerald-600 font-medium mt-1 mb-2">{f.endpoint}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
