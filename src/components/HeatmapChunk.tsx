import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface HeatmapChunkData {
  text: string;
  density: 'low' | 'medium' | 'high';
  explanation?: string;
  suggestion?: string;
}

interface HeatmapChunkProps {
  chunk: HeatmapChunkData;
}

export function HeatmapChunk({ chunk }: HeatmapChunkProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <span
        className={cn(
          'px-1 rounded text-xs transition-colors cursor-help inline-block',
          chunk.density === 'low'
            ? 'bg-red-500/20 text-red-400'
            : chunk.density === 'medium'
              ? 'bg-amber-500/10 text-amber-500'
              : 'bg-emerald-500/10 text-emerald-500',
        )}
      >
        {chunk.text}
      </span>

      <AnimatePresence>
        {showTooltip && (chunk.explanation || chunk.suggestion) && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl pointer-events-none"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-1.5 mb-1.5">
                <div
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    chunk.density === 'low' ? 'bg-red-500' : 'bg-amber-500',
                  )}
                  aria-hidden="true"
                />
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  {chunk.density} Context
                </span>
              </div>

              {chunk.explanation && (
                <div className="space-y-1">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Issue</p>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">{chunk.explanation}</p>
                </div>
              )}

              {chunk.suggestion && (
                <div className="space-y-1">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">Suggestion</p>
                  <p className="text-[11px] text-emerald-500/90 leading-relaxed italic">"{chunk.suggestion}"</p>
                </div>
              )}
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-900" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
