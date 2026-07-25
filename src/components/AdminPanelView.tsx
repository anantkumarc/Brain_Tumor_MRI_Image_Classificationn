import React, { useState } from 'react';
import { ShieldCheck, Users, Activity, Terminal, Key, Cpu, RefreshCw, Sparkles } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../data/mockScans';
import { QuantumBackend } from '../types';

interface AdminPanelViewProps {
  quantumBackend: QuantumBackend;
  hasGeminiKey: boolean;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ quantumBackend, hasGeminiKey }) => {
  const [logs, setLogs] = useState(MOCK_AUDIT_LOGS);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredLogs = logs.filter((l) => filterLevel === 'all' || l.level === filterLevel);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span>Admin Control Panel & System Audit Logs</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            System administration, RBAC permissions, quantum backend configuration, and immutable compliance audit trail.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold">
          <span>System Health: Normal</span>
        </div>
      </div>

      {/* System Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center space-x-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Quantum Engine Status</div>
            <div className="text-sm font-bold text-white uppercase font-mono">{quantumBackend.replace('_', ' ')}</div>
            <div className="text-[10px] text-emerald-400">8 Qubits • Statevector Aer Active</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center space-x-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Gemini 3.6 API Key</div>
            <div className="text-sm font-bold text-white font-mono">
              {hasGeminiKey ? 'Configured (Server Secret)' : 'Fallback Mode'}
            </div>
            <div className="text-[10px] text-slate-400">Settings &gt; Secrets</div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center space-x-4">
          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Active User Roles</div>
            <div className="text-sm font-bold text-white">4 Clinical Roles</div>
            <div className="text-[10px] text-purple-300">Clinician, Radiologist, Researcher, Admin</div>
          </div>
        </div>

      </div>

      {/* Audit Logs Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Immutable Audit Trail & Activity Log</span>
          </h2>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs text-slate-200 focus:outline-none"
          >
            <option value="all">All Log Levels</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-mono">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 font-bold text-cyan-400">{log.id}</td>
                  <td className="p-3 text-slate-400">{log.timestamp}</td>
                  <td className="p-3 font-sans text-white">{log.user}</td>
                  <td className="p-3 font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {log.role}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-400 font-bold">{log.action}</td>
                  <td className="p-3 font-sans text-slate-300 max-w-md truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
