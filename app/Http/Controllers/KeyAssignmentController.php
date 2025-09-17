<?php

namespace App\Http\Controllers;

use App\Models\KeyAssignment;
use App\Models\Code;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeyAssignmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $hotelId = $request->query('hotel_id');
            $hotels = Hotel::select('id', 'hotel_name')->get();

            $codes = [];
            if ($hotelId) {
                $codes = Code::with(['keyAssignment', 'hotel', 'keyType'])
                    ->where('hotel_id', $hotelId)
                    ->where('status', 'active')
                    ->whereHas('keyAssignment')
                    ->get();
            }

            return Inertia::render('Keys/Index', [
                'hotels' => $hotels,
                'codes' => $codes,
                'selectedHotel' => $hotelId,
                'isAdmin' => true,
            ]);
        } else {
            $codes = Code::with(['keyAssignment', 'keyType', 'hotel'])
                ->where('hotel_id', $user->hotel_id)
                ->where('status', 'active')
                ->whereHas('keyAssignment')
                ->get();

            return Inertia::render('Keys/Index', [
                'codes' => $codes,
                'isAdmin' => false,
            ]);
        }
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'code_id' => 'required|exists:codes,id|unique:key_assignments,code_id',
            'salutation' => 'nullable|string',
            'title' => 'nullable|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'room_number' => 'nullable|string',
            'stay_from' => 'nullable|date',
            'stay_till' => 'nullable|date|after_or_equal:stay_from',
            'gdpr_consent' => 'boolean',
        ]);

        $assignment = KeyAssignment::create($validated);

        return redirect()->back()->with('success', 'Key assignment created successfully.');
    }

    public function show(KeyAssignment $keyAssignment)
    {
        $this->authorizeAccess($keyAssignment);

        return response()->json($keyAssignment->load('code.hotel', 'code.keyType'));
    }

    public function update(Request $request, KeyAssignment $keyAssignment)
    {
        $this->authorizeAccess($keyAssignment);

        $validated = $request->validate([
            'salutation' => 'nullable|string',
            'title' => 'nullable|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'room_number' => 'nullable|string',
            'stay_from' => 'nullable|date',
            'stay_till' => 'nullable|date|after_or_equal:stay_from',
            'gdpr_consent' => 'boolean',
        ]);

        $keyAssignment->update($validated);

        return redirect()->back()->with('success', 'Key assignment updated successfully.');
    }

    public function destroy(KeyAssignment $keyAssignment)
    {
        $this->authorizeAccess($keyAssignment);

        $keyAssignment->delete();

        return redirect()->back()->with('success', 'Key assignment deleted successfully.');
    }

    private function authorizeAccess(KeyAssignment $assignment)
    {
        $user = auth()->user();

        if ($user->role !== 'admin' && $assignment->code->hotel_id !== $user->hotel_id) {
            abort(403, 'Unauthorized');
        }
    }
}
