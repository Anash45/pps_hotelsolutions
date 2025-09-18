<?php

namespace App\Http\Controllers;

use App\Models\KeyAssignment;
use App\Models\Code;
use App\Models\Hotel;
use App\Models\KeyType;
use Illuminate\Http\Request;
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
            $availableCodes = [];
            if ($hotelId) {
                $codes = Code::with(['keyAssignment', 'hotel', 'keyType'])
                    ->where('hotel_id', $hotelId)
                    ->where('status', 'active')
                    ->whereHas('keyAssignment')
                    ->get();

                $availableCodes = Code::with(['hotel', 'keyType'])
                    ->where('hotel_id', $hotelId)
                    ->where('status', 'inactive')
                    ->doesntHave('keyAssignment')
                    ->get();
            }

            return Inertia::render('Keys/Index', [
                'hotels' => $hotels,
                'codes' => $codes,
                'availableCodes' => $availableCodes,
                'selectedHotel' => $hotelId,
                'isAdmin' => true,
                'keyTypes' => $keyTypes
            ]);
        } else {
            $codes = Code::with(['keyAssignment', 'keyType', 'hotel'])
                ->where('hotel_id', $user->hotel_id)
                ->where('status', 'active')
                ->whereHas('keyAssignment')
                ->get();

            $availableCodes = Code::with(['hotel', 'keyType'])
                ->where('hotel_id', $user->hotel_id)
                ->where('status', 'inactive')
                ->doesntHave('keyAssignment')
                ->get();

            return Inertia::render('Keys/Index', [
                'codes' => $codes,
                'availableCodes' => $availableCodes,
                'isAdmin' => false,
                'selectedHotel' => $user->hotel_id,
                'keyTypes' => $keyTypes
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

        // Try to find code by code string and hotel
        $query = Code::where('hotel_id', $hotelId)
            ->where(function ($q) use ($input, $codeString) {
                $q->where('code', $input)
                    ->orWhere('code', $codeString);
            })
            ->where('status', 'inactive')
            ->doesntHave('keyAssignment');

        Log::info('Executing code lookup query', [
            'hotel_id' => $hotelId,
            'search_terms' => [$input, $codeString]
        ]);

        $code = $query->first();

        if ($code) {
            Log::info('Code recognized successfully', ['code_id' => $code->id]);
            return response()->json([
                'recognized' => true,
                'code' => $code,
            ]);
        }

        Log::warning('No matching code found', [
            'hotel_id' => $hotelId,
            'input' => $input,
            'codeString' => $codeString
        ]);

        return response()->json([
            'recognized' => false,
        ]);
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
