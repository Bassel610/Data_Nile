<?php

declare(strict_types=1);

namespace App\Domain\Theme\Repositories;

interface ThemeRepository
{
    /**
     * @return array<string, string>
     */
    public function all(): array;

    public function put(string $name, string $value): void;
}
