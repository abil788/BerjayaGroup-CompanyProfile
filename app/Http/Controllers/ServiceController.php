<?php

namespace App\Http\Controllers;

use App\Models\Service;
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
            return Service::orderBy('service_id', 'asc')->get();
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
            $path = $request->file('image')->store('services', 'public');
            $validated['image_url'] = '/storage/' . $path;
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
            // Delete old local file if it exists
            if ($service->image_url && str_starts_with($service->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $service->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('services', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image']);

        $service->update($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($service->fresh());
    }

    public function destroy(Service $service)
    {
        // Clean up stored image
        if ($service->image_url && str_starts_with($service->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $service->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $service->delete();

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json(['message' => 'Service deleted successfully']);
    }
}
