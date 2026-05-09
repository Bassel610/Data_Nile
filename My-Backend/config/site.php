<?php

declare(strict_types=1);

/*
|--------------------------------------------------------------------------
| Site content keys
|--------------------------------------------------------------------------
|
| The whitelisted keys that GET/PATCH /api/site-content reads and writes.
| Mirrors CONTENT_KEYS from the legacy Node backend so the frontend
| contract is preserved.
|
*/

return [
    'content_keys' => [
        'heroTitle',
        'heroSub',
        'about',
        'services',
        'contactForm',
    ],

    'theme' => [
        'allowed_prefix' => '--',
    ],

    'invites' => [
        'public_id_prefix' => 'i',
        'list_max' => 500,
    ],

    'admin' => [
        'login_throttle' => '5,1',
        'token_name' => 'admin',
    ],
];
