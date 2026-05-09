<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Remove the {"data": ...} envelope from all JSON resources.
        // The frontend consumes plain arrays/objects — no wrapper expected.
        JsonResource::withoutWrapping();
    }
}
