<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\FactResource;
use App\Models\FactOperational;
use App\Traits\HasCustomValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FactAPIController extends Controller
{
    use HasCustomValidator;

    public function index(Request $request): AnonymousResourceCollection
    {
        $request->validate([
            'search' => 'nullable',
            'page' => 'nullable|numeric',
            'perPage' => 'nullable|numeric',
        ]);

        $search = $request->input('search');
        $perPage = $request->input('perPage', 10);

        return FactResource::collection(
            FactOperational::when($search, function ($query, $search) {
                $query->where('location_detail', 'like', "%{$search}%")
                    ->orWhere('knowledge_code', 'like', "%{$search}%")
                    ->orWhere('athg_type', 'like', "%{$search}%")
                    ->orWhere('infrastructure_name', 'like', "%{$search}%")
                    ->orWhere('infrastructure_type', 'like', "%{$search}%")
                    ->orWhere('power_system', 'like', "%{$search}%")
                    ->orWhere('province', 'like', "%{$search}%")
                    ->orWhere('modus_operandi', 'like', "%{$search}%")
                    ->orWhere('impact_summary', 'like', "%{$search}%")
                    ->orWhere('chronology_summary', 'like', "%{$search}%")
                    ->orWhere('actors_involved', 'like', "%{$search}%")
                    ->orWhere('companies_involved', 'like', "%{$search}%")
                    ->orWhere('original_excerpt', 'like', "%{$search}%")
                    ->orWhere('source_section', 'like', "%{$search}%")
                    ->orWhere('source_filename', 'like', "%{$search}%");
            })->paginate($perPage)
        );
    }

    public function update(Request $request, FactOperational $fact)
    {
        $redirectTo = route('fact.edit', ['fact' => $fact->id]);
        $validated = $this->validate($request, [
            'knowledge_code' => 'nullable|string',
            'event_date' => 'nullable|date',
            'location_detail' => 'nullable|string',
            'athg_type' => 'nullable|string',
            'infrastructure_name' => 'nullable|string',
            'infrastructure_type' => 'nullable|string',
            'power_system' => 'nullable|string',
            'province' => 'nullable|string',
            'modus_operandi' => 'nullable|string',
            'impact_summary' => 'nullable|string',
            'chronology_summary' => 'nullable|string',
            'actors_involved' => 'nullable|string',
            'companies_involved' => 'nullable|string',
            'original_excerpt' => 'nullable|string',
            'source_section' => 'nullable|string',
            'verified' => 'nullable|boolean',
            'infrastructure_code' => 'nullable|string',
            'ahtg_code' => 'nullable|string',
        ], $redirectTo);
        if ($validated instanceof RedirectResponse) return $validated;

        $fact->updateOrFail($validated);

        return redirect($redirectTo, 303)
            ->with('status', 'success');
    }
}
