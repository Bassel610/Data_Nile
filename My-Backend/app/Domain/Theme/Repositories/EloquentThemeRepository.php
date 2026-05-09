<?php

declare(strict_types=1);

namespace App\Domain\Theme\Repositories;

use App\Domain\Theme\Models\ThemeToken;

final class EloquentThemeRepository implements ThemeRepository
{
    public function all(): array
    {
        /** @var array<string, string> $map */
        $map = ThemeToken::query()
            ->pluck('value', 'name')
            ->all();

        return $map;
    }

    public function put(string $name, string $value): void
    {
        ThemeToken::query()->updateOrCreate(
            ['name' => $name],
            ['value' => $value],
        );
    }
}
