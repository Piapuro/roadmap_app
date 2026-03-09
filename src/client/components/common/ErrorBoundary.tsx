"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <ErrorMessage
          code={500}
          action={
            <button
              onClick={() => this.setState({ hasError: false })}
              className="rounded-md bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/80"
            >
              再試行
            </button>
          }
        />
      );
    }

    return this.props.children;
  }
}
