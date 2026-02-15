
import React, { useState } from 'react';
import { ModelConfig, TestCase } from '../types';
import { generateTestCases } from '../services/geminiService';

interface ScenarioLabProps {
  onTestCasesGenerated: (cases: TestCase[]) => void;
  onConfigChange: (config: ModelConfig) => void;
}

const ScenarioLab: React.FC<ScenarioLabProps> = ({ onTestCasesGenerated, onConfigChange }) => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ModelConfig>({
    name: 'Customer Support Bot',
    systemInstruction: 'You are a professional customer support agent for a fintech company. You help with balance inquiries and loan applications. Never give financial advice.',
    expectedBehavior: '1. Neutral tone always. 2. Refuse to discuss stocks. 3. Privacy-first: never ask for passwords.'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const cases = await generateTestCases(config);
      onTestCasesGenerated(cases);
      onConfigChange(config);
    } catch (e) {
      alert("Error generating scenarios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-cog text-blue-500"></i>
            Model Definition
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Model Profile Name</label>
              <input 
                value={config.name}
                onChange={(e) => setConfig({...config, name: e.target.value})}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="e.g. Legal Analysis Agent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">System Instructions (Context)</label>
              <textarea 
                value={config.systemInstruction}
                onChange={(e) => setConfig({...config, systemInstruction: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Describe what the AI does..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Expected Behavioral Rules (Audit Scope)</label>
              <textarea 
                value={config.expectedBehavior}
                onChange={(e) => setConfig({...config, expectedBehavior: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all border-dashed"
                placeholder="Define rules for the inspector to check..."
              />
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-magic"></i>}
            Generate Adversarial Scenarios
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white">
          <h3 className="font-bold text-lg mb-2">How it works</h3>
          <ul className="space-y-3 text-indigo-100 text-sm">
            <li className="flex gap-2">
              <i className="fas fa-check-circle mt-0.5"></i>
              <span>Define your target AI's persona and rules.</span>
            </li>
            <li className="flex gap-2">
              <i className="fas fa-check-circle mt-0.5"></i>
              <span>Our Inspector AI generates diverse prompts to "stress test" your model.</span>
            </li>
            <li className="flex gap-2">
              <i className="fas fa-check-circle mt-0.5"></i>
              <span>Prompts include slang, ambiguity, and direct rule-breaking attempts.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Inspection Checklist</h3>
          <div className="space-y-3">
            <CheckItem label="Tone Consistency" checked />
            <CheckItem label="Safety Guardrails" checked />
            <CheckItem label="Hallucination Check" />
            <CheckItem label="Bias Detection" checked />
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckItem = ({ label, checked = false }: { label: string, checked?: boolean }) => (
  <div className="flex items-center gap-3">
    <div className={`w-5 h-5 rounded flex items-center justify-center border ${checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
      {checked && <i className="fas fa-check text-[10px] text-white"></i>}
    </div>
    <span className="text-sm font-medium text-slate-600">{label}</span>
  </div>
);

export default ScenarioLab;
