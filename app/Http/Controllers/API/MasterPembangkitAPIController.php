<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MasterPembangkitResource;
use App\Models\MasterPembangkit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MasterPembangkitAPIController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return MasterPembangkitResource::collection(
            MasterPembangkit::orderBy('id', 'asc')->get()
        );
    }
}
