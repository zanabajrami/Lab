<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class UserStatsController extends Controller
{
    public function activeUsers()
    {
        $user = JWTAuth::parseToken()->authenticate(); // merr userin nga token

        return response()->json([
            'today' => User::whereDate('last_login_at', Carbon::today())->count(),
            'last_7_days' => User::where('last_login_at', '>=', Carbon::now()->subDays(7))->count(),
            'total_users' => User::count()
        ]);
    }
}
