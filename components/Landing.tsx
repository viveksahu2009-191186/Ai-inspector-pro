
import React from 'react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8 animate-bounce">
          <i className="fas fa-sparkles"></i>
          Next-Gen AI Auditing
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
          Inspect your AI <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Before the World Does.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The industry standard for validating behavior, detecting bias, and ensuring LLM safety through automated adversarial simulations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-blue-500/25 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            Get Started
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
          
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm"
          >
            View Live Demo
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex flex-col items-center gap-2">
             <i className="fas fa-shield-halved text-2xl text-white"></i>
             <span className="text-white text-xs font-bold uppercase tracking-widest">Safety First</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <i className="fas fa-bolt text-2xl text-white"></i>
             <span className="text-white text-xs font-bold uppercase tracking-widest">Real-time Audit</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <i className="fas fa-scale-balanced text-2xl text-white"></i>
             <span className="text-white text-xs font-bold uppercase tracking-widest">EU AI Act Ready</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <i className="fas fa-microscope text-2xl text-white"></i>
             <span className="text-white text-xs font-bold uppercase tracking-widest">Adversarial Lab</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
