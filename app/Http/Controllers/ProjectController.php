<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
            return Project::orderBy('completion_year', 'desc')->get();
        });

        return response()->json($projects)
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
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
            'image_url'       => 'nullable|url|max:500',
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'featured'        => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = '/storage/' . $path;
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
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'featured'        => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old local file if it exists
            if ($project->image_url && str_starts_with($project->image_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $project->image_url);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        unset($validated['image']);

        $project->update($validated);

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json($project->fresh());
    }

    public function destroy(Project $project)
    {
        // Clean up stored image
        if ($project->image_url && str_starts_with($project->image_url, '/storage/')) {
            $oldPath = str_replace('/storage/', '', $project->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $project->delete();

        Cache::forget(self::CACHE_KEY); // Invalidate cache

        return response()->json(['message' => 'Project deleted successfully']);
    }
}
