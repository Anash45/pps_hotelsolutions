<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->string('text_de')->nullable()->after('text'); // add after existing 'text' column
        });
    }

    public function down(): void
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->dropColumn('text_de');
        });
    }
};