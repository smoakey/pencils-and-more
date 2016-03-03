<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/pencils',            ['uses' => 'PencilController@index']);
$app->get('/pencils/{id}',       ['uses' => 'PencilController@show']);
$app->post('/pencils',           ['uses' => 'PencilController@store']);
$app->patch('/pencils/{id}',     ['uses' => 'PencilController@update']);
$app->delete('/pencils/{id}',    ['uses' => 'PencilController@destroy']);

$app->post('/pencils/{id}/vote', ['uses' => 'PencilController@vote']);