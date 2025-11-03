<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MasterPembangkitResource;
use App\Models\MasterPembangkit;
use App\Models\MasterTransmisi;
use App\Traits\HasCustomValidator;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class MasterPembangkitController extends Controller
{
    use HasCustomValidator;

    public function page()
    {
        Gate::authorize('manage');

        return Inertia::render('pembangkit/index');
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

        $query = MasterPembangkit::orderBy('id', 'asc')->when($search, function ($query, $search) {
            $query->where('nama', 'like', "%{$search}%")
                ->orWhere('deskripsi', 'like', "%{$search}%")
                ->orWhere('alias', 'like', "%{$search}%");
        });

        return MasterPembangkitResource::collection(
            $perPage == -1 ? $query->get() :
                $query->paginate($perPage)
        );
    }

    public function edit(MasterPembangkit $pembangkit)
    {
        Gate::authorize('manage');

        return Inertia::modal('pembangkit/edit', [
            'title' => 'Edit Pembangkit',
            'data' => $pembangkit,
        ], [
            'redirect' => route('pembangkit.index'),
        ]);
    }

    public function getSituationData()
    {
        return response()->json([
            'data' => [
                'pembangkit' => MasterPembangkit::getSituationData(),
                'transmisi' => MasterTransmisi::getSituationData(),
            ],
        ]);
    }
}
