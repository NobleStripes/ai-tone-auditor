import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TriggerHighlighter } from '../../src/components/TriggerHighlighter';

describe('TriggerHighlighter', () => {
  test('renders plain text when no triggers are present', () => {
    render(<TriggerHighlighter text="The array has three elements." />);
    expect(screen.getByText(/The array has three elements/)).toBeInTheDocument();
  });

  test('highlights known trigger phrases', () => {
    render(<TriggerHighlighter text="As an AI language model, I will help you." />);
    // The trigger phrase should be rendered in a highlighted span
    const highlighted = document.querySelectorAll('.bg-red-500\\/20');
    expect(highlighted.length).toBeGreaterThan(0);
  });

  test('shows tooltip on click for a trigger phrase', async () => {
    render(<TriggerHighlighter text="Calm down and let me explain." />);
    const highlightedSpan = document.querySelector('.cursor-help');
    expect(highlightedSpan).not.toBeNull();

    if (highlightedSpan) {
      fireEvent.mouseEnter(highlightedSpan.parentElement!);
      // Tooltip should appear with the category label
      const tooltip = document.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeNull();
    }
  });

  test('renders "No text analyzed yet." for empty input', () => {
    render(<TriggerHighlighter text="" />);
    expect(screen.getByText('No text analyzed yet.')).toBeInTheDocument();
  });
});
