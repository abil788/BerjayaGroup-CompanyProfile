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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique(); // e.g. #SI-77421-B
            $table->string('full_name');
            $table->string('email');
            $table->string('organization');
            $table->string('sector'); // Civil Works, Industrial, Commercial
            $table->text('scope');
            $table->string('budget'); // $5M - $25M, $25M - $100M, $100M+
            $table->string('timeline'); // e.g. Immediate (Q1-Q2 2024), Planning Phase (2025 Start), Request for Tender
            $table->string('status')->default('Pending'); // Pending, In Review, Contacted, Closed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
