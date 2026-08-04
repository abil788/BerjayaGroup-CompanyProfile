<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    private const CACHE_KEY = 'projects:all';
    private const CACHE_TTL = 600; // 10 minutes

    public function index()
    {
        $projects = Cache::remember(self::CACHE_KEY, self::CACHE_TTL, function () {
            $data = Project::orderBy('completion_year', 'desc')->get()->toArray();
            return !empty($data) ? $data : null;
        });

        if (empty($projects)) {
            Cache::forget(self::CACHE_KEY);
            $projects = Project::orderBy('completion_year', 'desc')->get()->toArray();
        }

        return response()->json($projects)
            ->header('Cache-Control', 'no-cache, must-revalidate');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:200',
            'client'          => 'required|string|max:200',
            'category'        => 'required|string|max:100',
            'completion_year' => 'required|integer|min:1990|max:2100',
            'location'        => 'required|string|max:200',
            'budget'          => 'required|string|max:100',
            'description'     => 'required|string|max:2000',
            'image_url'       => 'nullable|string|max:500',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'featured'        => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = ImageService::optimizeAndSave($request->file('image'), 'projects');
            if ($path) {
                $validated['image_url'] = $path;
            }
        }

        unset($validated['image']);

        $project = Project::create($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title'           => 'required|string|max:200',
            'client'          => 'required|string|max:200',
            'category'        => 'required|string|max:100',
            'completion_year' => 'required|integer|min:1990|max:2100',
            'location'        => 'required|string|max:200',
            'budget'          => 'required|string|max:100',
            'description'     => 'required|string|max:2000',
            'image_url'       => 'nullable|string|max:500',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
            'featured'        => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old file if it exists
            ImageService::deleteByUrl($project->image_url);
            $path = ImageService::optimizeAndSave($request->file('image'), 'projects');
            if ($path) {
                $validated['image_url'] = $path;
            }
        }

        unset($validated['image']);

        $project->update($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($project->fresh());
    }

    public function destroy(Project $project)
    {
        // Clean up stored image
        ImageService::deleteByUrl($project->image_url);

        $project->delete();

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
