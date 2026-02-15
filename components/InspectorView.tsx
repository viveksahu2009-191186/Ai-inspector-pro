
import React, { useState } from 'react';
import { TestCase, InspectionResult, ModelConfig } from '../types';
import { runInspection } from '../services/geminiService';

interface InspectorViewProps {
  testCases: TestCase[];
  config: ModelConfig;
}

const InspectorView: React.FC<InspectorViewProps> = ({ testCases, config }) => {
  const [results, setResults] = useState<InspectionResult[]>([]);
  const [running, setRunning] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(-1);

  const startAudit = async () => {
    setRunning(true);
    setResults([]);
    for (let i = 0; i < testCases.length; i++) {
      setCurrentIdx(i);
      const res = await runInspection(config, testCases[i]);
      setResults(prev => [...prev, res]);
    }
    setRunning(false);
    setCurrentIdx(-1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <i className="fas fa-vial-circle-check text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Ready to Inspect</h2>
            <p className="text-sm text-slate-500">{testCases.length} Scenarios Loaded</p>
          </div>
        </div>
        <button 
          onClick={startAudit}
          disabled={running || testCases.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {running ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-play"></i>}
          Run Full Audit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {testCases.map((tc, idx) => {
          const result = results.find(r => r.testCaseId === tc.id);
          const isCurrent = idx === currentIdx;

          return (
            <div key={tc.id} className={`bg-white rounded-2xl shadow-sm border transition-all overflow-hidden ${isCurrent ? 'border-blue-500 ring-2 ring-blue-50' : 'border-slate-200'}`}>
              <div className="p-5 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{tc.type}</span>
                    <h3 className="font-bold text-slate-800">{tc.prompt}</h3>
                  </div>
                  <p className="text-xs text-slate-500 italic">Expected: {tc.expectedOutcome}</p>
                </div>
                {result ? (
                  <div className={`px-4 py-1.5 rounded-full font-bold text-sm ${
                    result.status === 'passed' ? 'bg-green-100 text-green-700' : 
                    result.status === 'failed' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {result.status.toUpperCase()} ({result.score}%)
                  </div>
                ) : isCurrent ? (
                  <div className="text-blue-500 text-sm animate-pulse font-bold">Analyzing...</div>
                ) : (
                  <div className="text-slate-300 text-sm italic font-medium">Pending</div>
                )}
              </div>

              {result && (
                <div className="bg-slate-50 border-t border-slate-100 p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Response</h4>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-sm text-slate-700 min-h-[60px]">
                      {result.actualResponse}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inspector Reasoning</h4>
                    <p className="text-sm text-slate-600 mb-4">{result.reasoning}</p>
                    <div className="grid grid-cols-3 gap-2">
                      <MetricBadge label="Bias" val={result.safetyMetrics.bias} color="red" />
                      <MetricBadge label="Toxic" val={result.safetyMetrics.toxicity} color="orange" />
                      <MetricBadge label="Halluc" val={result.safetyMetrics.hallucination} color="indigo" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MetricBadge = ({ label, val, color }: any) => {
  const intensity = val > 7 ? 'bg-red-500' : val > 4 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-500">{label}</span>
      <div className={`w-4 h-4 rounded-full ${intensity} text-white flex items-center justify-center text-[8px] font-bold`}>
        {val}
      </div>
    </div>
  )
}

export default InspectorView;
