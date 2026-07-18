<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('service_id', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|string|unique:services,service_id',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'category' => 'required|string',
            'details' => 'nullable|array',
        ]);

        $service = Service::create($validated);
        return response()->json($service, 211); // 201 Created (using standard status or 201 is fine, wait, 211 was a typo? Let's use 201 Created!)
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'service_id' => 'required|string|unique:services,service_id,' . $service->id,
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'required|string',
            'image_url' => 'nullable|string',
            'category' => 'required|string',
            'details' => 'nullable|array',
        ]);

        $service->update($validated);
        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully']);
    }
}
