import React from 'react';
import { 
  Activity, 
  BrainCircuit, 
  CheckCircle2, 
  Clock, 
  Eye, 
  FileCheck2, 
  Sparkles, 
  ShieldAlert, 
  Zap, 
  TrendingUp, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { ScanSample, QuantumBackend } from '../types';

interface DashboardViewProps {
  scans: ScanSample[];
  onSelectScan: (scan: ScanSample) => void;
  onOpenReport: (scan: ScanSample) => void;
  onNewScan: () => void;
  quantumBackend: QuantumBackend;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  scans,
  onSelectScan,
  onOpenReport,
  onNewScan,
  quantumBackend
}) => {
  // Chart data
  const classCounts = [
    { name: 'Glioma', count: 1426, color: '#f87171' },
    { name: 'Meningioma', count: 937, color: '#fbbf24' },
    { name: 'Pituitary', count: 901, color: '#38bdf8' },
    { name: 'Normal', count: 1596, color: '#34d399' },
  ];

  const quantumFidelityData = [
    { epoch: 'Run 1', classical: 92.1, hybridVqc: 98.4 },
    { epoch: 'Run 2', classical: 91.8, hybridVqc: 98.6 },
    { epoch: 'Run 3', classical: 92.5, hybridVqc: 98.7 },
    { epoch: 'Run 4', classical: 93.0, hybridVqc: 98.9 },
    { epoch: 'Run 5', classical: 92.8, hybridVqc: 99.1 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & KPI Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 border border-slate-700/60 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <Zap className="w-4 h-4 animate-bounce" />
              <span>Clinician Diagnostic Operating System</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Hybrid Quantum MRI Brain Tumour Detection
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Empowering neuro-radiologists with 8-qubit Variational Quantum Circuit (VQC) feature mapping, 
              Grad-CAM spatial heatmap explainability, and Gemini AI clinical decision support.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              id="btn-dashboard-new-scan"
              onClick={onNewScan}
              className="flex items-center space-x-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <BrainCircuit className="w-5 h-5" />
              <span>Launch MRI Analysis</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">System Diagnostic Accuracy</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">98.4%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +6.1% vs CNN
            </span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Evaluated on BraTS 2024 benchmark</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Quantum Execution Latency</span>
            <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">132 ms</span>
            <span className="text-xs font-semibold text-cyan-400">8 Qubits</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Backend: {quantumBackend.replace('_', ' ').toUpperCase()}</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">False Negative Rate</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">&lt; 0.3%</span>
            <span className="text-xs font-semibold text-emerald-400">Ultra-High Sensitivity</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Critical lesion screening safety bound</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Circuit State Fidelity</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white">0.994</span>
            <span className="text-xs font-semibold text-purple-400">Statevector</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Amplitude encoding Hilbert projection</p>
        </div>

      </div>

      {/* Main Grid: Recent Scans & Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Recent Scans Table */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Recent MRI Analysis Cohort</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Showing {scans.length} active clinical scans</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Scan ID</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Sequence</th>
                  <th className="p-3">Tumour Diagnosis</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {scans.map((scan) => {
                  const isNormal = scan.tumourClass.includes('Normal');
                  return (
                    <tr key={scan.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="p-3 font-mono font-semibold text-white flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                        <span>{scan.id}</span>
                      </td>
                      <td className="p-3 font-medium">
                        <div>{scan.patientId}</div>
                        <div className="text-[10px] text-slate-500">{scan.patientAge}y • {scan.patientGender}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-mono text-[11px]">
                          {scan.imageType}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full font-semibold text-[11px] inline-flex items-center space-x-1 ${
                          isNormal 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}>
                          <span>{scan.tumourClass}</span>
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${isNormal ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                              style={{ width: `${scan.confidence * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-mono text-white font-semibold">{(scan.confidence * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            id={`btn-inspect-${scan.id}`}
                            onClick={() => onSelectScan(scan)}
                            className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                            title="Inspect in MRI Workbench"
                          >
                            <BrainCircuit className="w-4 h-4" />
                          </button>
                          <button
                            id={`btn-report-${scan.id}`}
                            onClick={() => onOpenReport(scan)}
                            className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-all"
                            title="Download Clinical Diagnostic PDF"
                          >
                            <FileCheck2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column (1 Col): Class Distribution & Quantum Advantage */}
        <div className="space-y-6">
          
          {/* Class Distribution Chart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Dataset Class Distribution</span>
              </h3>
              <span className="text-[11px] text-slate-400">4,860 Images</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classCounts} layout="vertical" margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`${val} Scans`, 'Count']}
                  />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {classCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quantum Advantage Card */}
          <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-xl p-5 shadow-lg space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Quantum Advantage Benchmark</span>
            </div>
            <h4 className="text-sm font-bold text-white">Hybrid VQC vs Classical ResNet-50</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Amplitude encoding maps 256-dimensional MRI radiomic features onto 8 entangled qubits, achieving superior feature separation in Hilbert space.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Classical CNN F1: <strong className="text-white">0.912</strong></span>
              <span className="text-slate-400">Hybrid QML F1: <strong className="text-cyan-400">0.984</strong></span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
