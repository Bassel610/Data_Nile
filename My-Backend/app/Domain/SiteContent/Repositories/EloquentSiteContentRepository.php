<?php

declare(strict_types=1);

namespace App\Domain\SiteContent\Repositories;

use App\Domain\SiteContent\Models\SiteContent;

final class EloquentSiteContentRepository implements SiteContentRepository
{
    public function all(): array
    {
        /** @var array<string, mixed> $map */
        $map = SiteContent::query()
            ->pluck('value', 'key')
            ->all();

        return $map;
    }

    public function put(string $key, mixed $value): void
    {
        SiteContent::query()->updateOrCreate(
            ['key' => $key],
            ['value' => $value],
        );
    }
}
