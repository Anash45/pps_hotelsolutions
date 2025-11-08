<?php

return [

    'buttonController' => [

        'btn' => [

            'store' => [
                'success' => 'Button created successfully!',
                'unauthorized' => 'You are not authorized to create this button.',
                'validation_error' => 'Invalid data provided for creating a button.',
            ],

            'update' => [
                'success' => 'Button updated successfully!',
                'unauthorized' => 'You are not authorized to update this button.',
                'validation_error' => 'Invalid data provided for updating a button.',
            ],

            'destroy' => [
                'success' => 'Button deleted successfully!',
                'unauthorized' => 'You are not authorized to delete this button.',
            ],

            'reorder' => [
                'success' => 'Button order updated successfully.',
                'unauthorized' => 'You are not authorized to reorder these buttons.',
                'validation_error' => 'Invalid button order data.',
            ],

            'trackView' => [
                'success' => 'View tracked successfully.',
            ],

            'unauthorized' => 'Unauthorized action.',
        ],

    ],
    'dashboardController' => [
        'index' => [
            'unauthorized' => 'You are not authorized to access this dashboard.',
            'no_hotel_selected' => 'No hotel selected.',
            'hotel_not_found' => 'Hotel not found.',
        ],

        'getViewsForHotel' => [
            'button_text_na' => 'N/A',
            'views_data_unavailable' => 'View data is unavailable.',
            'chart_data_unavailable' => 'Chart data is unavailable.',
            'codes_info_unavailable' => 'Codes information is unavailable.',
        ],

    ],

    'hotelPageController' => [

        'show' => [
            'page_not_found' => 'Page not found.',
            'hotel_not_found' => 'Hotel not found.',
        ],

        'store' => [
            'success' => 'Page saved successfully!',
            'unauthorized' => 'You are not authorized to create this page.',
            'validation_error' => 'Invalid data provided for creating a page.',
            'slug_exists' => 'Slug already exists for this hotel.',
        ],

        'update' => [
            'success' => 'Page updated successfully!',
            'unauthorized' => 'You are not authorized to update this page.',
            'validation_error' => 'Invalid data provided for updating the page.',
        ],

        'destroy' => [
            'success' => 'Page deleted successfully.',
            'unauthorized' => 'You are not authorized to delete this page.',
            'not_found' => 'Page not found.',
        ],

    ],

    'keyAssignmentController' => [

        'store' => [
            'success' => 'Key assignment created successfully.',
            'unauthorized' => 'You are not authorized to create this key assignment.',
            'code_not_belong_hotel' => 'The selected code does not belong to the given hotel.',
            'code_already_assigned' => 'This key is already assigned.',
        ],

        'updateStatus' => [
            'success' => 'Key status updated successfully.',
        ],

        'recognize' => [
            'code_not_found' => 'Code not found',
            'code_already_active' => 'Code already active',
            'code_already_assigned' => 'Code already assigned',
        ],

        'update' => [
            'success' => 'Key assignment updated successfully.',
            'code_not_belong_hotel' => 'The selected code does not belong to the given hotel.',
        ],

        'destroy' => [
            'success' => 'Key assignment deleted successfully.',
            'unauthorized' => 'You are not authorized to delete this key assignment.',
        ],

    ],

    'profileController' => [

        'updatePhoto' => [
            'success' => 'Photo updated successfully.',
        ],

        'update' => [
            'success' => 'Profile updated successfully.',
        ],

        'destroy' => [
            'success' => 'Account deleted successfully.',
        ],

    ],

    'adminCodeController' => [

        'userStore' => [
            'already_assigned' => "This key's data is already saved.",
            'success' => 'Key assignment saved successfully.',
            'validation_failed' => 'Validation failed.',
        ],

        'showByKey' => [
            'default_title' => 'Hotel Info',
            'default_description' => 'Explore your hotel details and services.',
            'default_image' => '/images/building-placeholder.webp',
        ],

        'unsubscribe' => [
            'success_deleted_assignment' => 'Key assignment deleted successfully.',
        ],

        'makeActive' => [
            'success_activated' => 'Key has been activated successfully.',
        ],

        'store' => [
            'success_generated' => ':count codes generated and CSV downloaded.',
        ],

        'deleteGroup' => [
            'error_assigned' => 'This code group cannot be deleted because one or more codes are already assigned.',
            'success_deleted' => ':count codes and the group were deleted successfully.',
        ],

    ],

    'adminUserController' => [

        'store' => [
            'success' => 'User created successfully.',
        ],

        'update' => [
            'success' => 'User updated successfully.',
        ],

        'destroy' => [
            'cannot_delete_self' => 'You cannot delete your own account.',
            'success_deleted' => 'User deleted (soft).',
        ],

    ],

];