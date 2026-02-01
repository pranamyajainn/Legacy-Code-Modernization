'use client';

import { GraphNode, GraphEdge } from 'shared';
import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { SEED_GRAPH_NODES, SEED_GRAPH_EDGES } from '../lib/data/seed';

export default function GraphViewer({ nodes, edges }: { nodes: GraphNode[], edges: GraphEdge[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cyRef = useRef<cytoscape.Core | null>(null);

    // Use seed data if empty (for demo polish)
    const activeNodes = nodes.length > 0 ? nodes : SEED_GRAPH_NODES;
    const activeEdges = edges.length > 0 ? edges : SEED_GRAPH_EDGES;

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = [
            ...activeNodes.map(n => ({
                data: {
                    id: n.id,
                    label: n.label,
                    type: n.type,
                    package: n.package
                },
                classes: n.package.includes('api') ? 'api' :
                    n.package.includes('service') ? 'service' :
                        n.package.includes('domain') ? 'domain' : 'repo'
            })),
            ...activeEdges.map((e, i) => ({
                data: {
                    id: `e${i}`,
                    source: e.source,
                    target: e.target
                }
            }))
        ];

        cyRef.current = cytoscape({
            container: containerRef.current,
            elements,
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#1E293B', // Slate-800
                        'label': 'data(label)',
                        'color': '#94A3B8', // Slate-400
                        'font-size': '10px',
                        'font-family': 'JetBrains Mono, monospace',
                        'text-valign': 'bottom',
                        'text-margin-y': 6,
                        'width': 24,
                        'height': 24,
                        'border-width': 1,
                        'border-color': '#334155'
                    }
                },
                {
                    selector: 'node:selected',
                    style: {
                        'border-width': 2,
                        'border-color': '#fff',
                        'color': '#fff'
                    }
                },
                {
                    selector: '.api',
                    style: { 'background-color': '#8B5CF6', 'line-color': '#8B5CF6' } // Violet
                },
                {
                    selector: '.service',
                    style: { 'background-color': '#3B82F6', 'line-color': '#3B82F6' } // Blue
                },
                {
                    selector: '.domain',
                    style: { 'background-color': '#EC4899', 'line-color': '#EC4899' } // Pink
                },
                {
                    selector: '.repo',
                    style: { 'background-color': '#10B981', 'line-color': '#10B981' } // Emerald
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#334155',
                        'target-arrow-color': '#334155',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'opacity': 0.5
                    }
                }
            ],
            layout: {
                name: 'breadthfirst',
                directed: true,
                padding: 40,
                spacingFactor: 1.2,
                avoidOverlap: true,
                animate: true,
                animationDuration: 500
            },
            zoomingEnabled: true,
            userZoomingEnabled: true,
            panningEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false,
            autoungrabify: true
        });

        // Fit on load
        cyRef.current.fit();

        return () => {
            cyRef.current?.destroy();
        };
    }, [activeNodes, activeEdges]);

    return (
        <div className="relative w-full h-full bg-slate-950 rounded-lg overflow-hidden border border-border/50 group">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-surface/90 border border-border rounded text-[10px] font-mono text-text-secondary pointer-events-none">
                GRAPH: {activeNodes.length} Nodes / {activeEdges.length} Edges
            </div>

            <div ref={containerRef} className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 p-3 bg-surface/90 backdrop-blur border border-border rounded shadow-xl">
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-violet-500" /> API / Controller
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Service
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-pink-500" /> Domain Model
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-secondary">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> Repository
                </div>
            </div>
        </div>
    );
}
