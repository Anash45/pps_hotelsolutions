import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import UserTitle from "./UserTitle";
import UserTable from "./UserTable";
import { Plus } from "lucide-react";
import FlashMessage from "@/Components/FlashMessage";

export default function Users() {
    const { users, flash } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title="Users" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6 max-w-[1200px]">
                <div className="flex items-center justify-between">
                    <UserTitle title={"Users Management"} />

                    <Link
                        href={route("users.create")}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md shadow hover:bg-indigo-700 flex items-center gap-1 justify-center transition"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} /> Add User
                    </Link>
                </div>

                <FlashMessage message={flash?.success} type="success" />
                <FlashMessage message={flash?.error} type="error" />

                <UserTable users={users} />
            </div>
        </AuthenticatedLayout>
    );
}
