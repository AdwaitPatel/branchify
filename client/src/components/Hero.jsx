import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Terminal, Github, ArrowRight } from 'lucide-react';

export const Hero = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const terminalSequence = [
    { text: '$ git checkout feature-login', delay: 0, type: 'command' },
    { text: "Switched to branch 'feature-login'", delay: 800, type: 'output' },
    { text: '', delay: 1200, type: 'empty' },
    { text: '🔧 Branchify detected branch change...', delay: 1400, type: 'info' },
    { text: '✓ Created database: branchify_feature_login', delay: 2000, type: 'success' },
    { text: '✓ Allocated port: 3002', delay: 2400, type: 'success' },
    { text: '✓ Started services on localhost:3002', delay: 2800, type: 'success' },
    { text: '', delay: 3200, type: 'empty' },
    { text: '🚀 Environment ready!', delay: 3400, type: 'ready' }
  ];

  useEffect(() => {
    if (currentLineIndex < terminalSequence.length) {
      const currentLine = terminalSequence[currentLineIndex];
      const timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(prev => prev + 1);
      }, currentLine.delay);

      return () => clearTimeout(timer);
    } else {
      // Reset after completion
      const resetTimer = setTimeout(() => {
        setTerminalLines([]);
        setCurrentLineIndex(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLineIndex]);

  const getLineColor = (type) => {
    switch(type) {
      case 'command': return 'text-cyan-400';
      case 'output': return 'text-slate-400';
      case 'info': return 'text-blue-400';
      case 'success': return 'text-emerald-400';
      case 'ready': return 'text-cyan-300';
      default: return 'text-slate-500';
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/50 to-slate-950"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium backdrop-blur-sm">
              <Terminal className="w-4 h-4" />
              <span>Developer Environment Orchestration</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Isolated Environments for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Every Git Branch
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
              Branchify automatically provisions branch-specific databases, ports, and runtime environments — so your team can build faster without breaking main.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg group shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-700 hover:border-cyan-500/50 bg-slate-900/50 backdrop-blur-sm text-slate-300 hover:text-cyan-400 px-8 py-6 text-lg group transition-all duration-300"
              >
                <Github className="mr-2 w-5 h-5" />
                View on GitHub
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span>MIT License</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animated Terminal */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex-1 text-center text-slate-500 text-sm font-medium">
                  terminal
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-2 min-h-[320px]">
                {terminalLines.map((line, index) => (
                  <div 
                    key={index} 
                    className={`${getLineColor(line.type)} animate-terminal-line`}
                  >
                    {line.text || '\u00A0'}
                  </div>
                ))}
                <div className="flex items-center text-slate-400">
                  <span className="mr-2">$</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-blink"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
