'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Cpu, Database, Save, Server, Shield, Globe, Key, Code2 } from 'lucide-react';

type Tab = 'GENERAL' | 'API' | 'RULES';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('GENERAL');

    // Mock State for Form Fields
    const [config, setConfig] = useState({
        projectName: 'Legacy Order System',
        description: 'Monolith to Microservices Migration for Order Management',
        theme: 'dark',
        llmProvider: 'anthropic',
        apiKey: 'sk-ant-********************',
        sourceLang: 'java',
        sourceVersion: '17',
        targetLang: 'go',
        targetArch: 'hexagonal'
    });

    return (
        <div className="flex flex-col h-full bg-app p-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">System Configuration</h1>
                    <p className="text-text-secondary">Manage global settings, API integrations, and modernization rules.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-blue-400 text-app font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </div>

            {/* Tabs & Content Container */}
            <div className="flex-1 flex gap-8 min-h-0">
                {/* Sidebar Navigation */}
                <div className="w-64 flex flex-col gap-2">
                    <TabButton
                        active={activeTab === 'GENERAL'}
                        onClick={() => setActiveTab('GENERAL')}
                        icon={<Globe size={18} />}
                        label="General Settings"
                        desc="Project identity & UI"
                    />
                    <TabButton
                        active={activeTab === 'API'}
                        onClick={() => setActiveTab('API')}
                        icon={<Server size={18} />}
                        label="API & Models"
                        desc="LLM connectivity"
                    />
                    <TabButton
                        active={activeTab === 'RULES'}
                        onClick={() => setActiveTab('RULES')}
                        icon={<Code2 size={18} />}
                        label="Modernization Rules"
                        desc="Language & architecture"
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-panel border border-border rounded-xl p-8 overflow-y-auto shadow-2xl relative">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'GENERAL' && (
                            <motion.div
                                key="general"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-8 max-w-2xl"
                            >
                                <SectionHeader icon={<Settings size={20} />} title="Project Identity" />
                                <div className="space-y-4">
                                    <InputGroup label="Project Name" value={config.projectName} />
                                    <InputGroup label="Description" value={config.description} type="textarea" />
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <SectionHeader icon={<Globe size={20} />} title="Environment" />
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="p-4 border border-accent/50 bg-accent/5 rounded-lg">
                                            <div className="text-sm text-accent mb-1">Current Environment</div>
                                            <div className="font-mono text-white text-lg">Local (Dev)</div>
                                        </div>
                                        <div className="p-4 border border-border bg-surface/30 rounded-lg">
                                            <div className="text-sm text-text-tertiary mb-1">Version</div>
                                            <div className="font-mono text-text-secondary text-lg">v2.4.0-ENT</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'API' && (
                            <motion.div
                                key="api"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-8 max-w-2xl"
                            >
                                <SectionHeader icon={<Cpu size={20} />} title="LLM Provider" />
                                <div className="grid grid-cols-3 gap-4">
                                    <ProviderCard name="Anthropic" active={config.llmProvider === 'anthropic'} />
                                    <ProviderCard name="OpenAI" active={config.llmProvider === 'openai'} />
                                    <ProviderCard name="Gemini" active={config.llmProvider === 'gemini'} />
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <SectionHeader icon={<Key size={20} />} title="Credentials" />
                                    <div className="mt-4 space-y-4">
                                        <InputGroup label="API Key" value={config.apiKey} type="password" />
                                        <p className="text-xs text-text-tertiary flex items-center gap-1">
                                            <Shield size={12} />
                                            Keys are encrypted at rest using AES-256.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'RULES' && (
                            <motion.div
                                key="rules"
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-8 max-w-2xl"
                            >
                                <SectionHeader icon={<Database size={20} />} title="Source Configuration" />
                                <div className="grid grid-cols-2 gap-6">
                                    <InputGroup label="Source Language" value="Java" readOnly />
                                    <InputGroup label="JDK Version" value={config.sourceVersion} />
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <SectionHeader icon={<Server size={20} />} title="Target Architecture" />
                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                        <InputGroup label="Target Language" value="Go (Golang)" readOnly />
                                        <InputGroup label="Pattern" value="Hexagonal (Ports & Adapters)" readOnly />
                                    </div>
                                </div>

                                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg text-sm text-accent">
                                    <div className="font-bold mb-1">Strict Mode Enabled</div>
                                    <div className="opacity-80">Refactoring agents will reject generated code with less than 90% unit test coverage.</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

// --- Subcomponents ---

function TabButton({ active, onClick, icon, label, desc }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, desc: string }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300
                ${active ? 'bg-surface border border-accent/30 shadow-[0_0_15px_rgba(79,195,247,0.1)]' : 'hover:bg-surface/50 border border-transparent'}
            `}
        >
            <div className={`p-2 rounded-lg ${active ? 'bg-accent text-app' : 'bg-surface text-text-tertiary'}`}>
                {icon}
            </div>
            <div>
                <div className={`font-medium ${active ? 'text-white' : 'text-text-secondary'}`}>{label}</div>
                <div className="text-[10px] text-text-tertiary uppercase tracking-wide">{desc}</div>
            </div>
        </button>
    );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
    return (
        <div className="flex items-center gap-3 text-white mb-4">
            <div className="text-accent">{icon}</div>
            <h3 className="text-lg font-medium">{title}</h3>
        </div>
    );
}

function InputGroup({ label, value, type = 'text', readOnly = false }: { label: string, value: string, type?: string, readOnly?: boolean }) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</label>
            {type === 'textarea' ? (
                <textarea
                    defaultValue={value}
                    readOnly={readOnly}
                    rows={3}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
            ) : (
                <input
                    type={type}
                    defaultValue={value}
                    readOnly={readOnly}
                    className={`w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors
                        ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                />
            )}
        </div>
    );
}

function ProviderCard({ name, active }: { name: string, active: boolean }) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all
            ${active
                ? 'bg-accent/10 border-accent text-white shadow-[0_0_10px_rgba(79,195,247,0.2)]'
                : 'bg-surface border-border text-text-tertiary hover:border-text-secondary'}
        `}>
            <div className="text-sm font-medium">{name}</div>
        </div>
    );
}
