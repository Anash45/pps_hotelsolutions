import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CodesTitle from "./CodesTitle";
import CodesForm from "./CodesForm";

export default function Codes() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <CodesTitle />
                <div class="grid lg:grid-cols-[60%,40%] grid-cols-1 gap-[14px]">
                    <CodesForm />
                    <div class="bg-gray-300 p-4">Column 2 (40%)</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
