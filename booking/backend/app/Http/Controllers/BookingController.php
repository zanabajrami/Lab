<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    // GET ALL BOOKINGS (ADMIN)
    public function index()
    {
        return response()->json(
            Booking::orderBy('created_at', 'desc')->get()
        );
    }

    // UPDATE BOOKING (EDIT)
    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $request->validate([
            'check_in' => 'required|date',
            'check_out' => 'required|date|after_or_equal:check_in',
            'total_price' => 'required|numeric|min:0',
            'status' => 'required|in:confirmed,cancelled',
        ]);

        $booking->update($request->only([
            'check_in',
            'check_out',
            'total_price',
            'status'
        ]));

        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking
        ]);
    }

    // DELETE BOOKING
    public function destroy($id)
    {
        Booking::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Booking deleted successfully'
        ]);
    }
}
