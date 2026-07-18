<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'email',
        'organization',
        'sector',
        'scope',
        'budget',
        'timeline',
        'status',
    ];

    protected static function booted()
    {
        static::creating(function ($inquiry) {
            $inquiry->reference_number = '#SI-' . rand(10000, 99999) . '-' . chr(rand(65, 90));
        });
    }
}
