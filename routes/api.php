<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.')->middleware('auth:sanctum')->group(function () {
    Route::name('wilayah.provinsi.select-items')->get('wilayah/provinsi/select-items', [\App\Http\Controllers\API\WilayahOptionsAPIController::class, 'provinsiOptions']);

    Route::apiResource('doc-raw', \App\Http\Controllers\API\DocRawAPIController::class)->only([
        'index',
        'update',
    ]);
    Route::apiResource('fact', \App\Http\Controllers\API\FactAPIController::class)->only([
        'index',
        'update',
    ]);
    Route::get('fact/graph-data', [\App\Http\Controllers\API\FactAPIController::class, 'graphData'])->name('fact.graph-data');
    // Route::apiResource('chat/fact', \App\Http\Controllers\API\ChatLogAPIController::class)->only([
    //     'index',
    // ])->names([
    //     'index' => 'chat.fact.index',
    // ]);
    Route::apiResource('master-pembangkit', \App\Http\Controllers\API\MasterPembangkitAPIController::class)->only([
        'index',
    ]);
});
