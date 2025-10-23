<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\KeyfinderConsentMail;
use App\Models\Code;
use App\Models\CodeGroup;
use App\Models\Hotel;
use App\Models\HotelView;
use App\Models\KeyType;
use Illuminate\Http\Request;
use Mail;
use Response;
use Str;
use Validator;

class CodesController extends Controller
{

    public function showByKey($code)
    {
        $codeData = Code::with(['hotel', 'keyAssignment', 'keyType'])
            ->where('code', $code)
            ->firstOrFail();

        $selectedHotel = null;

        if ($codeData->hotel_id) {
            $selectedHotel = Hotel::with([
                'buttons' => fn($q) => $q->orderBy('order'),
                'pages',
            ])->findOrFail($codeData->hotel_id);

            // ✅ Record view
            $visitorIp = request()->ip();
            $alreadyViewed = HotelView::where('hotel_id', $selectedHotel->id)
                ->where('visitor_ip', $visitorIp)
                ->exists();

            HotelView::create([
                'hotel_id' => $selectedHotel->id,
                'visitor_ip' => $visitorIp,
                'is_unique' => !$alreadyViewed,
            ]);
        }

        // ✅ Prepare meta info
        $meta = [
            'title' => $selectedHotel->heading ?? 'Hotel Information',
            'description' => $selectedHotel->sub_heading
                ? strip_tags($selectedHotel->sub_heading)
                : 'Explore your hotel details and services.',
            'image' => $selectedHotel->logo_image
                ? '/storage/'.$selectedHotel->logo_image
                : '/images/building-placeholder.webp',
            'url' => request()->fullUrl(),
        ];

        return inertia('Codes/Show', [
            'codeDetails' => $codeData,
            'selectedHotel' => $selectedHotel,
        ])->withViewData(['meta' => $meta]);
    }




    public function userStore(Request $request)
    {
        $code = Code::where('code', $request->input('code_id'))
            ->with('keyAssignment')
            ->firstOrFail();

        // 🚨 Check if assignment already exists
        if ($code->keyAssignment) {
            return response()->json([
                'success' => false,
                'message' => 'This key\'s data is already saved.',
            ], 422);
        }

        // ✅ Validation rules
        $rules = [
            'stay_from' => 'required|date',
            'stay_till' => 'required|date|after:stay_from',
            'phone_number' => 'required|string',
        ];

        // If GDPR consent → stricter rules
        if ($request->boolean('gdpr_consent')) {
            $rules['first_name'] = 'required|string';
            $rules['last_name'] = 'required|string';
            $rules['email'] = 'required|email';
            $rules['salutation'] = 'required|string';
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Save key assignment
        $assignment = $code->keyAssignment()->create([
            'salutation' => $request->input('salutation'),
            'title' => $request->input('title'),
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'room_number' => $request->input('room_number'),
            'phone_number' => $request->input('phone_number'),
            'stay_from' => $request->input('stay_from'),
            'stay_till' => $request->input('stay_till'),
            'gdpr_consent' => $request->boolean('gdpr_consent'),
        ]);

        // ✅ Mark the code itself as active
        $code->status = 'active';
        $code->save();
        Mail::to($request->input('email'))
            ->send(new KeyfinderConsentMail($code));

        return response()->json([
            'success' => true,
            'message' => 'Key assignment saved successfully.',
            'assignment' => $assignment,
            'code' => $code,
        ]);
    }

    public function unsubscribe($code)
    {
        $code = Code::with('keyAssignment')->where('code', $code)->firstOrFail();


        // Delete assignment if exists
        if ($code->keyAssignment) {
            $code->keyAssignment->delete();
        }

        return inertia('Codes/Unsubscribe', [
            'codeDetails' => $code,
        ]);
    }


    public function makeActive($code)
    {
        $code = Code::where('code', $code)->firstOrFail();

        if ($code) {
            $code->status = 'active';
            $code->save();
        }

        return redirect()->back()->with([
            'success' => 'Key has been activated successfully.'
        ]);
    }


    public function index()
    {
        $hotels = Hotel::get();
        $keyTypes = KeyType::get();
        $codeGroups = CodeGroup::with(['hotel', 'keyType', 'codes'])->orderByDesc('created_at')->get();
        return inertia('Codes/Index', [
            'hotels' => $hotels,
            'keyTypes' => $keyTypes,
            'codeGroups' => $codeGroups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'key_type' => 'required|exists:key_types,name',
            'no_of_codes' => 'required|integer|min:1',
        ]);

        $hotel = Hotel::findOrFail($validated['hotel_id']);
        $keyType = KeyType::where('name', $validated['key_type'])->firstOrFail();
        $count = (int) $validated['no_of_codes'];

        $group = CodeGroup::create([
            'hotel_id' => $hotel->id,
            'key_type_id' => $keyType->id,
            'count' => $count,
            'status' => 'active',
            'generated_at' => now(),
        ]);

        $allowedChars = 'ABCDEFGHJKMNPQRSTUVWX2346789';
        $length = 6;

        $codes = [];
        $generatedCodes = [];
        $existingCodes = Code::pluck('code')->toArray(); // fetch all existing codes once
        $batchGenerated = [];

        while (count($codes) < $count) {
            // generate one code
            $code = '';
            for ($j = 0; $j < $length; $j++) {
                $code .= $allowedChars[random_int(0, strlen($allowedChars) - 1)];
            }

            // ensure uniqueness
            if (in_array($code, $existingCodes) || in_array($code, $batchGenerated)) {
                continue; // skip and regenerate
            }

            $batchGenerated[] = $code;

            $codes[] = [
                'hotel_id' => $hotel->id,
                'code' => $code,
                'key_type_id' => $keyType->id,
                'status' => 'inactive',
                'generated_at' => now(),
                'group_id' => $group->id,
            ];

            $generatedCodes[] = [
                'code' => $code,
                'hotel_name' => $hotel->hotel_name,
                'key_type_name' => $keyType->display_name,
                'status' => 'inactive',
                'generated_at' => now()->format('Y-m-d H:i:s'),
            ];
        }

        Code::insert($codes);

        return redirect()->back()->with([
            'success' => "{$count} codes generated and CSV downloaded.",
            'generatedCodes' => $generatedCodes,
        ]);
    }

    public function deleteGroup($groupId)
    {
        $group = CodeGroup::with('codes.keyAssignment')->findOrFail($groupId);

        // Check if any code in the group has a key assignment
        $hasAssignments = $group->codes->contains(function ($code) {
            return $code->keyAssignment !== null;
        });

        if ($hasAssignments) {
            return redirect()->back()->with([
                'error' => 'This code group cannot be deleted because one or more codes are already assigned.',
            ]);
        }

        $count = $group->codes()->count();

        // Delete all codes in the group
        $group->codes()->delete();

        // Delete the group itself
        $group->delete();

        return redirect()->back()->with([
            'success' => "{$count} codes and the group were deleted successfully.",
        ]);
    }


    public function downloadCsv(CodeGroup $group)
    {
        $codes = $group->codes()->with('hotel', 'keyType')->get();

        $csvHeader = ['Hotel', 'URL', 'Serial', 'Type', 'Created At'];

        $callback = function () use ($codes, $csvHeader) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $csvHeader);

            foreach ($codes as $code) {
                fputcsv($file, [
                    $code->hotel->hotel_name ?? '',
                    env('LINK_URL') . '/key/' . $code->code,
                    $code->code ?? '',
                    $code->keyType->display_name ?? $code->keyType->name,
                    $code->created_at?->format('d.m.Y H:i') ?? '',
                ]);
            }

            fclose($file);
        };

        $fileName = 'codes_group_' . $group->id . '.csv';

        return Response::stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
        ]);
    }

}