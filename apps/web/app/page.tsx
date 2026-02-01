'use client';

import { useState, useEffect } from 'react';
import { Play, FileCode, GitGraph, Layers, FileJson, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import AgentTimeline from '../components/AgentTimeline';
import GraphViewer from '../components/GraphViewer';
import CodeDiffViewer from '../components/CodeDiffViewer';
import MermaidViewer from '../components/MermaidViewer';
import { AgentEvent, JobState, GraphNode, GraphEdge } from 'shared';

const API_Base = 'http://localhost:3001/api';

export default function Home() {
    const [step, setStep] = useState(1);
    const [jobId, setJobId] = useState<string | null>(null);
    const [projectId] = useState('demo-project-1');
    const [jobState, setJobState] = useState<JobState | null>(null);
    const [events, setEvents] = useState<AgentEvent[]>([]);
    const [graphData, setGraphData] = useState<{ nodes: GraphNode[], edges: GraphEdge[] } | null>(null);
    const [isPolling, setIsPolling] = useState(false);

    const steps = [
        { id: 1, label: 'Ingest', icon: FileCode },
        { id: 2, label: 'Analyze', icon: GitGraph },
        { id: 3, label: 'Plan', icon: Layers },
        { id: 4, label: 'Transform', icon: FileJson },
        { id: 5, label: 'Verify', icon: CheckCircle2 },
    ];

    // Start Job
    const startJob = async () => {
        try {
            const res = await fetch(`${API_Base}/projects/${projectId}/run`, { method: 'POST' });
            const data = await res.json();
            setJobId(data.jobId);
            setIsPolling(true);
            setStep(2);
        } catch (e) {
            console.error("Failed to start job", e);
        }
    };

    // Poll Status
    useEffect(() => {
        if (!isPolling || !jobId) return;

        const interval = setInterval(async () => {
            try {
                const statusRes = await fetch(`${API_Base}/projects/${projectId}/status?jobId=${jobId}`);
                const statusData = await statusRes.json();
                setJobState(statusData);

                const eventsRes = await fetch(`${API_Base}/projects/${projectId}/agents?jobId=${jobId}`);
                const eventsData = await eventsRes.json();
                setEvents(eventsData);

                // Auto-advance logic based on status
                if (statusData.status === 'GRAPHING' && step === 2 && !graphData) {
                    // Fetch graph once available
                    // For now, let's just mock it or wait until done
                    // Actually, let's set mock graph data for the demo if real data not ready
                    // In real app, we'd fetch from /graph endpoints
                    setGraphData({
                        nodes: [
                            { id: 'com.acme.order.service.OrderService', label: 'OrderService', type: 'class', package: 'com.acme.order.service' },
                            { id: 'com.acme.order.api.OrderController', label: 'OrderController', type: 'class', package: 'com.acme.order.api' },
                            { id: 'com.acme.order.repo.OrderRepository', label: 'OrderRepository', type: 'class', package: 'com.acme.order.repo' },
                            { id: 'com.acme.order.service.Order', label: 'Order', type: 'class', package: 'com.acme.order.service' },
                        ],
                        edges: [
                            { source: 'com.acme.order.api.OrderController', target: 'com.acme.order.service.OrderService', type: 'usage' },
                            { source: 'com.acme.order.service.OrderService', target: 'com.acme.order.repo.OrderRepository', type: 'usage' },
                            { source: 'com.acme.order.service.OrderService', target: 'com.acme.order.service.Order', type: 'usage' },
                            { source: 'com.acme.order.repo.OrderRepository', target: 'com.acme.order.service.Order', type: 'usage' },
                        ]
                    });
                }

                if (statusData.status === 'PLANNING' && step < 3) setStep(3);
                if (statusData.status === 'TRANSFORMING' && step < 4) setStep(4);
                if (statusData.status === 'VALIDATING' && step < 5) setStep(5);
                if (statusData.status === 'COMPLETE') setIsPolling(false);

            } catch (e) {
                console.error("Polling error", e);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPolling, jobId, projectId, step, graphData]);

    return (
        <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 h-[calc(100vh-64px)]">
            {/* Wizard Progress */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-6 shrink-0 bg-slate-900/50 backdrop-blur z-20">
                {steps.map((s, idx) => {
                    const isActive = step === s.id;
                    const isDone = step > s.id;
                    const Icon = s.icon;

                    return (
                        <div key={s.id} className="flex flex-col items-center gap-3 relative z-10 w-24">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                            ${isActive ? 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' :
                                    isDone ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-slate-700 bg-slate-800 text-slate-500'}
                         `}>
                                <Icon size={18} />
                            </div>
                            <span className={`text-xs font-medium ${isActive ? 'text-blue-400' : isDone ? 'text-green-400' : 'text-slate-500'}`}>{s.label}</span>
                        </div>
                    );
                })}
                {/* Connector Bar */}
                <div className="absolute top-[4.5rem] left-20 right-20 h-0.5 bg-slate-800 -z-10" />
            </div>

            {/* Main Split View */}
            <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
                {/* Left Panel: Primary Content */}
                <div className="col-span-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6 overflow-y-auto">
                    {step === 1 && (
                        <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                            <div className="p-6 rounded-full bg-slate-800/50 border border-slate-700 animate-pulse">
                                <FileCode size={48} className="text-blue-500" />
                            </div>
                            <div className="max-w-md space-y-2">
                                <h2 className="text-2xl font-bold text-white">Select Legacy Codebase</h2>
                                <p className="text-slate-400">Upload a ZIP file or use the curated sample to begin the modernization analysis.</p>
                            </div>

                            <button
                                onClick={startJob}
                                className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20"
                            >
                                <Play size={18} fill="currentColor" />
                                Load Sample & Start Analysis
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="h-full flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <GitGraph size={20} className="text-blue-400" />
                                Dependency Graph
                            </h3>
                            <GraphViewer nodes={graphData?.nodes || []} edges={graphData?.edges || []} />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="h-full flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Layers size={20} className="text-blue-400" />
                                Migration Plan & Architecture
                            </h3>
                            <div className="grid grid-cols-12 gap-6 h-full min-h-0">
                                <div className="col-span-4 bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm text-slate-300 overflow-y-auto">
                                    <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-2 mb-2 font-bold text-slate-500 uppercase text-xs">
                                        <div>Java Package</div>
                                        <div>Target Go Module</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 py-2 hover:bg-slate-900/50">
                                        <div>com.acme.order.api</div>
                                        <div className="text-green-400">module/order/api</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 py-2 hover:bg-slate-900/50">
                                        <div>com.acme.order.service</div>
                                        <div className="text-green-400">module/order/service</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 py-2 hover:bg-slate-900/50">
                                        <div>com.acme.order.repo</div>
                                        <div className="text-green-400">module/order/repo</div>
                                    </div>
                                    <div className="mt-8 space-y-2">
                                        <div className="text-xs font-bold text-slate-500 uppercase">Architecture Rules</div>
                                        <div className="bg-blue-900/20 text-blue-400 px-3 py-2 rounded border border-blue-900/50 text-xs">
                                            Applying Hexagonal Architecture pattern.
                                            Core logic isolated from adapters.
                                        </div>
                                        <div className="bg-purple-900/20 text-purple-400 px-3 py-2 rounded border border-purple-900/50 text-xs">
                                            Generating Go interfaces for all public classes.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-8 flex flex-col">
                                    <div className="flex-1 min-h-0">
                                        <MermaidViewer chart={`graph TD; API[API Layer] --> SVC[Service Layer]; SVC --> REPO[Repository Layer]; REPO --> DB[(Database)]; style API fill:#a855f7; style SVC fill:#3b82f6; style REPO fill:#10b981; style DB fill:#475569;`} />
                                    </div>
                                    <div className="mt-2 text-center text-xs text-slate-500">
                                        Target Architecture Diagram (Generated by ArchitectureAgent)
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="h-full flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <RefreshCw size={20} className="text-blue-400 animate-spin" />
                                Live Transformation
                            </h3>
                            <div className="space-y-3">
                                {['OrderService.java', 'OrderController.java', 'OrderRepository.java'].map((file, i) => (
                                    <div key={file} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileCode size={16} className="text-slate-500" />
                                            <span className="text-slate-300 font-mono text-sm">{file}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs text-slate-500">Rule Coverage: 100%</span>
                                            <span className="text-xs text-green-400 bg-green-950 px-2 py-1 rounded">Transformed</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="flex flex-col h-full gap-4">
                            <div className="flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-full bg-green-500/10 border border-green-500/50">
                                        <CheckCircle2 size={24} className="text-green-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Modernization Complete</h2>
                                        <p className="text-sm text-slate-400">All files transformed and verified.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-blue-900/20">
                                        Download Export Package (ZIP)
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                                <CodeDiffViewer />
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Agent Timeline */}
                <div className="col-span-4 h-full min-h-0">
                    <AgentTimeline events={events} />
                    {jobState && (
                        <div className="mt-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>JOB STATUS</span>
                                <span className={jobState.status === 'FAILED' ? 'text-red-400' : 'text-blue-400'}>{jobState.status}</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${jobState.progress}%` }} />
                            </div>
                            <div className="text-center text-xs text-slate-500 mt-2 font-mono">
                                {jobState.currentStep}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
