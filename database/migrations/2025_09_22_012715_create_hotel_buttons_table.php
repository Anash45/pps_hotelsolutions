<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('hotel_buttons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
            $table->unsignedInteger('order')->default(0);
            $table->string('title');
            $table->string('type'); // wifi, link, website, call, etc.
            $table->string('url')->nullable();
            $table->string('icon')->nullable(); // lucide icon name

            // 🎨 Per-button branding
            $table->string('background_color')->default('#000000');
            $table->string('text_color')->default('#FFFFFF');

            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('hotel_buttons');
    }
};