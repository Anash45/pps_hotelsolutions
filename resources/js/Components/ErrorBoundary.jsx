import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to your existing logging system
        console.error("React Error Boundary caught:", {
            error: error.toString(),
            componentStack: errorInfo.componentStack,
            errorInfo: errorInfo,
        });

        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-gray-600 mb-4">
                            We're sorry, but something unexpected happened. The error has been logged.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-primary hover:bg-primary text-white font-semibold py-2 px-4 rounded"
                        >
                            Reload Page
                        </button>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-4">
                                <summary className="cursor-pointer text-sm text-gray-500">
                                    Error Details (Dev Only)
                                </summary>
                                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
