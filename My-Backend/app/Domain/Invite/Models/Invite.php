<?php

declare(strict_types=1);

namespace App\Domain\Invite\Models;

use Database\Factories\InviteFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $public_id
 * @property string|null $name
 * @property string|null $email
 * @property string|null $role
 * @property string|null $budget
 * @property string|null $msg
 * @property array<string, mixed>|null $extra
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
final class Invite extends Model
{
    /** @use HasFactory<InviteFactory> */
    use HasFactory;

    protected static function newFactory(): Factory
    {
        return InviteFactory::new();
    }

    protected $table = 'invites';

    /** @var list<string> */
    protected $fillable = [
        'public_id',
        'name',
        'email',
        'role',
        'budget',
        'msg',
        'extra',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'extra' => 'array',
        ];
    }
}
