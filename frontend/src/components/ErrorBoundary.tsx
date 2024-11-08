import { Component, ErrorInfo, ReactNode } from 'react';

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface IErrorState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
