<?php

use App\Models\DocRaw;
use App\Models\FactOperational;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'config' => [
            'telegram-login' => config('services.telegram.bot'),
            'auth-url' => config('services.telegram.redirect'),
        ],
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::name('doc-raw.')->prefix('doc-raw')->group(function () {
        Route::get('/', function () {
            return Inertia::render('doc-raw/index');
        })->name('index');
        Route::get('{docRaw}/edit', function (DocRaw $docRaw) {
            return inertia()->modal('doc-raw/edit', [
                'title' => 'Edit Document',
                'data' => $docRaw,
            ], [
                'redirect' => route('doc-raw.index'),
            ]);
        })->name('edit');
    });

    Route::name('fact.')->prefix('fact')->group(function () {
        Route::get('/', function () {
            return Inertia::render('fact/index');
        })->name('index');
        Route::get('{fact}/edit', function (FactOperational $fact) {
            return inertia()->modal('fact/edit', [
                'title' => 'Edit Fact',
                'data' => $fact,
            ], [
                'redirect' => route('fact.index'),
            ]);
        })->name('edit');
    });
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
