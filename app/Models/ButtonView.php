<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ButtonView extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'button_id',
        'ip_address',
        'viewed_at',
    ];

    public function button()
    {
        return $this->belongsTo(Button::class);
    }
}
