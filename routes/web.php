<?php

use App\Http\Controllers\DocRawController;
use App\Http\Controllers\FactController;
use App\Http\Middleware\EnsureUserIsVerified;
use Illuminate\Http\Request;
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
    Route::get('guest', function (Request $request) {
        if ($request->user()->is_verified) return to_route('dashboard');
        return Inertia::render('verification-notice');
    })->name('verification.notice');

    Route::middleware(EnsureUserIsVerified::class)->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');

        Route::name('doc-raw.')->prefix('doc-raw')->group(function () {
            Route::get('/', [DocRawController::class, 'page'])->name('index');
            Route::get('{docRaw}/edit', [DocRawController::class, 'edit'])->name('edit');
        });

        Route::name('fact.')->prefix('fact')->group(function () {
            Route::get('/', [FactController::class, 'page'])->name('index');
            Route::get('{fact}/edit', [FactController::class, 'edit'])->name('edit');
        });

        // Route::name('chat.fact.')->prefix('chat/fact')->group(function () {
        //     Route::get('/', function () {
        //         return Inertia::render('chat/fact/index');
        //     })->name('index');
        // });
    });
});


Route::get('/auth/telegram/callback', function () {
    $user = Socialite::driver('telegram')->user();

    // Example: find or create a user in your DB
    $username = $user->user['username'] ?? "telegram-user-{$user->user['id']}";
    $authUser = App\Models\User::firstOrCreate(
        ['telegram_id' => $user->user['id']],
        [
            'first_name' => $user->user['first_name'] ?? null,
            'last_name' => $user->user['last_name'] ?? null,
            'username' => $username,
            'photo_url' => $user->user['photo_url'] ?? null,
        ]
    );
    if ($authUser->username !== $username) {
        $authUser->username = $username;
        $authUser->save();
    }

    Auth::login($authUser);

    return redirect('/dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
