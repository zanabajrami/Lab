<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserStatsController;

    // Routes pa login
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    // Routes me JWT
    Route::middleware('jwt.auth')->group(function () {

    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Vetëm admin
    Route::middleware('admin')->group(function () {

        // Users CRUD
        Route::get('users', [UserController::class, 'index']);
        Route::get('users/{id}', [UserController::class, 'show']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);

        // Stats
        Route::get('users/stats/daily', [UserController::class, 'dailyStats']);
        Route::get('users/stats/monthly', [UserController::class, 'monthlyStats']);
        Route::get('users/stats/active', [UserStatsController::class, 'activeUsers']);
    });
});
