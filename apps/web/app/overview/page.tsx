'use client';

import MetricCard from '../../components/MetricCard';
import { Activity, Clock, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function OverviewPage() {
    return (
        <div className="flex flex-col h-full bg-app overflow-y-auto">
            <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
                {/* Header Banner */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">System Overview</h1>
                        <p className="text-text-secondary mt-1">Platform Status: <span className="text-success">Operational</span></p>
                    </div>
                    <Link href="/run" className="px-6 py-3 bg-accent hover:bg-blue-400 text-app font-bold rounded shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                        <Zap size={18} />
                        Initiate New Run
                    </Link>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                    <MetricCard label="Total Projects" value="4" trend="up" />
                    <MetricCard label="Lines of Code" value="2.1M" trend="neutral" color="success" />
                    <MetricCard label="Avg. Risk Score" value="A-" trend="up" color="success" />
                    <MetricCard label="Active Jobs" value="1" color="warning" />
                </div>

                {/* Recent Activity Panel */}
                <div className="bg-panel border border-border rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <h3 className="font-semibold text-text-primary flex items-center gap-2">
                            <Activity size={16} className="text-accent" />
                            Recent Activity
                        </h3>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-surface/50 text-text-tertiary font-mono uppercase text-[10px]">
                            <tr>
                                <th className="px-6 py-3">Job ID</th>
                                <th className="px-6 py-3">Target</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Duration</th>
                                <th className="px-6 py-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            <tr className="hover:bg-surface/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-text-secondary">#live-demo</td>
                                <td className="px-6 py-4 text-text-primary">com.acme.order</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">Running</span></td>
                                <td className="px-6 py-4 text-text-tertiary">--</td>
                                <td className="px-6 py-4 text-text-tertiary">Just now</td>
                            </tr>
                            <tr className="hover:bg-surface/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-text-secondary">#mig-9421</td>
                                <td className="px-6 py-4 text-text-primary">com.legacy.billing</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">Complete</span></td>
                                <td className="px-6 py-4 text-text-tertiary">4m 12s</td>
                                <td className="px-6 py-4 text-text-tertiary">2 hours ago</td>
                            </tr>
                            <tr className="hover:bg-surface/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-text-secondary">#scan-8812</td>
                                <td className="px-6 py-4 text-text-primary">com.legacy.inventory</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">Failed</span></td>
                                <td className="px-6 py-4 text-text-tertiary">12s</td>
                                <td className="px-6 py-4 text-text-tertiary">Yesterday</td>
                            </tr>
                            <tr className="hover:bg-surface/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-text-secondary">#arch-1029</td>
                                <td className="px-6 py-4 text-text-primary">com.acme.auth</td>
                                <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">Complete</span></td>
                                <td className="px-6 py-4 text-text-tertiary">1m 45s</td>
                                <td className="px-6 py-4 text-text-tertiary">2 days ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* System Health */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-panel border border-border rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded">
                                <ShieldCheck size={20} className="text-success" />
                            </div>
                            <h3 className="font-semibold text-text-primary">Environment Health</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">API Gateway</span>
                                <span className="text-success font-mono">ONLINE (34ms)</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Analysis Engine</span>
                                <span className="text-success font-mono">ONLINE (120ms)</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-text-secondary">Vector DB</span>
                                <span className="text-success font-mono">ONLINE (12ms)</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-panel border border-border rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded">
                                <Clock size={20} className="text-accent" />
                            </div>
                            <h3 className="font-semibold text-text-primary">System Resources</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-text-secondary">CPU Usage</span>
                                    <span className="text-text-primary">12%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                    <div className="h-full bg-accent w-[12%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-text-secondary">Memory</span>
                                    <span className="text-text-primary">3.4GB / 16GB</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[24%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
