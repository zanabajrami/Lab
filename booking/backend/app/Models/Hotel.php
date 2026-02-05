<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'rating',
        'description',
        'rooms',
        'capacity',
        'price',
        'amenities',
        'images'
    ];

    // Auto-cast JSON fields
    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
    ];
}
