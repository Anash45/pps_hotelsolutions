<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('buttons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();

            $table->string('type'); // page, url, map, phone, wifi, facebook, instagram, etc.
            $table->string('text')->nullable(); // label shown on button
            $table->string('icon')->nullable(); // store icon name e.g. "phone", "facebook"

            // Common fields
            $table->string('text_color')->default('#ffffff');
            $table->string('background_color')->default('#84af83');

            // Dynamic fields (nullable for types that don’t use them)
            $table->string('url')->nullable(); 
            $table->string('phone')->nullable();
            $table->string('wifi_name')->nullable();
            $table->string('wifi_password')->nullable();
            $table->foreignId('page_id')->nullable()->constrained('pages')->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buttons');
    }
};