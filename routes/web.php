<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use Illuminate\Support\Facades\Route;

// ── API ROUTES ────────────────────────────────────────────────────────────────
Route::prefix('api')->group(function () {

    // ── Auth (rate limited: 5/min per IP) ────────────────────────────────────
    Route::middleware(['throttle:login'])->group(function () {
        Route::post('/auth/login', [AuthController::class, 'login']);
    });
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/check', [AuthController::class, 'check']);

    // ── Public READ endpoints (throttle: 60/min per IP) ──────────────────────
    Route::middleware(['throttle:api'])->group(function () {
        Route::get('/services', [ServiceController::class, 'index']);
        Route::get('/projects', [ProjectController::class, 'index']);
    });

    // ── Public Inquiry submission (rate limited: 3/min per IP anti-spam) ─────
    Route::middleware(['throttle:inquiry'])->group(function () {
        Route::post('/inquiries', [InquiryController::class, 'store']);
    });

    // ── Protected Admin-only routes (must be authenticated) ──────────────────
    Route::middleware(['auth', 'throttle:api'])->group(function () {
        // Services CRUD (admin only)
        Route::post('/services', [ServiceController::class, 'store']);
        Route::post('/services/{service}', [ServiceController::class, 'update']);   // POST with _method override for FormData
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::delete('/services/{service}', [ServiceController::class, 'destroy']);

        // Projects CRUD (admin only)
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::post('/projects/{project}', [ProjectController::class, 'update']);   // POST with _method override for FormData
        Route::put('/projects/{project}', [ProjectController::class, 'update']);
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

        // Inquiries — admin read & management (NOT public)
        Route::get('/inquiries', [InquiryController::class, 'index']);
        Route::patch('/inquiries/{inquiry}/status', [InquiryController::class, 'updateStatus']);
        Route::delete('/inquiries/{inquiry}', [InquiryController::class, 'destroy']);
    });
});

// ── SPA CATCH-ALL ROUTE ───────────────────────────────────────────────────────
Route::get('/', function () {
    return view('app');
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api|storage).*$');
