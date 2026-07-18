<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('completion_year', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'client' => 'required|string',
            'category' => 'required|string',
            'completion_year' => 'required|integer',
            'location' => 'required|string',
            'budget' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'client' => 'required|string',
            'category' => 'required|string',
            'completion_year' => 'required|integer',
            'location' => 'required|string',
            'budget' => 'required|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'featured' => 'boolean',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}
