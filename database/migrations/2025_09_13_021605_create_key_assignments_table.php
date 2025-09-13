<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('key_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('code_id')->unique()->constrained()->onDelete('cascade');
            $table->string('salutation')->nullable();
            $table->string('title')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('room_number')->nullable();
            $table->date('stay_from')->nullable();
            $table->date('stay_till')->nullable();
            $table->boolean('gdpr_consent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('key_assignments');
    }

};
