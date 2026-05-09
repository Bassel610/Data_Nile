<?php

declare(strict_types=1);

use App\Exceptions\Handler;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        apiPrefix: 'api',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        // Force Accept: application/json on all API requests so $request->expectsJson()
        // is always true — ensures framework error handlers return JSON, not HTML redirects.
        $middleware->prependToGroup('api', \App\Http\Middleware\ForceJsonAccept::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Concrete handlers wired in app/Exceptions/Handler.php (registered below).
        Handler::register($exceptions);
    })
    ->create();
