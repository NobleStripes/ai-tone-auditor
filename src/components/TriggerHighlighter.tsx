import { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRIGGER_WORDS } from '../constants';

interface TriggerHighlighterProps {
  text: string;
}

export function TriggerHighlighter({ text }: TriggerHighlighterProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const parts = useMemo(() => {
    if (!text) return [];

    // Sort trigger words by length descending to match longest phrases first
    const sortedTriggers = [...TRIGGER_WORDS].sort((a, b) => b.word.length - a.word.length);
    const escaped = sortedTriggers.map((w) => w.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');

    const result: Array<{ text: string; isTrigger: boolean; info?: (typeof TRIGGER_WORDS)[number] }> = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push({ text: text.substring(lastIndex, match.index), isTrigger: false });
      }
      const triggerInfo = TRIGGER_WORDS.find((t) => t.word.toLowerCase() === match![0].toLowerCase());
      result.push({ text: match[0], isTrigger: true, info: triggerInfo });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push({ text: text.substring(lastIndex), isTrigger: false });
    }

    return result;
  }, [text]);

  return (
    <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg font-mono text-sm leading-relaxed text-zinc-400 whitespace-pre-wrap">
      {parts.length === 0 ? (
        'No text analyzed yet.'
      ) : (
        parts.map((part, i) =>
          part.isTrigger ? (
            <span
              key={i}
              className="relative inline-block"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            >
              <span className="bg-red-500/20 text-red-400 border-b border-red-500/50 px-0.5 rounded-sm font-bold cursor-help">
                {part.text}
              </span>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    role="tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl z-50 pointer-events-none"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">
                        {part.info?.category}
                      </span>
                      <AlertCircle className="w-3 h-3 text-red-500" aria-hidden="true" />
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-normal font-sans normal-case">
                      {part.info?.explanation}
                    </p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-950" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )
      )}
    </div>
  );
}
