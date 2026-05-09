<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class PatchThemeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Theme keys are CSS custom-property names ("--nile-deep" etc.) and
     * vary at runtime, so we validate the *shape* (string => string)
     * rather than enumerating keys. The service layer enforces the
     * "--" prefix policy.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            '*' => ['string', 'max:128'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function patch(): array
    {
        /** @var array<string, string> $all */
        $all = $this->all();

        return $all;
    }
}
