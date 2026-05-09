<?php

declare(strict_types=1);

namespace App\Domain\Invite\DTOs;

/**
 * Validated, normalized invite payload moving from HTTP into the
 * domain. Decoupled from request shape so downstream callers don't
 * depend on FormRequest internals.
 */
final readonly class InviteData
{
    /**
     * @param  array<string, mixed>  $extra
     */
    public function __construct(
        public ?string $name,
        public ?string $email,
        public ?string $role,
        public ?string $budget,
        public ?string $msg,
        public array $extra = [],
    ) {}

    /**
     * @param  array<string, mixed>  $payload
     */
    public static function fromArray(array $payload): self
    {
        $known = ['name', 'email', 'role', 'budget', 'msg'];

        $extra = [];
        foreach ($payload as $key => $value) {
            if (! in_array($key, $known, true)) {
                $extra[$key] = $value;
            }
        }

        return new self(
            name: self::nullableString($payload['name'] ?? null),
            email: self::nullableString($payload['email'] ?? null),
            role: self::nullableString($payload['role'] ?? null),
            budget: self::nullableString($payload['budget'] ?? null),
            msg: self::nullableString($payload['msg'] ?? null),
            extra: $extra,
        );
    }

    private static function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $s = trim((string) $value);

        return $s === '' ? null : $s;
    }
}
