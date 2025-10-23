<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->string('key_finder_bottom_heading')->nullable();
            $table->text('key_finder_bottom_description')->nullable();
            $table->string('key_finder_bottom_btn_text')->nullable();
            $table->string('key_finder_bottom_btn_url')->nullable();
            $table->string('key_finder_bottom_btn_text_color')->nullable();
            $table->string('key_finder_bottom_btn_bg_color')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'key_finder_bottom_heading',
                'key_finder_bottom_description',
                'key_finder_bottom_btn_text',
                'key_finder_bottom_btn_url',
                'key_finder_bottom_btn_text_color',
                'key_finder_bottom_btn_bg_color',
            ]);
        });
    }
};