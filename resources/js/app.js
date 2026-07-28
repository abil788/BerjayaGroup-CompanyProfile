import * as Sentry from '@sentry/react';

// Sentry error & performance monitoring initialization
if (window.sentryDsn) {
    Sentry.init({
        dsn: window.sentryDsn,
        environment: window.appEnv || 'production',
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Tracing settings
        tracesSampleRate: 1.0,
        
        // Session Replay settings
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
    });
}

// React App entry point & global fetch interceptor for CSRF protection
(function() {
    // Helper to extract cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
        return null;
    }

    const originalFetch = window.fetch;
    window.fetch = async function (resource, options = {}) {
        options.headers = options.headers || {};
        
        // Convert headers to Headers object if it's not already
        const headers = options.headers instanceof Headers 
            ? options.headers 
            : new Headers(options.headers);

        const method = (options.method || 'GET').toUpperCase();
        const isStateChanging = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
        
        if (isStateChanging) {
            const xsrfToken = getCookie('XSRF-TOKEN');
            if (xsrfToken) {
                headers.set('X-XSRF-TOKEN', xsrfToken);
            }
        }

        // Always include credentials (cookies) on same-origin requests so Laravel sees the session
        if (!options.credentials) {
            options.credentials = 'same-origin';
        }

        // Convert back to appropriate structure based on original options
        if (options.headers instanceof Headers) {
            options.headers = headers;
        } else {
            options.headers = {};
            headers.forEach((value, key) => {
                options.headers[key] = value;
            });
        }

        return originalFetch(resource, options);
    };
})();

// Render React App
import './AppRoot.jsx';
