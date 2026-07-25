import React, { useState } from 'react';
import { Cpu, Sliders, Zap, RotateCcw, Activity, Layers, Sparkles, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { QuantumBackend } from '../types';

interface QuantumCircuitViewProps {
  quantumBackend: QuantumBackend;
}

export const QuantumCircuitView: React.FC<QuantumCircuitViewProps> = ({ quantumBackend }) => {
  const [qubitCount, setQubitCount] = useState<number>(8);
  const [circuitDepth, setCircuitDepth] = useState<number>(4);
  const [ansatzType, setAnsatzType] = useState<string>('RealAmplitudes');
  const [selectedQubit, setSelectedQubit] = useState<number>(0);

  // Rotation parameters theta_0 ... theta_7
  const [thetas, setThetas] = useState<number[]>([
    0.82, 1.45, 0.38, 2.10, 1.15, 0.94, 1.88, 0.62
  ]);

  // Handle angle slider change
  const handleThetaChange = (index: number, val: number) => {
    const updated = [...thetas];
    updated[index] = val;
    setThetas(updated);
  };

  // Generate bitstring probability data based on current rotation parameters
  const bitstringProbabilities = Array.from({ length: 16 }, (_, i) => {
    const bitstring = i.toString(2).padStart(4, '0') + '...';
    // Calculate simulated probability from angles
    const baseVal = Math.sin(thetas[i % 8] * 1.5 + i * 0.4) ** 2;
    return {
      bitstring,
      probability: Number(baseVal.toFixed(3)),
    };
  });

  // Calculate Bloch Sphere coordinates for selected qubit
  const theta = thetas[selectedQubit] || 0.8;
  const phi = theta * 1.8;
  const blochX = Math.sin(theta) * Math.cos(phi);
  const blochY = Math.sin(theta) * Math.sin(phi);
  const blochZ = Math.cos(theta);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span>Interactive 8-Qubit Variational Quantum Circuit (VQC) Visualizer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate parameter-shift gradients, entanglement ladders, and Hilbert space amplitude collapse in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Backend:</span>
          <span className="text-xs font-mono font-bold text-cyan-400">{quantumBackend.toUpperCase()}</span>
        </div>
      </div>

      {/* Main Grid: Circuit Diagram & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Circuit Wires Diagram */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Parameterized Quantum Ansatz Diagram</span>
            </h2>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>State |0⟩ → Superposition (H) → Rotation R_y(θ) → CNOT → Measure</span>
            </div>
          </div>

          {/* Circuit Wires Rendering Container */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3 overflow-x-auto">
            {Array.from({ length: qubitCount }).map((_, qIndex) => (
              <div key={qIndex} className="flex items-center space-x-3 min-w-[580px]">
                {/* Qubit Label */}
                <button
                  onClick={() => setSelectedQubit(qIndex)}
                  className={`w-12 py-1 rounded text-xs font-mono font-bold transition-all ${
                    selectedQubit === qIndex 
                      ? 'bg-cyan-500 text-slate-950 shadow' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  |q_{qIndex}⟩
                </button>

                {/* Wire Line with Gates */}
                <div className="flex-1 h-12 bg-slate-900/60 rounded border border-slate-800/80 flex items-center px-4 relative">
                  
                  {/* Wire background line */}
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-700 -translate-y-1/2 pointer-events-none"></div>

                  {/* Gates */}
                  <div className="relative z-10 flex items-center space-x-6 w-full justify-between">
                    {/* Hadamard Gate */}
                    <div className="w-8 h-8 rounded bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shadow">
                      H
                    </div>

                    {/* Rotation Gate with theta slider */}
                    <div className="px-2.5 py-1 rounded bg-gradient-to-tr from-cyan-600 to-blue-600 text-white font-mono text-[11px] font-bold shadow border border-cyan-400/40 flex items-center space-x-1">
                      <span>R_y({thetas[qIndex]?.toFixed(2)})</span>
                    </div>

                    {/* CNOT Entanglement node */}
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center border border-indigo-400">
                      ⊕
                    </div>

                    {/* Measurement Meter */}
                    <div className="w-8 h-8 rounded bg-slate-800 border border-slate-600 text-slate-300 font-bold text-xs flex items-center justify-center">
                      M
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Interactive Rotation Angle Sliders */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Variational Angle Parameters (θ_0 ... θ_7)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {thetas.map((t, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-lg p-2 space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">θ_{idx}</span>
                    <span className="text-cyan-400 font-mono font-bold">{t.toFixed(2)} rad</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="3.14" 
                    step="0.05"
                    value={t}
                    onChange={(e) => handleThetaChange(idx, parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Bloch Sphere & Probability Distribution */}
        <div className="space-y-6">
          
          {/* Bloch Sphere State Simulator Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Qubit |q_{selectedQubit}⟩ Bloch Sphere
              </h3>
              <span className="text-[10px] font-mono text-cyan-400">Pure State Vector</span>
            </div>

            {/* Bloch Sphere Visual Canvas */}
            <div className="aspect-square bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
              {/* Outer Wireframe Sphere */}
              <div className="w-36 h-36 rounded-full border border-slate-700/80 relative flex items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-slate-700/60 -translate-y-1/2"></div>
                <div className="absolute inset-y-0 left-1/2 w-px bg-slate-700/60 -translate-x-1/2"></div>
                
                {/* State Vector Arrow */}
                <div 
                  className="absolute w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left transform"
                  style={{ 
                    transform: `rotate(${theta * 57.3}deg)`,
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-md shadow-cyan-400"></div>
                </div>

                <div className="absolute -top-5 text-[10px] font-mono text-slate-400">|0⟩ (Z+)</div>
                <div className="absolute -bottom-5 text-[10px] font-mono text-slate-400">|1⟩ (Z-)</div>
                <div className="absolute -left-7 text-[10px] font-mono text-slate-400">|−⟩</div>
                <div className="absolute -right-7 text-[10px] font-mono text-slate-400">|+⟩</div>
              </div>
            </div>

            {/* Coordinates display */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">X Coordinate</div>
                <div className="text-slate-200 font-bold">{blochX.toFixed(2)}</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">Y Coordinate</div>
                <div className="text-slate-200 font-bold">{blochY.toFixed(2)}</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">Z Coordinate</div>
                <div className="text-slate-200 font-bold">{blochZ.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Bitstring Probability Distribution Chart */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Measured Bitstring Probabilities P(|x⟩)
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bitstringProbabilities} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="bitstring" tick={{ fill: '#64748b', fontSize: 9 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 9 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${(val * 100).toFixed(1)}%`, 'Probability']}
                  />
                  <Bar dataKey="probability" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
