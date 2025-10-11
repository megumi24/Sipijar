<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Inertia\ResponseFactory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('telegram', \SocialiteProviders\Telegram\Provider::class);
        });

        ResponseFactory::macro('modal', function ($modal, $data = [], $options = []) {
            request()->session()->ageFlashData();
            request()->session()->flash('modal', compact('modal', 'data'));

            if (!empty($options['redirect'])) {
                return redirect($options['redirect']);
            }

            return redirect()->back();
        });
    }
}
