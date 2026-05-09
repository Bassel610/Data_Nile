<?php

declare(strict_types=1);

namespace App\Domain\SiteContent\Repositories;

interface SiteContentRepository
{
    /**
     * Fetch all stored content as a key => value map.
     *
     * @return array<string, mixed>
     */
    public function all(): array;

    /**
     * Upsert a single content key.
     */
    public function put(string $key, mixed $value): void;
}
