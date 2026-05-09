<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Domain\Invite\Models\Invite;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Invite>
 */
final class InviteFactory extends Factory
{
    protected $model = Invite::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'public_id' => 'i' . Str::ulid()->toBase32(),
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'role' => fake()->randomElement(['Company hiring', 'Analyst looking for work', 'Just exploring']),
            'budget' => fake()->randomElement(['< $5k', '$5k – $15k', '$15k – $50k', '$50k+']),
            'msg' => fake()->sentence(),
            'extra' => null,
        ];
    }
}
