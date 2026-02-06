<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserStatsController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CancelBookingController;
use App\Http\Controllers\HotelController;

// Routes pa login
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// PUBLIC: Route për mesazhet (Contact form)
Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);
Route::patch('/messages/{id}/read', [MessageController::class, 'markAsRead']);

Route::post('/bookings', [BookingController::class, 'store']);

Route::post('/cancel-bookings', [CancelBookingController::class, 'store']);

Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);

// Routes me JWT
Route::middleware('jwt.auth')->group(function () {

    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Vetëm admin
    Route::middleware('admin')->group(function () {

    // Users CRUD
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);        Route::post('users', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Stats
    Route::get('users/stats/daily', [UserController::class, 'dailyStats']);
    Route::get('users/stats/monthly', [UserController::class, 'monthlyStats']);
    Route::get('users/stats/active', [UserStatsController::class, 'activeUsers']);
    
    // Bookings
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    
    //Cancel Bookings
    Route::get('/cancel-bookings', [CancelBookingController::class, 'index']);
    Route::put('/cancel-bookings/{id}', [CancelBookingController::class, 'update']);
    Route::delete('/cancel-bookings/{id}', [CancelBookingController::class, 'destroy']);

    //Hotels
    Route::post('/hotels', [HotelController::class, 'store']);
    Route::put('/hotels/{id}', [HotelController::class, 'update']);
    Route::delete('/hotels/{id}', [HotelController::class, 'destroy']);

    });
});