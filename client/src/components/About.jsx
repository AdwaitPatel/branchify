import React from 'react';
import { GitBranch, Database, Cpu, Shield } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: GitBranch,
      title: 'Git Integration',
      description: 'Seamless Git hook integration'
    },
    {
      icon: Database,
      title: 'Database Provisioning',
      description: 'Automatic DB creation per branch'
    },
    {
      icon: Cpu,
      title: 'Process Management',
      description: 'Intelligent runtime orchestration'
    },
    {
      icon: Shield,
      title: 'Environment Isolation',
      description: 'Complete separation by branch'
    }
  ];

  return (
    <section className="relative py-32 px-6 observe-fade opacity-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Branchify?
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Branchify is a local development orchestration tool that automatically detects branch changes using Git hooks and provisions isolated environments with separate databases and ports. No more configuration conflicts. No more shared state issues. Just pure development flow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-slate-100">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
