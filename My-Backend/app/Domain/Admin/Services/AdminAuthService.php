<?php

declare(strict_types=1);

namespace App\Domain\Admin\Services;

use App\Domain\Admin\Models\AdminUser;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

final class AdminAuthService
{
    /**
     * Verify credentials and issue a Sanctum personal access token.
     * On success the plain-text token is returned (only shown once;
     * DB stores the SHA-256 hash).
     *
     * @throws AuthenticationException
     */
    public function login(string $email, string $password): string
    {
        $user = AdminUser::query()->where('email', $email)->first();

        if ($user === null || ! Hash::check($password, $user->password)) {
            throw new AuthenticationException('Invalid credentials.');
        }

        $user->forceFill(['last_login_at' => now()])->save();

        $tokenName = (string) config('site.admin.token_name', 'admin');

        return $user->createToken($tokenName)->plainTextToken;
    }

    /**
     * Revoke only the bearer token used for the current request.
     */
    public function logoutCurrentToken(AdminUser $user): void
    {
        $token = $user->currentAccessToken();
        if ($token !== null && method_exists($token, 'delete')) {
            $token->delete();
        }
    }

    /**
     * Rehash the password and revoke all previously-issued tokens
     * except the one used to make this request.
     */
    public function changePassword(AdminUser $user, string $newPassword): void
    {
        $user->forceFill(['password' => $newPassword])->save();

        $current = $user->currentAccessToken();
        $currentId = ($current !== null && property_exists($current, 'id')) ? $current->id : null;

        $user->tokens()
            ->when($currentId !== null, fn ($q) => $q->where('id', '!=', $currentId))
            ->delete();
    }
}
