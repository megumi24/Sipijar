<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Provinsi;
use Illuminate\Http\Request;

class WilayahOptionsController extends Controller
{
    public function provinsiOptions(Request $request)
    {
        return response()->json([
            'data' => Provinsi::getProvinsiOptions(),
        ]);
    }
}
