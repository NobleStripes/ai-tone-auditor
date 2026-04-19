import type { ProviderId } from '../../types/provider';

interface ProviderCounters {
  attempts: number;
  successes: number;
  failures: number;
}

interface ProviderTelemetryState {
  totalAnalyses: number;
  fallbackActivations: number;
  providers: Record<ProviderId, ProviderCounters>;
}

export interface ProviderTelemetrySnapshot {
  totalAnalyses: number;
  fallbackActivations: number;
  fallbackRatePercent: number;
  providers: Record<ProviderId, ProviderCounters>;
}

const initialProviderCounters = (): Record<ProviderId, ProviderCounters> => ({
  openai: { attempts: 0, successes: 0, failures: 0 },
  anthropic: { attempts: 0, successes: 0, failures: 0 },
  local: { attempts: 0, successes: 0, failures: 0 },
});

const state: ProviderTelemetryState = {
  totalAnalyses: 0,
  fallbackActivations: 0,
  providers: initialProviderCounters(),
};

function readProvider(id: ProviderId): ProviderCounters {
  return state.providers[id];
}

export function recordProviderAttempt(id: ProviderId): void {
  readProvider(id).attempts += 1;
}

export function recordProviderSuccess(id: ProviderId): void {
  readProvider(id).successes += 1;
}

export function recordProviderFailure(id: ProviderId): void {
  readProvider(id).failures += 1;
}

export function recordAnalysisCompleted(usedFallback: boolean): void {
  state.totalAnalyses += 1;
  if (usedFallback) {
    state.fallbackActivations += 1;
  }
}

export function getProviderTelemetrySnapshot(): ProviderTelemetrySnapshot {
  const fallbackRatePercent = state.totalAnalyses > 0
    ? Math.round((state.fallbackActivations / state.totalAnalyses) * 100)
    : 0;

  return {
    totalAnalyses: state.totalAnalyses,
    fallbackActivations: state.fallbackActivations,
    fallbackRatePercent,
    providers: {
      openai: { ...state.providers.openai },
      anthropic: { ...state.providers.anthropic },
      local: { ...state.providers.local },
    },
  };
}
