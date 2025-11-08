<?php

namespace App\Http\Controllers;

use App\Models\ButtonView;
use App\Models\Code;
use App\Models\Hotel;
use App\Models\HotelView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->role === 'admin') {
            $hotelId = $request->query('hotel_id');
            $hotels = Hotel::select('id', 'hotel_name')->get();

            $selectedHotel = null;
            $viewsData = [];

            if ($hotelId) {
                $selectedHotel = Hotel::find($hotelId);

                if (!$selectedHotel) {
                    return response()->json([
                        'message' => __('messages.dashboardController.index.hotel_not_found')
                    ], 404);
                }

                $viewsData = $this->getViewsForHotel($hotelId);
            }

            return Inertia::render('Dashboard/Index', [
                'hotels' => $hotels,
                'selectedHotel' => $selectedHotel,
                'viewsData' => $viewsData, // ✅ structured
                'isAdmin' => true,
            ]);
        } else {
            $hotel = Hotel::find($user->hotel_id);

            if (!$hotel) {
                return response()->json([
                    'message' => __('messages.dashboardController.index.no_hotel_selected')
                ], 404);
            }

            $viewsData = [];
            if ($hotel) {
                $viewsData = $this->getViewsForHotel($hotel->id);
            }

            return Inertia::render('Dashboard/Index', [
                'selectedHotel' => $hotel,
                'viewsData' => $viewsData,
                'isAdmin' => false,
            ]);
        }
    }

    private function getViewsForHotel($hotelId)
    {
        $now = Carbon::now();

        $ranges = [
            '7_days' => 7,
            '30_days' => 30,
            '90_days' => 90,
        ];

        $result = [];

        foreach ($ranges as $label => $daysCount) {

            // Button views in this period
            $views = ButtonView::with('button')
                ->whereHas('button', fn($q) => $q->where('hotel_id', $hotelId))
                ->where('viewed_at', '>=', $now->copy()->subDays($daysCount - 1))
                ->orderBy('viewed_at', 'desc')
                ->get();

            $groupedButtons = $views->groupBy('button_id')->map(function ($items, $buttonId) {
                return [
                    'button_id' => $buttonId,
                    'button_text' => $items->first()->button->text ?? __('messages.dashboardController.getViewsForHotel.button_text_na'),
                    'total_views' => $items->count(),
                    'unique_views' => $items->unique('ip_address')->count(),
                    'views' => $items->map(fn($v) => [
                        'id' => $v->id,
                        'ip_address' => $v->ip_address,
                        'viewed_at' => $v->viewed_at,
                    ]),
                ];
            })->values();

            // Hotel views in this period
            $hotelViews = HotelView::where('hotel_id', $hotelId)
                ->where('created_at', '>=', $now->copy()->subDays($daysCount - 1))
                ->get();

            $uniqueHotelViews = $hotelViews->unique('visitor_ip');

            // Chart data: always include all dates
            $chartData = [];
            for ($i = 0; $i < $daysCount; $i++) {
                $date = $now->copy()->subDays($daysCount - $i - 1)->format('Y-m-d');

                $viewsForDay = $hotelViews->filter(fn($v) => $v->created_at->format('Y-m-d') === $date);

                $chartData[] = [
                    'date' => $date,
                    'total_views' => $viewsForDay->count(),
                    'unique_views' => $viewsForDay->unique('visitor_ip')->count(),
                ];
            }

            $result[$label] = [
                'buttons' => $groupedButtons,
                'hotel_views' => [
                    'total_views' => $hotelViews->count(),
                    'unique_views' => $uniqueHotelViews->count(),
                ],
                'chart_data' => $chartData,
            ];
        }

        // Today views
        $today = Carbon::today();
        $todayHotelViews = HotelView::where('hotel_id', $hotelId)
            ->whereDate('created_at', $today)
            ->get();

        // Codes info
        $totalCodesAssigned = Code::where('hotel_id', $hotelId)->count();
        $activeCodes = Code::where('hotel_id', $hotelId)
            ->where('status', 'active')
            ->count();

        $result['all_time'] = [
            'hotel_views' => [
                'total_views' => number_format($todayHotelViews->count(), 0),
                'unique_views' => number_format($todayHotelViews->unique('visitor_ip')->count(), 0),
            ],
            'codes' => [
                'total_keys' => $totalCodesAssigned,
                'active_keys' => $activeCodes,
            ]
        ];

        return $result;
    }
}
?>