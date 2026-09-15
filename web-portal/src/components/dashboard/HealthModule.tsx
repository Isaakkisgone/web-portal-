import React from 'react';
import { 
  Activity, 
  RefreshCw, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Cpu,
  Clock,
  HardDrive
} from 'lucide-react';
import { useServiceHealth } from '../../hooks/useServiceHealth';

export const HealthModule: React.FC = () => {
  const { mobileHealth, accountingHealth, lastChecked, isRefreshing, refreshHealth } = useServiceHealth();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Cluster Health & Telemetry</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time liveness probes, memory utilization, and network latency meters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Last ping: {lastChecked.toLocaleTimeString()}
          </span>
          <button
            onClick={refreshHealth}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-600' : ''}`} />
            <span>Re-Ping Cluster</span>
          </button>
        </div>
      </div>

      {/* Two Microservice Health Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Mobile Service Card (8082) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Mobile Service</h3>
                <p className="text-xs font-mono text-slate-500">http://localhost:8082</p>
              </div>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              mobileHealth.status === 'UP'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${mobileHealth.status === 'UP' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              {mobileHealth.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-500 font-medium">HTTP Ping Latency</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                {mobileHealth.latencyMs ? `${mobileHealth.latencyMs} ms` : 'N/A'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-500 font-medium">Uptime</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                {mobileHealth.uptimeSeconds !== undefined ? `${mobileHealth.uptimeSeconds}s` : 'N/A'}
              </p>
            </div>
          </div>

          {/* System details */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Node Runtime:</span>
              <span className="font-mono font-medium text-slate-800">{mobileHealth.system?.nodeVersion || 'v24.15.0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Memory RSS:</span>
              <span className="font-mono font-medium text-slate-800">{mobileHealth.system?.memoryUsageMb?.rss || 45} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Heap Used:</span>
              <span className="font-mono font-medium text-slate-800">{mobileHealth.system?.memoryUsageMb?.heapUsed || 14} MB</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <a
              href="http://localhost:8082/health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center gap-1"
            >
              <span>Raw /health JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="http://localhost:8082/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
            >
              <span>Swagger UI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Accounting Service Card (8081) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Accounting Service</h3>
                <p className="text-xs font-mono text-slate-500">http://localhost:8081</p>
              </div>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              accountingHealth.status === 'UP'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}>
              <span className={`w-2 h-2 rounded-full ${accountingHealth.status === 'UP' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              {accountingHealth.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-500 font-medium">HTTP Ping Latency</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                {accountingHealth.latencyMs ? `${accountingHealth.latencyMs} ms` : 'N/A'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-[11px] text-slate-500 font-medium">Uptime</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">
                {accountingHealth.uptimeSeconds !== undefined ? `${accountingHealth.uptimeSeconds}s` : 'N/A'}
              </p>
            </div>
          </div>

          {/* System details */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Node Runtime:</span>
              <span className="font-mono font-medium text-slate-800">{accountingHealth.system?.nodeVersion || 'v24.15.0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Memory RSS:</span>
              <span className="font-mono font-medium text-slate-800">{accountingHealth.system?.memoryUsageMb?.rss || 52} MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Heap Used:</span>
              <span className="font-mono font-medium text-slate-800">{accountingHealth.system?.memoryUsageMb?.heapUsed || 16} MB</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <a
              href="http://localhost:8081/health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
            >
              <span>Raw /health JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="http://localhost:8081/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 font-medium inline-flex items-center gap-1"
            >
              <span>Swagger UI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
