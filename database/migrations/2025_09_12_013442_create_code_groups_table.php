<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('code_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hotel_id')->constrained()->cascadeOnDelete();
            $table->foreignId('key_type_id')->constrained('key_types')->cascadeOnDelete();
            $table->integer('count'); // number of codes generated
            $table->enum('status', ['active', 'inactive'])->default('active'); // default status for group
            $table->timestamp('generated_at')->useCurrent();
            $table->timestamps(); // for record keeping
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('code_groups');
    }
};
