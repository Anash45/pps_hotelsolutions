<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Code extends Model
{
    protected $fillable = [
        'hotel_id',
        'code',
        'key_type_id',
        'status',
        'generated_at',
        'group_id',
    ];

    protected $casts = [
        'generated_at' => 'datetime',
    ];

    public $timestamps = false; // Since migration doesn't have timestamps

    /**
     * Each code belongs to a hotel
     */
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }

    /**
     * Each code belongs to a key type
     */
    public function keyType(): BelongsTo
    {
        return $this->belongsTo(KeyType::class);
    }

    /**
     * Each code belongs to a code group (optional)
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(CodeGroup::class, 'group_id');
    }
}
