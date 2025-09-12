<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KeyType extends Model
{
    protected $fillable = ['name', 'display_name'];
    public $timestamps = false;

    // A key type has many code groups
    public function codeGroups(): HasMany
    {
        return $this->hasMany(CodeGroup::class);
    }

    // A key type has many codes
    public function codes(): HasMany
    {
        return $this->hasMany(Code::class);
    }
}