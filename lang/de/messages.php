<?php

return [

    'buttonController' => [

        'btn' => [

            'store' => [
                'success' => 'Button erfolgreich erstellt!',
                'unauthorized' => 'Sie sind nicht berechtigt, diesen Button zu erstellen.',
                'validation_error' => 'Ungültige Daten für die Erstellung eines Buttons bereitgestellt.',
            ],

            'update' => [
                'success' => 'Button erfolgreich aktualisiert!',
                'unauthorized' => 'Sie sind nicht berechtigt, diesen Button zu aktualisieren.',
                'validation_error' => 'Ungültige Daten für die Aktualisierung eines Buttons bereitgestellt.',
            ],

            'destroy' => [
                'success' => 'Button erfolgreich gelöscht!',
                'unauthorized' => 'Sie sind nicht berechtigt, diesen Button zu löschen.',
            ],

            'reorder' => [
                'success' => 'Button-Reihenfolge erfolgreich aktualisiert.',
                'unauthorized' => 'Sie sind nicht berechtigt, diese Buttons umzuordnen.',
                'validation_error' => 'Ungültige Button-Reihenfolgedaten.',
            ],

            'trackView' => [
                'success' => 'Ansicht erfolgreich erfasst.',
            ],

            'unauthorized' => 'Unbefugte Aktion.',
        ],

    ],
    'dashboardController' => [
        'index' => [
            'unauthorized' => 'Sie sind nicht berechtigt, auf dieses Dashboard zuzugreifen.',
            'no_hotel_selected' => 'Kein Hotel ausgewählt.',
            'hotel_not_found' => 'Hotel nicht gefunden.',
        ],

        'getViewsForHotel' => [
            'button_text_na' => 'Nicht verfügbar',
            'views_data_unavailable' => 'Ansichtsdaten sind nicht verfügbar.',
            'chart_data_unavailable' => 'Diagrammdaten sind nicht verfügbar.',
            'codes_info_unavailable' => 'Code-Informationen sind nicht verfügbar.',
        ],

    ],

    'hotelPageController' => [

        'show' => [
            'page_not_found' => 'Seite nicht gefunden.',
            'hotel_not_found' => 'Hotel nicht gefunden.',
        ],

        'store' => [
            'success' => 'Seite erfolgreich gespeichert!',
            'unauthorized' => 'Sie sind nicht berechtigt, diese Seite zu erstellen.',
            'validation_error' => 'Ungültige Daten für die Erstellung einer Seite bereitgestellt.',
            'slug_exists' => 'Slug existiert bereits für dieses Hotel.',
        ],

        'update' => [
            'success' => 'Seite erfolgreich aktualisiert!',
            'unauthorized' => 'Sie sind nicht berechtigt, diese Seite zu aktualisieren.',
            'validation_error' => 'Ungültige Daten für die Aktualisierung der Seite bereitgestellt.',
        ],

        'destroy' => [
            'success' => 'Seite erfolgreich gelöscht.',
            'unauthorized' => 'Sie sind nicht berechtigt, diese Seite zu löschen.',
            'not_found' => 'Seite nicht gefunden.',
        ],

    ],

    'keyAssignmentController' => [

        'store' => [
            'success' => 'Schlüsselzuweisung erfolgreich erstellt.',
            'unauthorized' => 'Sie sind nicht berechtigt, diese Schlüsselzuweisung zu erstellen.',
            'code_not_belong_hotel' => 'Der ausgewählte Code gehört nicht zum angegebenen Hotel.',
            'code_already_assigned' => 'Dieser Schlüssel ist bereits zugewiesen.',
        ],

        'updateStatus' => [
            'success' => 'Schlüsselstatus erfolgreich aktualisiert.',
        ],

        'recognize' => [
            'code_not_found' => 'Code nicht gefunden',
            'code_already_active' => 'Code bereits aktiv',
            'code_already_assigned' => 'Code bereits zugewiesen',
        ],

        'update' => [
            'success' => 'Schlüsselzuweisung erfolgreich aktualisiert.',
            'code_not_belong_hotel' => 'Der ausgewählte Code gehört nicht zum angegebenen Hotel.',
        ],

        'destroy' => [
            'success' => 'Schlüsselzuweisung erfolgreich gelöscht.',
            'unauthorized' => 'Sie sind nicht berechtigt, diese Schlüsselzuweisung zu löschen.',
        ],

    ],

    'profileController' => [

        'updatePhoto' => [
            'success' => 'Foto erfolgreich aktualisiert.',
        ],

        'update' => [
            'success' => 'Profil erfolgreich aktualisiert.',
        ],

        'destroy' => [
            'success' => 'Konto erfolgreich gelöscht.',
        ],

    ],

    'adminCodeController' => [

        'userStore' => [
            'already_assigned' => "Die Daten dieses Schlüssels sind bereits gespeichert.",
            'success' => 'Schlüsselzuweisung erfolgreich gespeichert.',
            'validation_failed' => 'Validierung fehlgeschlagen.',
        ],

        'showByKey' => [
            'default_title' => 'Hotel-Informationen',
            'default_description' => 'Entdecken Sie Ihre Hoteldetails und Services.',
            'default_image' => '/images/building-placeholder.webp',
        ],

        'unsubscribe' => [
            'success_deleted_assignment' => 'Schlüsselzuweisung erfolgreich gelöscht.',
        ],

        'makeActive' => [
            'success_activated' => 'Schlüssel wurde erfolgreich aktiviert.',
        ],

        'store' => [
            'success_generated' => ':count Codes generiert und CSV heruntergeladen.',
        ],

        'deleteGroup' => [
            'error_assigned' => 'Diese Code-Gruppe kann nicht gelöscht werden, da einer oder mehrere Codes bereits zugewiesen sind.',
            'success_deleted' => ':count Codes und die Gruppe wurden erfolgreich gelöscht.',
        ],

    ],

    'adminUserController' => [

        'store' => [
            'success' => 'Benutzer erfolgreich erstellt.',
        ],

        'update' => [
            'success' => 'Benutzer erfolgreich aktualisiert.',
        ],

        'destroy' => [
            'cannot_delete_self' => 'Sie können Ihr eigenes Konto nicht löschen.',
            'success_deleted' => 'Benutzer gelöscht (soft).',
        ],

    ],

];