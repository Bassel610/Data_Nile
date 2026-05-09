<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Domain\Theme\Services\ThemeService;
use App\Http\Controllers\Controller;
use App\Http\Requests\PatchThemeRequest;
use Illuminate\Http\JsonResponse;

final class ThemeController extends Controller
{
    public function __construct(
        private readonly ThemeService $service,
    ) {}

    public function show(): JsonResponse
    {
        return response()->json((object) $this->service->get());
    }

    public function update(PatchThemeRequest $request): JsonResponse
    {
        return response()->json((object) $this->service->patch($request->patch()));
    }
}
