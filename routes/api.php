<?php

use App\Http\Middleware\EnsureUserIsVerified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.')->middleware(['auth:sanctum', EnsureUserIsVerified::class])->group(function () {
    Route::name('wilayah.provinsi.select-items')->get('wilayah/provinsi/select-items', [\App\Http\Controllers\WilayahOptionsController::class, 'provinsiOptions']);

    Route::apiResource('user', \App\Http\Controllers\UserController::class)->only([
        'index',
        'update',
    ]);
    Route::apiResource('doc-raw', \App\Http\Controllers\DocRawController::class)->only([
        'index',
        'update',
    ]);
    Route::apiResource('fact', \App\Http\Controllers\FactController::class)->only([
        'index',
        'update',
    ]);
    Route::get('fact/graph-data', [\App\Http\Controllers\FactController::class, 'graphData'])->name('fact.graph-data');
    // Route::apiResource('chat/fact', \App\Http\Controllers\ChatLogController::class)->only([
    //     'index',
    // ])->names([
    //     'index' => 'chat.fact.index',
    // ]);
    Route::apiResource('master-pembangkit', \App\Http\Controllers\MasterPembangkitController::class)->only([
        'index',
    ]);
});
