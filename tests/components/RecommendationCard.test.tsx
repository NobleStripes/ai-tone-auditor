import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecommendationCard } from '../../src/components/RecommendationCard';

const TIP = {
  title: 'Increase Directness',
  description: 'Replace scripted disclaimers with concrete action.',
  promptSnippet: 'Use direct language. Avoid generic de-escalation.',
};

describe('RecommendationCard', () => {
  test('renders title and description', () => {
    render(<RecommendationCard tip={TIP} index={0} />);
    expect(screen.getByText('Increase Directness')).toBeInTheDocument();
    expect(screen.getByText('Replace scripted disclaimers with concrete action.')).toBeInTheDocument();
  });

  test('renders prompt snippet text', () => {
    render(<RecommendationCard tip={TIP} index={0} />);
    expect(screen.getByText('Use direct language. Avoid generic de-escalation.')).toBeInTheDocument();
  });

  test('shows numbered index badge starting from 1', () => {
    render(<RecommendationCard tip={TIP} index={2} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('copy button changes label to "Copied" after click', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => Promise.resolve(),
      },
    });

    render(<RecommendationCard tip={TIP} index={0} />);
    const copyButton = screen.getByRole('button', { name: /copy prompt snippet/i });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });
  });

  test('does not render copy button when promptSnippet is absent', () => {
    const tipWithoutSnippet = { title: 'Tip', description: 'Do something.', promptSnippet: undefined };
    render(<RecommendationCard tip={tipWithoutSnippet} index={0} />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
