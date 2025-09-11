<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use File;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Storage;
use Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // Load the logged-in user along with their associated hotel (if any)
        $user = $request->user()->load('hotel');

        return Inertia::render('Profile/Edit', [
            'status' => session('status'),
            'user' => $user,       // user data for form
            'hotel' => $user->hotel, // hotel details (nullable)
        ]);
    }


    /**
     * Update the user's profile information.
     */

    public function updatePhoto(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|max:5120', // 5 MB
        ]);

        $user = $request->user();

        // Delete previous image if exists
        if ($user->profile_image && Storage::disk('public')->exists($user->profile_image)) {
            Storage::disk('public')->delete($user->profile_image);
        }

        // Store new image
        $path = $request->file('profile_image')->store('profile-images', 'public');

        // Update DB
        $user->profile_image = $path;
        $user->save();

        return back()->with('success', 'Photo updated');
    }



    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Base validation
        $rules = [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
        ];

        $messages = [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
        ];

        // Only validate hotel_name if user is a hotel
        if ($user->role === 'hotel') {
            $rules['hotel_name'] = ['required', 'string', 'max:255'];
            $messages['hotel_name.required'] = 'Hotel name is required.';
        }

        $validated = $request->validate($rules, $messages);

        // Update user
        $user->first_name = $validated['first_name'];
        $user->last_name = $validated['last_name'];
        $user->save();

        // Update or create hotel for hotel users
        if ($user->role === 'hotel') {
            if ($user->hotel) {
                $user->hotel->update([
                    'hotel_name' => $validated['hotel_name'],
                ]);
            } else {
                $user->hotel()->create([
                    'hotel_name' => $validated['hotel_name'],
                ]);
            }
        }

        return redirect()->route('profile.edit')->with('success', 'Profile updated.');
    }



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
