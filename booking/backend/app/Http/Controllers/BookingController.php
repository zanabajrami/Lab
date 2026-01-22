<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json(
            Booking::orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'hotel_id' => 'required|integer',
            'hotel_name' => 'required|string',
            'location' => 'required|string',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'special_requests' => 'nullable|string',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after_or_equal:check_in',
            'nights' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $booking = Booking::create([
            'hotel_id' => $request->hotel_id,
            'hotel_name' => $request->hotel_name,
            'location' => $request->location,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'special_requests' => $request->special_requests,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'nights' => $request->nights,
            'total_price' => $request->total_price,
            'status' => 'confirmed',
        ]);

        return response()->json($booking, 201);
    }
}
