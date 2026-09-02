import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{ background: "#0a0a0f", color: "#f0eeff" }}
      >
        <div className="w-full max-w-xl text-center">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#ff3cac" }}
          >
            Something broke
          </p>
          <h1 className="font-display text-3xl font-bold mb-4">
            An unexpected error occurred
          </h1>
          <pre
            className="text-left text-xs p-4 rounded-lg overflow-auto mb-6 whitespace-pre-wrap"
            style={{ background: "#111118", color: "#7a7a9a" }}
          >
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            style={{ background: "#00f5d4", color: "#0a0a0f" }}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
