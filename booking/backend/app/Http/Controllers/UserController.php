<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        $users = User::orderBy('id', 'asc') 
                 ->get(['id','first_name','last_name','email','role','last_login_at']);
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
            'email'      => 'required|email|unique:users',
            'password'   => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    // PUT /api/users/{id}
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|required|string|max:50',
            'last_name'  => 'sometimes|required|string|max:50',
            'email'      => 'sometimes|required|email|unique:users,email,'.$id,
            'password'   => 'sometimes|required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        if($request->has('password')){
            $request->merge(['password' => Hash::make($request->password)]);
        }

        $user->update($request->all());

        return response()->json($user, 200);
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
    // GET /api/users/stats/daily
        public function dailyStats()
    {
        $stats = User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as total')
    )
        ->groupBy('date')
        ->orderBy('date')
        ->get()
        ->keyBy('date');

    // 15 ditët e fundit
        $period = collect();
        for ($i = 14; $i >= 0; $i--) {
        $date = now()->subDays($i)->format('Y-m-d');
        $period[$date] = isset($stats[$date]) ? (int)$stats[$date]->total : 0;
    }

        $result = $period->map(function($count, $date) {
        return [
            'date' => $date,
            'count' => $count,
        ];
    })->values();

    return response()->json($result, 200);
}
}
