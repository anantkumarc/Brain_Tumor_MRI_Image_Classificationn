import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, TrendingUp, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ModelSandboxView: React.FC = () => {
  const [ansatz, setAnsatz] = useState<string>('RealAmplitudes');
  const [circuitDepth, setCircuitDepth] = useState<number>(4);
  const [optimizer, setOptimizer] = useState<string>('COBYLA');
  const [learningRate, setLearningRate] = useState<number>(0.01);
  const [epochs, setEpochs] = useState<number>(30);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);

  // Simulated training loss curve data
  const [lossData, setLossData] = useState([
    { epoch: 1, classicalLoss: 0.82, hybridLoss: 0.74, valAccuracy: 84.2 },
    { epoch: 5, classicalLoss: 0.65, hybridLoss: 0.48, valAccuracy: 89.1 },
    { epoch: 10, classicalLoss: 0.51, hybridLoss: 0.32, valAccuracy: 93.4 },
    { epoch: 15, classicalLoss: 0.44, hybridLoss: 0.21, valAccuracy: 96.2 },
    { epoch: 20, classicalLoss: 0.38, hybridLoss: 0.14, valAccuracy: 98.1 },
    { epoch: 25, classicalLoss: 0.35, hybridLoss: 0.09, valAccuracy: 98.4 },
    { epoch: 30, classicalLoss: 0.33, hybridLoss: 0.06, valAccuracy: 98.7 },
  ]);

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const benchmarkModels = [
    { name: 'Classical ResNet-50', accuracy: '91.2%', f1Score: '0.908', latency: '42 ms', params: '25.6 M', quantum: 'No' },
    { name: 'Quantum SVM (QSVM Kernel)', accuracy: '94.6%', f1Score: '0.941', latency: '85 ms', params: '64 Features', quantum: 'QSVM' },
    { name: 'Hybrid ResNet + VQC (8 Qubits)', accuracy: '98.4%', f1Score: '0.982', latency: '132 ms', params: '32 Rotations', quantum: 'VQC (Active)' },
    { name: 'Quantum CNN (QCNN)', accuracy: '97.1%', f1Score: '0.968', latency: '160 ms', params: '48 Gates', quantum: 'QCNN' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-cyan-400" />
            <span>Hybrid Quantum Training Sandbox & Benchmarks</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure variational ansatz architectures, circuit depth, and optimizers to benchmark quantum advantage.
          </p>
        </div>

        <button
          onClick={handleStartTraining}
          disabled={isTraining}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          <span>{isTraining ? `Training... ${trainingProgress}%` : 'Run Training Loop'}</span>
        </button>
      </div>

      {/* Main Grid: Hyperparameters vs Training Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Hyperparameter Form Controls */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2 pb-2 border-b border-slate-800">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Quantum Hyperparameters</span>
          </h2>

          <div className="space-y-3 text-xs">
            
            {/* Ansatz type */}
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Ansatz Architecture:</label>
              <select
                value={ansatz}
                onChange={(e) => setAnsatz(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none font-mono"
              >
                <option value="RealAmplitudes">RealAmplitudes ($R_y$ + CNOT)</option>
                <option value="EfficientSU2">EfficientSU2 ($R_y, R_z$ + CNOT)</option>
                <option value="StrongEntanglingLayers">StrongEntanglingLayers (All-to-All)</option>
              </select>
            </div>

            {/* Circuit Depth L */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Ansatz Repetitions (Depth L):</span>
                <span className="font-mono text-cyan-400 font-bold">L = {circuitDepth}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={circuitDepth}
                onChange={(e) => setCircuitDepth(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Optimizer */}
            <div className="space-y-1">
              <label className="text-slate-400 font-medium">Quantum Optimizer:</label>
              <select
                value={optimizer}
                onChange={(e) => setOptimizer(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none font-mono"
              >
                <option value="COBYLA">COBYLA (Constrained Optimization)</option>
                <option value="SPSA">SPSA (Simultaneous Perturbation Stochastic)</option>
                <option value="Adam">Adam (Parameter Shift Rule)</option>
              </select>
            </div>

            {/* Learning Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Learning Rate (η):</span>
                <span className="font-mono text-cyan-400 font-bold">{learningRate}</span>
              </div>
              <input 
                type="range" 
                min="0.001" 
                max="0.05" 
                step="0.002"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Epochs */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Epochs:</span>
                <span className="font-mono text-cyan-400 font-bold">{epochs} Epochs</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="10"
                value={epochs}
                onChange={(e) => setEpochs(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

          </div>

          {/* Progress bar if training */}
          {isTraining && (
            <div className="space-y-1 pt-2 border-t border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-300">
                <span>Simulating VQC Retraining...</span>
                <span className="font-mono text-cyan-400">{trainingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-cyan-400 transition-all duration-200" style={{ width: `${trainingProgress}%` }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Right 2 Cols: Training Convergence Chart */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Training Convergence (Hybrid VQC Loss vs Classical Loss)</span>
            </h2>
            <span className="text-xs text-emerald-400 font-semibold font-mono">Val Acc: 98.7%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lossData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="epoch" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="classicalLoss" name="Classical CNN Loss" stroke="#f87171" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="hybridLoss" name="Hybrid VQC Loss" stroke="#38bdf8" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Cross-Architecture Medical Benchmark Comparison</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Architecture Name</th>
                <th className="p-3">Quantum Layer</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">F1-Score</th>
                <th className="p-3">Latency</th>
                <th className="p-3">Parameter Count</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {benchmarkModels.map((m, idx) => (
                <tr key={idx} className={`hover:bg-slate-800/40 transition-colors ${m.quantum.includes('Active') ? 'bg-cyan-500/10' : ''}`}>
                  <td className="p-3 font-semibold text-white">{m.name}</td>
                  <td className="p-3 font-mono text-cyan-400">{m.quantum}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{m.accuracy}</td>
                  <td className="p-3 font-mono text-slate-200">{m.f1Score}</td>
                  <td className="p-3 font-mono text-slate-300">{m.latency}</td>
                  <td className="p-3 font-mono text-slate-400">{m.params}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
