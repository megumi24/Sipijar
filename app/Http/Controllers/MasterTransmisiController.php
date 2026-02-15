<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\MasterTransmisiResource;
use App\Models\MasterTransmisi;
use App\Traits\HasCustomValidator;
use Illuminate\Http\RedirectResponse;
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

    public function update(Request $request, MasterTransmisi $masterTransmisi)
    {
        Gate::authorize('manage');

        $redirectTo = route('transmisi.edit', ['transmisi' => $masterTransmisi->id]);
        $validated = $this->validate($request, [
            'nama' => 'required|string',
            'panjang_transmisi' => 'nullable|numeric',
            'tipe' => 'required|string',
            'sistem' => 'nullable|string',
            'status' => 'required|string',
            'koordinat' => 'nullable|array',
        ], $redirectTo);
        if ($validated instanceof RedirectResponse) return $validated;

        $masterTransmisi->updateOrFail($validated);

        return redirect($redirectTo, 303)
            ->with('status', 'success');
    }
}
