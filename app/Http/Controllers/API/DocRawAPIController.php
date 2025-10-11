<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\DocRawResource;
use App\Models\DocRaw;
use App\Traits\HasCustomValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class DocRawAPIController extends Controller
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

        return DocRawResource::collection(
            DocRaw::when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('full_text', 'like', "%{$search}%")
                    ->orWhere('source_filename', 'like', "%{$search}%");
            })->paginate($perPage)
        );
    }

    public function update(Request $request, DocRaw $docRaw)
    {
        $redirectTo = route('doc-raw.edit', ['docRaw' => $docRaw->id]);
        $validated = $this->validate($request, [
            'source_filename' => 'required',
            'doc_type' => 'nullable|string',
            'doc_category' => 'nullable|string',
            'knowledge_code' => 'nullable|string',
            'upload_status' => 'nullable|numeric',
            'full_text' => 'nullable|string',
            'full_text_markdown' => 'nullable|string',
            'title' => 'required|string',
            'author' => 'nullable|string',
            'created_date' => 'nullable|date',
            'source_url' => 'nullable|url',
            'language' => 'nullable|string',
            'verified' => 'nullable|boolean',
        ], $redirectTo);
        if ($validated instanceof RedirectResponse) return $validated;

        $docRaw->updateOrFail($validated);

        return redirect($redirectTo, 303)
            ->with('status', 'success');
    }
}
