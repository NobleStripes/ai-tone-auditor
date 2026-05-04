import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface TuningTip {
  title: string;
  description: string;
  promptSnippet?: string;
}

interface RecommendationCardProps {
  tip: TuningTip;
  index: number;
}

export function RecommendationCard({ tip, index }: RecommendationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!tip.promptSnippet) return;
    navigator.clipboard.writeText(tip.promptSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 hover:border-amber-500/30 transition-colors group">
      <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-[10px] font-mono">
          {index + 1}
        </span>
        {tip.title}
      </h4>
      <p className="text-xs text-zinc-500 leading-relaxed">{tip.description}</p>
      {tip.promptSnippet && (
        <div className="relative mt-2">
          <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-[10px] text-amber-500/80 break-all">
            {tip.promptSnippet}
          </div>
          <button
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy prompt snippet'}
            className={cn(
              'absolute top-2 right-2 p-1.5 border rounded transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-amber-500',
              copied
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800',
            )}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" aria-hidden="true" />
                <span className="text-[8px] font-mono uppercase tracking-tighter">Copied</span>
              </>
            ) : (
              <Copy className="w-3 h-3" aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
