<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Security headers to inject on every response.
     * Protects against: clickjacking, MIME sniffing, XSS, info leakage.
     */
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        $isProduction = app()->environment('production');

        // Prevent clickjacking
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Prevent MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Control referrer info sent to external sites
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Disable browser features not needed by the app
        $response->headers->set(
            'Permissions-Policy',
            'camera=(), microphone=(), geolocation=(), payment=()'
        );

        // XSS Protection (legacy browsers)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Content Security Policy
        // Allows: self, Google Fonts, Material Symbols, Google CDN images
        $cspDirectives = implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",        // Vite inlines small scripts
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https: http:",  // Allow external img (project/service images)
            "connect-src 'self'",
            "frame-src 'self' https://www.google.com",  // Allow Google Maps embeds
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self' https://wa.me",         // Allow WhatsApp redirect
        ]);
        $response->headers->set('Content-Security-Policy', $cspDirectives);

        // HSTS: only in production over HTTPS (prevents downgrade attacks)
        if ($isProduction) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        // Remove server info headers that reveal tech stack
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        return $response;
    }
}
