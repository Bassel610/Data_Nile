<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class PatchSiteContentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'heroTitle' => ['sometimes', 'string', 'max:500'],
            'heroSub' => ['sometimes', 'string', 'max:2000'],

            'about' => ['sometimes', 'array'],
            'about.title' => ['required_with:about', 'string', 'max:200'],
            'about.description' => ['required_with:about', 'string', 'max:5000'],

            'services' => ['sometimes', 'array'],
            'services.title' => ['required_with:services', 'string', 'max:200'],
            'services.items' => ['required_with:services', 'array'],
            'services.items.*.t' => ['required', 'string', 'max:200'],
            'services.items.*.d' => ['required', 'string', 'max:1000'],

            'contactForm' => ['sometimes', 'array'],
            'contactForm.*.id' => ['required', 'string', 'max:64'],
            'contactForm.*.type' => ['required', 'in:input,textarea,select'],
            'contactForm.*.label' => ['required', 'string', 'max:200'],
            'contactForm.*.value' => ['required', 'array'],
            'contactForm.*.value.*' => ['string'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function patch(): array
    {
        return $this->only([
            'heroTitle',
            'heroSub',
            'about',
            'services',
            'contactForm',
        ]);
    }
}
