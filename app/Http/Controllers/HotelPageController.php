<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Page;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HotelPageController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user(); // logged-in user

        $validated = $request->validate([
            'hotel_id' => ['required', 'exists:hotels,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);

        // Authorization check
        $hotel = Hotel::findOrFail($validated['hotel_id']);
        if ($hotel->user_id !== $user->id && !$user->is_admin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Auto-generate slug if not provided
        $slug = $validated['slug'] ?? Str::slug($validated['title']);

        // Ensure unique slug per hotel
        $originalSlug = $slug;
        $count = 1;
        while (Page::where('slug', $slug)->where('hotel_id', $validated['hotel_id'])->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $page = Page::create([
            'hotel_id' => $validated['hotel_id'],
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
        ]);

        return response()->json([
            'message' => 'Page saved successfully!',
            'page' => $page,
        ], 201);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        // Find the page
        $page = Page::findOrFail($id);

        // Check if user is admin or page belongs to user's hotel
        if (!$user->is_admin() && $page->hotel_id !== $user->hotel_id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete the page
        $page->delete();

        return response()->json([
            'message' => 'Page deleted successfully.',
        ]);
    }

}
