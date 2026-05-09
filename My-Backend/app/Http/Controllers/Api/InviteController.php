<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Domain\Invite\DTOs\InviteData;
use App\Domain\Invite\Services\InviteService;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInviteRequest;
use App\Http\Resources\InviteResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use RuntimeException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

final class InviteController extends Controller
{
    public function __construct(
        private readonly InviteService $service,
    ) {}

    public function index(): AnonymousResourceCollection
    {
        return InviteResource::collection($this->service->listLatest());
    }

    public function store(StoreInviteRequest $request): JsonResponse
    {
        $payload = (array) $request->all();
        $invite = $this->service->create(InviteData::fromArray($payload));

        return (new InviteResource($invite))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function destroy(Request $request, string $public): JsonResponse
    {
        try {
            $this->service->deleteByPublicId($public);
        } catch (RuntimeException) {
            throw new NotFoundHttpException('Invite not found.');
        }

        return response()->json(['ok' => true]);
    }
}
