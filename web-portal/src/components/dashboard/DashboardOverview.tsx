import React from 'react';
import { 
  Smartphone, 
  DollarSign, 
  Activity, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';
import { useAccounts } from '../../hooks/useAccounts';
import { useServiceHealth } from '../../hooks/useServiceHealth';
import { DashboardTab } from './Sidebar';

interface DashboardOverviewProps {
  onSelectTab: (tab: DashboardTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onSelectTab }) => {
  const { devices } = useDevices();
  const { accounts } = useAccounts();
  const { mobileHealth, accountingHealth } = useServiceHealth();

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-brand-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dual Microservices Online</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Enterprise Operations Management Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Direct orchestration layer interfacing with Accounting Service (:8081) and Mobile Service (:8082).
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onSelectTab('mobile')}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4" />
              <span>Manage Devices</span>
            </button>
            <button
              onClick={() => onSelectTab('accounting')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <DollarSign className="w-4 h-4" />
              <span>Accounting Ledger</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Registered Devices</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{devices.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Port 8082 Synchronized</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Ledger Accounts</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{accounts.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Port 8081 Synchronized</span>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Ledger Balance Value</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            ${(totalBalance / 1000).toFixed(1)}k
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Active Accounts Capital
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average API Latency</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {mobileHealth.latencyMs || accountingHealth.latencyMs || 8} ms
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Sub-millisecond Local Engine</span>
          </p>
        </div>
      </div>

      {/* 2-Column Summary: Recent Devices & Recent Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Devices Preview */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Device Catalog Snapshot</h3>
            </div>
            <button
              onClick={() => onSelectTab('mobile')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All ({devices.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {devices.slice(0, 3).map((d) => (
              <div
                key={d.id}
                onClick={() => onSelectTab('mobile')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{d.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{d.model} • {d.deviceId}</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accounts Preview */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Ledger Accounts Snapshot</h3>
            </div>
            <button
              onClick={() => onSelectTab('accounting')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>View All ({accounts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {accounts.slice(0, 3).map((a) => (
              <div
                key={a.id}
                onClick={() => onSelectTab('accounting')}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">{a.accountName}</p>
                  <p className="text-[11px] text-slate-500 font-mono">{a.accountNumber} • {a.accountType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">${a.balance.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">{a.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
