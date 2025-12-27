<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }

    /**
     * Intercept the response to add cache-control headers for iOS Safari.
     */
    public function __invoke($request, $next)
    {
        $response = $next($request);

        // Add cache-control headers to prevent Safari iOS caching issues
        // This is crucial for QR code scanning where the same URL is visited multiple times
        if ($this->shouldAddCacheHeaders($request, $response)) {
            $response->header('Cache-Control', 'no-cache, no-store, must-revalidate, private');
            $response->header('Pragma', 'no-cache');
            $response->header('Expires', '0');
        }

        return $response;
    }

    /**
     * Determine if cache headers should be added to the response.
     */
    private function shouldAddCacheHeaders($request, $response): bool
    {
        // Only add headers to HTML responses
        $contentType = $response->headers->get('Content-Type', '');
        return strpos($contentType, 'text/html') !== false;
    }
}