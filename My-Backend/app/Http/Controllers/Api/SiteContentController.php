<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Domain\SiteContent\Services\SiteContentService;
use App\Http\Controllers\Controller;
use App\Http\Requests\PatchSiteContentRequest;
use Illuminate\Http\JsonResponse;

final class SiteContentController extends Controller
{
    public function __construct(
        private readonly SiteContentService $service,
    ) {}

    public function show(): JsonResponse
    {
        return response()->json($this->service->get());
    }

    public function update(PatchSiteContentRequest $request): JsonResponse
    {
        return response()->json($this->service->patch($request->patch()));
    }
}
