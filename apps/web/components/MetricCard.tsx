'use client';

interface MetricCardProps {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'accent' | 'success' | 'warning' | 'error';
}

export default function MetricCard({ label, value, trend, color = 'accent' }: MetricCardProps) {
    const colorClasses = {
        accent: 'text-accent',
        success: 'text-success',
        warning: 'text-warning',
        error: 'text-error'
    };

    return (
        <div className="flex flex-col items-end p-4 rounded-lg bg-surface border border-border/50 hover:border-border transition-colors">
            <span className="text-[10px] uppercase tracking-widest text-text-tertiary font-bold mb-1">{label}</span>
            <div className="flex items-end gap-2">
                <span className={`text-2xl font-mono font-bold tracking-tight ${colorClasses[color]}`}>
                    {value}
                </span>
                {trend && (
                    <span className={`text-xs mb-1 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary'
                        }`}>
                        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'}
                    </span>
                )}
            </div>
        </div>
    );
}
