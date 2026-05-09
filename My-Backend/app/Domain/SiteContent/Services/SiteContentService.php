<?php

declare(strict_types=1);

namespace App\Domain\SiteContent\Services;

use App\Domain\SiteContent\Repositories\SiteContentRepository;
use App\Domain\SiteContent\Support\SiteContentDefaults;
use Illuminate\Support\Facades\DB;

final readonly class SiteContentService
{
    public function __construct(
        private SiteContentRepository $repository,
    ) {}

    /**
     * Return the full content payload, with stored values overlaid on
     * defaults for any missing keys. Output keys are restricted to the
     * configured whitelist (config/site.php).
     *
     * @return array<string, mixed>
     */
    public function get(): array
    {
        $stored = $this->repository->all();
        $defaults = SiteContentDefaults::all();
        $keys = $this->keys();

        $out = [];
        foreach ($keys as $key) {
            $out[$key] = $stored[$key] ?? $defaults[$key] ?? null;
        }

        return $out;
    }

    /**
     * Apply a partial patch atomically — only whitelisted keys are
     * persisted. Returns the resulting full payload for the response.
     *
     * @param  array<string, mixed>  $patch
     * @return array<string, mixed>
     */
    public function patch(array $patch): array
    {
        $whitelist = $this->keys();

        DB::transaction(function () use ($patch, $whitelist): void {
            foreach ($patch as $key => $value) {
                if (! in_array($key, $whitelist, true)) {
                    continue;
                }
                $this->repository->put($key, $value);
            }
        });

        return $this->get();
    }

    /**
     * @return list<string>
     */
    private function keys(): array
    {
        /** @var list<string> $keys */
        $keys = (array) config('site.content_keys', []);

        return $keys;
    }
}
