<?php

declare(strict_types=1);

it('returns the envelope on 404 for unknown routes', function (): void {
    $this->getJson('/api/does-not-exist')
        ->assertNotFound()
        ->assertJsonStructure(['error', 'status', 'detail']);
});

it('returns the envelope on 401 for protected routes', function (): void {
    $this->getJson('/api/invites')
        ->assertUnauthorized()
        ->assertJsonStructure(['error', 'status', 'detail']);
});

it('returns the envelope on 422 validation errors', function (): void {
    $this->postJson('/api/admin/login', ['email' => 'not-an-email'])
        ->assertUnprocessable()
        ->assertJsonStructure(['error', 'status', 'detail' => ['errors']]);
});
