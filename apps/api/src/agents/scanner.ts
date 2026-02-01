import fs from 'fs-extra';
import { glob } from 'glob';
import path from 'path';
import { Orchestrator } from '../core/orchestrator';

export class ScannerAgent {
    constructor(private orchestrator: Orchestrator) { }

    async scan(projectId: string, workingDir: string) {
        // For MVP, we assume workingDir is local
        const files = glob.sync('**/*.java', { cwd: workingDir });

        const nodes = [];

        for (const file of files) {
            const content = await fs.readFile(path.join(workingDir, file), 'utf-8');
            const analysis = this.analyzeFile(content);
            nodes.push({ file, content, ...analysis });
        }

        return nodes;
    }

    private analyzeFile(content: string) {
        const packageName = content.match(/package\s+([\w.]+);/)?.[1] || '';
        const imports = [...content.matchAll(/import\s+([\w.]+);/g)].map(m => m[1]);
        const className = content.match(/public\s+class\s+(\w+)/)?.[1] || '';
        const methods = [...content.matchAll(/public\s+[\w<>]+\s+(\w+)\(/g)].map(m => m[1]);

        return { packageName, imports, className, methods };
    }
}
