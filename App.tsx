
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScenarioLab from './components/ScenarioLab';
import InspectorView from './components/InspectorView';
import Landing from './components/Landing';
import { AppView, ModelConfig, TestCase } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [modelConfig, setModelConfig] = useState<ModelConfig | null>(null);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [appReady, setAppReady] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Initial load animation trigger
    const timer = setTimeout(() => setAppReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setCurrentView(AppView.DASHBOARD);
  };

  if (currentView === AppView.LANDING) {
    return <Landing onStart={handleStart} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.LAB:
        return (
          <ScenarioLab 
            onConfigChange={setModelConfig}
            onTestCasesGenerated={(cases) => {
              setTestCases(cases);
              setCurrentView(AppView.INSPECTOR);
            }} 
          />
        );
      case AppView.INSPECTOR:
        if (!modelConfig || testCases.length === 0) {
          return (
            <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-slate-200">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-flask-vial text-blue-500 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">No Active Audit</h2>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">Please define your AI model and generate scenarios in the Lab before starting an inspection.</p>
              <button 
                onClick={() => setCurrentView(AppView.LAB)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold transition-all hover:bg-blue-700"
              >
                Go to Scenario Lab
              </button>
            </div>
          );
        }
        return <InspectorView testCases={testCases} config={modelConfig} />;
      case AppView.COMPLIANCE:
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-200">
             <div className="flex items-center gap-4 mb-6">
               <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                 <i className="fas fa-scale-balanced text-2xl"></i>
               </div>
               <div>
                 <h1 className="text-2xl font-bold text-slate-800">EU AI Act Compliance & Risk</h1>
                 <p className="text-slate-500">Legal readiness and ethical impact assessment</p>
               </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">Risk Categorization</h3>
                  <div className="space-y-4">
                    <RiskItem label="Prohibited Practices" status="Compliant" color="green" />
                    <RiskItem label="High-Risk Activity" status="Identified" color="amber" />
                    <RiskItem label="Limited Risk Transparency" status="Compliant" color="green" />
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-800 mb-4">Fairness Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                       <span className="text-slate-600">Demographic Parity</span>
                       <span className="font-bold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                       <span className="text-slate-600">Equality of Opportunity</span>
                       <span className="font-bold text-green-600">91.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                       <span className="text-slate-600">Disparate Impact Ratio</span>
                       <span className="font-bold text-amber-600">0.82</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        )
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] flex transition-opacity duration-1000 ${appReady ? 'opacity-100' : 'opacity-0'}`}>
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} p-8 overflow-y-auto`}>
        <header className="flex justify-between items-center mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">PROJECT ALPHA</span>
            <h2 className="text-slate-400 text-sm mt-1">Workspace / <span className="text-slate-800 font-semibold">{currentView}</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <i className="fas fa-bell"></i>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700">API ACTIVE</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const RiskItem = ({ label, status, color }: any) => {
  const colorMap: any = {
    green: 'text-green-600 bg-green-100',
    amber: 'text-amber-600 bg-amber-100',
    red: 'text-rose-600 bg-rose-100',
  };
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${colorMap[color]}`}>{status}</span>
    </div>
  );
}

export default App;
