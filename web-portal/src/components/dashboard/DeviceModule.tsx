import React, { useState } from 'react';
import { 
  Smartphone, 
  Plus, 
  Search, 
  RefreshCw, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Info,
  ExternalLink
} from 'lucide-react';
import { useDevices } from '../../hooks/useDevices';
import { CreateDeviceInput, Device } from '../../types';
import { Modal } from '../common/Modal';

export const DeviceModule: React.FC = () => {
  const { devices, loading, error, refreshDevices, addDevice } = useDevices();
  const [searchTerm, setSearchTerm] = useState('');
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Registration Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Form State
  const [newDeviceId, setNewDeviceId] = useState('');
  const [newName, setNewName] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newManufacturer, setNewManufacturer] = useState('Apple');
  const [newOsVersion, setNewOsVersion] = useState('');

  // Detail Modal State
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCreateError(null);

    try {
      await addDevice({
        deviceId: newDeviceId.trim(),
        name: newName.trim(),
        model: newModel.trim(),
        manufacturer: newManufacturer.trim(),
        osVersion: newOsVersion.trim(),
        status: 'ACTIVE'
      });
      setIsCreateOpen(false);
      // Reset form
      setNewDeviceId('');
      setNewName('');
      setNewModel('');
      setNewOsVersion('');
    } catch (err: any) {
      setCreateError(err.response?.data?.error?.message || err.message || 'Failed to register device');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered devices
  const filteredDevices = devices.filter(d => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      d.name.toLowerCase().includes(term) ||
      d.model.toLowerCase().includes(term) ||
      d.deviceId.toLowerCase().includes(term) ||
      d.manufacturer.toLowerCase().includes(term);
    const matchesMfg = !manufacturerFilter || d.manufacturer.toLowerCase() === manufacturerFilter.toLowerCase();
    const matchesStatus = !statusFilter || d.status === statusFilter;
    return matchesSearch && matchesMfg && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Mobile Device Management</h2>
            <span className="text-xs font-mono font-bold bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full border border-brand-200">
              Port 8082
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Register, inspect, and monitor hardware devices across the organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refreshDevices()}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Devices"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register Device</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by device name, model, deviceId, or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={manufacturerFilter}
            onChange={(e) => setManufacturerFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700"
          >
            <option value="">All Manufacturers</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="Zebra">Zebra</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-700"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="DECOMMISSIONED">Decommissioned</option>
          </select>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Device Name & Model</th>
                <th className="py-3.5 px-4">Hardware ID</th>
                <th className="py-3.5 px-4">Manufacturer</th>
                <th className="py-3.5 px-4">OS Version</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <tr 
                    key={device.id} 
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedDevice(device)}
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {device.name}
                          </p>
                          <p className="text-xs text-slate-500">{device.model}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-brand-600">
                      {device.deviceId}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      {device.manufacturer}
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-slate-600">
                      {device.osVersion}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        device.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${device.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {device.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDevice(device);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        title="View details"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-slate-700">No devices found</p>
                    <p className="text-xs mt-1">Try adjusting your filters or register a new device.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredDevices.length} of {devices.length} registered devices</span>
          <span className="font-mono">API: GET /devices</span>
        </div>
      </div>

      {/* Register Device Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Register New Device"
        subtitle="POST /devices endpoint with schema validation"
      >
        <form onSubmit={handleRegister} className="space-y-4">
          {createError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{createError}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Hardware Device ID / Serial <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DEV-IPH-901 or IMEI"
              value={newDeviceId}
              onChange={(e) => setNewDeviceId(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Device Display Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lead Engineer iPhone 16"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Manufacturer <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apple"
                value={newManufacturer}
                onChange={(e) => setNewManufacturer(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Model Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 16 Pro"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Operating System Version <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. iOS 18.2 or Android 15"
              value={newOsVersion}
              onChange={(e) => setNewOsVersion(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-sm transition-colors"
            >
              {submitting ? 'Registering...' : 'Register Device'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Device Details Modal */}
      {selectedDevice && (
        <Modal
          isOpen={Boolean(selectedDevice)}
          onClose={() => setSelectedDevice(null)}
          title={selectedDevice.name}
          subtitle={`Hardware ID: ${selectedDevice.deviceId}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Internal Record UUID:</span>
                <span className="font-mono font-semibold text-slate-800">{selectedDevice.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Hardware Model:</span>
                <span className="font-semibold text-slate-800">{selectedDevice.model}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Manufacturer:</span>
                <span className="font-semibold text-slate-800">{selectedDevice.manufacturer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">OS Version:</span>
                <span className="font-mono font-semibold text-slate-800">{selectedDevice.osVersion}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Lifecycle Status:</span>
                <span className="font-bold text-emerald-600">{selectedDevice.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Registered At:</span>
                <span className="text-slate-600">{new Date(selectedDevice.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDevice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
