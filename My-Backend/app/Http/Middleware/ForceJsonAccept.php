<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Force Accept: application/json on all API requests so that
 * $request->expectsJson() is always true. This ensures Laravel's built-in
 * exception handlers (AuthenticationException, etc.) always return JSON
 * instead of trying to redirect to a non-existent login route.
 */
final class ForceJsonAccept
{
    public function handle(Request $request, Closure $next): Response
    {
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
