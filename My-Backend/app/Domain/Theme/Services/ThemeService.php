<?php

declare(strict_types=1);

namespace App\Domain\Theme\Services;

use App\Domain\Theme\Repositories\ThemeRepository;
use Illuminate\Support\Facades\DB;

final readonly class ThemeService
{
    public function __construct(
        private ThemeRepository $repository,
    ) {}

    /**
     * @return array<string, string>
     */
    public function get(): array
    {
        return $this->repository->all();
    }

    /**
     * @param  array<string, string>  $patch
     * @return array<string, string>
     */
    public function patch(array $patch): array
    {
        $prefix = (string) config('site.theme.allowed_prefix', '--');

        DB::transaction(function () use ($patch, $prefix): void {
            foreach ($patch as $name => $value) {
                if (! str_starts_with($name, $prefix)) {
                    continue;
                }
                $this->repository->put($name, $value);
            }
        });

        return $this->get();
    }
}
