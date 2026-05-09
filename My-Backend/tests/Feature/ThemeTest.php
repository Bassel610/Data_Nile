<?php

declare(strict_types=1);

use App\Domain\Admin\Models\AdminUser;
use Database\Seeders\ThemeTokenSeeder;

it('returns an empty object when no tokens exist', function (): void {
    $this->getJson('/api/theme')->assertOk();
});

it('returns seeded tokens', function (): void {
    $this->seed(ThemeTokenSeeder::class);

    $this->getJson('/api/theme')
        ->assertOk()
        ->assertJsonPath('--nile-deep', '#0c2a3a');
});

it('rejects PATCH without auth', function (): void {
    $this->patchJson('/api/theme', ['--nile-deep' => '#000'])
        ->assertUnauthorized();
});

it('persists patched tokens', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->patchJson('/api/theme', ['--nile-deep' => '#111111'])
        ->assertOk()
        ->assertJsonPath('--nile-deep', '#111111');
});

it('ignores tokens without the -- prefix', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->patchJson('/api/theme', ['evil' => 'x'])
        ->assertOk()
        ->assertJsonMissingPath('evil');
});
