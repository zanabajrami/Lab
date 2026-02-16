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

        $user = \App\Models\User::where('email', $request->email)->first();

       $message = Message::create([
        'user_id' => $user?->id,
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

    //REPLY
    public function reply(Request $request, $id)
{
    $request->validate(['reply' => 'required|string']);

    $message = Message::findOrFail($id);

    $message->update([
        'reply' => $request->reply,
        'is_read' => 1,
    ]);

    // Mund të dërgosh event ose notifikim
    if ($message->user_id) {
        $user = $message->user;
    }

    return response()->json([
        'status' => 'success',
        'message' => 'Reply sent successfully',
        'data' => $message
    ]);
}

    //UPDATE
    public function update(Request $request, $id)
{
    $message = Message::findOrFail($id);

    $message->update([
        'message' => $request->message
    ]);

    return response()->json([
        'status' => 'success',
        'message' => 'Message updated'
    ]);
}

    // GET messages + replies për user-in e loguar
    public function userMessages()
{
    $user = auth('api')->user();

    if (!$user) {
    return response()->json([
        'status' => 'error',
        'message' => 'Unauthorized'
    ], 401);
}

    $messages = Message::where('user_id', $user->id)
        ->whereNotNull('reply')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        'status' => 'success',
        'data' => $messages
    ]);
}

}
