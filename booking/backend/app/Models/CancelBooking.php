<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CancelBooking extends Model
{
    protected $table = 'cancel_bookings';
    protected $fillable = [
        'booking_id',
        'name',
        'email',
        'hotel_name',
        'check_in',
        'check_out',
        'location',
        'reason',
        'admin_note',
        'status'
    ];

    protected $casts = [
        'booking_id' => 'integer',
        'check_in' => 'date',
        'check_out' => 'date',
    ];

    public $timestamps = true;
    }
