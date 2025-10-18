<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\HasCustomValidator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;

class UserController extends Controller
{
    use HasCustomValidator;

    public function page()
    {
        return Inertia::render('user/index');
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

        return UserResource::collection(
            User::orderBy('id', 'asc')
                ->when($search, function ($query, $search) {
                    $query->where('username', 'like', "%{$search}%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                })->paginate($perPage)
        );
    }

    public function edit(User $user)
    {
        return Inertia::modal('user/edit', [
            'title' => 'Edit User',
            'data' => $user,
        ], [
            'redirect' => route('user.index'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $redirectTo = route('user.edit', ['user' => $user->id]);
        $validated = $this->validate($request, [
            'first_name' => 'nullable|string',
            'last_name' => 'nullable|string',
            'is_verified' => 'nullable|boolean',
        ], $redirectTo);
        if ($validated instanceof RedirectResponse) return $validated;

        $user->updateOrFail($validated);

        return redirect($redirectTo, 303)->with('status', 'success');
    }
}
