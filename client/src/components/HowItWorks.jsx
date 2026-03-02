import React from 'react';
import { GitBranch, Settings, Rocket } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: GitBranch,
      number: '01',
      title: 'Create a Git Branch',
      description: 'Simply checkout or create a new branch using standard Git commands.',
      code: 'git checkout -b feature-auth'
    },
    {
      icon: Settings,
      number: '02',
      title: 'Branchify Provisions Environment',
      description: 'Automatic detection triggers database creation, port allocation, and service setup.',
      code: 'Environment provisioned on :3003'
    },
    {
      icon: Rocket,
      number: '03',
      title: 'Develop in Isolation',
      description: 'Work freely without affecting other branches or the main development line.',
      code: 'npm run dev'
    }
  ];

  return (
    <section className="relative py-32 px-6 observe-fade opacity-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Works
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Three simple steps to isolated development environments
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2"></div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 group">
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-cyan-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold mb-4 text-center text-slate-100">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-400 text-center mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Code Preview */}
                    <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 font-mono text-sm text-cyan-400">
                      <code>{step.code}</code>
                    </div>
                  </div>

                  {/* Arrow Connector (Mobile) */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-8">
                      <div className="w-0.5 h-12 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
