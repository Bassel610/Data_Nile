<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Admin\ChangePasswordController;
use App\Http\Controllers\Api\Admin\LoginController;
use App\Http\Controllers\Api\Admin\LogoutController;
use App\Http\Controllers\Api\InviteController;
use App\Http\Controllers\Api\SiteContentController;
use App\Http\Controllers\Api\ThemeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API routes
|--------------------------------------------------------------------------
| Resolved under the /api prefix (bootstrap/app.php).
| Public reads + invite submission are open; everything else needs
| a Sanctum bearer token issued by the admin login endpoint.
*/

$loginThrottle = (string) config('site.admin.login_throttle', '5,1');

Route::get('/site-content', [SiteContentController::class, 'show']);
Route::get('/theme', [ThemeController::class, 'show']);

Route::post('/invites', [InviteController::class, 'store'])
    ->middleware('throttle:10,1');

Route::post('/admin/login', LoginController::class)
    ->middleware("throttle:{$loginThrottle}");

Route::middleware('auth:sanctum')->group(function (): void {
    Route::patch('/site-content', [SiteContentController::class, 'update']);
    Route::patch('/theme', [ThemeController::class, 'update']);

    Route::get('/invites', [InviteController::class, 'index']);
    Route::delete('/invites/{public}', [InviteController::class, 'destroy']);

    Route::post('/admin/logout', LogoutController::class);
    Route::post('/admin/password', ChangePasswordController::class);
});
