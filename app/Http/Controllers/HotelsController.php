<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Storage;

class HotelsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $hotelId = $request->query('hotel_id');
            $hotels = Hotel::select('id', 'hotel_name')->get();

            $selectedHotel = null;
            if ($hotelId) {
                $selectedHotel = Hotel::with([
                    'buttons' => function ($q) {
                        $q->orderBy('order'); // ascending
                    },
                    'pages',
                ])->findOrFail($hotelId);
            }

            return Inertia::render('Hotels/Index', [
                'hotels' => $hotels,            // for dropdown selection
                'selectedHotel' => $selectedHotel, // details of chosen hotel
                'isAdmin' => true,
            ]);
        } else {
            $hotel = Hotel::with([
                'buttons' => function ($q) {
                    $q->orderBy('order'); // ascending
                },
                'pages'
            ])->find($user->hotel_id);

            return Inertia::render('Hotels/Index', [
                'selectedHotel' => $hotel,
                'isAdmin' => false,
            ]);
        }
    }

    public function testLanding(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $hotelId = $request->query('hotel_id');
            $hotels = Hotel::select('id', 'hotel_name')->get();

            $selectedHotel = null;
            if ($hotelId) {
                $selectedHotel = Hotel::with([
                    'buttons' => function ($q) {
                        $q->orderBy('order'); // ascending
                    },
                    'pages',
                ])->findOrFail($hotelId);
            }

            return Inertia::render('TestLanding/Show', [
                'hotels' => $hotels,            // for dropdown selection
                'selectedHotel' => $selectedHotel, // details of chosen hotel
                'isAdmin' => true,
            ]);
        } else {
            $hotel = Hotel::with([
                'buttons' => function ($q) {
                    $q->orderBy('order'); // ascending
                },
                'pages'
            ])->find($user->hotel_id);

            return Inertia::render('TestLanding/Show', [
                'selectedHotel' => $hotel,
                'isAdmin' => false,
            ]);
        }
    }

    public function updateBranding(Request $request, Hotel $hotel)
    {
        $user = auth()->user();

        if (!$user->is_admin() && $user->hotel_id !== $hotel->id) {
            abort(403, 'Unauthorized');
        }

        // var_dump($request);

        $validated = $request->validate([
            'heading' => 'nullable|string|max:255',
            'sub_heading' => 'nullable|string|max:255',
            'sub_heading_de' => 'required_with:sub_heading|string|max:255',
            'keyfinder_heading' => 'nullable|string|max:255',
            'keyfinder_heading_de' => 'required_with:keyfinder_heading|string|max:255',
            'primary_color' => 'nullable|string|max:100',
            'background_color' => 'nullable|string|max:100',
            'text_color' => 'nullable|string|max:100',
            'button_text_color' => 'nullable|string|max:100',
            'page_text_color' => 'nullable|string|max:100',
            'key_finder_page_text' => 'nullable|string',
            'key_finder_page_text_de' => 'required_with:key_finder_page_text|string',
            'logo_image' => 'nullable|image|max:10240', // 10 MB
            'banner_image' => 'nullable|image|max:10240',
            'key_finder_bottom_heading' => 'nullable|string|max:100',
            'key_finder_bottom_heading_de' => 'required_with:key_finder_bottom_heading|string|max:100',
            'key_finder_bottom_description' => 'nullable|string|max:1000',
            'key_finder_bottom_description_de' => 'required_with:key_finder_bottom_description|string|max:1000',
            'key_finder_bottom_btn_text' => 'nullable|string|max:100',
            'key_finder_bottom_btn_text_de' => 'required_with:key_finder_bottom_btn_text|string|max:100',
            'key_finder_bottom_btn_url' => 'nullable|string|max:100',
            'key_finder_bottom_btn_text_color' => 'nullable|string|max:100',
            'key_finder_bottom_btn_bg_color' => 'nullable|string|max:100',
            'section_banner_image' => 'nullable|image|max:10240',
        ]);

        // ✅ Handle logo removal
        if ($request->boolean('logo_image_removed')) {
            if ($hotel->logo_image && Storage::disk('public')->exists($hotel->logo_image)) {
                Storage::disk('public')->delete($hotel->logo_image);
            }
            $validated['logo_image'] = null;
        }

        // ✅ Handle logo upload
        if ($request->hasFile('logo_image')) {
            // Delete old logo if exists
            if ($hotel->logo_image && Storage::disk('public')->exists($hotel->logo_image)) {
                Storage::disk('public')->delete($hotel->logo_image);
            }

            // Store new logo
            $validated['logo_image'] = $request->file('logo_image')
                ->store('hotels', 'public');
        }

        // ✅ Handle logo removal
        if ($request->boolean('banner_image_removed')) {
            if ($hotel->banner_image && Storage::disk('public')->exists($hotel->banner_image)) {
                Storage::disk('public')->delete($hotel->banner_image);
            }
            $validated['banner_image'] = null;
        }
        // ✅ Handle banner upload
        if ($request->hasFile('banner_image')) {
            if ($hotel->banner_image && Storage::disk('public')->exists($hotel->banner_image)) {
                Storage::disk('public')->delete($hotel->banner_image);
            }
            $validated['banner_image'] = $request->file('banner_image')
                ->store('hotels', 'public');
        }

        // ✅ Handle logo removal
        if ($request->boolean('section_banner_image_removed')) {
            if ($hotel->section_banner_image && Storage::disk('public')->exists($hotel->section_banner_image)) {
                Storage::disk('public')->delete($hotel->section_banner_image);
            }
            $validated['section_banner_image'] = null;
        }
        // ✅ Handle banner upload
        if ($request->hasFile('section_banner_image')) {
            if ($hotel->section_banner_image && Storage::disk('public')->exists($hotel->section_banner_image)) {
                Storage::disk('public')->delete($hotel->section_banner_image);
            }
            $validated['section_banner_image'] = $request->file('section_banner_image')
                ->store('hotels', 'public');
        }

        $hotel->update($validated);

        // ✅ Return updated hotel as JSON (like API)
        return response()->json([
            'success' => true,
            'hotel' => $hotel->fresh(),
        ]);
    }


}
