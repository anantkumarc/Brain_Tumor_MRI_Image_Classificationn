import React, { useState } from 'react';
import { Database, FileCheck2, Search, Filter, HardDrive, Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ScanSample } from '../types';
import { MOCK_DATASETS } from '../data/mockScans';

interface DatasetsHistoryViewProps {
  scans: ScanSample[];
  onSelectScan: (scan: ScanSample) => void;
  onOpenReport: (scan: ScanSample) => void;
}

export const DatasetsHistoryView: React.FC<DatasetsHistoryViewProps> = ({ scans, onSelectScan, onOpenReport }) => {
  const [activeTab, setActiveTab] = useState<'history' | 'datasets'>('history');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [classFilter, setClassFilter] = useState<string>('all');

  const filteredScans = scans.filter((s) => {
    const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'all' || s.tumourClass.toLowerCase().includes(classFilter.toLowerCase());
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Tab Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <span>Dataset Repository & Prediction History</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse benchmark dataset cohorts (BraTS, Figshare) and access past diagnostic prediction logs.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'history' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Prediction History ({scans.length})
          </button>
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'datasets' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Benchmark Datasets ({MOCK_DATASETS.length})
          </button>
        </div>
      </div>

      {/* View 1: Prediction History */}
      {activeTab === 'history' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Patient ID or Scan ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="all">All Tumour Classes</option>
                <option value="glioma">Glioma</option>
                <option value="meningioma">Meningioma</option>
                <option value="pituitary">Pituitary</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>

          {/* History Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Scan ID</th>
                  <th className="p-3">Patient ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Sequence</th>
                  <th className="p-3">Diagnosis</th>
                  <th className="p-3">VQC Latency</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredScans.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-white">{s.id}</td>
                    <td className="p-3 font-medium text-slate-300">{s.patientId}</td>
                    <td className="p-3 text-slate-400 font-mono">{s.scanDate}</td>
                    <td className="p-3 font-mono">{s.imageType}</td>
                    <td className="p-3 font-semibold text-cyan-400">{s.tumourClass} ({(s.confidence * 100).toFixed(1)}%)</td>
                    <td className="p-3 font-mono text-slate-300">{s.quantumExecutionTimeMs} ms</td>
                    <td className="p-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onSelectScan(s)}
                          className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-[11px] font-semibold"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => onOpenReport(s)}
                          className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-[11px] font-semibold"
                        >
                          PDF Report
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* View 2: Datasets Repository */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_DATASETS.map((ds) => (
            <div key={ds.id} className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
                    <HardDrive className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">{ds.fileSize}</span>
                </div>
                <h3 className="text-base font-bold text-white">{ds.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ds.description}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Source:</span>
                  <span className="font-semibold text-slate-200">{ds.source}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Total MRI Images:</span>
                  <span className="font-bold text-cyan-400 font-mono">{ds.totalImages}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Format:</span>
                  <span className="font-mono text-slate-400">{ds.format}</span>
                </div>
              </div>

              <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center space-x-2 transition-all">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Dataset Metadata</span>
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
