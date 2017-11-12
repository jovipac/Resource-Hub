<?php

return [
    'app' => [
        'id' => env('FB_ID'),
        'secret' => env('FB_SECRET'),
        'redirect' => env('APP_URL', 'http://localhost') .'/'. env('FB_REDIRECT','facebook/callback'),
    ],

    'registration' => [
        'attach_role' => null,
    ],
];
