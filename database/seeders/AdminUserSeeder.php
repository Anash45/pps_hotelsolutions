<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'first_name'    => 'Admin',
                'last_name'     => 'One',
                'email'         => 'futuretest45@gmail.com',
                'password'      => Hash::make('asdfasdf'), // 🔑 change to secure password
                'role'          => 'admin',
                'profile_image' => null,
                'hotel_id'      => null,
            ],
            [
                'first_name'    => 'Admin',
                'last_name'     => 'Two',
                'email'         => 'softwaredevelopment1@ppswallet.de',
                'password'      => Hash::make('asdfasdf'), // 🔑 change to secure password
                'role'          => 'admin',
                'profile_image' => null,
                'hotel_id'      => null,
            ],
        ];

        foreach ($admins as $admin) {
            User::updateOrCreate(
                ['email' => $admin['email']], // avoid duplicates if run again
                $admin
            );
        }
    }
}
