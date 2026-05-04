import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-zinc-900 border border-red-500/20 rounded-xl p-8 space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
                <ShieldAlert className="w-7 h-7 text-red-500" aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-100">Application Error</h2>
              <p className="text-xs font-mono text-zinc-500 break-words">{this.state.message}</p>
            </div>
            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-mono uppercase tracking-widest rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
