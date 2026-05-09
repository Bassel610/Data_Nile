<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domain\SiteContent\Models\SiteContent;
use App\Domain\SiteContent\Support\SiteContentDefaults;
use Illuminate\Database\Seeder;

final class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        foreach (SiteContentDefaults::all() as $key => $value) {
            SiteContent::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }
}
