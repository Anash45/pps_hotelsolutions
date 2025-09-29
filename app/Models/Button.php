<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Button extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'type',
        'text',
        'icon',
        'order',
        'text_color',
        'background_color',
        'url',
        'phone',
        'wifi_name',
        'wifi_password',
        'page_id',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
