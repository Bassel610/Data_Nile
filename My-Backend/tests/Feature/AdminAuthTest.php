<?php

declare(strict_types=1);

use App\Domain\Admin\Models\AdminUser;

it('issues a token on correct credentials', function (): void {
    AdminUser::factory()->create([
        'email' => 'admin@datanile.test',
        'password' => 'Secret123',
    ]);

    $this->postJson('/api/admin/login', [
        'email' => 'admin@datanile.test',
        'password' => 'Secret123',
    ])->assertOk()
        ->assertJsonStructure(['token']);
});

it('rejects bad credentials with the envelope', function (): void {
    AdminUser::factory()->create([
        'email' => 'admin@datanile.test',
        'password' => 'Secret123',
    ]);

    $this->postJson('/api/admin/login', [
        'email' => 'admin@datanile.test',
        'password' => 'wrong',
    ])->assertUnauthorized()
        ->assertJsonStructure(['error', 'status', 'detail']);
});

it('logs out and revokes the current token', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    expect($admin->tokens()->count())->toBe(1);

    $this->withToken($token)->postJson('/api/admin/logout')->assertOk();

    // Token row deleted — Sanctum will reject subsequent requests.
    expect($admin->tokens()->count())->toBe(0);
});

it('changes the password (and lets the new one log in)', function (): void {
    $admin = AdminUser::factory()->create([
        'email' => 'admin@datanile.test',
        'password' => 'Secret123',
    ]);
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->postJson('/api/admin/password', ['password' => 'NewPass456'])
        ->assertOk();

    $this->postJson('/api/admin/login', [
        'email' => 'admin@datanile.test',
        'password' => 'NewPass456',
    ])->assertOk();
});

it('rejects a weak new password with the envelope', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->postJson('/api/admin/password', ['password' => 'short'])
        ->assertUnprocessable()
        ->assertJsonStructure(['error', 'status', 'detail' => ['errors']]);
});
