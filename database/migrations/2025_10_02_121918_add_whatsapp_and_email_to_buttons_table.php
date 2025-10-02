<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->string('whatsapp')->nullable()->after('phone');
            $table->string('email')->nullable()->after('whatsapp');
        });
    }

    public function down()
    {
        Schema::table('buttons', function (Blueprint $table) {
            $table->dropColumn(['whatsapp', 'email']);
        });
    }
};
