<?php

namespace App\Mail;

use App\Models\Code;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class KeyfinderConsentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $code;
    public $hotel;
    public $logoUrl;
    public $privacyUrl;
    public $termsUrl;
    public $unsubscribeUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(Code $code)
    {
        $this->code = $code;
        $this->hotel = $code->hotel;

        $this->logoUrl = $this->hotel->logo_image
            ? asset('/storage/' . $this->hotel->logo_image)
            : asset('/images/pps_logo.svg');

        $this->privacyUrl = "#";   // 👈 define routes
        $this->termsUrl = "#";
        $this->unsubscribeUrl = route('keyfinder.unsubscribe', $this->code->code);
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Bestätigung Ihrer Keyfinder-Einwilligung')
            ->view('emails.confirmation_keyfinder_v1')
            ->with([
                'logo_url' => $this->logoUrl,
                'hotel_name' => $this->hotel->hotel_name,
                'privacy_url' => $this->privacyUrl,
                'terms_url' => $this->termsUrl,
                'unsubscribe_url' => $this->unsubscribeUrl,
            ]);
    }
}