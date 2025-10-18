<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FactResource;
use App\Models\FactOperational;
use App\Traits\HasCustomValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;

class FactController extends Controller
{
    use HasCustomValidator;

    public function page()
    {
        return Inertia::render('fact/index');
    }

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
            FactOperational::orderBy('id', 'asc')
                ->when($search, function ($query, $search) {
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

    public function edit(FactOperational $fact)
    {
        return Inertia::modal('fact/edit', [
            'title' => 'Edit Fact',
            'data' => $fact,
        ], [
            'redirect' => route('fact.index'),
        ]);
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

    public function graphData(Request $request)
    {
        $rows = FactOperational::select('actors_involved', 'companies_involved')->get();

        $actorFreq = [];
        $companyFreq = [];
        $edgeMap = [];

        foreach ($rows as $row) {
            $actors = is_array($row->actors_involved) ? $row->actors_involved : (array) json_decode($row->actors_involved ?? '[]', true);
            $companies = is_array($row->companies_involved) ? $row->companies_involved : (array) json_decode($row->companies_involved ?? '[]', true);

            foreach ($actors as $a) {
                if ($a === null || $a === '') continue;
                $actorFreq[$a] = ($actorFreq[$a] ?? 0) + 1;
            }
            foreach ($companies as $c) {
                if ($c === null || $c === '') continue;
                $companyFreq[$c] = ($companyFreq[$c] ?? 0) + 1;
            }

            foreach ($actors as $a) {
                foreach ($companies as $c) {
                    if ($a === null || $a === '' || $c === null || $c === '') continue;
                    $key = $a . '--' . $c;
                    $edgeMap[$key] = ($edgeMap[$key] ?? 0) + 1;
                }
            }
        }

        // nodes
        $nodes = [];
        foreach ($actorFreq as $name => $freq) {
            $nodes[] = [
                'id' => $name,
                'label' => $name,
                'group' => 'actor',
                'value' => $freq,
            ];
        }
        foreach ($companyFreq as $name => $freq) {
            $nodes[] = [
                'id' => $name,
                'label' => $name,
                'group' => 'company',
                'value' => $freq,
            ];
        }

        // edges: step increment tiap kelipatan 10
        $edges = [];
        foreach ($edgeMap as $key => $freq) {
            [$from, $to] = explode('--', $key);
            $thickness = 0.5 + intdiv($freq, 10); // PHP intdiv
            $edges[] = [
                'from' => $from,
                'to' => $to,
                'label' => $freq > 1 ? $freq . 'x' : '',
                'width' => $thickness,
                'color' => $freq >= 20 ? '#ffa726' : '#888'
            ];
        }

        return response()->json([
            'data' => ['nodes' => $nodes, 'edges' => $edges]
        ]);
    }
}
