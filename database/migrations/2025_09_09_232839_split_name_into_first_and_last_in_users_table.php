<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop old name column
            $table->dropColumn('name');

            // Add new first_name and last_name columns
            $table->string('first_name')->after('id');
            $table->string('last_name')->nullable()->after('first_name');

            // Add profile_image column
            $table->string('profile_image')->nullable()->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Rollback: drop new columns
            $table->dropColumn(['first_name', 'last_name', 'profile_image']);

            // Restore old 'name' column
            $table->string('name')->after('id');
        });
    }
};
