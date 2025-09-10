<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::patch('/test-profile-submit', function (Request $request) {
    return response()->json([
        'all_input' => $request->all(),
        'files' => $request->allFiles(),
    ]);
})->name('test.submit');

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/', function () {
        return redirect()->route('dashboard');
    });
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Index');
    })->name('dashboard');

    // Key Management
    Route::get('/keys', function () {
        return Inertia::render('Keys/Index'); // create resources/js/Pages/Keys.jsx
    })->name('keys.index');

    // Hotel Configurator
    Route::get('/hotels', function () {
        return Inertia::render('Hotels/Index'); // create resources/js/Pages/Hotels.jsx
    })->name('hotels.index');

    // Code Generator


});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/codes', function () {
        return Inertia::render('Codes/Index'); // create resources/js/Pages/Codes.jsx
    })->name('codes.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.update.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
