<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors()
            ], 422);
        }

        $message = Message::create($request->only('name', 'email', 'message'));

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully!',
            'data' => $message
        ]);
    }

    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $messages
        ]);
    }
}
