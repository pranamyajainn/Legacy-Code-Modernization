export type JobStatus = 'IDLE' | 'SCANNING' | 'GRAPHING' | 'PLANNING' | 'TRANSFORMING' | 'VALIDATING' | 'COMPLETE' | 'FAILED';

export interface AgentEvent {
    id: string;
    jobId: string;
    agentName: string;
    message: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'success';
}

export interface JobState {
    id: string;
    status: JobStatus;
    progress: number; // 0-100
    currentStep: string;
    projectId: string;
    startTime: string;
    endTime?: string;
}

export interface GraphNode {
    id: string;
    label: string;
    type: 'class' | 'interface' | 'struct';
    package: string;
}

export interface GraphEdge {
    source: string;
    target: string;
    type: 'usage' | 'inheritance';
}

export interface AnalyzeResult {
    nodes: GraphNode[];
    edges: GraphEdge[];
    metrics: {
        totalFiles: number;
        totalClasses: number;
        dependencies: number;
    };
}

export interface TransformationResult {
    file: string;
    status: 'pending' | 'success' | 'partial' | 'skipped';
    issues: string[];
    originalPath: string;
    targetPath: string;
}
