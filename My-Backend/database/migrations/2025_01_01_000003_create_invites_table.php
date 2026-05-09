<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invites', function (Blueprint $table): void {
            $table->id();
            $table->string('public_id', 32)->unique();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('role', 64)->nullable();
            $table->string('budget', 64)->nullable();
            $table->text('msg')->nullable();
            $table->json('extra')->nullable();
            $table->timestamps();

            $table->index('created_at');
            $table->index('email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invites');
    }
};
