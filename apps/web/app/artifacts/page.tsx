'use client';

import { useState } from 'react';
import { DEMO_ARTIFACTS, ArtifactFile } from '../../lib/data/artifacts';
import { FileCode, FileJson, FileText, Folder, CheckCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function ArtifactsPage() {
    const [selectedFile, setSelectedFile] = useState<ArtifactFile>(DEMO_ARTIFACTS[0]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'java':
            case 'go':
                return <FileCode size={16} />;
            case 'json':
                return <FileJson size={16} />;
            default:
                return <FileText size={16} />;
        }
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar: File Tree */}
            <div className="w-[300px] bg-panel border-r border-border flex flex-col">
                <div className="h-12 border-b border-border flex items-center px-4 bg-surface/50">
                    <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">Project Files</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Legacy Source Group */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-text-tertiary">
                            <Folder size={16} />
                            <span className="text-xs font-mono font-bold uppercase">Legacy Source (Java)</span>
                        </div>
                        <div className="pl-4 space-y-1">
                            {DEMO_ARTIFACTS.filter(a => a.category === 'legacy').map(file => (
                                <button
                                    key={file.id}
                                    onClick={() => setSelectedFile(file)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors text-left font-mono
                                        ${selectedFile.id === file.id ? 'bg-blue-500/10 text-accent border border-blue-500/20' : 'text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent'}
                                    `}
                                >
                                    {getIcon(file.type)}
                                    <span className="truncate">{file.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Modern Target Group */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-text-tertiary">
                            <Folder size={16} className="text-success" />
                            <span className="text-xs font-mono font-bold uppercase text-success">Generated Target (Go)</span>
                        </div>
                        <div className="pl-4 space-y-1">
                            {DEMO_ARTIFACTS.filter(a => a.category === 'modern').map(file => (
                                <button
                                    key={file.id}
                                    onClick={() => setSelectedFile(file)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors text-left font-mono
                                        ${selectedFile.id === file.id ? 'bg-blue-500/10 text-accent border border-blue-500/20' : 'text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent'}
                                    `}
                                >
                                    {getIcon(file.type)}
                                    <span className="truncate">{file.name}</span>
                                    <CheckCircle size={12} className="text-success ml-auto" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reports Group */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-text-tertiary">
                            <Folder size={16} className="text-warning" />
                            <span className="text-xs font-mono font-bold uppercase text-warning">Reports</span>
                        </div>
                        <div className="pl-4 space-y-1">
                            {DEMO_ARTIFACTS.filter(a => a.category === 'report').map(file => (
                                <button
                                    key={file.id}
                                    onClick={() => setSelectedFile(file)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors text-left font-mono
                                        ${selectedFile.id === file.id ? 'bg-blue-500/10 text-accent border border-blue-500/20' : 'text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent'}
                                    `}
                                >
                                    {getIcon(file.type)}
                                    <span className="truncate">{file.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main: Editor/Viewer */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                <div className="h-9 flex items-center bg-[#252526] border-b border-[#3e3e42] px-4 justify-between">
                    <span className="text-xs font-mono text-slate-300">{selectedFile.path}</span>
                    <div className="text-[10px] text-slate-500 font-mono">READ-ONLY</div>
                </div>
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={selectedFile.type === 'md' ? 'markdown' : selectedFile.type}
                        value={selectedFile.content}
                        theme="vs-dark"
                        options={{
                            readOnly: true,
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 13,
                            fontFamily: 'JetBrains Mono, monospace',
                            lineNumbers: 'on',
                            renderOverviewRuler: false,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
