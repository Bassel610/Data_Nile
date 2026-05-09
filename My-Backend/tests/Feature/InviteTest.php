<?php

declare(strict_types=1);

use App\Domain\Admin\Models\AdminUser;
use App\Domain\Invite\Models\Invite;

it('accepts public invite submissions', function (): void {
    $this->postJson('/api/invites', [
        'name' => 'Jane',
        'email' => 'jane@example.com',
        'role' => 'Company hiring',
        'budget' => '< $5k',
        'msg' => 'Hello',
    ])->assertCreated()
        ->assertJsonStructure(['id', 'at', 'name', 'email', 'role', 'budget', 'msg']);

    expect(Invite::query()->count())->toBe(1);
});

it('preserves arbitrary extra fields in the invite payload', function (): void {
    $this->postJson('/api/invites', [
        'name' => 'Jane',
        'company' => 'Acme', // dynamic field beyond the known set
    ])->assertCreated()
        ->assertJsonPath('company', 'Acme');
});

it('rejects index without auth', function (): void {
    $this->getJson('/api/invites')->assertUnauthorized();
});

it('lists invites for an authenticated admin newest-first', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    Invite::factory()->count(3)->create();

    $this->withToken($token)
        ->getJson('/api/invites')
        ->assertOk()
        ->assertJsonCount(3);
});

it('deletes an invite by public_id', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;
    $invite = Invite::factory()->create();

    $this->withToken($token)
        ->deleteJson('/api/invites/' . $invite->public_id)
        ->assertOk();

    expect(Invite::query()->count())->toBe(0);
});

it('returns 404 with envelope when deleting an unknown invite', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->deleteJson('/api/invites/i_does_not_exist')
        ->assertNotFound()
        ->assertJsonStructure(['error', 'status', 'detail']);
});
