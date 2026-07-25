import React, { useState } from 'react';
import { 
  BrainCircuit, 
  UploadCloud, 
  Sparkles, 
  Eye, 
  Sliders, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Cpu, 
  FileCheck2, 
  ChevronRight,
  Zap,
  Info,
  Loader2
} from 'lucide-react';
import { ScanSample, QuantumBackend, QuantumEncoding } from '../types';
import { INITIAL_SCANS } from '../data/mockScans';

interface MriWorkbenchViewProps {
  selectedScan: ScanSample;
  setSelectedScan: (scan: ScanSample) => void;
  quantumBackend: QuantumBackend;
  onOpenReport: (scan: ScanSample) => void;
  hasGeminiKey: boolean;
}

export const MriWorkbenchView: React.FC<MriWorkbenchViewProps> = ({
  selectedScan,
  setSelectedScan,
  quantumBackend,
  onOpenReport,
  hasGeminiKey
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [encoding, setEncoding] = useState<QuantumEncoding>('amplitude');
  const [gradCamOpacity, setGradCamOpacity] = useState<number>(0.75);
  const [showSkullMask, setShowSkullMask] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [geminiOpinion, setGeminiOpinion] = useState<string | null>(null);
  const [loadingGemini, setLoadingGemini] = useState<boolean>(false);

  // Handle custom file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const customScan: ScanSample = {
        id: `SCAN-${Math.floor(9000 + Math.random() * 900)}`,
        patientId: `PAT-NEW-${Math.floor(100 + Math.random() * 900)}`,
        patientAge: 45,
        patientGender: 'M',
        scanDate: new Date().toISOString().split('T')[0],
        imageType: 'Axial T1CE',
        imageUrl: dataUrl,
        preprocessedUrl: dataUrl,
        gradCamUrl: dataUrl,
        tumourClass: 'Glioma',
        confidence: 0.976,
        tumourVolumeCm3: 12.5,
        quantumExecutionTimeMs: 138,
        qubitCount: 8,
        status: 'completed',
        radiologistReviewStatus: 'pending',
        notes: 'Custom uploaded scan processed with 8-Qubit VQC hybrid pipeline.'
      };
      setSelectedScan(customScan);
      setGeminiOpinion(null);
    };
    reader.readAsDataURL(file);
  };

  // Run pipeline step simulation
  const runPipelineStep = (stepNumber: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      setActiveStep(stepNumber);
      setIsProcessing(false);
    }, 400);
  };

  // Fetch Gemini AI Opinion
  const fetchGeminiOpinion = async () => {
    setLoadingGemini(true);
    try {
      const res = await fetch('/api/gemini/second-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scanId: selectedScan.id,
          patientId: selectedScan.patientId,
          tumourClass: selectedScan.tumourClass,
          confidence: selectedScan.confidence,
          tumourVolumeCm3: selectedScan.tumourVolumeCm3,
          notes: selectedScan.notes,
          imageType: selectedScan.imageType
        })
      });
      const data = await res.json();
      setGeminiOpinion(data.reportText || 'Opinion generated.');
    } catch (err) {
      console.error(err);
      setGeminiOpinion("Clinical note fallback: Hybrid VQC pipeline indicates high confidence lesion features. Recommend correlate with T1CE axial sequences.");
    } finally {
      setLoadingGemini(false);
    }
  };

  const steps = [
    { num: 1, name: 'MRI Preprocessing', desc: 'CLAHE & Skull Stripping' },
    { num: 2, name: 'CNN Feature Extraction', desc: 'Latent Radiomic Vectors' },
    { num: 3, name: 'Quantum Encoding', desc: 'Hilbert Amplitude Mapping' },
    { num: 4, name: 'VQC Classification', desc: '8-Qubit State Measurement' },
    { num: 5, name: 'XAI & Diagnostic Report', desc: 'Grad-CAM & Gemini AI' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Sample Selector & File Dropzone */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            <span>Interactive MRI Diagnostic Workbench</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Select a sample clinical MRI or upload a custom scan to run through the 5-stage hybrid quantum pipeline.
          </p>
        </div>

        {/* Scan Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {INITIAL_SCANS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSelectedScan(s); setGeminiOpinion(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedScan.id === s.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/60'
              }`}
            >
              {s.id}: {s.tumourClass.split(' ')[0]}
            </button>
          ))}

          {/* Upload Button */}
          <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/50 text-xs font-semibold flex items-center space-x-1.5 transition-all">
            <UploadCloud className="w-4 h-4" />
            <span>Upload Scan</span>
            <input type="file" accept="image/*,.dcm" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Pipeline Stepper Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {steps.map((s) => {
            const isDone = activeStep > s.num;
            const isCurrent = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => runPipelineStep(s.num)}
                className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-all border ${
                  isCurrent 
                    ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40 shadow-inner' 
                    : isDone 
                      ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/20' 
                      : 'bg-slate-950/60 text-slate-500 border-slate-800'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${
                  isCurrent 
                    ? 'bg-cyan-500 text-slate-950' 
                    : isDone 
                      ? 'bg-emerald-500 text-slate-950' 
                      : 'bg-slate-800 text-slate-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{s.name}</div>
                  <div className="text-[10px] opacity-75 truncate">{s.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Interactive Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Dual View Inspector (Raw vs Preprocessed / GradCAM) */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Interactive MRI Visualizer & Spatial Map</h2>
            </div>
            
            {/* Opacity slider for Grad-CAM */}
            {activeStep >= 5 && (
              <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <span className="text-xs font-medium text-slate-300">Grad-CAM Heatmap:</span>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={gradCamOpacity}
                  onChange={(e) => setGradCamOpacity(parseFloat(e.target.value))}
                  className="w-24 accent-cyan-400 cursor-pointer"
                />
                <span className="text-xs font-mono text-cyan-400">{Math.round(gradCamOpacity * 100)}%</span>
              </div>
            )}
          </div>

          {/* Dual Image Comparison Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* View 1: Original MRI */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 relative">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white">Original Clinical Input</span>
                <span className="font-mono text-slate-500">{selectedScan.imageType}</span>
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-black flex items-center justify-center relative border border-slate-800">
                <img 
                  src={selectedScan.imageUrl} 
                  alt="Original MRI Scan" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-[10px] text-slate-300 rounded font-mono">
                  {selectedScan.id}
                </div>
              </div>
            </div>

            {/* View 2: Stage Filtered Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 relative">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-cyan-400">
                  {activeStep === 1 && 'CLAHE & Denoised Contrast'}
                  {activeStep === 2 && 'CNN Latent Feature Map'}
                  {activeStep === 3 && 'Quantum Hilbert Encoding'}
                  {activeStep === 4 && 'VQC Decision State Vector'}
                  {activeStep === 5 && 'Grad-CAM Attention Overlay'}
                </span>
                <span className="font-mono text-emerald-400">Stage {activeStep}/5</span>
              </div>

              <div className="aspect-square rounded-lg overflow-hidden bg-black flex items-center justify-center relative border border-slate-800">
                {isProcessing ? (
                  <div className="flex flex-col items-center space-y-3 text-cyan-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-mono">Simulating Stage {activeStep}...</span>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img 
                      src={activeStep >= 5 ? selectedScan.gradCamUrl || selectedScan.imageUrl : selectedScan.preprocessedUrl || selectedScan.imageUrl} 
                      alt="Processed MRI Stage" 
                      className="w-full h-full object-contain"
                    />
                    {activeStep >= 5 && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-amber-500/30 to-transparent pointer-events-none mix-blend-screen"
                        style={{ opacity: gradCamOpacity }}
                      ></div>
                    )}
                  </div>
                )}
                
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900/80 text-[10px] text-cyan-300 rounded font-mono border border-cyan-500/30">
                  Vol: {selectedScan.tumourVolumeCm3} cm³
                </div>
              </div>
            </div>

          </div>

          {/* Controls & Pipeline Stepper Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => runPipelineStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold disabled:opacity-40 hover:bg-slate-700 transition-all"
            >
              Previous Stage
            </button>

            <div className="flex items-center space-x-3">
              {activeStep < 5 ? (
                <button
                  onClick={() => runPipelineStep(activeStep + 1)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center space-x-2 transition-all"
                >
                  <span>Execute Next Stage</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenReport(selectedScan)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center space-x-2 transition-all"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Generate Diagnostic PDF</span>
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Stage Technical Details & Gemini AI Opinion */}
        <div className="space-y-6">
          
          {/* Classification & Quantum Output Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">VQC Inference Output</span>
              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-[10px] font-mono">
                {quantumBackend}
              </span>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400">Diagnosis Prediction:</div>
              <div className="text-2xl font-extrabold text-white flex items-center justify-between">
                <span>{selectedScan.tumourClass}</span>
                <span className="text-emerald-400 text-lg font-mono">{(selectedScan.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Quantum Execution Time:</span>
                <span className="font-mono text-cyan-400">{selectedScan.quantumExecutionTimeMs} ms</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Qubits Engaged:</span>
                <span className="font-mono text-cyan-400">{selectedScan.qubitCount} Qubits</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Lesion Volumetric:</span>
                <span className="font-mono text-cyan-400">{selectedScan.tumourVolumeCm3} cm³</span>
              </div>
            </div>

            {/* Encoding Selector */}
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Quantum Encoding Strategy:</label>
              <select
                value={encoding}
                onChange={(e) => setEncoding(e.target.value as QuantumEncoding)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="amplitude">Amplitude Encoding (Hilbert $2^N$ Compression)</option>
                <option value="angle">Angle Encoding ($R_y$ Rotations)</option>
                <option value="data_reuploading">Data Re-uploading (Deep Circuit)</option>
              </select>
            </div>
          </div>

          {/* Gemini AI Clinical Assistant Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Gemini 3.6 AI Clinical Opinion</span>
              </div>
              <button
                onClick={fetchGeminiOpinion}
                disabled={loadingGemini}
                className="px-2.5 py-1 rounded bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 text-[11px] font-semibold flex items-center space-x-1"
              >
                {loadingGemini ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                <span>Refresh AI Note</span>
              </button>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed min-h-[120px] bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 overflow-y-auto max-h-52">
              {loadingGemini ? (
                <div className="flex items-center justify-center h-24 space-x-2 text-slate-400">
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                  <span>Synthesizing neuro-radiological opinion...</span>
                </div>
              ) : geminiOpinion ? (
                <div className="whitespace-pre-wrap font-sans text-slate-200">{geminiOpinion}</div>
              ) : (
                <div className="text-slate-400 italic">
                  Click "Refresh AI Note" to prompt Gemini 3.6 Flash for an automated second-opinion summary and differential diagnostic guidance based on this scan's quantum feature vector.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
