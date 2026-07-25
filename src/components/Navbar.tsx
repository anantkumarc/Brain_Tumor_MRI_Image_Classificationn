import React from 'react';
import { 
  Activity, 
  BrainCircuit, 
  Cpu, 
  Eye, 
  FileText, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  BookOpen, 
  Sliders
} from 'lucide-react';
import { QuantumBackend } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  quantumBackend: QuantumBackend;
  setQuantumBackend: (backend: QuantumBackend) => void;
  onQuickScan: () => void;
  hasGeminiKey: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  quantumBackend,
  setQuantumBackend,
  onQuickScan,
  hasGeminiKey
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'workbench', label: 'MRI Pipeline', icon: BrainCircuit },
    { id: 'xai', label: 'Explainable AI (XAI)', icon: Eye },
    { id: 'circuit', label: 'Quantum Circuit', icon: Cpu },
    { id: 'sandbox', label: 'Model Sandbox', icon: Sliders },
    { id: 'datasets', label: 'Datasets & History', icon: Database },
    { id: 'blueprint', label: 'Research Blueprint', icon: BookOpen },
    { id: 'admin', label: 'Admin & Logs', icon: ShieldCheck },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
              <BrainCircuit className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-white tracking-tight">NeuroQ-Scan</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                  Hybrid QML v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Quantum-Classical Brain MRI Clinical Engine</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Backend Selector & Quick Scan */}
          <div className="flex items-center space-x-3">
            {/* Quantum Backend Selector */}
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <select
                id="select-quantum-backend"
                value={quantumBackend}
                onChange={(e) => setQuantumBackend(e.target.value as QuantumBackend)}
                className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer"
              >
                <option value="qiskit_aer" className="bg-slate-900 text-slate-200">Qiskit Aer (Simulator)</option>
                <option value="ibm_quantum_falcon" className="bg-slate-900 text-slate-200">IBM Quantum Falcon (Cloud)</option>
                <option value="qsvm_kernel" className="bg-slate-900 text-slate-200">QSVM Kernel Classifier</option>
                <option value="qcnn_hybrid" className="bg-slate-900 text-slate-200">QCNN Deep Hybrid</option>
              </select>
            </div>

            {/* Gemini AI Status Badge */}
            <div className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
              hasGeminiKey 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              <Sparkles className="w-3 h-3" />
              <span>{hasGeminiKey ? 'Gemini 3.6 AI Ready' : 'AI Offline Mode'}</span>
            </div>

            {/* Run Analysis Button */}
            <button
              id="btn-nav-quick-scan"
              onClick={onQuickScan}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <BrainCircuit className="w-4 h-4" />
              <span>New Scan</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-slate-800 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
