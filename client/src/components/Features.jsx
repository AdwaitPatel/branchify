import React from 'react';
import { GitBranch, Database, Network, Zap, LayoutDashboard, FileText } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: GitBranch,
      title: 'Branch-Aware Provisioning',
      description: 'Automatically detects Git branch changes and provisions environments on the fly without manual configuration.'
    },
    {
      icon: Database,
      title: 'Automatic Database Creation',
      description: 'Creates isolated databases for each branch with proper naming conventions and connection management.'
    },
    {
      icon: Network,
      title: 'Dynamic Port Allocation',
      description: 'Intelligently assigns unique ports to each environment to prevent conflicts and enable parallel development.'
    },
    {
      icon: Zap,
      title: 'Git Hook Automation',
      description: 'Seamlessly integrates with Git hooks to trigger environment changes during branch switches automatically.'
    },
    {
      icon: LayoutDashboard,
      title: 'Real-Time Environment Dashboard',
      description: 'Monitor all active environments, their status, ports, and databases from a unified control panel.'
    },
    {
      icon: FileText,
      title: 'Process & Log Management',
      description: 'Track running processes, view logs in real-time, and manage the lifecycle of each environment.'
    }
  ];

  return (
    <section className="relative py-32 px-6 observe-fade opacity-0">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Powerful Features for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Modern Development
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need to manage isolated development environments with zero configuration overhead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-transparent group-hover:to-blue-500/5 rounded-2xl transition-all duration-500"></div>
                
                <div className="relative">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-slate-100 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
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

export default Features;
