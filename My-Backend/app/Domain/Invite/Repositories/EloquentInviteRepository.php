<?php

declare(strict_types=1);

namespace App\Domain\Invite\Repositories;

use App\Domain\Invite\Models\Invite;
use Illuminate\Support\Collection;

final class EloquentInviteRepository implements InviteRepository
{
    public function listLatest(int $limit): Collection
    {
        return Invite::query()
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    public function findByPublicId(string $publicId): ?Invite
    {
        return Invite::query()->where('public_id', $publicId)->first();
    }

    public function create(array $attributes): Invite
    {
        return Invite::query()->create($attributes);
    }

    public function delete(Invite $invite): void
    {
        $invite->delete();
    }
}
