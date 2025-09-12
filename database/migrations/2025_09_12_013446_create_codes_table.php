<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
            $table->string('code')->unique(); // the actual code string
            $table->foreignId('key_type_id')->constrained('key_types')->cascadeOnDelete();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamp('generated_at')->useCurrent();
            $table->foreignId('group_id')->nullable()->constrained('code_groups')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('codes');
    }
};
