'use client';

import { useEffect } from 'react';
import { useJobStore } from '../../lib/store/useJobStore';
import { Play, Pause, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEED_GRAPH_NODES, SEED_GRAPH_EDGES } from '../../lib/data/seed';
import GraphViewer from '../../components/GraphViewer';
import MermaidViewer from '../../components/MermaidViewer';
import CodeDiffViewer from '../../components/CodeDiffViewer';

// Placeholder for StageRail
function StageRail() {
    const { stage } = useJobStore();
    const stages = ['INGESTING', 'ANALYZING', 'ARCHITECTING', 'MIGRATING', 'COMPLETE'];

    return (
        <div className="w-16 flex flex-col items-center py-6 gap-6 border-r border-border bg-panel/50">
            {stages.map((s, i) => {
                const isActive = stage === s;
                const isPast = stages.indexOf(stage) > i;

                return (
                    <div key={s} className="relative group">
                        <div className={`w-3 h-3 rounded-full transition-all duration-500 
                            ${isActive ? 'bg-accent scale-150 shadow-[0_0_10px_rgba(79,195,247,0.5)]' :
                                isPast ? 'bg-success' : 'bg-border'}`}
                        />
                        {/* Tooltip */}
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-surface border border-border rounded text-[10px] text-text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                            {s}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Placeholder for ControlBar
function ControlBar() {
    const { stage, setStage, reset } = useJobStore();

    return (
        <div className="h-16 border-t border-border bg-panel flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setStage('INGESTING')}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-blue-400 text-app transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Play size={18} fill="currentColor" />
                </button>
                <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                    <Pause size={18} />
                </button>
                <button
                    onClick={reset}
                    className="p-2 text-text-secondary hover:text-error transition-colors"
                >
                    <Square size={18} fill="currentColor" />
                </button>
            </div>

            <div className="text-xs font-mono text-text-tertiary">
                AUTO-PILOT MODE
            </div>
        </div>
    );
}

export default function LiveRunPage() {
    const { stage, events, reset, setJobId, setStage } = useJobStore();

    // Mount logic
    useEffect(() => {
        reset();
        setJobId('live-demo-run');
    }, []);

    // Demo Auto-Advance Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (stage === 'INGESTING') {
            timer = setTimeout(() => {
                setStage('ANALYZING');
                useJobStore.getState().addEvent({
                    id: 'evt-1',
                    jobId: 'live-demo',
                    agentName: 'ScannerAgent',
                    message: 'Ingestion complete. 842 files parsed.',
                    timestamp: new Date().toISOString(),
                    level: 'success'
                });
            }, 3000);
        } else if (stage === 'ANALYZING') {
            timer = setTimeout(() => {
                setStage('ARCHITECTING');
                useJobStore.getState().addEvent({
                    id: 'evt-2',
                    jobId: 'live-demo',
                    agentName: 'AnalysisEngine',
                    message: 'Dependency graph constructed. Identification of 3 bounded contexts.',
                    timestamp: new Date().toISOString(),
                    level: 'info'
                });
            }, 4000);
        } else if (stage === 'ARCHITECTING') {
            timer = setTimeout(() => {
                setStage('MIGRATING');
                useJobStore.getState().addEvent({
                    id: 'evt-3',
                    jobId: 'live-demo',
                    agentName: 'ArchitectAgent',
                    message: 'Target architecture defined: Modular Monolith (Go).',
                    timestamp: new Date().toISOString(),
                    level: 'success'
                });
            }, 4000);
        } else if (stage === 'MIGRATING') {
            timer = setTimeout(() => {
                setStage('COMPLETE');
                useJobStore.getState().addEvent({
                    id: 'evt-4',
                    jobId: 'live-demo',
                    agentName: 'RefactorAgent',
                    message: 'Migration complete. 100% coverage.',
                    timestamp: new Date().toISOString(),
                    level: 'success'
                });
            }, 4000);
        }

        return () => clearTimeout(timer);
    }, [stage, setStage]);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Main Workspace Grid */}
            <div className="flex-1 flex min-h-0">
                <StageRail />

                {/* Center Canvas */}
                <div className="flex-1 bg-app relative flex flex-col p-6 min-w-0 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
                                {stage === 'IDLE' ? 'Ready to Start' : `System Status: ${stage}`}
                            </h2>
                            <p className="text-sm text-text-secondary font-mono">
                                Job ID: live-demo-run • Target: Hexagonal Architecture
                            </p>
                        </div>
                        {/* KPIs */}
                        <div className="flex gap-6">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Files</span>
                                <span className="text-xl font-mono text-text-primary">842</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Modules</span>
                                <span className="text-xl font-mono text-accent">12</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-widest text-text-tertiary">Coverage</span>
                                <span className="text-xl font-mono text-success">98%</span>
                            </div>
                        </div>
                    </div>

                    {/* Viewport content based on stage - Animated Transitions */}
                    <div className="flex-1 rounded-xl border border-border bg-panel overflow-hidden relative shadow-2xl">
                        <AnimatePresence mode='wait'>
                            {stage === 'INGESTING' && (
                                <motion.div
                                    key="ingest"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-center p-12"
                                >
                                    <div className="text-center space-y-4">
                                        <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-accent animate-spin mx-auto" />
                                        <h3 className="text-lg font-medium text-text-primary">Scanning Codebase...</h3>
                                        <p className="text-sm text-text-secondary font-mono">Parsing AST for 842 files</p>
                                    </div>
                                </motion.div>
                            )}

                            {stage === 'ANALYZING' && (
                                <motion.div
                                    key="analyze"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 p-4"
                                >
                                    <GraphViewer nodes={SEED_GRAPH_NODES} edges={SEED_GRAPH_EDGES} />
                                </motion.div>
                            )}

                            {(stage === 'ARCHITECTING' || stage === 'MIGRATING') && (
                                <motion.div
                                    key="arch"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-slate-950 p-4"
                                >
                                    <MermaidViewer chart={`graph TD
    API[API Layer] --> SVC[Service Layer]
    SVC --> REPO[Repository Layer]
    REPO --> DB[(Database)]
    style API fill:#a855f7,stroke:#333,stroke-width:2px
    style SVC fill:#3b82f6,stroke:#333,stroke-width:2px
    style REPO fill:#10b981,stroke:#333,stroke-width:2px
    style DB fill:#475569,stroke:#333,stroke-width:2px`} />
                                </motion.div>
                            )}

                            {stage === 'COMPLETE' && (
                                <motion.div
                                    key="diff"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0"
                                >
                                    <CodeDiffViewer />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel: Logs & Events */}
                <div className="w-[320px] bg-panel border-l border-border flex flex-col min-h-0">
                    <div className="h-12 border-b border-border flex items-center px-4 bg-surface/50">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">System Console</span>
                    </div>
                    <div className="flex-1 overflow-hidden relative">
                        <div className="absolute inset-0 overflow-y-auto p-4 space-y-2">
                            {events.length === 0 && <div className="text-xs font-mono text-text-tertiary">Ready to initiate sequence...</div>}
                            {events.map((e) => (
                                <div key={e.id} className="font-mono text-[11px] border-b border-border/50 pb-1 mb-1 last:border-0">
                                    <span className="text-text-tertiary mr-2">[{e.timestamp.split('T')[1].split('.')[0]}]</span>
                                    <span className={
                                        e.level === 'error' ? 'text-error' :
                                            e.level === 'success' ? 'text-success' :
                                                'text-accent'
                                    }>{e.agentName}</span>
                                    <span className="text-text-secondary ml-2">{e.message}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <ControlBar />
        </div>
    );
}
