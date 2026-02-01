import { create } from 'zustand';
import { JobState, AgentEvent, GraphNode, GraphEdge } from 'shared';

// Enterprise Data Contracts
export type SystemStage = 'IDLE' | 'INGESTING' | 'ANALYZING' | 'ARCHITECTING' | 'MIGRATING' | 'COMPLETE' | 'FAILED';

export interface UIState {
    // Job Context
    projectId: string;
    jobId: string | null;
    stage: SystemStage;
    startTime: number | null;

    // Data Models
    events: AgentEvent[];
    graph: { nodes: GraphNode[]; edges: GraphEdge[] } | null;
    metrics: {
        filesProcessed: number;
        modulesDetected: number;
        coverage: number;
    };

    // UI Controls
    mode: 'GUIDED' | 'INTERACTIVE';
    activeDetailPanel: 'SUMMARY' | 'LOGS' | 'METRICS';

    // Actions
    setJobId: (id: string) => void;
    setStage: (stage: SystemStage) => void;
    addEvent: (event: AgentEvent) => void;
    setEvents: (events: AgentEvent[]) => void;
    updateGraph: (data: { nodes: GraphNode[]; edges: GraphEdge[] }) => void;
    reset: () => void;
}

export const useJobStore = create<UIState>((set) => ({
    projectId: 'demo-enterprise-01',
    jobId: null,
    stage: 'IDLE',
    startTime: null,

    events: [],
    graph: null,
    metrics: {
        filesProcessed: 0,
        modulesDetected: 0,
        coverage: 0
    },

    mode: 'GUIDED',
    activeDetailPanel: 'SUMMARY',

    setJobId: (id) => set({ jobId: id, startTime: Date.now() }),
    setStage: (stage) => set({ stage }),
    addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
    setEvents: (events) => set({ events }),
    updateGraph: (data) => set({ graph: data }),

    reset: () => set({
        stage: 'IDLE',
        jobId: null,
        events: [],
        graph: null,
        metrics: { filesProcessed: 0, modulesDetected: 0, coverage: 0 }
    })
}));
