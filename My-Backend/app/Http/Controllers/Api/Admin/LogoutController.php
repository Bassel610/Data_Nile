<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Domain\Admin\Models\AdminUser;
use App\Domain\Admin\Services\AdminAuthService;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class LogoutController extends Controller
{
    public function __construct(
        private readonly AdminAuthService $auth,
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        /** @var AdminUser $user */
        $user = $request->user();
        $this->auth->logoutCurrentToken($user);

        return response()->json(['ok' => true]);
    }
}
