<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in and not verified
        if (Auth::check() && !Auth::user()->is_verified) {
            // Log out or redirect to a notice page
            return redirect()->route('verification.notice.telegram')
                ->with('error', 'Your account has not been verified yet.');
        }

        return $next($request);
    }
}
