<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->text('keyfinder_heading_de')->after('keyfinder_heading')->nullable();
            $table->text('key_finder_page_text_de')->after('key_finder_page_text')->nullable();
            $table->string('key_finder_bottom_heading_de', 255)->after('key_finder_bottom_heading')->nullable();
            $table->text('key_finder_bottom_description_de')->after('key_finder_bottom_description')->nullable();
            $table->string('key_finder_bottom_btn_text_de', 255)->after('key_finder_bottom_btn_text')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'keyfinder_heading_de',
                'key_finder_page_text_de',
                'key_finder_bottom_heading_de',
                'key_finder_bottom_description_de',
                'key_finder_bottom_btn_text_de',
            ]);
        });
    }
};
