import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MriWorkbenchView } from './components/MriWorkbenchView';
import { XaiInspectorView } from './components/XaiInspectorView';
import { QuantumCircuitView } from './components/QuantumCircuitView';
import { ModelSandboxView } from './components/ModelSandboxView';
import { DatasetsHistoryView } from './components/DatasetsHistoryView';
import { ResearchBlueprintView } from './components/ResearchBlueprintView';
import { AdminPanelView } from './components/AdminPanelView';
import { DiagnosticReportModal } from './components/DiagnosticReportModal';

import { ScanSample, QuantumBackend } from './types';
import { INITIAL_SCANS } from './data/mockScans';

export default function App() {
  const [scans, setScans] = useState<ScanSample[]>(INITIAL_SCANS);
  const [selectedScan, setSelectedScan] = useState<ScanSample>(INITIAL_SCANS[0]);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [quantumBackend, setQuantumBackend] = useState<QuantumBackend>('qiskit_aer');
  const [activeReportScan, setActiveReportScan] = useState<ScanSample | null>(null);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);

  // Check server health on launch
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.hasGeminiKey !== undefined) {
          setHasGeminiKey(data.hasGeminiKey);
        }
      })
      .catch((err) => {
        console.warn('Server health check notice:', err);
      });
  }, []);

  const handleSelectScanAndNavigate = (scan: ScanSample) => {
    setSelectedScan(scan);
    setActiveTab('workbench');
  };

  const handleNewScanTrigger = () => {
    setActiveTab('workbench');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        quantumBackend={quantumBackend}
        setQuantumBackend={setQuantumBackend}
        onQuickScan={handleNewScanTrigger}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            scans={scans}
            onSelectScan={handleSelectScanAndNavigate}
            onOpenReport={(scan) => setActiveReportScan(scan)}
            onNewScan={handleNewScanTrigger}
            quantumBackend={quantumBackend}
          />
        )}

        {activeTab === 'workbench' && (
          <MriWorkbenchView
            selectedScan={selectedScan}
            setSelectedScan={setSelectedScan}
            quantumBackend={quantumBackend}
            onOpenReport={(scan) => setActiveReportScan(scan)}
            hasGeminiKey={hasGeminiKey}
          />
        )}

        {activeTab === 'xai' && (
          <XaiInspectorView
            scan={selectedScan}
            hasGeminiKey={hasGeminiKey}
            onOpenReport={(scan) => setActiveReportScan(scan)}
          />
        )}

        {activeTab === 'circuit' && (
          <QuantumCircuitView quantumBackend={quantumBackend} />
        )}

        {activeTab === 'sandbox' && (
          <ModelSandboxView />
        )}

        {activeTab === 'datasets' && (
          <DatasetsHistoryView
            scans={scans}
            onSelectScan={handleSelectScanAndNavigate}
            onOpenReport={(scan) => setActiveReportScan(scan)}
          />
        )}

        {activeTab === 'blueprint' && (
          <ResearchBlueprintView />
        )}

        {activeTab === 'admin' && (
          <AdminPanelView
            quantumBackend={quantumBackend}
            hasGeminiKey={hasGeminiKey}
          />
        )}
      </main>

      {/* Report Modal */}
      <DiagnosticReportModal
        scan={activeReportScan}
        onClose={() => setActiveReportScan(null)}
      />

    </div>
  );
}
