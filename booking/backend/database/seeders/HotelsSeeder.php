<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class HotelsSeeder extends Seeder
{
    public function run()
    {
        $json = File::get(database_path('data/hotels.json'));
        $hotels = json_decode($json, true);

        foreach ($hotels as $hotel) {
            DB::table('hotels')->insert([
                'id' => $hotel['id'],
                'name' => $hotel['name'],
                'location' => $hotel['location'],
                'rating' => $hotel['rating'],
                'images' => json_encode($hotel['images']),     
                'description' => $hotel['description'],
                'rooms' => $hotel['rooms'],
                'capacity' => $hotel['capacity'],
                'price' => $hotel['price'],
                'amenities' => json_encode($hotel['amenities']),
            ]);
        }
    }
}
