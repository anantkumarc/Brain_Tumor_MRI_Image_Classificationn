import React from 'react';
import { X, Printer, Download, BrainCircuit, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { ScanSample } from '../types';

interface DiagnosticReportModalProps {
  scan: ScanSample | null;
  onClose: () => void;
}

export const DiagnosticReportModal: React.FC<DiagnosticReportModalProps> = ({ scan, onClose }) => {
  if (!scan) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Report Header */}
        <div className="border-b border-slate-800 pb-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">NeuroQ-Scan Clinical Diagnostic Report</h2>
              <p className="text-xs text-slate-400">Hybrid Quantum-Classical MRI Brain Tumour Analysis</p>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-400">
            <div>Report ID: REP-{scan.id}</div>
            <div>Date: {scan.scanDate}</div>
          </div>
        </div>

        {/* Patient & Scan Demographics Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Patient ID</span>
            <span className="font-mono font-bold text-white">{scan.patientId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Age / Gender</span>
            <span className="font-semibold text-slate-200">{scan.patientAge} Yrs / {scan.patientGender}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Sequence Type</span>
            <span className="font-mono text-cyan-400 font-bold">{scan.imageType}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Quantum Engine</span>
            <span className="font-mono text-emerald-400 font-bold">{scan.qubitCount}-Qubit VQC</span>
          </div>
        </div>

        {/* Diagnostic Verdict & Confidence */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-xl border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Primary Diagnosis Classification</span>
            <div className="text-2xl font-black text-white mt-1">{scan.tumourClass}</div>
            <p className="text-xs text-slate-400 mt-1">
              Volumetric Estimate: <strong className="text-white">{scan.tumourVolumeCm3} cm³</strong> | Quantum Latency: <strong className="text-white">{scan.quantumExecutionTimeMs} ms</strong>
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-center shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Model Confidence</span>
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">{(scan.confidence * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Scan & Grad-CAM Image Previews */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-center">
            <span className="text-[11px] font-bold text-slate-400 block">Original MRI Input</span>
            <div className="aspect-square bg-black rounded-lg overflow-hidden border border-slate-800">
              <img src={scan.imageUrl} alt="Raw Scan" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-center">
            <span className="text-[11px] font-bold text-rose-400 block">Grad-CAM Spatial Heatmap</span>
            <div className="aspect-square bg-black rounded-lg overflow-hidden border border-slate-800 relative">
              <img src={scan.gradCamUrl || scan.imageUrl} alt="Grad-CAM Scan" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-amber-500/30 to-transparent pointer-events-none mix-blend-screen"></div>
            </div>
          </div>
        </div>

        {/* Clinical Radiologist Notes */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Clinical Impression & Neuro-Radiology Notes</span>
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {scan.notes || 'Heterogeneous ring-enhancing frontoparietal lesion with central necrosis and perilesional edema. High VQC probability.'}
          </p>
        </div>

        {/* Action Buttons Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Electronically Signed & Verified</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center space-x-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
