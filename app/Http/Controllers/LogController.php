<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogController extends Controller
{
    /**
     * Store frontend logs to file
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'level' => 'required|string|in:info,error,warning',
            'message' => 'required|string',
            'timestamp' => 'required|string',
            'url' => 'required|string',
        ]);

        $logMessage = sprintf(
            "[%s] [%s] %s - URL: %s",
            $validated['timestamp'],
            strtoupper($validated['level']),
            $validated['message'],
            $validated['url']
        );

        // Log to the appropriate channel or file
        Log::channel('frontend')->log($validated['level'], $logMessage);

        return response()->json(['status' => 'success'], 201);
    }
}
