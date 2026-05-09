<?php

declare(strict_types=1);

namespace App\Providers;

use App\Domain\Invite\Repositories\EloquentInviteRepository;
use App\Domain\Invite\Repositories\InviteRepository;
use App\Domain\SiteContent\Repositories\EloquentSiteContentRepository;
use App\Domain\SiteContent\Repositories\SiteContentRepository;
use App\Domain\Theme\Repositories\EloquentThemeRepository;
use App\Domain\Theme\Repositories\ThemeRepository;
use Illuminate\Support\ServiceProvider;

final class DomainServiceProvider extends ServiceProvider
{
    /**
     * Bind repository interfaces to their Eloquent implementations.
     * Controllers and services depend on the interfaces; storage swaps
     * (e.g. cache, in-memory test doubles) happen here.
     *
     * @var array<class-string, class-string>
     */
    public array $bindings = [
        SiteContentRepository::class => EloquentSiteContentRepository::class,
        ThemeRepository::class => EloquentThemeRepository::class,
        InviteRepository::class => EloquentInviteRepository::class,
    ];

    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        //
    }
}
