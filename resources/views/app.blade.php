<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PT. Berjaya Group | Kontraktor Konstruksi & Engineering — Medan, Indonesia</title>
    <meta name="description" content="PT. Berjaya Group — Kontraktor umum & engineering profesional di Medan, Indonesia. Spesialisasi konstruksi gedung, infrastruktur, perpipaan mekanikal, dan listrik industri sejak 2008.">

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">

    <!-- Preload Hero Image -->
    <link rel="preload" as="image" href="/test.webp" fetchpriority="high">

    <!-- Open Graph / Meta Tags -->
    <meta property="og:title" content="PT. Berjaya Group | Kontraktor Konstruksi & Engineering">
    <meta property="og:description" content="Kontraktor umum & engineering profesional spesialisasi konstruksi gedung, infrastruktur sipil, mekanikal perpipaan, dan kelistrikan industri.">
    <meta property="og:image" content="/logo.webp">
    <meta property="og:type" content="website">
    
    <!-- Google Fonts Preconnect & Stylesheets -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Google Material Symbols Icon Font -->
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    

    <!-- Sentry DSN for frontend React SDK -->
    <script>
        window.sentryDsn = "{{ config('sentry.dsn') }}";
        window.appEnv = "{{ app()->environment() }}";
    </script>

    <!-- Vite Styles & Scripts -->
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased overflow-x-hidden">
    
    <div id="app"></div>

</body>
</html>
