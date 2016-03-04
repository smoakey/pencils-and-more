<?php
namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        
        $response->header('Access-Control-Allow-Origin', $request->headers->get('origin'));
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD', true);
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With', true);

        if ($request->getMethod() == 'OPTIONS') {
            $response->setStatusCode(200);
            $response->setContent(null);
        }
        return $response;
    }
}