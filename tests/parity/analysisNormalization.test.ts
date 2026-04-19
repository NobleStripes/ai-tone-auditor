import assert from 'node:assert/strict';
import test from 'node:test';
import { validateAnalysisResult } from '../../src/services/validation/analysisValidator';

test('maps legacy Nerdy base style to Efficient', () => {
  const result = validateAnalysisResult({
    personalization: {
      baseStyle: 'Nerdy',
      directness: 'Default',
      neutrality: 'Default',
      brevity: 'Default',
      humility: 'Default',
      karenRemediation: 'Example',
      customInstructions: [],
    },
  });

  assert.equal(result.personalization.baseStyle, 'Efficient');
});

test('falls back unknown base style to Default', () => {
  const result = validateAnalysisResult({
    personalization: {
      baseStyle: 'MyCustomMode',
      directness: 'Default',
      neutrality: 'Default',
      brevity: 'Default',
      humility: 'Default',
      karenRemediation: 'Example',
      customInstructions: [],
    },
  });

  assert.equal(result.personalization.baseStyle, 'Default');
});
