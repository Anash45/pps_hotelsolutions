import { Link, router } from "@inertiajs/react";
import { Edit, Trash2 } from "lucide-react";
import { useLang } from "@/context/TranslationProvider";

export default function UserTable({ users }) {
    const { t } = useLang("users.UserTable");

    const handleDelete = (id) => {
        if (confirm(t("deleteConfirm"))) {
            router.delete(route("users.destroy", id));
        }
    };

    return (
        <div className="py-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-6 overflow-x-auto">
            <div className="space-y-3">
                {/* Header */}
                <div className="hidden sm:flex border-b border-gray-200 pb-2 px-4 text-sm font-semibold text-[#263238]">
                    <div className="w-16">{t("id")}</div>
                    <div className="flex-1">{t("name")}</div>
                    <div className="flex-1">{t("email")}</div>
                    <div className="w-24">{t("role")}</div>
                    <div className="w-28 text-right">{t("actions")}</div>
                </div>

                {/* Rows */}
                {users.data.map((user) => (
                    <div
                        key={user.id}
                        className="border border-gray-400 rounded-lg py-2 px-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:flex-1 sm:gap-4">
                            <div className="sm:w-16">
                                <span className="sm:hidden text-xs text-gray-500">
                                    {t("id")}:{" "}
                                </span>
                                <span className="text-sm text-body">
                                    {user.id}
                                </span>
                            </div>
                            <div className="sm:flex-1">
                                <span className="sm:hidden text-xs text-gray-500">
                                    {t("name")}:{" "}
                                </span>
                                <span className="text-sm text-body">
                                    {user.first_name} {user.last_name}
                                </span>
                            </div>
                            <div className="sm:flex-1">
                                <span className="sm:hidden text-xs text-gray-500">
                                    {t("email")}:{" "}
                                </span>
                                <span className="text-sm text-body">
                                    {user.email}
                                </span>
                            </div>
                            <div className="sm:w-24">
                                <span className="sm:hidden text-xs text-gray-500">
                                    {t("role")}:{" "}
                                </span>
                                <span className="text-sm text-body">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-0 flex gap-3 justify-end sm:w-28">
                            <Link
                                href={route("users.edit", user.id)}
                                className="px-2 py-1.5 text-sm rounded-md border border-indigo-500 text-white bg-indigo-600 hover:bg-indigo-700 transition"
                            >
                                <Edit className="h-4 w-4" strokeWidth={2} />
                            </Link>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="px-2 py-1.5 text-sm rounded-md border border-red-500 text-white bg-red-600 hover:bg-red-700 transition"
                            >
                                <Trash2 className="h-4 w-4" strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="p-4">
                {users.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || "#"}
                        className={`px-3 py-1 text-sm rounded ${
                            link.active
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-body hover:bg-gray-300"
                        } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
