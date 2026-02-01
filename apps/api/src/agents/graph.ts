import { Orchestrator } from '../core/orchestrator';
import { GraphNode, GraphEdge } from 'shared';

export class GraphAgent {
    constructor(private orchestrator: Orchestrator) { }

    buildGraph(scanResults: any[]): { nodes: GraphNode[], edges: GraphEdge[] } {
        const nodes: GraphNode[] = [];
        const edges: GraphEdge[] = [];

        const classMap = new Map<string, string>(); // class -> package

        // Create Nodes
        for (const file of scanResults) {
            if (!file.className) continue;
            const fullClassName = `${file.packageName}.${file.className}`;
            classMap.set(file.className, fullClassName);

            nodes.push({
                id: fullClassName,
                label: file.className,
                type: 'class',
                package: file.packageName
            });
        }

        // Create Edges (heuristic: import usage)
        for (const file of scanResults) {
            const sourceClass = `${file.packageName}.${file.className}`;

            for (const imp of file.imports) {
                // Find if this import maps to one of our internal classes
                const targetClass = nodes.find(n => n.id === imp);
                if (targetClass) {
                    edges.push({
                        source: sourceClass,
                        target: targetClass.id,
                        type: 'usage'
                    });
                }
            }
        }

        return { nodes, edges };
    }
}
