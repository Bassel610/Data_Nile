<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Domain\Invite\Models\Invite;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Shapes an invite for the dashboard. Uses the legacy frontend keys:
 * id => public_id, at => created_at ISO 8601, plus dynamic extras.
 *
 * @mixin Invite
 */
final class InviteResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $base = [
            'id' => $this->public_id,
            'at' => optional($this->created_at)->toIso8601String(),
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'budget' => $this->budget ?? '—',
            'msg' => $this->msg ?? '',
        ];

        $extra = is_array($this->extra) ? $this->extra : [];

        return $base + $extra;
    }
}
