export const setupConsoleLogging = () => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    const logToFile = (level, args) => {
        let message = args
            .map((arg) =>
                typeof arg === "object" ? JSON.stringify(arg) : String(arg)
            )
            .join(" ");

        // Restrict to 500 characters
        if (message.length > 500) {
            message = message.substring(0, 500) + "...";
        }

        fetch("/api/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                level,
                message,
                timestamp: new Date().toISOString(),
                url: window.location.href,
            }),
        }).catch(() => {
            // Silently fail if logging endpoint is not available
        });
    };

    console.log = function (...args) {
        originalLog(...args);
        logToFile("info", args);
    };

    console.error = function (...args) {
        originalError(...args);
        logToFile("error", args);
    };

    console.warn = function (...args) {
        originalWarn(...args);
        logToFile("warning", args);
    };

    console.info = function (...args) {
        originalInfo(...args);
        logToFile("info", args);
    };

    // Catch unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
        logToFile("error", [
            `Unhandled Promise Rejection: ${event.reason}`,
        ]);
    });

    // Catch global errors
    window.addEventListener("error", (event) => {
        logToFile("error", [
            `Global Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
        ]);
    });
};
