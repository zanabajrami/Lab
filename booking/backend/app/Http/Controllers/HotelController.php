<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        return response()->json(Hotel::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'rating' => 'required|numeric',
            'description' => 'nullable|string',
            'rooms' => 'required|integer',
            'capacity' => 'required|integer',
            'price' => 'required|numeric',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        $hotel = Hotel::create([
            'name' => $validated['name'],
            'location' => $validated['location'],
            'rating' => $validated['rating'],
            'description' => $validated['description'] ?? '',
            'rooms' => $validated['rooms'],
            'capacity' => $validated['capacity'],
            'price' => $validated['price'],
            'amenities' => json_encode($validated['amenities'] ?? []),
            'images' => json_encode($validated['images'] ?? []),
        ]);

        return response()->json($hotel, 201);
    }
}
