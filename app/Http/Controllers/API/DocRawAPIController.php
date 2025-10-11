<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DocRawResource;
use App\Models\DocRaw;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DocRawAPIController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'search' => 'nullable',
            'page' => 'nullable|numeric',
            'perPage' => 'nullable|numeric',
        ]);

        $search = $request->input('search');
        $perPage = $request->input('perPage', 10);

        return DocRawResource::collection(
            DocRaw::when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('full_text', 'like', "%{$search}%");
            })->paginate($perPage)
        );
    }
}
