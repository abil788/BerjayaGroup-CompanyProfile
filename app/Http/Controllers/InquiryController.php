<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function index()
    {
        return response()->json(Inquiry::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'organization' => 'required|string|max:255',
            'sector' => 'required|string|max:255',
            'scope' => 'required|string',
            'budget' => 'required|string|max:255',
            'timeline' => 'required|string|max:255',
        ]);

        $inquiry = Inquiry::create($validated);
        return response()->json([
            'message' => 'Inquiry submitted successfully',
            'reference_number' => $inquiry->reference_number,
            'data' => $inquiry
        ], 201);
    }

    public function updateStatus(Request $request, Inquiry $inquiry)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:Pending,In Review,Contacted,Closed',
        ]);

        $inquiry->update($validated);
        return response()->json([
            'message' => 'Status updated successfully',
            'data' => $inquiry
        ]);
    }

    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();
        return response()->json(['message' => 'Inquiry deleted successfully']);
    }
}
