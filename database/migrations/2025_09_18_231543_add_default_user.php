<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('users')->insert([
            'first_name' => 'Main',
            'last_name' => 'Admin',
            'email' => 'futuretest45@gmail.com',
            'password' => Hash::make('asdfasdf'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        DB::table('users')->where('email', 'futuretest45@gmail.com')->delete();
    }
};