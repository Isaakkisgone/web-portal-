import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sidebar, DashboardTab } from '../components/dashboard/Sidebar';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { DeviceModule } from '../components/dashboard/DeviceModule';
import { AccountModule } from '../components/dashboard/AccountModule';
import { HealthModule } from '../components/dashboard/HealthModule';
import { useServiceHealth } from '../hooks/useServiceHealth';

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as DashboardTab) || 'overview';
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  const { mobileHealth, accountingHealth } = useServiceHealth();

  useEffect(() => {
    const tab = searchParams.get('tab') as DashboardTab;
    if (tab && ['overview', 'mobile', 'accounting', 'health'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4.5rem)] bg-slate-50/50">
      
      {/* Sidebar */}
      <Sidebar
        currentTab={activeTab}
        onSelectTab={handleTabChange}
        mobileOnline={mobileHealth.status === 'UP'}
        accountingOnline={accountingHealth.status === 'UP'}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl overflow-y-auto">
        {activeTab === 'overview' && (
          <DashboardOverview onSelectTab={handleTabChange} />
        )}
        {activeTab === 'mobile' && <DeviceModule />}
        {activeTab === 'accounting' && <AccountModule />}
        {activeTab === 'health' && <HealthModule />}
      </main>

    </div>
  );
};
