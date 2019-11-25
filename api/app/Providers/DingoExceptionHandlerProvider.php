<?php

namespace App\Providers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\ServiceProvider;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class DingoExceptionHandlerProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $handler = app('Dingo\Api\Exception\Handler');
        $handler->register(function (AuthenticationException $exception) {
            throw new UnauthorizedHttpException(null, $exception->getMessage(), $exception);
        });
        $handler->register(function (AuthorizationException $exception) {
            throw new AccessDeniedHttpException($exception->getMessage(), $exception);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
