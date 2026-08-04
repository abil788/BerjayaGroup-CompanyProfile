<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Support\Facades\Cache;

class ClientController extends Controller
{
    private const CACHE_KEY = 'clients:all';
    private const CACHE_TTL = 600;

    public function index()
    {
        $clients = Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            $data = Client::orderBy('order', 'asc')->get()->toArray();
            return !empty($data) ? $data : null;
        });

        if (empty($clients)) {
            Cache::forget(self::CACHE_KEY);
            $clients = Client::orderBy('order', 'asc')->get()->toArray();
        }

        return response()->json($clients)
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }
}
