<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Admin;

use App\Domain\Admin\Models\AdminUser;
use App\Domain\Admin\Services\AdminAuthService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePasswordRequest;
use Illuminate\Http\JsonResponse;

final class ChangePasswordController extends Controller
{
    public function __construct(
        private readonly AdminAuthService $auth,
    ) {}

    public function __invoke(ChangePasswordRequest $request): JsonResponse
    {
        /** @var AdminUser $user */
        $user = $request->user();
        $this->auth->changePassword(
            user: $user,
            newPassword: (string) $request->string('password'),
        );

        return response()->json(['ok' => true]);
    }
}
