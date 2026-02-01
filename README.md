# Legacy Code Modernization System (MVP)

An enterprise-grade, agentic AI-driven system for modernizing legacy Java codebases to Go. This MVP demonstrates a deterministic, rule-based approach to automated migration, featuring a high-fidelity "Agentic" workflow visualization.

## 🚀 Overview
This system simulates an advanced AI team working on code migration. It ingests legacy Java code, analyzes dependencies, plans a microservices architecture, and deterministically transforms code to Go, all while providing real-time visibility into the "thought process" of specialized agents.

**Key Features:**
*   **Agentic Orchestration**: Visual timeline of simulated agents (Scanner, Graph, Architect, Translator).
*   **Deterministic Transformation**: Reliable Java-to-Go regex-based rule engine.
*   **Interactive Analysis**: Dependency graph and architectural mapping.
*   **Live Comparison**: Side-by-side diff viewer for verified modernization.

## 🏗️ Architecture

### System Components
The project is a monorepo built with **TurboRepo**, consisting of:

1.  **Frontend (`apps/web`)**:
    *   **Framework**: Next.js 14 (App Router)
    *   **Styling**: Tailwind CSS + "Enterprise" Dark Theme
    *   **Visualization**: Custom CSS Grid Graph Viewer, Monaco-style Diff Viewer.
    *   **State**: React Context + Polling for real-time job updates.

2.  **Backend (`apps/api`)**:
    *   **Runtime**: Node.js with Hono.js
    *   **Core**: `Orchestrator` class managing the Job State Machine.
    *   **Agents**:
        *   `ScannerAgent`: Regex-based AST parsing of Java files.
        *   `GraphAgent`: Heuristic dependency resolution (in-memory).
        *   `TranslatorAgent`: Rule-based transpiler (Java -> Go).
    *   **Storage**: In-memory job store (valid for session duration).

### Data Flow
1.  **Ingest**: User starts a job. `ScannerAgent` reads `data/sample/java-legacy`.
2.  **Analyze**: `GraphAgent` builds nodes/edges. Orchestrator updates status to `GRAPHING`.
3.  **Plan**: System maps Java packages (`com.acme.order`) to Go modules (`module/order`).
4.  **Transform**: `TranslatorAgent` processes files one-by-one, emitting `AgentEvent` logs.
5.  **Verify**: Results are aggregated, and the UI unlocks the "Export" stage.

### Directory Structure
```
.
├── apps
│   ├── api             # Hono.js Backend
│   │   ├── src
│   │   │   ├── agents  # Logic for Scanner, Graph, Translator
│   │   │   ├── core    # Orchestrator & Job Management
│   │   │   └── index.ts # API Entrypoint
│   └── web             # Next.js Frontend
│       ├── app         # App Router Pages
│       └── components  # GraphViewer, AgentTimeline, CodeDiffViewer
├── packages
│   └── shared          # Shared TypeScript Types (JobState, AgentEvent)
├── data
│   └── sample          # Curated Legacy Java Source Code
└── package.json        # Root config
```

## 🛠️ Setup & Run

### Prerequisites
*   Node.js 18+
*   npm (or pnpm)

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Demo
Start both the Frontend and Backend in development mode:
```bash
npm run dev
```

*   **Frontend**: Open [http://localhost:3000](http://localhost:3000)
*   **Backend API**: Running at [http://localhost:3001](http://localhost:3001)

## 🧩 deterministic Rule Specs
The system does not use LLMs. It uses strict transformation rules:

*   **Type Mapping**: `String` -> `string`, `List<T>` -> `[]T`, `int` -> `int`.
*   **Class to Struct**: `public class X` -> `type X struct`.
*   **Constructors**: `public X()` -> `func NewX() *X`.
*   **Methods**: Attached as pointers `func (s *Service) Method()`.
*   **Heuristics**:
    *   Packages ending in `.service` are treated as Domain Services.
    *   Packages ending in `.repo` are treated as Data Access Layers.

## 🔌 API Contract
*   `POST /api/projects/:id/run` -> Starts a new modernization job.
*   `GET /api/projects/:id/status?jobId=...` -> Returns `{ status, progress, currentStep }`.
*   `GET /api/projects/:id/agents?jobId=...` -> Returns list of `{ agentName, message, timestamp }`.

---
*Built for the Agentic Coding Webinar Demo.*
