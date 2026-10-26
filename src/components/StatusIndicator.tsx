import { Activity } from 'lucide-react';

export function StatusIndicator() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)]">
      <Activity className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
      <span>TELEMETRY LIVE</span>
    </div>
  );
}
