<?php

return [
    'app' => [
        'id' => env('FB_ID'),
        'secret' => env('FB_SECRET'),
        'redirect' => env('FB_REDIRECT') . '/oauth/facebook/callback',
    ],

    'registration' => [
        'attach_role' => null,
    ],
];
