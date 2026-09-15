import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  DollarSign, 
  Activity, 
  Home, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Server
} from 'lucide-react';

export type DashboardTab = 'overview' | 'mobile' | 'accounting' | 'health';

interface SidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  mobileOnline: boolean;
  accountingOnline: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  mobileOnline,
  accountingOnline
}) => {
  const menuItems: { id: DashboardTab; label: string; icon: React.FC<{ className?: string }>; badge?: string; online?: boolean }[] = [
    { id: 'overview', label: 'System Overview', icon: Layers },
    { id: 'mobile', label: 'Mobile Management', icon: Smartphone, badge: '8082', online: mobileOnline },
    { id: 'accounting', label: 'Accounting Ledger', icon: DollarSign, badge: '8081', online: accountingOnline },
    { id: 'health', label: 'Cluster Telemetry', icon: Activity },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0 h-auto md:min-h-[calc(100vh-4.5rem)]">
      
      {/* Top Menu Section */}
      <div className="p-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Operations Console
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.online !== undefined && (
                      <span className={`w-2 h-2 rounded-full ${item.online ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                    )}
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* API Docs Quick Links */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Swagger API Docs
          </p>
          <div className="space-y-1">
            <a
              href="http://localhost:8082/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              <span>Mobile Swagger (:8082)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <a
              href="http://localhost:8081/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
            >
              <span>Accounting Swagger (:8081)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Service Card */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-800">Cluster Status</span>
            <span className="text-[10px] font-mono text-emerald-600 font-semibold">ONLINE</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Node.js v24 • Docker Multi-Stage • Kubernetes Ready
          </p>
          <Link
            to="/"
            className="mt-3 flex items-center justify-between text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <span>Back to Homepage</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </aside>
  );
};
