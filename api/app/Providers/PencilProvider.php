<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PencilProvider extends ServiceProvider
{
    /**
     * Bind the "PencilRepository" to the "EloquentPencilRepository"
     *
     * This is done so we can reference just the interface "PencilRepository" 
     * through out our code and Lumen will know that we actually want to use the
     * "EloquentPencilRepository". This hides the implementation in our controllers
     * and also allows an easier rewrite or different implementation later.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
			'\App\Repositories\PencilRepository',
			'\App\Repositories\EloquentPencilRepository'
		);
    }
}