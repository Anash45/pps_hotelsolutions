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
            $table->string('heading')->nullable()->after('hotel_name');

            // Images
            $table->string('logo_image')->nullable()->after('heading');
            $table->string('banner_image')->nullable()->after('logo_image');

            // Colors (store as hex codes like #FFFFFF)
            $table->string('primary_color', 7)->nullable()->after('banner_image');
            $table->string('background_color', 7)->nullable()->after('primary_color');
            $table->string('text_color', 7)->nullable()->after('background_color');
            $table->string('button_text_color', 7)->nullable()->after('text_color');
            $table->string('page_text_color', 7)->nullable()->after('button_text_color');

            // Text for key finder page
            $table->text('key_finder_page_text')->nullable()->after('page_text_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn([
                'heading',
                'logo_image',
                'banner_image',
                'primary_color',
                'background_color',
                'text_color',
                'button_text_color',
                'page_text_color',
                'key_finder_page_text',
            ]);
        });
    }
};
