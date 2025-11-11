<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Button;
use Illuminate\Http\Request;

class ButtonController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'hotel_id' => ['required', 'exists:hotels,id'],
            'type' => ['required', 'string', 'in:page,map,url,phone,wifi,whatsapp,email'],
            'text' => ['required', 'string', 'max:255'],
            'text_de' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'text_color' => ['required', 'string', 'max:100'], // e.g. #ffffff
            'background_color' => ['required', 'string', 'max:100'],

            // Conditional fields depending on type
            'url' => ['nullable', 'string', 'max:2048'],
            'phone' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['nullable', 'string', 'max:50'], // could also enforce regex like /^\+?[0-9]{6,15}$/
            'email' => ['nullable', 'email', 'max:255'],

            'wifi_name' => ['nullable', 'string', 'max:255'],
            'wifi_password' => ['nullable', 'string', 'max:255'],
            'page_id' => ['nullable', 'exists:pages,id'],
        ]);

        // ✅ Authorization check
        $hotel = Hotel::findOrFail($validated['hotel_id']);
        if (($user->hotel?->id !== $hotel->id) && !$user->is_admin()) {
            return response()->json(['message' => __('messages.buttonController.btn.store.unauthorized')], 403);
        }

        // ✅ Get the last order value for this hotel
        $lastOrder = Button::where('hotel_id', $validated['hotel_id'])->max('order');

        // If no button exists, start from 1
        $validated['order'] = $lastOrder ? $lastOrder + 1 : 1;

        $button = Button::create($validated);

        return response()->json([
            'message' => __('messages.buttonController.btn.store.success'),
            'button' => $button,
        ], 201);
    }

    public function update(Request $request, Button $button)
    {

        $user = auth()->user();

        // Authorization check
        $hotel = Hotel::findOrFail($button->hotel_id);
        if (($user->hotel?->id !== $hotel->id) && !$user->is_admin()) {
            return response()->json(['message' => __('messages.buttonController.btn.update.unauthorized')], 403);
        }

        $validated = $request->validate([
            'type' => ['required', 'string', 'in:page,map,url,phone,wifi,whatsapp,email'],
            'text' => ['required', 'string', 'max:255'],
            'text_de' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'text_color' => ['required', 'string', 'max:100'],
            'background_color' => ['required', 'string', 'max:100'],

            // URL types
            'url' => ['nullable', 'string', 'max:2048'],

            // Phone
            'phone' => ['nullable', 'string', 'max:50'],

            // WhatsApp
            'whatsapp' => ['nullable', 'string', 'max:50'], // usually number with country code

            // Email
            'email' => ['nullable', 'email', 'max:255'],

            // WiFi
            'wifi_name' => ['nullable', 'string', 'max:255'],
            'wifi_password' => ['nullable', 'string', 'max:255'],

            // Page
            'page_id' => ['nullable', 'exists:pages,id'],
        ]);

        $button->update($validated);

        return response()->json([
            'message' => __('messages.buttonController.btn.update.success'),
            'button' => $button,
        ]);
    }

    public function destroy(Request $request, Button $button)
    {

        $user = auth()->user();

        // Authorization check
        $hotel = Hotel::findOrFail($button->hotel_id);
        if (($user->hotel?->id !== $hotel->id) && !$user->is_admin()) {
            return response()->json(['message' => __('messages.buttonController.btn.destroy.unauthorized')], 403);
        }

        $button->delete();

        return response()->json([
            'message' => __('messages.buttonController.btn.destroy.success'),
        ]);
    }

    public function reorder(Request $request)
    {

        $user = auth()->user();

        $validated = $request->validate([
            'buttons' => 'required|array',
            'buttons.*.id' => 'required|exists:buttons,id',
            'buttons.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['buttons'] as $btnData) {
            $button = Button::find($btnData['id']);

            // ✅ Authorization check: must belong to hotel of current user
            if (($user->hotel?->id !== $button->hotel_id) && !$user->is_admin()) {
                return response()->json(['message' => __('messages.buttonController.btn.reorder.unauthorized')], 403);
            }

            $button->update(['order' => $btnData['order']]);
        }

        return response()->json([
            'message' => __('messages.buttonController.btn.reorder.success'),
        ]);
    }

    public function trackView(Button $button)
    {
        $button->views()->create([
            'ip_address' => request()->ip(),
            'viewed_at' => now(),
        ]);

        return response()->json([
            'message' => __('messages.buttonController.btn.trackView.success'),
        ]);
    }
}
