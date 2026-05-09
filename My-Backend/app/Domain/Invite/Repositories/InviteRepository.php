<?php

declare(strict_types=1);

namespace App\Domain\Invite\Repositories;

use App\Domain\Invite\Models\Invite;
use Illuminate\Support\Collection;

interface InviteRepository
{
    /** @return Collection<int, Invite> */
    public function listLatest(int $limit): Collection;

    public function findByPublicId(string $publicId): ?Invite;

    /** @param array<string, mixed> $attributes */
    public function create(array $attributes): Invite;

    public function delete(Invite $invite): void;
}
