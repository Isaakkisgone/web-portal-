import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Search, 
  RefreshCw, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  Image as ImageIcon,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useAccounts } from '../../hooks/useAccounts';
import { Account, CreateAccountInput, ImageDownloadResult } from '../../types';
import { Modal } from '../common/Modal';

export const AccountModule: React.FC = () => {
  const { accounts, loading, error, refreshAccounts, addAccount, downloadImage } = useAccounts();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create Account Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Form State
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountType, setNewAccountType] = useState<'SAVINGS' | 'CHECKING' | 'INVESTMENT' | 'BUSINESS'>('BUSINESS');
  const [newInitialBalance, setNewInitialBalance] = useState('50000');
  const [newCurrency, setNewCurrency] = useState('USD');
  const [newEmail, setNewEmail] = useState('');
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [newDownloadAvatar, setNewDownloadAvatar] = useState(false);

  // Image Downloader Modal
  const [isDownloadToolOpen, setIsDownloadToolOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('https://picsum.photos/400/300');
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloadResult, setDownloadResult] = useState<ImageDownloadResult | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Detail Modal
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setCreateError(null);

    try {
      await addAccount({
        accountName: newAccountName.trim(),
        accountType: newAccountType,
        initialBalance: parseFloat(newInitialBalance) || 0,
        currency: newCurrency.trim() || 'USD',
        email: newEmail.trim(),
        avatarUrl: newAvatarUrl.trim() || undefined,
        downloadAvatar: newDownloadAvatar
      });
      setIsCreateOpen(false);
      setNewAccountName('');
      setNewEmail('');
      setNewAvatarUrl('');
    } catch (err: any) {
      setCreateError(err.response?.data?.error?.message || err.message || 'Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setDownloadError(null);
    setDownloadResult(null);

    try {
      const res = await downloadImage(downloadUrl.trim(), selectedAccountId || undefined);
      setDownloadResult(res);
    } catch (err: any) {
      setDownloadError(err.response?.data?.error?.message || err.message || 'Failed to download image');
    } finally {
      setDownloading(false);
    }
  };

  const filteredAccounts = accounts.filter(acc => {
    const term = searchTerm.toLowerCase();
    return (
      acc.accountName.toLowerCase().includes(term) ||
      acc.accountNumber.toLowerCase().includes(term) ||
      acc.email.toLowerCase().includes(term) ||
      acc.accountType.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Accounting Ledger Management</h2>
            <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Port 8081
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create and track corporate ledger accounts and execute local asset downloads.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refreshAccounts()}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh Accounts"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsDownloadToolOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Image Tool</span>
          </button>
          
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by account name, account number, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
        />
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Account Holder</th>
                <th className="py-3.5 px-4">Account Number</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <tr 
                    key={account.id} 
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedAccount(account)}
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {account.avatarUrl ? (
                          <img 
                            src={account.avatarUrl} 
                            alt={account.accountName} 
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200" 
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                            {account.accountName.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {account.accountName}
                          </p>
                          <p className="text-xs text-slate-500">{account.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-slate-800">
                      {account.accountNumber}
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {account.accountType}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-900">
                      ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-[11px] font-normal text-slate-400">{account.currency}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {account.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAccount(account);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
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
                    <p className="font-semibold text-slate-700">No accounts found</p>
                    <p className="text-xs mt-1">Create an account to start tracking transactions.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {filteredAccounts.length} of {accounts.length} active ledger accounts</span>
          <span className="font-mono">API: GET /accounts</span>
        </div>
      </div>

      {/* Create Account Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Account"
        subtitle="POST /accounts/create endpoint"
      >
        <form onSubmit={handleCreateAccount} className="space-y-4">
          {createError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{createError}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Account Name / Entity <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Global Operations"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Account Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value as any)}
                className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="BUSINESS">Business</option>
                <option value="CHECKING">Checking</option>
                <option value="SAVINGS">Savings</option>
                <option value="INVESTMENT">Investment</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Initial Balance ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={newInitialBalance}
                onChange={(e) => setNewInitialBalance(e.target.value)}
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Corporate / Owner Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. finance@apex.internal"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Avatar Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://picsum.photos/200/200"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="downloadAvatarCheck"
              checked={newDownloadAvatar}
              onChange={(e) => setNewDownloadAvatar(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="downloadAvatarCheck" className="text-xs text-slate-600">
              Download avatar locally to server disk during creation
            </label>
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
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition-colors"
            >
              {submitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Image Downloader Tool Modal */}
      <Modal
        isOpen={isDownloadToolOpen}
        onClose={() => setIsDownloadToolOpen(false)}
        title="Asset Image Downloader"
        subtitle="POST /accounts/download-image endpoint"
      >
        <form onSubmit={handleDownloadImage} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Remote Image URL <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              required
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Associate with Existing Account (Optional)
            </label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">None (Standalone Download)</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.accountName} ({a.accountNumber})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={downloading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? 'Downloading...' : 'Execute Download & Store Locally'}</span>
          </button>

          {downloadError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {downloadError}
            </div>
          )}

          {downloadResult && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Image Saved to Server Disk</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                <p><span className="font-semibold text-slate-600">File:</span> {downloadResult.fileName}</p>
                <p><span className="font-semibold text-slate-600">Local Path:</span> {downloadResult.localPath}</p>
                <p><span className="font-semibold text-slate-600">Size:</span> {(downloadResult.fileSizeBytes / 1024).toFixed(1)} KB</p>
                <p><span className="font-semibold text-slate-600">MIME:</span> {downloadResult.contentType}</p>
              </div>
            </div>
          )}
        </form>
      </Modal>

      {/* Account Details Modal */}
      {selectedAccount && (
        <Modal
          isOpen={Boolean(selectedAccount)}
          onClose={() => setSelectedAccount(null)}
          title={selectedAccount.accountName}
          subtitle={`Account Number: ${selectedAccount.accountNumber}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Account ID (UUID):</span>
                <span className="font-mono font-semibold text-slate-800">{selectedAccount.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Type:</span>
                <span className="font-semibold text-slate-800">{selectedAccount.accountType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Balance:</span>
                <span className="font-bold text-emerald-600">
                  ${selectedAccount.balance.toLocaleString()} {selectedAccount.currency}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Email:</span>
                <span className="font-semibold text-slate-800">{selectedAccount.email}</span>
              </div>
              {selectedAccount.avatarLocalPath && (
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Local Image Path:</span>
                  <span className="font-mono text-[11px] text-slate-700">{selectedAccount.avatarLocalPath}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Created:</span>
                <span className="text-slate-600">{new Date(selectedAccount.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAccount(null)}
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
