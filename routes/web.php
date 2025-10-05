<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/auth/telegram/callback', function () {
    $user = Socialite::driver('telegram')->user();

    // Example: find or create a user in your DB
    $authUser = App\Models\User::firstOrCreate(
        ['telegram_id' => $user->user['id']],
        [
            'first_name' => $user->user['first_name'] ?? null,
            'last_name' => $user->user['last_name'] ?? null,
            'username' => $user->user['username'],
            'photo_url' => $user->user['photo_url'] ?? null,
        ]
    );

    Auth::login($authUser);

    return redirect('/dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
