<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_id')->unique(); // e.g. CE-01
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description');
            $table->text('image_url')->nullable();
            $table->string('category'); // Infrastructure, Industrial, Sustainability, Consulting
            $table->json('details')->nullable(); // json array of bullet points
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
