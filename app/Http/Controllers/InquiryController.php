<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InquiryController extends Controller
{
    public function index()
    {
        // Only authenticated admins can list inquiries
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return response()->json(
            Inquiry::orderBy('created_at', 'desc')
                ->select(['id', 'reference_number', 'full_name', 'email', 'organization', 'sector', 'budget', 'timeline', 'status', 'created_at'])
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'    => 'required|string|max:255|regex:/^[\pL\s\'\-\.]+$/u',
            'email'        => 'required|email:rfc,dns|max:255',
            'organization' => 'required|string|max:500',
            'sector'       => 'required|string|max:100|in:Civil Works,Industrial,Commercial',
            'scope'        => 'required|string|min:10|max:5000',
            'budget'       => 'required|string|max:100',
            'timeline'     => 'required|string|max:100',
        ]);

        $inquiry = Inquiry::create($validated);

        return response()->json([
            'message'          => 'Inquiry submitted successfully',
            'reference_number' => $inquiry->reference_number,
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
            'data'    => $inquiry,
        ]);
    }

    public function destroy(Inquiry $inquiry)
    {
        $inquiry->delete();
        return response()->json(['message' => 'Inquiry deleted successfully']);
    }
}
