import React from 'react';
import { Circle, Activity, Database, ExternalLink, Power } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const DashboardPreview = () => {
  const environments = [
    {
      branch: 'main',
      status: 'running',
      port: 3000,
      database: 'branchify_main',
      uptime: '2h 34m'
    },
    {
      branch: 'feature-login',
      status: 'running',
      port: 3002,
      database: 'branchify_feature_login',
      uptime: '45m'
    },
    {
      branch: 'feature-dashboard',
      status: 'running',
      port: 3003,
      database: 'branchify_feature_dashboard',
      uptime: '12m'
    },
    {
      branch: 'hotfix-api',
      status: 'stopped',
      port: 3004,
      database: 'branchify_hotfix_api',
      uptime: '-'
    }
  ];

  return (
    <section className="relative py-32 px-6 observe-fade opacity-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Unified{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Environment Dashboard
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Monitor and manage all your branch environments from a single, intuitive interface
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
          
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-slate-800/50 border-b border-slate-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-1">Active Environments</h3>
                  <p className="text-slate-400 text-sm">Manage your branch-specific environments</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300">
                      {environments.filter(e => e.status === 'running').length} Running
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8">
              <div className="space-y-4">
                {environments.map((env, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left Section */}
                      <div className="flex items-center gap-6 flex-1">
                        {/* Status Indicator */}
                        <div className="flex items-center gap-3">
                          {env.status === 'running' ? (
                            <div className="relative">
                              <Circle className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                            </div>
                          ) : (
                            <Circle className="w-3 h-3 text-slate-600 fill-slate-600" />
                          )}
                          <Badge 
                            variant={env.status === 'running' ? 'default' : 'secondary'}
                            className={env.status === 'running' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-slate-700 text-slate-400 border-slate-600'}
                          >
                            {env.status}
                          </Badge>
                        </div>

                        {/* Branch Info */}
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-100 mb-1">
                            {env.branch}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                              <Database className="w-4 h-4" />
                              <span className="font-mono">{env.database}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              <span className="font-mono">localhost:{env.port}</span>
                            </div>
                            {env.uptime !== '-' && (
                              <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                <span>Uptime: {env.uptime}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-700 hover:border-cyan-500/50 bg-slate-900/50 text-slate-300 hover:text-cyan-400 transition-colors duration-300"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`border-slate-700 transition-colors duration-300 ${
                            env.status === 'running'
                              ? 'hover:border-red-500/50 hover:text-red-400'
                              : 'hover:border-emerald-500/50 hover:text-emerald-400'
                          }`}
                        >
                          <Power className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without Branchify */}
            <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-2xl">✕</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-100">Without Branchify</h3>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Shared database across all branches</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Manual port configuration conflicts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Risk of breaking main branch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Time wasted on environment setup</span>
                </li>
              </ul>
            </div>

            {/* With Branchify */}
            <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <span className="text-emerald-400 text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-100">With Branchify</h3>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Isolated database per branch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Automatic port allocation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Complete environment isolation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Zero configuration overhead</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
