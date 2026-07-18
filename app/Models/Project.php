<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'client',
        'category',
        'completion_year',
        'location',
        'budget',
        'description',
        'image_url',
        'featured',
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];
}
