<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    // Get all hotels
    public function index()
    {
        return response()->json(Hotel::all());
    }

    // Get single hotel
    public function show($id)
    {
        $hotel = Hotel::findOrFail($id);
        return response()->json($hotel);
    }

    // Create hotel
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
            'amenities' => $validated['amenities'] ?? [],
            'images' => $validated['images'] ?? [],
        ]);

        return response()->json($hotel, 201);
    }

    // Update hotel
    public function update(Request $request, $id)
    {
        $hotel = Hotel::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'location' => 'sometimes|required|string',
            'rating' => 'sometimes|required|numeric',
            'description' => 'nullable|string',
            'rooms' => 'sometimes|required|integer',
            'capacity' => 'sometimes|required|integer',
            'price' => 'sometimes|required|numeric',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        $hotel->update($validated);

        return response()->json($hotel);
    }

    // Delete hotel
    public function destroy($id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json(['message' => 'Hotel deleted successfully']);
    }
}
