<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->string('primary_color', 255)->nullable()->change();
            $table->string('background_color', 255)->nullable()->change();
            $table->string('text_color', 255)->nullable()->change();
            $table->string('button_text_color', 255)->nullable()->change();
            $table->string('page_text_color', 255)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            // Rollback to hex length (7 chars, e.g. "#FFFFFF")
            $table->string('primary_color', 7)->change();
            $table->string('background_color', 7)->change();
            $table->string('text_color', 7)->change();
            $table->string('button_text_color', 7)->change();
            $table->string('page_text_color', 7)->change();
        });
    }
};
