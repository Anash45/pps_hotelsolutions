import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="h-screen max-w-[2500px] mx-auto py-2 px-2 flex lg:flex-row flex-col gap-2 bg-white">
            <Sidebar />
            <main className="grow rounded-lg body-main overflow-y-auto">{children}</main>
        </div>
    );
}
