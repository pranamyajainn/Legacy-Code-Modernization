'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Play, Archive, Settings, Activity } from 'lucide-react';

function NavItem({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group cursor-pointer ${isActive ? 'bg-blue-500/10 text-accent' : 'text-text-secondary hover:bg-surface hover:text-text-primary'}`}>
            <Icon size={18} className={isActive ? 'text-accent' : 'text-text-tertiary group-hover:text-text-secondary'} />
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

export default function Sidebar() {
    return (
        <aside className="w-[240px] flex-shrink-0 bg-panel border-r border-border flex flex-col z-20">
            {/* Header Brand */}
            <div className="h-16 flex items-center px-4 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/50">
                        <Activity size={18} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">Cortex</span>
                        <span className="text-sm font-bold text-white tracking-tight">Modernize</span>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3 px-3">Platform</div>

                <NavItem href="/" icon={LayoutDashboard} label="Overview" />
                <NavItem href="/run" icon={Play} label="Live Run" />
                <NavItem href="/artifacts" icon={Archive} label="Artifacts" />

                <div className="pt-6 text-[10px] font-bold uppercase tracking-widest text-text-tertiary mb-3 px-3">System</div>
                <NavItem href="/settings" icon={Settings} label="Configuration" />
            </nav>

            {/* Footer Status */}
            <div className="p-4 border-t border-border bg-surface/50">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-xs font-mono text-text-secondary">System Online</span>
                </div>
                <div className="text-[10px] text-text-tertiary mt-2 font-mono">
                    v2.4.0-ENT
                    <br />
                    Env: Local (Dev)
                </div>
            </div>
        </aside>
    );
}
