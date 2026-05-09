<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Throwable;

/**
 * Global JSON error envelope. Every API failure returns:
 *
 *   { "error": <string>, "status": <int>, "detail": <object|null> }
 *
 * Locked to match the shape the React frontend's existing fetch
 * wrapper consumes (see my-app/src/api/client.js).
 */
final class Handler
{
    public static function register(Exceptions $exceptions): void
    {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->render(function (ValidationException $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope('Validation failed.', Response::HTTP_UNPROCESSABLE_ENTITY, ['errors' => $e->errors()])
                : null;
        });

        // Always return JSON for auth failures — this is an API-only app and
        // there is no login redirect route. Returning non-null stops the framework
        // from falling through to route('login') which would throw a 500.
        $exceptions->render(function (AuthenticationException $e, Request $request): JsonResponse {
            return self::envelope('Unauthenticated.', Response::HTTP_UNAUTHORIZED);
        });

        $exceptions->render(function (AuthorizationException $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope($e->getMessage() ?: 'Forbidden.', Response::HTTP_FORBIDDEN)
                : null;
        });

        $exceptions->render(function (ModelNotFoundException $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope('Not found.', Response::HTTP_NOT_FOUND)
                : null;
        });

        $exceptions->render(function (NotFoundHttpException $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope($e->getMessage() ?: 'Not found.', Response::HTTP_NOT_FOUND)
                : null;
        });

        $exceptions->render(function (TooManyRequestsHttpException $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope('Too many requests.', Response::HTTP_TOO_MANY_REQUESTS, [
                    'retry_after' => $e->getHeaders()['Retry-After'] ?? null,
                ])
                : null;
        });

        $exceptions->render(function (HttpExceptionInterface $e, Request $request): ?JsonResponse {
            return self::wantsJson($request)
                ? self::envelope($e->getMessage() ?: 'HTTP error.', $e->getStatusCode())
                : null;
        });

        $exceptions->render(function (Throwable $e, Request $request): ?JsonResponse {
            if (! self::wantsJson($request)) {
                return null;
            }
            $debug = (bool) config('app.debug');
            $detail = $debug ? [
                'exception' => $e::class,
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ] : null;

            return self::envelope($debug ? $e->getMessage() : 'Server error.', Response::HTTP_INTERNAL_SERVER_ERROR, $detail);
        });
    }

    private static function wantsJson(Request $request): bool
    {
        return $request->is('api/*') || $request->expectsJson();
    }

    /**
     * @param  array<string, mixed>|null  $detail
     */
    private static function envelope(string $error, int $status, ?array $detail = null): JsonResponse
    {
        return response()->json([
            'error' => $error,
            'status' => $status,
            'detail' => $detail,
        ], $status);
    }
}
