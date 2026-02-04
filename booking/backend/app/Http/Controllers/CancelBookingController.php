<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CancelBooking;
use App\Models\Booking;

class CancelBookingController extends Controller
{
    // --- CREATE CANCEL BOOKING ---
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|numeric|exists:bookings,id',
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

    public function update(Request $request, $id)
{
    $cancel = CancelBooking::findOrFail($id);

    $request->validate([
        'status' => 'required|in:pending,approved,rejected',
        'admin_note' => 'nullable|string'
    ]);

    $cancel->status = $request->status;
    $cancel->admin_note = $request->admin_note;
    $cancel->save();

    // SINKRONIZIMI ME BOOKINGS
    if ($cancel->booking_id) {
        $booking = Booking::find($cancel->booking_id);

        if ($booking) {
            if ($request->status === 'approved') {
                $booking->status = 'cancelled';
            } else {
                $booking->status = 'confirmed';
            }
            $booking->save();
        }
    }

    return response()->json([
        'message' => 'Cancellation updated successfully',
        'cancel' => $cancel
    ], 200);
}}