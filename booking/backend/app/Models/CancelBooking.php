<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CancelBooking extends Model
{
    protected $fillable = [
        'booking_id',
        'name',
        'email',
        'hotel_name',
        'check_in',
        'check_out',
        'location',
        'reason',
        'status'
    ];

    public $timestamps = false;
    }
