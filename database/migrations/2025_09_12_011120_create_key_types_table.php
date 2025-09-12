<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('key_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();       // e.g. standard, key_finder (slug)
            $table->string('display_name');         // e.g. Standard Key, Key Finder
        });

        DB::table('key_types')->insert([
            ['name' => 'standard', 'display_name' => 'Standard Key'],
            ['name' => 'key_finder', 'display_name' => 'Key Finder'],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('key_types');
    }
};
