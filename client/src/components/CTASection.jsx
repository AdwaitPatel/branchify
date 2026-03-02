import React from 'react';
import { Button } from './ui/button';
import { Terminal, ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative py-32 px-6 observe-fade opacity-0">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          
          {/* Content Container */}
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm">
                <Terminal className="w-4 h-4" />
                <span>Ready to Transform Your Workflow?</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-100">
                Stop Breaking Main.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Start Shipping Faster.
                </span>
              </h2>

              <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join developers who have eliminated environment conflicts and accelerated their development workflow with Branchify.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-10 py-7 text-lg group shadow-xl shadow-cyan-500/30 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
                >
                  Install Branchify
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Installation Code */}
              <div className="max-w-xl mx-auto">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 font-mono text-left">
                  <div className="flex items-center gap-2 mb-3 text-slate-500 text-xs">
                    <Terminal className="w-3 h-3" />
                    <span>Installation</span>
                  </div>
                  <code className="text-cyan-400 text-sm lg:text-base">
                    npm install -g branchify
                  </code>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Free & Open Source</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span>No Configuration Required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
