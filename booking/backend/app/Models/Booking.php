<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'hotel_id', 'hotel_name', 'location',
        'first_name', 'last_name', 'email', 'phone',
        'special_requests', 'check_in', 'check_out',
        'nights', 'total_price', 'status'
    ];
}
