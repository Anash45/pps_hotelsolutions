<?php

use App\Http\Controllers\LogController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    return User::all();
});

Route::post('/logs', [LogController::class, 'store']);