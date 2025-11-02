<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MasterTransmisiResource;
use App\Models\MasterTransmisi;
use App\Traits\HasCustomValidator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MasterTransmisiController extends Controller
{
    use HasCustomValidator;

    public function page()
    {
        Gate::authorize('manage');

        return Inertia::render('transmisi/index');
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        Gate::authorize('manage');

        $request->validate([
            'search' => 'nullable',
            'page' => 'nullable|numeric',
            'perPage' => 'nullable|numeric',
        ]);

        $search = $request->input('search');
        $perPage = $request->input('perPage', 10);

        return MasterTransmisiResource::collection(
            MasterTransmisi::orderBy('id', 'asc')->when($search, function ($query, $search) {
                $query->where('nama', 'like', "%{$search}%");
            })->paginate($perPage)
        );
    }

    public function edit(MasterTransmisi $transmisi)
    {
        Gate::authorize('manage');

        return Inertia::modal('transmisi/edit', [
            'title' => 'Edit Transmisi',
            'data' => $transmisi,
        ], [
            'redirect' => route('transmisi.index'),
        ]);
    }
}
