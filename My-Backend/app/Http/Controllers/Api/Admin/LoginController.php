<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Domain\Admin\Services\AdminAuthService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\LoginRequest;
use Illuminate\Http\JsonResponse;

final class LoginController extends Controller
{
    public function __construct(
        private readonly AdminAuthService $auth,
    ) {}

    public function __invoke(LoginRequest $request): JsonResponse
    {
        $token = $this->auth->login(
            email: (string) $request->string('email'),
            password: (string) $request->string('password'),
        );

        return response()->json(['token' => $token]);
    }
}
