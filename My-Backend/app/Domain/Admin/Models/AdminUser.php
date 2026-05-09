<?php

declare(strict_types=1);

namespace App\Domain\Admin\Models;

use Database\Factories\AdminUserFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $email
 * @property string $password
 * @property Carbon|null $last_login_at
 */
final class AdminUser extends Authenticatable
{
    use HasApiTokens;

    /** @use HasFactory<AdminUserFactory> */
    use HasFactory;
    use Notifiable;

    protected static function newFactory(): Factory
    {
        return AdminUserFactory::new();
    }

    protected $table = 'admin_users';

    /** @var list<string> */
    protected $fillable = ['email', 'password', 'last_login_at'];

    /** @var list<string> */
    protected $hidden = ['password', 'remember_token'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'last_login_at' => 'datetime',
        ];
    }
}
