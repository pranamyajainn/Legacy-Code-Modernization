'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function MermaidViewer({ chart }: { chart: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !containerRef.current) return;

        // Reset content to plain code before rendering
        containerRef.current.removeAttribute('data-processed');
        containerRef.current.innerHTML = chart;

        const init = async () => {
            try {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'dark',
                    securityLevel: 'loose',
                    fontFamily: 'JetBrains Mono, monospace',
                    themeVariables: {
                        primaryColor: '#3b82f6',
                        primaryTextColor: '#cbd5e1',
                        primaryBorderColor: '#1e293b',
                        lineColor: '#64748b',
                        secondaryColor: '#1e293b',
                        tertiaryColor: '#0f172a',
                    }
                });

                await mermaid.run({
                    nodes: [containerRef.current!]
                });
            } catch (err) {
                console.error("Mermaid Render Error:", err);
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            init();
        }, 100);

        return () => clearTimeout(timer);
    }, [chart, isMounted]);

    if (!isMounted) return null;

    return (
        <div className="w-full h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex flex-col">
            <div className="h-8 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Architecture Diagram</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-4 bg-slate-900 overflow-auto">
                <div className="mermaid" ref={containerRef}>
                    {chart}
                </div>
            </div>
        </div>
    );
}
