<?php

declare(strict_types=1);

namespace App\Domain\SiteContent\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Key/value site content row.
 *
 * @property int $id
 * @property string $key
 * @property mixed $value
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
final class SiteContent extends Model
{
    protected $table = 'site_contents';

    /** @var list<string> */
    protected $fillable = ['key', 'value'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'value' => 'array',
        ];
    }
}
