<?php

use App\Http\Controllers\Admin\CodesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\KeyAssignmentController;
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


    // Hotel Configurator
    Route::get('/hotels', function () {
        return Inertia::render('Hotels/Index'); // create resources/js/Pages/Hotels.jsx
    })->name('hotels.index');

    // Keys Management

    Route::resource('keys', KeyAssignmentController::class);
    Route::post('/keys/recognize', [KeyAssignmentController::class, 'recognize']);
    Route::put('/keys/{id}/status', [KeyAssignmentController::class, 'updateStatus']);


});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('codes', CodesController::class);

    Route::get('/codes/group/{group}/download', [CodesController::class, 'downloadCsv'])
        ->name('codes.group.download');
    Route::resource('users', UserController::class);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.update.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
