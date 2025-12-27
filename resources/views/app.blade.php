<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    {{-- Prevent Safari iOS caching issues on repeated QR scans --}}
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">

    {{-- Default title (used when no custom one is set) --}}
    <title inertia>{{ $meta['title'] ?? config('app.name', 'PPS HotelInfo') }}</title>

    <!-- Default Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/images/favicons/android-chrome-512x512.png">
    <link rel="shortcut icon" href="/images/favicons/favicon.ico">

    {{-- ✅ Optional Server-side OG / Twitter Meta --}}
    <meta property="og:title" content="{{ $meta['title'] ?? config('app.name', 'PPS HotelInfo') }}">
    <meta property="og:description" content="{{ $meta['description'] ?? 'Book your perfect stay with PPS HotelInfo.' }}">
    <meta property="og:image" content="{{ $meta['image'] ?? asset('images/building-placeholder.webp') }}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $meta['url'] ?? request()->fullUrl() }}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $meta['title'] ?? config('app.name', 'PPS HotelInfo') }}">
    <meta name="twitter:description" content="{{ $meta['description'] ?? 'Book your perfect stay with us.' }}">
    <meta name="twitter:image" content="{{ $meta['image'] ?? asset('images/building-placeholder.webp') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="antialiased bg-white">
    @inertia
</body>
</html>