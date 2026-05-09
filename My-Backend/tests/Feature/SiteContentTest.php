<?php

declare(strict_types=1);

use App\Domain\Admin\Models\AdminUser;
use Database\Seeders\SiteContentSeeder;

it('returns full site content with defaults when DB is empty', function (): void {
    $response = $this->getJson('/api/site-content');

    $response->assertOk()
        ->assertJsonStructure(['heroTitle', 'heroSub', 'about', 'services', 'contactForm']);
});

it('returns seeded content over defaults', function (): void {
    $this->seed(SiteContentSeeder::class);

    $response = $this->getJson('/api/site-content');

    $response->assertOk()
        ->assertJsonPath('about.title', 'About Data Nile');
});

it('rejects PATCH without auth', function (): void {
    $this->patchJson('/api/site-content', ['heroTitle' => 'x'])
        ->assertUnauthorized()
        ->assertJsonStructure(['error', 'status', 'detail']);
});

it('applies a partial PATCH and returns full payload', function (): void {
    $this->seed(SiteContentSeeder::class);

    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $response = $this->withToken($token)
        ->patchJson('/api/site-content', ['heroTitle' => 'New title']);

    $response->assertOk()
        ->assertJsonPath('heroTitle', 'New title')
        ->assertJsonPath('about.title', 'About Data Nile');
});

it('ignores unknown keys in PATCH', function (): void {
    $admin = AdminUser::factory()->create();
    $token = $admin->createToken('test')->plainTextToken;

    $this->withToken($token)
        ->patchJson('/api/site-content', ['evilKey' => 'x', 'heroTitle' => 'ok'])
        ->assertOk()
        ->assertJsonMissingPath('evilKey');
});
