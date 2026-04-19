import type { AnalysisResult } from '../types/analysis';
import type { AnalyzeToneOutput, ProviderRuntimeMeta } from '../types/provider';
import { ANALYSIS_PROMPT_VERSION } from './promptBuilder';
import { resolveFallbackProvider, resolveProvider } from './providers/factory';
import {
  getProviderTelemetrySnapshot,
  recordAnalysisCompleted,
  recordProviderAttempt,
  recordProviderFailure,
  recordProviderSuccess,
} from './telemetry/providerTelemetry';

let lastRuntimeMeta: ProviderRuntimeMeta = {
  providerId: 'openai',
  providerLabel: 'OpenAI',
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  usedFallback: false,
};

function buildMeta(providerId: ProviderRuntimeMeta['providerId'], providerLabel: string, model: string, usedFallback: boolean): ProviderRuntimeMeta {
  return {
    providerId,
    providerLabel,
    model,
    usedFallback,
  };
}

export function getLastAnalysisRuntimeMeta(): ProviderRuntimeMeta {
  return lastRuntimeMeta;
}

export { getProviderTelemetrySnapshot };

export async function analyzeTone(text: string): Promise<AnalyzeToneOutput> {
  const selectedProviderId = process.env.AI_PROVIDER;
  const primaryProvider = resolveProvider(selectedProviderId);
  const fallbackProvider = resolveFallbackProvider(primaryProvider.id);

  try {
    recordProviderAttempt(primaryProvider.id);
    const result: AnalysisResult = await primaryProvider.analyzeTone({
      text,
      context: {
        promptVersion: ANALYSIS_PROMPT_VERSION,
      },
    });
    recordProviderSuccess(primaryProvider.id);

    const meta = buildMeta(primaryProvider.id, primaryProvider.label, primaryProvider.model, false);
    lastRuntimeMeta = meta;
    recordAnalysisCompleted(false);

    return { result, meta };
  } catch (primaryError) {
    console.warn(`Primary provider ${primaryProvider.id} failed, attempting fallback`, primaryError);
    recordProviderFailure(primaryProvider.id);

    recordProviderAttempt(fallbackProvider.id);
    const result = await fallbackProvider.analyzeTone({
      text,
      context: {
        promptVersion: ANALYSIS_PROMPT_VERSION,
      },
    });
    recordProviderSuccess(fallbackProvider.id);

    const meta = buildMeta(fallbackProvider.id, fallbackProvider.label, fallbackProvider.model, true);
    lastRuntimeMeta = meta;
    recordAnalysisCompleted(true);

    return { result, meta };
  }
}
