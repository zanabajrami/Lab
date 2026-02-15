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
    $request->validate([
        'name' => 'required|string',
        'location' => 'required|string',
        'rating' => 'required|numeric',
        'description' => 'nullable|string',
        'rooms' => 'required|integer',
        'capacity' => 'required|integer',
        'price' => 'required|numeric',
        'amenities' => 'nullable|string', 
        'images.*' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp,avif|max:2048',
    ]);

    $amenities = [];
    if ($request->filled('amenities')) {
        $amenities = json_decode($request->input('amenities'), true) ?? [];
    }

    $imagePaths = [];
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $file) {
            $filename = $file->getClientOriginalName(); 
            $file->storeAs('public/images', $filename);
            $imagePaths[] = $filename;
        }
    }

    $hotel = Hotel::create([
        'name' => $request->name,
        'location' => $request->location,
        'rating' => $request->rating,
        'description' => $request->description ?? '',
        'rooms' => $request->rooms,
        'capacity' => $request->capacity,
        'price' => $request->price,
        'amenities' => $amenities,
        'images' => $imagePaths,
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
