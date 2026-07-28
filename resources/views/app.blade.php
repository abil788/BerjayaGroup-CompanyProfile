<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CONSTRUCTO | Structural Integrity Construction & Engineering</title>
    
    <!-- Google Fonts -->
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
