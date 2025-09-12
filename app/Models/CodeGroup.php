<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CodeGroup extends Model
{
    protected $fillable = [
        'hotel_id',
        'key_type_id',
        'count',
        'status',
        'generated_at',
    ];

    protected $casts = [
        'generated_at' => 'datetime',
    ];

    // Relationships

    // A code group belongs to a hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    // A code group belongs to a key type
    public function keyType(): BelongsTo
    {
        return $this->belongsTo(KeyType::class);
    }

    // A code group has many codes
    public function codes(): HasMany
    {
        return $this->hasMany(Code::class, 'group_id');
    }
}