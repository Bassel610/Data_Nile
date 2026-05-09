<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Domain\Admin\Models\AdminUser;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AdminUser>
 */
final class AdminUserFactory extends Factory
{
    protected $model = AdminUser::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'password' => 'Secret123', // 'hashed' cast bcrypts it
        ];
    }
}
