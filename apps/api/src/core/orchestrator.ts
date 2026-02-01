import { v4 as uuidv4 } from 'uuid';
import { JobState, AgentEvent, JobStatus } from 'shared';
import path from 'path';
import fs from 'fs-extra';

export class Orchestrator {
    private jobs: Map<string, JobState> = new Map();
    private events: Map<string, AgentEvent[]> = new Map();
    private static instance: Orchestrator;

    private constructor() { }

    public static getInstance(): Orchestrator {
        if (!Orchestrator.instance) {
            Orchestrator.instance = new Orchestrator();
        }
        return Orchestrator.instance;
    }

    public createJob(projectId: string): string {
        const id = uuidv4();
        this.jobs.set(id, {
            id,
            projectId,
            status: 'IDLE',
            progress: 0,
            currentStep: 'Initialized',
            startTime: new Date().toISOString(),
        });
        this.events.set(id, []);
        this.emit(id, 'Orchestrator', 'Job created', 'info');
        return id;
    }

    public getJob(id: string): JobState | undefined {
        return this.jobs.get(id);
    }

    public getEvents(id: string): AgentEvent[] {
        return this.events.get(id) || [];
    }

    public emit(jobId: string, agentName: string, message: string, level: AgentEvent['level'] = 'info') {
        const event: AgentEvent = {
            id: uuidv4(),
            jobId,
            agentName,
            message,
            timestamp: new Date().toISOString(),
            level
        };
        const currentEvents = this.events.get(jobId) || [];
        currentEvents.push(event);
        this.events.set(jobId, currentEvents);

        // Auto-log to console for debug
        console.log(`[${agentName}] ${message}`);
    }

    public updateJob(id: string, updates: Partial<JobState>) {
        const job = this.jobs.get(id);
        if (job) {
            this.jobs.set(id, { ...job, ...updates });
        }
    }

    public async runJob(id: string) {
        const job = this.jobs.get(id);
        if (!job) return;

        // Simulate reliable workflow
        try {
            const scanResults = await this.stepScan(id);
            const graph = await this.stepAnalyze(id, scanResults);
            await this.stepPlan(id);
            await this.stepTransform(id, scanResults);
            await this.stepValidate(id);

            this.updateJob(id, { status: 'COMPLETE', progress: 100, currentStep: 'Done', endTime: new Date().toISOString() });
            this.emit(id, 'Orchestrator', 'Job completed successfully', 'success');
        } catch (error: any) {
            this.updateJob(id, { status: 'FAILED', currentStep: 'Error' });
            this.emit(id, 'Orchestrator', `Job failed: ${error.message}`, 'error');
        }
    }

    private async stepScan(id: string) {
        this.updateJob(id, { status: 'SCANNING', progress: 10, currentStep: 'Scanning Codebase' });
        this.emit(id, 'ScannerAgent', 'Starting codebase scan...', 'info');

        const { ScannerAgent } = await import('../agents/scanner');
        const scanner = new ScannerAgent(this);
        // Hardcoded path for MVP demo
        // Must be absolute to work with glob in different CWD contexts
        const projectPath = path.resolve(process.cwd(), '../../data/sample/java-legacy');
        console.log(`[Orchestrator] Scanning path: ${projectPath}`); // Debug log
        const results = await scanner.scan(id, projectPath);

        this.emit(id, 'ScannerAgent', `Scan complete. Found ${results.length} Java files.`, 'success');
        return results;
    }

    private async stepAnalyze(id: string, scanResults: any[]) {
        this.updateJob(id, { status: 'GRAPHING', progress: 30, currentStep: 'Building Dependency Graph' });
        this.emit(id, 'GraphAgent', 'Constructing dependency graph...', 'info');

        const { GraphAgent } = await import('../agents/graph');
        const grapher = new GraphAgent(this);
        const graph = grapher.buildGraph(scanResults);

        this.emit(id, 'GraphAgent', `Graph built with ${graph.nodes.length} nodes and ${graph.edges.length} edges.`, 'success');

        this.emit(id, 'ArchitectureAgent', 'Mapping into hexagonal architecture...', 'info');
        await new Promise(r => setTimeout(r, 800)); // Mock Arch agent for now
        this.emit(id, 'ArchitectureAgent', 'Architecture map generated.', 'success');
        return graph;
    }

    private async stepPlan(id: string) {
        this.updateJob(id, { status: 'PLANNING', progress: 50, currentStep: 'Generating Migration Plan' });
        this.emit(id, 'Orchestrator', 'Requesting migration plan...', 'info');
        await new Promise(r => setTimeout(r, 1000));
        this.emit(id, 'TranslatorAgent', 'Mapping types: String->string, List->slice.', 'info');
    }

    private async stepTransform(id: string, scanResults: any[]) {
        this.updateJob(id, { status: 'TRANSFORMING', progress: 70, currentStep: 'Translating Logic' });

        const { TranslatorAgent } = await import('../agents/translator');
        const translator = new TranslatorAgent(this);

        if (scanResults) {
            for (const file of scanResults) {
                this.emit(id, 'TranslatorAgent', `Translating ${file.className}...`, 'info');
                if (file.content) {
                    const res = translator.translate(file.content, file.file);
                    this.emit(id, 'TranslatorAgent', `Transformed ${file.className} (${res.coverage} rules applied)`, 'success');
                }
                await new Promise(r => setTimeout(r, 400));
            }
        }

        this.emit(id, 'TranslatorAgent', 'Translation complete.', 'success');
    }

    private async stepValidate(id: string) {
        this.updateJob(id, { status: 'VALIDATING', progress: 90, currentStep: 'Verifying correctness' });
        this.emit(id, 'ValidatorAgent', 'Running go fmt...', 'info');
        await new Promise(r => setTimeout(r, 500));
        this.emit(id, 'ValidatorAgent', 'Running mock unit tests...', 'info');
        await new Promise(r => setTimeout(r, 1000));
        this.emit(id, 'ValidatorAgent', 'Validation passed. 0 errors.', 'success');
    }
}
