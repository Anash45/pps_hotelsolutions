<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KeyAssignment extends Model
{
    protected $fillable = [
        'code_id',
        'salutation',
        'title',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'room_number',
        'stay_from',
        'stay_till',
        'gdpr_consent',
    ];

    protected $casts = [
        'stay_from' => 'date',
        'stay_till' => 'date',
        'gdpr_consent' => 'boolean',
    ];

    public function code(): BelongsTo
    {
        return $this->belongsTo(Code::class);
    }
}