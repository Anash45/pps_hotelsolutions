<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Page;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class HotelPageController extends Controller
{
    public function show($key, $id)
    {
        // Find the page by id
        $page = Page::with('hotel')->find($id);

        if (!$page) {
            return response()->json([
                'message' => __('messages.hotelPageController.show.page_not_found')
            ], 404);
        }

        // Fetch selectedHotel with details (using page's hotel_id)
        $selectedHotel = null;
        if ($page->hotel_id) {
            $selectedHotel = Hotel::with([
                'buttons' => function ($q) {
                    $q->orderBy('order'); // ascending
                },
                'pages',
            ])->find($page->hotel_id);

            if (!$selectedHotel) {
                return response()->json([
                    'message' => __('messages.hotelPageController.show.hotel_not_found')
                ], 404);
            }
        }

        return inertia('HotelPages/Show', [
            'page' => $page,
            'selectedHotel' => $selectedHotel,
            'key' => $key, // ✅ pass key to frontend too (if needed)
        ]);
    }


    public function store(Request $request)
    {
        $user = auth()->user(); // logged-in user

        $validated = $request->validate([
            'hotel_id' => ['required', 'exists:hotels,id'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'slug' => ['nullable', 'string', 'max:255'],
        ]);

        // Authorization check
        $hotel = Hotel::findOrFail($validated['hotel_id']);
        if (($user->hotel?->id !== $hotel->id) && !$user->is_admin()) {
            return response()->json(['message' => __('messages.hotelPageController.store.unauthorized')], 403);
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
            'message' => __('messages.hotelPageController.store.success'),
            'page' => $page,
        ], 201);
    }

    public function update(Request $request, Page $page)
    {
        $user = auth()->user();

        // ✅ Authorization check
        $hotel = Hotel::findOrFail($page->hotel_id);
        if (($user->hotel?->id !== $hotel->id) && !$user->is_admin()) {
            return response()->json(['message' => __('messages.hotelPageController.update.unauthorized')], 403);
        }

        // ✅ Only validate title + content (no slug)
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    $plainText = trim(strip_tags($value));
                    if (strlen($plainText) === 0) {
                        $fail(__('messages.hotelPageController.update.validation_error'));
                    }
                },
            ],
        ]);

        // ✅ Update only title and content, leave slug untouched
        $page->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return response()->json([
            'message' => __('messages.hotelPageController.update.success'),
            'page' => $page,
        ]);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        // Find the page
        $page = Page::find($id);

        if (!$page) {
            return response()->json([
                'message' => __('messages.hotelPageController.destroy.not_found')
            ], 404);
        }

        // Check if user is admin or page belongs to user's hotel
        if (!$user->is_admin() && $page->hotel_id !== $user->hotel_id) {
            return response()->json([
                'message' => __('messages.hotelPageController.destroy.unauthorized')
            ], 403);
        }

        // Delete the page
        $page->delete();

        return response()->json([
            'message' => __('messages.hotelPageController.destroy.success'),
        ]);
    }

}
