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
                    'buttons',
                    'pages'
                ])->find(id: $hotelId);
            }

            return Inertia::render('Hotels/Index', [
                'hotels' => $hotels,            // for dropdown selection
                'selectedHotel' => $selectedHotel, // details of chosen hotel
                'isAdmin' => true,
            ]);
        } else {
            $hotel = Hotel::with([
                'buttons',
                'pages'
            ])->find($user->hotel_id);

            return Inertia::render('Hotels/Index', [
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

        $validated = $request->validate([
            'heading' => 'nullable|string|max:255',
            'primary_color' => 'nullable|string|max:7',
            'background_color' => 'nullable|string|max:7',
            'text_color' => 'nullable|string|max:7',
            'button_text_color' => 'nullable|string|max:7',
            'page_text_color' => 'nullable|string|max:7',
            'key_finder_page_text' => 'nullable|string',
            'logo_image' => 'nullable|image|max:10240', // 10 MB
            'banner_image' => 'nullable|image|max:10240',
        ]);

        // ✅ Handle logo upload
        if ($request->hasFile('logo_image')) {
            if ($hotel->logo_image && Storage::disk('public')->exists($hotel->logo_image)) {
                Storage::disk('public')->delete($hotel->logo_image);
            }
            $validated['logo_image'] = $request->file('logo_image')
                ->store('hotels', 'public');
        }

        // ✅ Handle banner upload
        if ($request->hasFile('banner_image')) {
            if ($hotel->banner_image && Storage::disk('public')->exists($hotel->banner_image)) {
                Storage::disk('public')->delete($hotel->banner_image);
            }
            $validated['banner_image'] = $request->file('banner_image')
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
