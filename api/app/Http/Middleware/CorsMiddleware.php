<?php
namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');

        if ($request->getMethod() == 'OPTIONS') {
            $response->setStatusCode(200);
            $response->setContent(null);
        }
        
        return $response;
    }
}