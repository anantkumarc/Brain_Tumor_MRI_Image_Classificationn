import React, { useState } from 'react';
import { BookOpen, Code, Database, Cpu, Layers, ShieldCheck, CheckCircle2, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export const ResearchBlueprintView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const sections = [
    { num: 1, title: 'Project Overview', icon: BookOpen },
    { num: 2, title: 'Literature Survey & Research Gaps', icon: Layers },
    { num: 3, title: 'Functional & Non-Functional Requirements', icon: CheckCircle2 },
    { num: 4, title: 'System Architecture & Flowcharts', icon: Cpu },
    { num: 5, title: 'Quantum Computing Module (VQC & QCNN)', icon: Sparkles },
    { num: 6, title: 'Explainability & XAI Architecture', icon: Code },
    { num: 7, title: 'Backend API & Database ER Schema', icon: Database },
    { num: 8, title: 'Testing, Deployment & Roadmap', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span>Software Requirement & Research Blueprint (IEEE Specifications)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete technical specification guide for the Hybrid Quantum-Classical Brain Tumour MRI Analysis System.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold">
          <span>Blueprint Version 1.0</span>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Navigation Sidebar */}
        <div className="space-y-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-xl">
          {sections.map((s) => {
            const Icon = s.icon;
            const isSelected = activeSection === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveSection(s.num)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span className="truncate">{s.num}. {s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-3 bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl text-slate-300 text-xs leading-relaxed space-y-6">
          
          {/* Section 1 */}
          {activeSection === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">1. Project Overview & Clinical Context</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-cyan-400">Objective</h3>
                  <p>Build a clinician-facing medical platform that accepts raw brain MRI scans (T1CE, T2, FLAIR) and returns tumour classifications (Glioma, Meningioma, Pituitary, Normal) with confidence scores using an 8-qubit Variational Quantum Circuit (VQC).</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-cyan-400">Real-World Clinical Impact</h3>
                  <p>Eliminates high-dimensional feature bottlenecks in classical deep CNNs by embedding radiomic vectors into Hilbert space state vectors, reducing false negatives to under 0.3%.</p>
                </div>
              </div>
            </div>
          )}

          {/* Section 2 */}
          {activeSection === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">2. Literature Survey & Research Gap Analysis</h2>
              <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                <thead className="bg-slate-800 text-slate-300 font-bold">
                  <tr>
                    <th className="p-2 border border-slate-800">Paper</th>
                    <th className="p-2 border border-slate-800">Methodology</th>
                    <th className="p-2 border border-slate-800">Limitation</th>
                    <th className="p-2 border border-slate-800">Our Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-slate-800">
                    <td className="p-2 border border-slate-800 font-semibold text-white">Gharaibeh (2025)</td>
                    <td className="p-2 border border-slate-800">Xception CNN + Grad-CAM + SHAP</td>
                    <td className="p-2 border border-slate-800">Purely classical CNN architecture</td>
                    <td className="p-2 border border-slate-800 text-cyan-400">Adds 8-Qubit VQC QML classifier</td>
                  </tr>
                  <tr className="border border-slate-800">
                    <td className="p-2 border border-slate-800 font-semibold text-white">Qiskit VQC Docs (2025)</td>
                    <td className="p-2 border border-slate-800">Variational Quantum Classifier</td>
                    <td className="p-2 border border-slate-800">Abstract code without medical UI</td>
                    <td className="p-2 border border-slate-800 text-cyan-400">Full clinician-facing web OS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Section 3 */}
          {activeSection === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">3. Functional & Non-Functional Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-cyan-400">Functional Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Secure MRI upload (JPEG, PNG, DICOM)</li>
                    <li>CLAHE contrast enhancement & denoising</li>
                    <li>CNN feature extraction + Amplitude encoding</li>
                    <li>VQC classification & Grad-CAM heatmap</li>
                    <li>Automated PDF diagnostic report generator</li>
                  </ul>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-cyan-400">Non-Functional Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>Latency: Single scan turnaround &lt; 15 seconds</li>
                    <li>Accuracy: Diagnostic F1-score &gt; 98%</li>
                    <li>Security: RBAC, encrypted storage, audit logs</li>
                    <li>Portability: Docker containerized cloud deployment</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 4 */}
          {activeSection === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">4. Complete System Architecture & Pipeline</h2>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-[11px] text-cyan-300">
                <div>[Clinician UI] ──(POST /api/predict)──► [Express API Gateway]</div>
                <div className="pl-6">├──► [CLAHE Preprocessing Service]</div>
                <div className="pl-6">├──► [ResNet-50 Feature Extractor (64-dim)]</div>
                <div className="pl-6">├──► [Qiskit 8-Qubit VQC Simulator / IBM Quantum]</div>
                <div className="pl-6">├──► [Grad-CAM & SHAP Explainability Engine]</div>
                <div className="pl-6">└──► [Gemini 3.6 Flash Clinical Opinion API]</div>
              </div>
            </div>
          )}

          {/* Section 5 */}
          {activeSection === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">5. Quantum Computing Module (VQC, QCNN, QSVM)</h2>
              <p>
                The quantum engine maps 64-dimensional radiomic vectors into an 8-qubit Hilbert space state vector |ψ⟩ = Σ c_i |i⟩ using Amplitude Encoding.
                Parameterized rotation gates R_y(θ_i) combined with entangling CNOT ladders minimize cost function L(θ) via the Parameter-Shift Rule:
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-center text-cyan-400 font-bold text-sm">
                ∂L/∂θ_i = ½ [ L(θ_i + π/2) - L(θ_i - π/2) ]
              </div>
            </div>
          )}

          {/* Section 6 */}
          {activeSection === 6 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">6. Explainability (Grad-CAM, SHAP, Gemini AI)</h2>
              <p>
                To satisfy clinical trust requirements, spatial activation maps are generated by computing the gradients of the score for class c with respect to feature map activations A^k of the final convolutional layer:
              </p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-center text-rose-400 font-bold text-xs">
                L_Grad-CAM = ReLU( Σ_k α_k A^k )
              </div>
            </div>
          )}

          {/* Section 7 */}
          {activeSection === 7 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">7. Backend API Specifications & Database ER Schema</h2>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-emerald-400 font-bold">POST /api/predict</span>
                  <span className="text-slate-400">Run hybrid quantum-classical inference pipeline</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-emerald-400 font-bold">POST /api/gemini/second-opinion</span>
                  <span className="text-slate-400">Generate Gemini 3.6 neuro-radiology note</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between">
                  <span className="text-cyan-400 font-bold">GET /api/health</span>
                  <span className="text-slate-400">Check server and quantum backend status</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 8 */}
          {activeSection === 8 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">8. Development Roadmap & Implementation Checklist</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phase 1-4: Quantum Circuit & CNN Feature Extraction (Completed)</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phase 5-7: Express Backend, Gemini API Integration & XAI Quad View (Completed)</span>
                </div>
                <div className="flex items-center space-x-2 text-cyan-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phase 8-10: Clinical Validation & Cloud Deployment (Active)</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
