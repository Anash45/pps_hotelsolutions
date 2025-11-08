<?php

use App\Http\Controllers\Admin\CodesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ButtonController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HotelPageController;
use App\Http\Controllers\HotelsController;
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
    Route::get('/', [DashboardController::class, 'index']);
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');


    // Hotel Configurator
    Route::get('/hotels', function () {
        return Inertia::render('Hotels/Index'); // create resources/js/Pages/Hotels.jsx
    })->name('hotels.index');

    // Keys Management

    Route::resource('keys', KeyAssignmentController::class);
    Route::post('/keys/recognize', [KeyAssignmentController::class, 'recognize']);
    Route::put('/keys/{id}/status', [KeyAssignmentController::class, 'updateStatus']);

    // Hotels Management

    Route::resource('hotels', HotelsController::class);
    Route::match(['post', 'put'], '/hotels/updateBranding/{hotel}', [HotelsController::class, 'updateBranding'])
        ->name('hotels.updateBranding');
    Route::get('/test-landing/{hotel?}', [HotelsController::class, 'testLanding'])
        ->name('hotels.testLanding');
    Route::post('/hotel-pages', [HotelPageController::class, 'store'])->name('hotel-pages.store');
    Route::delete('/hotel-pages/{id}', [HotelPageController::class, 'destroy'])->name('hotel-pages.destroy');
    Route::put('/hotel-pages/{page}', [HotelPageController::class, 'update'])
        ->name('hotel-pages.update');

    Route::post('/buttons', [ButtonController::class, 'store'])->name('buttons.store');
    Route::put('/buttons/{button}', [ButtonController::class, 'update'])->name('buttons.update');
    Route::delete('/buttons/{button}', [ButtonController::class, 'destroy'])->name('buttons.destroy');
    Route::post('/buttons/reorder', [ButtonController::class, 'reorder'])
        ->name('buttons.reorder');

});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::resource('codes', CodesController::class);

    Route::get('/codes/group/{group}/download', [CodesController::class, 'downloadCsv'])
        ->name('codes.group.download');
    Route::get('/codes/group/{group}/delete', [CodesController::class, 'deleteGroup'])
        ->name('codes.group.delete');
    Route::resource('users', UserController::class);

});

Route::post('/buttons/{button}/view', [ButtonController::class, 'trackView'])
    ->name('buttons.trackView');

Route::get('/key/{code}', [CodesController::class, 'showByKey'])
    ->name('codes.showByKey');
Route::get('/key/{key}/page/{id}', [HotelPageController::class, 'show'])
    ->name('page.show');
Route::get('/key/{code}/active', [CodesController::class, 'makeActive'])
    ->name('key.makeActive');
// Store new key assignment
Route::post('/key-assignment/store', [CodesController::class, 'userStore'])
    ->name('keyassignment.userStore');
Route::get('/keyfinder/unsubscribe/{code}', [CodesController::class, 'unsubscribe'])
    ->name('keyfinder.unsubscribe');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.update.photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test-locale', function () {
    dd(app()->getLocale());
});

Route::middleware('web')->post('/language', function (Request $request) {
    $validated = $request->validate([
        'locale' => ['required', 'in:en,de'],
    ]);

    $locale = $validated['locale'];
    Session::put('locale', $locale);
    App::setLocale($locale);

    return response()->json([
        'success' => true,
        'locale' => app()->getLocale(),
        'session_locale' => session('locale'),
        'message' => "Language switched to " . app()->getLocale(),
    ]);
});


require __DIR__ . '/auth.php';
