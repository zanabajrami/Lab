<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Routes pa login
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Routes me JWT
Route::middleware('jwt.auth')->group(function () {
    Route::get('me', [AuthController::class, 'me']);           // GET /api/me
    Route::post('logout', [AuthController::class, 'logout']);  // Logout

    // CRUD Users (vetëm admin mund t'i aksesojë)
    Route::middleware('admin')->group(function () {
        Route::get('users', [UserController::class, 'index']);
        Route::get('users/{id}', [UserController::class, 'show']);
        Route::post('users', [UserController::class, 'store']);
        Route::put('users/{id}', [UserController::class, 'update']);
        Route::delete('users/{id}', [UserController::class, 'destroy']);
    });
});
