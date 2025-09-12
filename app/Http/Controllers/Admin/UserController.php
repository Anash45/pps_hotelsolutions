<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Hotel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::paginate(10);
        return inertia('Users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return inertia('Users/Create');
    }

    public function store(Request $request)
    {
        // Base validation
        $rules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role' => 'required|in:admin,hotel',
        ];

        // Add hotel_name validation only if role is hotel
        if ($request->role === 'hotel') {
            $rules['hotel_name'] = 'required|string|max:255';
        }

        $request->validate($rules);

        $hotelId = null;

        // Create the hotel first if role is hotel
        if ($request->role === 'hotel') {
            $hotel = Hotel::create([
                'hotel_name' => $request->hotel_name,
            ]);
            $hotelId = $hotel->id;
        }

        // Create the user with optional hotel_id
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'hotel_id' => $hotelId,
        ]);

        return redirect()
            ->route('users.index')
            ->with('success', 'User created successfully.');
    }



    public function edit(User $user)
    {
        $user->load('hotel'); // eager-load the related hotel

        return inertia('Users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $rules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ];

        // Only validate role if editing another user
        if ($user->id !== auth()->id()) {
            $rules['role'] = 'required|in:admin,hotel';
        }

        // Only validate hotel_name if user is hotel
        if ($request->role === 'hotel') {
            $rules['hotel_name'] = 'required|string|max:255';
        }

        $request->validate($rules);

        $updateData = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
        ];

        // Only update role if not self
        if ($user->id !== auth()->id()) {
            $updateData['role'] = $request->role;
        }

        $user->update($updateData);

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'min:8|confirmed',
            ]);
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        // Handle hotel
        if ($user->role === 'hotel') {
            if ($user->hotel) {
                // Update existing hotel name
                $user->hotel->update([
                    'hotel_name' => $request->hotel_name,
                ]);
            } else {
                // Create a new hotel and assign user
                $hotel = Hotel::create([
                    'hotel_name' => $request->hotel_name,
                ]);
                $user->update([
                    'hotel_id' => $hotel->id,
                ]);
            }
        } elseif ($user->role === 'admin' && $user->hotel) {
            // Delete associated hotel if exists
            $user->hotel->delete();
            $user->update([
                'hotel_id' => null,
            ]);
        }

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated.');
    }



    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()
                ->route('users.index')
                ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('success', 'User deleted (soft).');
    }

}
