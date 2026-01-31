<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CancelBooking;

class CancelBookingController extends Controller
{
    // --- CREATE CANCEL BOOKING ---
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|integer',
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'hotel_name' => 'required|string|max:100',
            'location' => 'required|string|max:255',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after_or_equal:check_in',
            'reason' => 'nullable|string',
        ]);

        $cancel = CancelBooking::create([
            'booking_id' => $request->booking_id,
            'name' => $request->name,
            'email' => $request->email,
            'hotel_name' => $request->hotel_name,
            'location' => $request->location,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Cancellation request created successfully',
            'cancel' => $cancel
        ], 201);
    }

    // --- GET ALL CANCEL BOOKINGS (ADMIN) ---
    public function index()
    {
        $cancellations = CancelBooking::orderBy('id', 'desc')->get();
        return response()->json($cancellations, 200);
    }

    // --- UPDATE STATUS (OPTIONAL) ---
    public function updateStatus(Request $request, $id)
    {
        $cancel = CancelBooking::findOrFail($id);
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);
        $cancel->status = $request->status;
        $cancel->save();

        return response()->json($cancel, 200);
    }

    // --- DELETE (OPTIONAL) ---
    public function destroy($id)
    {
        $cancel = CancelBooking::findOrFail($id);
        $cancel->delete();

        return response()->json(['message' => 'Cancellation deleted'], 200);
    }
}
