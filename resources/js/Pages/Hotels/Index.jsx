import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Hotels() {
    return (
        <AuthenticatedLayout
        >
           <Head title="Hotels" />

        </AuthenticatedLayout>
    );
}
