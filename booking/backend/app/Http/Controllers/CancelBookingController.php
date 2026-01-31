<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\CancelBooking;
use Illuminate\Http\Request;

class CancelBookingController extends Controller
{
    // CREATE Cancel Request
    public function store(Request $request)
{
    try {
        $data = $request->validate([
            'booking_id' => 'required|integer',
            'name' => 'required|string',
            'email' => 'required|email',
            'hotel_name' => 'required|string',
            'check_in' => 'required|date',
            'check_out' => 'required|date',
            'location' => 'required|string',
            'reason' => 'required|string',
        ]);

        $data['status'] = 'pending';

        $booking = Booking::find($data['booking_id']);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $cancel = CancelBooking::create($data);

        return response()->json($cancel, 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Something went wrong',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
