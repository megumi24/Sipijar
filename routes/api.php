<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::name('api.')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('doc-raw', \App\Http\Controllers\API\DocRawAPIController::class)->only([
        'index',
        'update',
    ]);
});
