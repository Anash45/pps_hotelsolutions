<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Code;
use App\Models\CodeGroup;
use App\Models\Hotel;
use App\Models\KeyType;
use Illuminate\Http\Request;
use Response;
use Str;

class CodesController extends Controller
{
    public function index()
    {
        $hotels = Hotel::get();
        $keyTypes = KeyType::get();
        $codeGroups = CodeGroup::with(['hotel', 'keyType'])->orderByDesc('created_at')->get();
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

        $codes = [];
        $generatedCodes = [];

        for ($i = 0; $i < $count; $i++) {
            $code = Str::random(12);

            $codes[] = [
                'hotel_id' => $hotel->id,
                'code' => $code,
                'key_type_id' => $keyType->id,
                'status' => 'active',
                'generated_at' => now(),
                'group_id' => $group->id,
            ];

            $generatedCodes[] = [
                'code' => $code,
                'hotel_name' => $hotel->hotel_name,
                'key_type_name' => $keyType->display_name,
                'status' => 'active',
                'generated_at' => now()->format('Y-m-d H:i:s'),
            ];
        }

        Code::insert($codes);

        // Store generated codes in flash to use in Inertia
        return redirect()->back()->with([
            'success' => "{$count} URLs generated and CSV downloaded.",
            'generatedCodes' => $generatedCodes,
        ]);
    }

    public function downloadCsv(CodeGroup $group)
    {
        $codes = $group->codes()->with('hotel', 'keyType')->get();

        $csvHeader = ['Hotel', 'URL', 'Type', 'Created At'];

        $callback = function () use ($codes, $csvHeader) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $csvHeader);

            foreach ($codes as $code) {
                fputcsv($file, [
                    $code->hotel->hotel_name ?? '',
                    env('LINK_URL') . '/qr/' . $code->code, // adjust your URL prefix if needed
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