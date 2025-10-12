<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('doc-raw', \App\Http\Controllers\API\DocRawAPIController::class)->only([
        'index',
        'update',
    ]);
    Route::apiResource('fact', \App\Http\Controllers\API\FactAPIController::class)->only([
        'index',
        'update',
    ]);
    Route::get('fact/graph-data', [\App\Http\Controllers\API\FactAPIController::class, 'graphData'])->name('fact.graph-data');
    Route::apiResource('chat/fact', \App\Http\Controllers\API\ChatLogAPIController::class)->only([
        'index',
    ])->names([
        'index' => 'chat.fact.index',
    ]);
});
