<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_name',
        'heading',
        'sub_heading',
        'keyfinder_heading',
        'logo_image',
        'banner_image',
        'primary_color',
        'background_color',
        'text_color',
        'button_text_color',
        'page_text_color',
        'key_finder_page_text',
    ];

    // Relationship: Hotel has many users
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function codeGroups(): HasMany
    {
        return $this->hasMany(CodeGroup::class);
    }

    // A hotel has many codes
    public function codes(): HasMany
    {
        return $this->hasMany(Code::class);
    }


    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function buttons()
    {
        return $this->hasMany(Button::class);
    }
}