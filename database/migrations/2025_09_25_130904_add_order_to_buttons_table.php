<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->unsignedInteger('order')->default(0)->after('hotel_id');
        });
    }

    public function down(): void
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};