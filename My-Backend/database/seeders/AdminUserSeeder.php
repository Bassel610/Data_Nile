<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Domain\Admin\Models\AdminUser;
use Illuminate\Database\Seeder;
use RuntimeException;

final class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = (string) env('ADMIN_EMAIL', '');
        $password = (string) env('ADMIN_INITIAL_PASSWORD', '');

        if ($email === '' || $password === '') {
            throw new RuntimeException(
                'ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD must be set in .env before seeding.'
            );
        }

        AdminUser::query()->firstOrCreate(
            ['email' => $email],
            ['password' => $password], // 'hashed' cast handles bcrypt
        );
    }
}
