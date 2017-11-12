<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/docs', 'ApiDocsController@index');

// Authentication Routes
Auth::routes();

Route::get('/home', 'HomeController@index');

Route::group(['middleware' => ['web']], function () {
	// Generate a login URL
	Route::get('/facebook/login', 'Auth\FacebookController@login');

	// Endpoint that is redirected to after an authentication attempt
	Route::get('/facebook/callback','Auth\FacebookController@callback');
});