<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    private const CACHE_KEY = 'services:all';
    private const CACHE_TTL = 600; // 10 minutes

    public function index()
    {
        $services = Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            return Service::orderBy('service_id', 'asc')->get()->toArray();
        });

        return response()->json($services)
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id'  => 'required|string|max:50|unique:services,service_id',
            'title'       => 'required|string|max:200',
            'subtitle'    => 'nullable|string|max:300',
            'description' => 'required|string|max:2000',
            'image_url'   => 'nullable|url|max:500',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'category'    => 'required|string|max:100',
            'details'     => 'nullable|array',
            'details.*'   => 'nullable|string|max:300',
        ]);

        if ($request->hasFile('image')) {
            $path = ImageService::optimizeAndSave($request->file('image'), 'services');
            if ($path) {
                $validated['image_url'] = $path;
            }
        }

        unset($validated['image']);

        $service = Service::create($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($service, 201);
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'service_id'  => 'required|string|max:50|unique:services,service_id,' . $service->id,
            'title'       => 'required|string|max:200',
            'subtitle'    => 'nullable|string|max:300',
            'description' => 'required|string|max:2000',
            'image_url'   => 'nullable|string|max:500',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'category'    => 'required|string|max:100',
            'details'     => 'nullable|array',
            'details.*'   => 'nullable|string|max:300',
        ]);

        if ($request->hasFile('image')) {
            // Delete old file if it exists
            ImageService::deleteByUrl($service->image_url);
            $path = ImageService::optimizeAndSave($request->file('image'), 'services');
            if ($path) {
                $validated['image_url'] = $path;
            }
        }

        unset($validated['image']);

        $service->update($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($service->fresh());
    }

    public function destroy(Service $service)
    {
        // Clean up stored image
        ImageService::deleteByUrl($service->image_url);

        $service->delete();

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
