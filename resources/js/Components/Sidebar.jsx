import React, { useEffect, useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import SidebarMenu from "./SidebarMenu";
import { Link, usePage } from "@inertiajs/react";
import SidebarUserDrop from "./SidebarUserDrop";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import axios from "axios";

const Sidebar = () => {
    const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
    const { locale } = usePage().props;

    console.log(locale);
    const handleLangChange = async (lang) => {
        console.log("Switching language to:", lang);

        try {
            const response = await axios.post("/language", {
                locale: lang,
            });
            console.log("Language API response:", response.data);
        } catch (error) {
            console.error(
                "Error switching language:",
                error.response?.data || error.message
            );
        }

        // Reload to apply new locale
        window.location.reload();
    };

    return (
        <aside className="lg:w-[290px] w-full bg-white">
            <div className="py-4 pe-4 flex items-center gap-3 justify-between lg:hidden">
                <Link href={route("dashboard")}>
                    <ApplicationLogo className="md:h-[30.77px] h-6 w-auto" />
                </Link>
                <button
                    className="h-8 w-8 rounded-full bg-[#83af8221] flex items-center justify-center flex-col"
                    onClick={() => {
                        setIsMobileMenuOpened(true);
                    }}
                >
                    <Menu strokeWidth={2} className="text-black h-4 w-4" />
                </button>
            </div>
            <div
                className={`h-full lg:static fixed top-0 left-0 z-50 w-full mobile-sidebar-wrapper transition-all duration-500 ${
                    isMobileMenuOpened
                        ? "translate-x-0"
                        : "lg:translate-x-0 -translate-x-full"
                }`}
                onClick={() => {
                    setIsMobileMenuOpened(false);
                }}
            >
                <div
                    className="flex flex-col pt-4 gap-[22px] h-full lg:w-full w-[290px] bg-white lg:shadow-none shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className="py-4 flex items-center gap-3 justify-between pe-4">
                        <Link href={route("dashboard")}>
                            <ApplicationLogo className="md:h-[30.77px] h-6 w-auto" />
                        </Link>
                        <button
                            className="h-8 w-8 rounded-full bg-[#83af8221] flex items-center justify-center flex-col lg:hidden"
                            onClick={() => {
                                setIsMobileMenuOpened(false);
                            }}
                        >
                            <X strokeWidth={2} className="text-black h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex grow flex-col justify-content-between">
                        <div className="h-full flex flex-col gap-2">
                            <SidebarMenu />

                            <div className="py-1">
                                <div className="border-b border-b-[#E4E4E7]"></div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="py-1">
                                <div className="border-b border-b-[#E4E4E7]"></div>
                            </div>

                            <LanguageSwitcher currentLocale={locale}
                                onChange={handleLangChange}
                            />
                            <SidebarUserDrop />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
