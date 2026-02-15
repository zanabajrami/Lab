<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\User;

class BookingController extends Controller
{
    // --- GET ALL BOOKINGS (ADMIN) ---
    public function index()
    {
        $bookings = Booking::orderBy('id', 'desc')->get();
        return response()->json($bookings, 200);
    }

    // --- CREATE BOOKING ---
    public function store(Request $request)
{
    $request->validate([
        'email' => 'required|email|exists:users,email',
        'hotel_id' => 'required|integer',
        'hotel_name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'phone' => 'required|string|max:50',
        'check_in' => 'required|date',
        'check_out' => 'required|date|after_or_equal:check_in',
        'nights' => 'required|integer|min:1',
        'total_price' => 'required|numeric|min:0',
        'special_requests' => 'nullable|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'message' => 'User not found'
        ], 404);
    }

    $booking = Booking::create([
        'user_id' => $user->id,
        'hotel_id' => $request->hotel_id,
        'hotel_name' => $request->hotel_name,
        'location' => $request->location,
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'email' => $user->email,
        'phone' => $request->phone,
        'special_requests' => $request->special_requests ?? null,
        'check_in' => $request->check_in,
        'check_out' => $request->check_out,
        'nights' => $request->nights,
        'total_price' => $request->total_price,
        'status' => 'confirmed',
    ]);

    return response()->json([
        'message' => 'Booking created successfully',
        'booking' => $booking
    ], 201);
}

    // --- UPDATE BOOKING ---
    public function update(Request $request, $id)
{
    $booking = Booking::findOrFail($id);

    $request->validate([
        'hotel_id' => 'required|integer',
        'hotel_name' => 'required|string|max:255',
        'location' => 'required|string|max:255',
        'phone' => 'required|string|max:50',
        'special_requests' => 'nullable|string',
        'check_in' => 'required|date',
        'check_out' => 'required|date|after_or_equal:check_in',
        'nights' => 'required|integer|min:1',
        'total_price' => 'required|numeric|min:0',
        'status' => 'required|in:confirmed,cancelled'
    ]);

    $booking->update([
        'hotel_id' => $request->hotel_id,
        'hotel_name' => $request->hotel_name,
        'location' => $request->location,
        'phone' => $request->phone,
        'special_requests' => $request->special_requests,
        'check_in' => $request->check_in,
        'check_out' => $request->check_out,
        'nights' => $request->nights,
        'total_price' => $request->total_price,
        'status' => $request->status
    ]);

    return response()->json([
        'message' => 'Booking updated successfully',
        'booking' => $booking
    ]);
}

    // --- DELETE BOOKING ---
    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();

        return response()->json([
            'message' => 'Booking deleted successfully'
        ]);
    }

    // --- SHOW SINGLE BOOKING ---
    public function show($id)
    {
        $booking = Booking::findOrFail($id);
        return response()->json($booking, 200);
    }
}
