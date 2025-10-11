<?php

namespace App\Traits;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait HasCustomValidator
{
    private function validate(Request $request, array $rules, $redirectTo = null): RedirectResponse|array
    {
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
            return (empty($redirectTo) ? back(303) : redirect($redirectTo, 303))
                ->withErrors($validator)
                ->withInput();

        return $validator->validated();
    }
}
