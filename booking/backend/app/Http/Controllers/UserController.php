<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        $users = User::orderBy('id', 'asc')->get();
        return response()->json($users, 200);
    }

    // GET /api/users/{id}
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user, 200);
    }

    // POST /api/users
   public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'first_name' => 'required|string|max:50',
        'last_name'  => 'required|string|max:50',
        'email'      => 'required|email|unique:users,email',
        'password'   => 'required|string|min:8',
        'role'       => 'required|in:user,admin',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $user = User::create([
        'first_name' => $request->first_name,
        'last_name'  => $request->last_name,
        'email'      => $request->email,
        'password'   => bcrypt($request->password),
        'role'       => $request->role,
    ]);

    return response()->json([
        'message' => 'User created successfully',
        'user' => $user
    ], 201);
}

    // PUT /api/users/{id}
    public function update(Request $request, $id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    // Validate input
    $validator = Validator::make($request->all(), [
        'first_name' => 'sometimes|required|string|max:50',
        'last_name'  => 'sometimes|required|string|max:50',
        'email'      => 'sometimes|required|email|unique:users,email,' . $id,
        'password'   => 'sometimes|required|string|min:8',
        'role'       => 'sometimes|required|in:user,admin',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Update user
    $user->update($request->only([
        'first_name',
        'last_name',
        'email',
        'role',
    ]));

    // Update Bookings
    $user->bookings()->update([
        'first_name' => $user->first_name,
        'last_name'  => $user->last_name,
        'email'      => $user->email,
    ]);

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user->fresh(),
    ], 200);
}

    // DELETE /api/users/{id}
    public function destroy($id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json(['error' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }

    // GET /api/users/stats/daily (për 15 ditët e fundit)
    public function dailyStats()
    {
        $stats = User::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        $period = collect();
        for ($i = 14; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $period[$date] = isset($stats[$date]) ? (int)$stats[$date]->count : 0;
        }

        $result = $period->map(function($count, $date) {
            return [
                'date' => $date,
                'count' => $count,
            ];
        })->values();

        return response()->json($result, 200);
    }

    // GET /api/users/stats/monthly (për User Growth Chart)
    public function monthlyStats()
    {
        $stats = User::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('YEAR(created_at) as year'),
            DB::raw('COUNT(*) as count')
        )
        ->groupBy('year', 'month')
        ->orderBy('year')
        ->orderBy('month')
        ->get();

        $result = $stats->map(function ($item) {
        return [
            'month' => $item->year . '-' . str_pad($item->month, 2, '0', STR_PAD_LEFT), // ex: 2026-01
            'count' => (int) $item->count,
        ];
    });

    return response()->json($result, 200);
    }
}