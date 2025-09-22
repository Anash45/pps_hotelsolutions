<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HotelPageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => ['required', 'exists:hotels,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:hotel_pages,slug'],
        ]);

        // auto-generate slug if not provided
        $slug = $validated['slug'] ?? Str::slug($validated['title']);

        // ensure unique slug per hotel
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
}
