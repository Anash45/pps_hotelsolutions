<?php

namespace App\Http\Controllers;

use App\Models\KeyAssignment;
use App\Models\Code;
use App\Models\Hotel;
use App\Models\KeyType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Log;

class KeyAssignmentController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $keyTypes = KeyType::get();

        if ($user->role === 'admin') {
            $hotelId = $request->query('hotel_id');
            $hotels = Hotel::select('id', 'hotel_name')->get();

            $codes = [];
            if ($hotelId) {
                $codes = Code::with(['keyAssignment', 'hotel', 'keyType'])
                    ->where('hotel_id', $hotelId)
                    ->whereHas('keyAssignment')
                    ->orderByDesc(
                        KeyAssignment::select('id')
                            ->whereColumn('key_assignments.code_id', 'codes.id')
                            ->limit(1)
                    )
                    ->get();
            }

            return Inertia::render('Keys/Index', [
                'hotels' => $hotels,
                'codes' => $codes,
                'selectedHotel' => $hotelId,
                'isAdmin' => true,
                'keyTypes' => $keyTypes
            ]);
        } else {
            $codes = Code::with(['keyAssignment', 'keyType', 'hotel'])
                ->where('hotel_id', $user->hotel_id)
                ->whereHas('keyAssignment')
                ->orderByDesc(
                    KeyAssignment::select('id')
                        ->whereColumn('key_assignments.code_id', 'codes.id')
                        ->limit(1)
                )
                ->get();

            return Inertia::render('Keys/Index', [
                'codes' => $codes,
                'isAdmin' => false,
                'selectedHotel' => $user->hotel_id,
                'keyTypes' => $keyTypes
            ]);
        }
    }


    public function store(Request $request)
    {
        // Base rules
        $rules = [
            'hotel_id' => 'required|exists:hotels,id',
            'code_id' => 'required|exists:codes,id|unique:key_assignments,code_id',
            'salutation' => 'nullable|string',
            'title' => 'nullable|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'room_number' => 'nullable|string',
            'stay_from' => 'required|date',
            'stay_till' => 'required|date|after_or_equal:stay_from',
            'gdpr_consent' => 'boolean',
        ];

        // If GDPR consent is true → tighten rules
        if ($request->boolean('gdpr_consent')) {
            $rules['first_name'] = 'required|string';
            $rules['last_name'] = 'required|string';
            $rules['email'] = 'required|email';
            $rules['salutation'] = 'required|string';
        }

        // Validate request
        $validated = $request->validate($rules);

        // Extra check: code must belong to given hotel
        $belongs = Code::where('id', $validated['code_id'])
            ->where('hotel_id', $validated['hotel_id'])
            ->exists();

        if (!$belongs) {
            return response()->json([
                'success' => false,
                'message' => 'The selected code does not belong to the given hotel.',
            ], 422);
        }

        // Save KeyAssignment (exclude hotel_id)
        $assignment = KeyAssignment::create([
            'code_id' => $validated['code_id'],
            'salutation' => $validated['salutation'] ?? null,
            'title' => $validated['title'] ?? null,
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'room_number' => $validated['room_number'] ?? null,
            'stay_from' => $validated['stay_from'],
            'stay_till' => $validated['stay_till'],
            'gdpr_consent' => $validated['gdpr_consent'] ?? false,
        ]);

        // Update Code status → active
        Code::where('id', $validated['code_id'])->update(['status' => 'active']);

        // Log for debugging
        Log::info('KeyAssignment created successfully', [
            'assignment' => $assignment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Key assignment created successfully.',
            'assignment' => $assignment,
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:active,inactive',
        ]);

        $code = Code::findOrFail($id);
        $code->status = $validated['status'];
        $code->save();

        return response()->json([
            'success' => true,
            'message' => "Key status updated to {$validated['status']}.",
            'code' => $code,
        ]);
    }




    public function recognize(Request $request)
    {
        Log::info('Recognize request started', [
            'input' => $request->input('input'),
            'hotel_id' => $request->input('hotel_id')
        ]);

        $request->validate([
            'input' => 'required|string',
            'hotel_id' => 'required|exists:hotels,id',
        ]);

        $input = trim($request->input('input'));
        $hotelId = $request->input('hotel_id');

        Log::info('Trimmed input', ['input' => $input]);

        // Remove domain if input is a URL
        $codeString = preg_replace('#^https?://[^/]+/#', '', $input);
        Log::info('Processed code string from input', ['codeString' => $codeString]);

        // Try to find code (ignoring status/assignment for now)
        $baseQuery = Code::where('hotel_id', $hotelId)
            ->where(function ($q) use ($input, $codeString) {
                $q->where('code', $input)
                    ->orWhere('code', $codeString);
            });

        $code = $baseQuery->first();

        if (!$code) {
            Log::warning('Code not found', ['hotel_id' => $hotelId, 'input' => $input]);
            return response()->json([
                'recognized' => false,
                'error' => 'Code not found',
            ], 404);
        }

        if ($code->status !== 'inactive') {
            Log::warning('Code already active', ['code_id' => $code->id]);
            return response()->json([
                'recognized' => false,
                'error' => 'Code already active',
            ], 422);
        }

        if ($code->keyAssignment) {
            Log::warning('Code already assigned', ['code_id' => $code->id]);
            return response()->json([
                'recognized' => false,
                'error' => 'Code already assigned',
            ], 422);
        }

        Log::info('Code recognized successfully', ['code_id' => $code->id]);
        return response()->json([
            'recognized' => true,
            'code' => $code,
        ]);
    }


    public function show(KeyAssignment $keyAssignment)
    {
        $this->authorizeAccess($keyAssignment);

        return response()->json($keyAssignment->load('code.hotel', 'code.keyType'));
    }

    public function update(Request $request, $id)
    {
        $assignment = KeyAssignment::findOrFail($id);

        // Base rules
        $rules = [
            'hotel_id' => 'required|exists:hotels,id',
            'code_id' => [
                'required',
                'exists:codes,id',
                // ✅ allow current code_id but unique otherwise
                Rule::unique('key_assignments', 'code_id')->ignore($assignment->id),
            ],
            'salutation' => 'nullable|string',
            'title' => 'nullable|string',
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string',
            'room_number' => 'nullable|string',
            'stay_from' => 'required|date',
            'stay_till' => 'required|date|after_or_equal:stay_from',
            'gdpr_consent' => 'boolean',
        ];

        // If GDPR consent is true → tighten rules
        if ($request->boolean('gdpr_consent')) {
            $rules['first_name'] = 'required|string';
            $rules['last_name'] = 'required|string';
            $rules['email'] = 'required|email';
            $rules['salutation'] = 'required|string';
        }

        // Validate
        $validated = $request->validate($rules);

        // Extra check: code must belong to given hotel
        $belongs = Code::where('id', $validated['code_id'])
            ->where('hotel_id', $validated['hotel_id'])
            ->exists();

        if (!$belongs) {
            return response()->json([
                'success' => false,
                'message' => 'The selected code does not belong to the given hotel.',
            ], 422);
        }

        // Update KeyAssignment
        $assignment->update([
            'code_id' => $validated['code_id'],
            'salutation' => $validated['salutation'] ?? null,
            'title' => $validated['title'] ?? null,
            'first_name' => $validated['first_name'] ?? null,
            'last_name' => $validated['last_name'] ?? null,
            'email' => $validated['email'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'room_number' => $validated['room_number'] ?? null,
            'stay_from' => $validated['stay_from'],
            'stay_till' => $validated['stay_till'],
            'gdpr_consent' => $validated['gdpr_consent'] ?? false,
        ]);

        // Ensure Code is active
        Code::where('id', $validated['code_id'])->update(['status' => 'active']);

        Log::info('KeyAssignment updated successfully', [
            'assignment' => $assignment,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Key assignment updated successfully.',
            'assignment' => $assignment,
        ]);
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
