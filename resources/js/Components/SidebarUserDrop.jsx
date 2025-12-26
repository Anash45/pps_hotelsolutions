"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronUp, LogOut, User } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { useLang } from "@/context/TranslationProvider";

const SidebarUserDrop = () => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);
    const user = usePage().props.auth.user;
    const { t } = useLang("Components.sidebarUserDrop");

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="drop-wrapper px-4 relative">
            {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                className={`p-[9px] rounded-xl flex items-center gap-3 justify-between cursor-pointer border-2 transition-all duration-300 ${
                    open ? "border-[#6366F1]" : "border-transparent"
                }`}
            >
                <div className="flex items-center gap-3 font-inter">
                    <img
                        src={
                            user.profile_image
                                ? `/storage/${user.profile_image}`
                                : "/images/user-placeholder.png"
                        }
                        alt="User Avatar"
                        className="h-11 w-11 rounded-[6px] object-cover object-center"
                    />
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[15.5px] leading-[22px] text-[#71717A] font-medium">
                            {user.first_name}
                        </span>
                        <span className="text-[13.5px] leading-[18px] text-[#71717A] font-medium break-all">
                            {user.email}
                        </span>
                    </div>
                </div>
                <ChevronUp
                    className={`text-[#71717A] h-[22px] w-[22px] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                    }`}
                    strokeWidth={2}
                />
            </div>

            {/* Dropup Menu */}
            <div
                className={`absolute user-dropup p-2 bottom-full left-4 right-4 bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                    open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
                <ul className="flex flex-col px-2">
                    <li>
                        <a
                            href={route("profile.edit")}
                            className="flex items-center gap-3 p-2 text-[#09090B] font-medium rounded-md text-sm hover:bg-gray-100"
                        >
                            <User
                                className="h-4 w-4 text-[#1E293B]"
                                strokeWidth={2}
                            />
                            <span>{t("myProfile")}</span>
                        </a>
                    </li>

                    <div className="py-1 px-2">
                        <div className="border-b border-b-[#E4E4E7]"></div>
                    </div>

                    <li>
                        <button
                            onClick={() => router.post(route("logout"))}
                            className="flex items-center gap-3 p-2 text-[#09090B] font-medium rounded-md text-sm hover:bg-gray-100 w-full text-left"
                        >
                            <LogOut
                                className="h-4 w-4 text-[#1E293B]"
                                strokeWidth={2}
                            />
                            <span>{t("signOut")}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SidebarUserDrop;
