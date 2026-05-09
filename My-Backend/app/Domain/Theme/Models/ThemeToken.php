<?php

declare(strict_types=1);

namespace App\Domain\Theme\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * A single CSS custom property (e.g. --nile-deep => #0c2a3a).
 *
 * @property int $id
 * @property string $name
 * @property string $value
 */
final class ThemeToken extends Model
{
    protected $table = 'theme_tokens';

    /** @var list<string> */
    protected $fillable = ['name', 'value'];
}
