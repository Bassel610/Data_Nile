<?php

declare(strict_types=1);

namespace App\Domain\Invite\Services;

use App\Domain\Invite\DTOs\InviteData;
use App\Domain\Invite\Models\Invite;
use App\Domain\Invite\Repositories\InviteRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use RuntimeException;

final readonly class InviteService
{
    public function __construct(
        private InviteRepository $repository,
    ) {}

    /** @return Collection<int, Invite> */
    public function listLatest(): Collection
    {
        $limit = (int) config('site.invites.list_max', 500);

        return $this->repository->listLatest($limit);
    }

    public function create(InviteData $data): Invite
    {
        return $this->repository->create([
            'public_id' => $this->generatePublicId(),
            'name' => $data->name,
            'email' => $data->email,
            'role' => $data->role,
            'budget' => $data->budget,
            'msg' => $data->msg,
            'extra' => $data->extra === [] ? null : $data->extra,
        ]);
    }

    public function deleteByPublicId(string $publicId): void
    {
        $invite = $this->repository->findByPublicId($publicId);
        if ($invite === null) {
            throw new RuntimeException('Invite not found.');
        }
        $this->repository->delete($invite);
    }

    /**
     * Stable, sortable, collision-resistant identifier with the
     * legacy "i"-prefix the React frontend already understands.
     */
    private function generatePublicId(): string
    {
        $prefix = (string) config('site.invites.public_id_prefix', 'i');

        return $prefix . Str::ulid()->toBase32();
    }
}
