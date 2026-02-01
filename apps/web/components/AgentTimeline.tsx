'use client';

import { useEffect, useRef } from 'react';
import { AgentEvent } from 'shared';
import { Terminal, Cpu, Network, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function AgentTimeline({ events }: { events: AgentEvent[] }) {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [events]);

    const getIcon = (agent: string) => {
        if (agent.includes('Scanner')) return Terminal;
        if (agent.includes('Graph')) return Network;
        if (agent.includes('Architecture')) return LayersIcon;
        if (agent.includes('Translator')) return Cpu;
        return Terminal;
    };

    const LayersIcon = Network; // Fallback

    return (
        <div className="w-full h-full flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between">
                <span className="text-xs font-mono text-slate-400">AGENT_ORCHESTRATOR_LOGS</span>
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm max-h-[400px]">
                {events.length === 0 && (
                    <div className="text-slate-600 italic">Waiting for job to start...</div>
                )}
                {events.map((event) => {
                    const Icon = getIcon(event.agentName);
                    const color = event.level === 'error' ? 'text-red-400' : event.level === 'success' ? 'text-green-400' : 'text-blue-400';

                    return (
                        <div key={event.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="mt-0.5 min-w-[20px] text-right text-xs text-slate-600 select-none">
                                {new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </div>
                            <div className={`mt-0.5 ${color}`}>
                                {event.level === 'success' ? <CheckCircle size={14} /> :
                                    event.level === 'error' ? <AlertCircle size={14} /> :
                                        <Icon size={14} />}
                            </div>
                            <div className="flex-1">
                                <span className="font-bold text-slate-300 mr-2">[{event.agentName}]</span>
                                <span className="text-slate-400">{event.message}</span>
                            </div>
                        </div>
                    );
                })}
                {events.length > 0 && events[events.length - 1].level !== 'success' && events[events.length - 1].level !== 'error' && (
                    <div className="flex gap-3 py-1 opacity-50">
                        <div className="w-[60px]" />
                        <Loader2 size={14} className="animate-spin text-blue-500" />
                        <span className="text-slate-500">Processing...</span>
                    </div>
                )}
                <div ref={endRef} />
            </div>
        </div>
    );
}
