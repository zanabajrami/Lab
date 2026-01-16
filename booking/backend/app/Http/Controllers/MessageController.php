<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    // STORE MESSAGE (UNREAD)
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

        $message = Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
            'is_read' => 0 
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Message sent successfully!',
            'data' => $message
        ]);
    }

    // GET ALL MESSAGES
    public function index()
    {
        $messages = Message::orderBy('created_at', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data' => $messages
        ]);
    }

    // MARK MESSAGE AS READ
    public function markAsRead($id)
    {
        $message = Message::findOrFail($id);

        if ($message->is_read == 0) {
            $message->update([
                'is_read' => 1
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Message marked as read'
        ]);
    }
}
