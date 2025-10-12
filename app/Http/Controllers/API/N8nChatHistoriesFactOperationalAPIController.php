<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\N8nChatHistoriesFactOperationalResource;
use App\Models\N8nChatHistoriesFactOperational;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class N8nChatHistoriesFactOperationalAPIController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'page' => 'nullable|numeric',
            'perPage' => 'nullable|numeric',
        ]);

        $perPage = $request->input('perPage', 10);

        return N8nChatHistoriesFactOperationalResource::collection(
            N8nChatHistoriesFactOperational::orderBy('id', 'asc')
                ->paginate($perPage)
        );
    }
}
