import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface ContactTerminalProps {
  email?: string;
  phone?: string;
  location?: string;
}

export function ContactTerminal({
  email = 'eklavyaghodake@gmail.com',
  phone = '+91 77219 01494',
  location = 'Maharashtra, India',
}: ContactTerminalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [extraLogs, setExtraLogs] = useState<string[]>([]);

  const handleCopy = (key: string, value: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1800);
      });
    }
  };

  const executeCommand = (cmd: string) => {
    if (cmd === 'clear') {
      setExtraLogs([]);
      return;
    }
    if (cmd === 'uname -a') {
      setExtraLogs((prev) => [
        ...prev,
        `eklavya@maharashtra:~$ uname -a`,
        `Linux telemetry-node 6.8.0-industrial-rt #1 SMP PREEMPT_RT x86_64 GNU/Linux`,
      ]);
    } else if (cmd === 'status') {
      setExtraLogs((prev) => [
        ...prev,
        `eklavya@maharashtra:~$ ./check-status.sh`,
        `[HEALTH] Systems nominal. Redis buffer: OK. MongoDB Replica: SYNCHRONIZED.`,
      ]);
    } else if (cmd === 'stack') {
      setExtraLogs((prev) => [
        ...prev,
        `eklavya@maharashtra:~$ ./list-stack.sh`,
        `Core Java · Spring Boot · Node.js · TypeScript · Go · Python · MongoDB · Redis · MQTT · Docker`,
      ]);
    }
  };

  return (
    <div className="brk rounded-2xl border border-[var(--border)] bg-[#05080a] dark:bg-[#05080a] text-slate-200 p-0 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-xs text-slate-400 font-mono hidden sm:inline">
            ~/eklavya-ghodake/handshake.sh
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">TCP THREE-WAY READY</span>
          <span className="sm:hidden">READY</span>
        </div>
      </div>

      {/* Terminal Body Content */}
      <div className="p-4 sm:p-6 space-y-4 leading-relaxed overflow-x-auto text-slate-300">
        <div>
          <span className="text-emerald-400">eklavya@maharashtra:~$</span>{' '}
          <span className="text-white font-medium">whoami</span>
          <div className="text-slate-400 pl-2 sm:pl-4 pt-1">
            Senior Software Engineer — Software R&D Lead / Manager
          </div>
        </div>

        <div>
          <span className="text-emerald-400">eklavya@maharashtra:~$</span>{' '}
          <span className="text-white font-medium">cat contact.json</span>
          <div className="pl-2 sm:pl-4 pt-1 text-slate-300 space-y-0.5">
            <div>&#123;</div>
            <div className="pl-4">
              <span className="text-amber-300">"email"</span>: <span className="text-emerald-300">"{email}"</span>,
            </div>
            <div className="pl-4">
              <span className="text-amber-300">"phone"</span>: <span className="text-emerald-300">"{phone}"</span>,
            </div>
            <div className="pl-4">
              <span className="text-amber-300">"location"</span>: <span className="text-emerald-300">"{location}"</span>,
            </div>
            <div className="pl-4">
              <span className="text-amber-300">"specialization"</span>: <span className="text-cyan-300">"High-Throughput Streaming &amp; Telemetry"</span>,
            </div>
            <div className="pl-4">
              <span className="text-amber-300">"status"</span>: <span className="text-emerald-400 font-semibold">"listening on all interfaces"</span>
            </div>
            <div>&#125;</div>
          </div>
        </div>

        <div>
          <span className="text-emerald-400">eklavya@maharashtra:~$</span>{' '}
          <span className="text-white font-medium">./open_to --roles --collabs</span>
          <div className="text-emerald-400 pl-2 sm:pl-4 pt-1 flex items-center gap-2">
            <span>[OK] Available for engineering leadership &amp; distributed system design.</span>
          </div>
        </div>

        {/* Dynamic Extra Terminal Logs */}
        {extraLogs.map((log, idx) => (
          <div key={idx} className={log.startsWith('eklavya') ? 'text-white' : 'text-slate-400 pl-2 sm:pl-4'}>
            {log}
          </div>
        ))}

        {/* Active Prompt with Blinking Block Cursor */}
        <div className="flex items-center gap-2 pt-1 text-emerald-400">
          <span>eklavya@maharashtra:~$</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </div>
      </div>

      {/* Terminal Interactive Quick Actions & Command Chips */}
      <div className="px-4 py-3 bg-black/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleCopy('email', email)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-colors"
          >
            {copiedKey === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey === 'email' ? 'EMAIL COPIED ✓' : 'COPY EMAIL'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleCopy('phone', phone)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
          >
            {copiedKey === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey === 'phone' ? 'PHONE COPIED ✓' : 'COPY PHONE'}</span>
          </button>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>SEND EMAIL</span>
          </a>
        </div>

        {/* Command Runner Chips */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className="hidden md:inline">Run:</span>
          <button
            type="button"
            onClick={() => executeCommand('status')}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            ./status
          </button>
          <button
            type="button"
            onClick={() => executeCommand('stack')}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            ./stack
          </button>
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
