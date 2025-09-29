<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\Button;
use Illuminate\Http\Request;

class ButtonController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'hotel_id' => ['required', 'exists:hotels,id'],
            'type' => ['required', 'string', 'in:page,map,url,phone,wifi'],
            'text' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'text_color' => ['required', 'string', 'max:7'], // e.g. #ffffff
            'background_color' => ['required', 'string', 'max:7'],
            // Conditional fields depending on type
            'url' => ['nullable', 'string', 'max:2048'],
            'phone' => ['nullable', 'string', 'max:50'],
            'wifi_name' => ['nullable', 'string', 'max:255'],
            'wifi_password' => ['nullable', 'string', 'max:255'],
            'page_id' => ['nullable', 'exists:pages,id'],
        ]);

        // ✅ Authorization check
        $hotel = Hotel::findOrFail($validated['hotel_id']);
        if ($hotel->user_id !== $user->id && !$user->is_admin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // ✅ Get the last order value for this hotel
        $lastOrder = Button::where('hotel_id', $validated['hotel_id'])->max('order');

        // If no button exists, start from 1
        $validated['order'] = $lastOrder ? $lastOrder + 1 : 1;

        $button = Button::create($validated);

        return response()->json([
            'message' => 'Button created successfully!',
            'button' => $button,
        ], 201);
    }

    public function update(Request $request, Button $button)
    {
        $user = $request->user();

        // Authorization check
        $hotel = Hotel::findOrFail($button->hotel_id);
        if ($hotel->user_id !== $user->id && !$user->is_admin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'type' => ['required', 'string', 'in:page,map,url,phone,wifi'],
            'text' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'text_color' => ['required', 'string', 'max:7'],
            'background_color' => ['required', 'string', 'max:7'],
            'url' => ['nullable', 'string', 'max:2048'],
            'phone' => ['nullable', 'string', 'max:50'],
            'wifi_name' => ['nullable', 'string', 'max:255'],
            'wifi_password' => ['nullable', 'string', 'max:255'],
            'page_id' => ['nullable', 'exists:pages,id'],
        ]);

        $button->update($validated);

        return response()->json([
            'message' => 'Button updated successfully!',
            'button' => $button,
        ]);
    }

    public function destroy(Request $request, Button $button)
    {
        $user = $request->user();

        // Authorization check
        $hotel = Hotel::findOrFail($button->hotel_id);
        if ($hotel->user_id !== $user->id && !$user->is_admin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $button->delete();

        return response()->json([
            'message' => 'Button deleted successfully!',
        ]);
    }

    public function reorder(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'buttons' => 'required|array',
            'buttons.*.id' => 'required|exists:buttons,id',
            'buttons.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['buttons'] as $btnData) {
            $button = Button::find($btnData['id']);

            // ✅ Authorization check: must belong to hotel of current user
            if ($button->hotel->user_id !== $user->id && !$user->is_admin()) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $button->update(['order' => $btnData['order']]);
        }

        return response()->json([
            'message' => 'Button order updated successfully.',
        ]);
    }
}
