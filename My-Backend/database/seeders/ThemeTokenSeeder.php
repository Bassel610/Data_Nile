<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domain\Theme\Models\ThemeToken;
use Illuminate\Database\Seeder;

final class ThemeTokenSeeder extends Seeder
{
    /** @var array<string, string> */
    private const DEFAULTS = [
        '--nile-deep' => '#0c2a3a',
        '--terracotta' => '#c46a4f',
        '--reed' => '#7aa07a',
        '--gold' => '#d8a44a',
        '--sand' => '#efe6d2',
        '--ink' => '#11181c',
    ];

    public function run(): void
    {
        foreach (self::DEFAULTS as $name => $value) {
            ThemeToken::query()->updateOrCreate(
                ['name' => $name],
                ['value' => $value],
            );
        }
    }
}
