import type { AIProvider, ProviderId } from '../../types/provider';
import { anthropicProvider } from './anthropicProvider';
import { geminiProvider } from './geminiProvider';
import { localHeuristicProvider } from './localHeuristicProvider';
import { openaiProvider } from './openaiProvider';

const providers: Record<ProviderId, AIProvider> = {
  gemini: geminiProvider,
  openai: openaiProvider,
  anthropic: anthropicProvider,
  local: localHeuristicProvider,
};

function normalizeProviderId(value: string | undefined): ProviderId | undefined {
  if (value === 'gemini' || value === 'openai' || value === 'anthropic' || value === 'local') {
    return value;
  }

  return undefined;
}

export function resolveProvider(providerId?: string): AIProvider {
  const resolvedId = normalizeProviderId(providerId) || 'gemini';
  return providers[resolvedId];
}

export function resolveFallbackProvider(primaryProviderId: ProviderId): AIProvider {
  const envFallback = normalizeProviderId(process.env.AI_FALLBACK_PROVIDER);
  if (envFallback && envFallback !== primaryProviderId) {
    return providers[envFallback];
  }

  if (primaryProviderId === 'gemini') {
    return providers.anthropic;
  }

  if (primaryProviderId === 'openai') {
    return providers.anthropic;
  }

  if (primaryProviderId === 'anthropic') {
    return providers.openai;
  }

  return providers.gemini;
}
