<?php

use App\Http\Controllers\Api\AuthController;
//use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
    Route::post('/addFilm', [FilmController::class, 'store']);
    Route::post('/films', [FilmController::class, 'index']);
    Route::post('/favs', [FilmController::class, 'indd']);
    Route::post('/like/{film}', [FilmController::class, 'like']);
    Route::get('/single/{film}', [FilmController::class, 'single']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
