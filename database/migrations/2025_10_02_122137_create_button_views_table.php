<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('button_views', function (Blueprint $table) {
            $table->id();
            $table->foreignId('button_id')
                ->constrained('buttons')
                ->onDelete('cascade'); // hard delete cascade

            $table->string('ip_address')->nullable(); // track unique by IP
            $table->timestamp('viewed_at')->useCurrent();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('button_views');
    }
};

