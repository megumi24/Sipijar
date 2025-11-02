<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatLogResource;
use App\Models\ChatLog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;

class ChatLogController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        Gate::authorize('manage');

        $request->validate([
            'page' => 'nullable|numeric',
            'perPage' => 'nullable|numeric',
        ]);

        $perPage = $request->input('perPage', 10);

        return ChatLogResource::collection(
            ChatLog::orderBy('id', 'asc')
                ->paginate($perPage)
        );
    }
}
