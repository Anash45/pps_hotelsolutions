"use client";
import { Link, usePage } from "@inertiajs/react";
import { Code2, Home, Hotel, KeyRound, Users } from "lucide-react";
import React from "react";
import { useLang } from "@/context/TranslationProvider"; // 👈 import language hook

const SidebarMenu = () => {
    const { t } = useLang("Components.SidebarMenu"); // 👈 translation function
    const page = usePage();
    const { props, url } = usePage();
    const user = props.auth?.user;

    const currentUrl = page.url || window.location.pathname;
    const currentHotelId = new URLSearchParams(url.split("?")[1]).get(
        "hotel_id"
    );

    const menuItems = [
        { name: t("dashboard"), icon: Home, route: "dashboard" },
        { name: t("keyManagement"), icon: KeyRound, route: "keys.index" },
        { name: t("hotelConfigurator"), icon: Hotel, route: "hotels.index" },
        {
            name: t("usersManagement"),
            icon: Users,
            route: "users.index",
            adminOnly: true,
        },
        {
            name: t("codeGenerator"),
            icon: Code2,
            route: "codes.index",
            adminOnly: true,
        },
    ];

    const isActive = (routeName) => {
        const routeUrl = new URL(route(routeName), window.location.origin)
            .pathname;
        const currentPathname = new URL(currentUrl, window.location.origin)
            .pathname;
        return (
            currentPathname === routeUrl ||
            currentPathname.startsWith(routeUrl + "/")
        );
    };

    return (
        <ul className="flex flex-col gap-1 px-4 pb-4">
            {menuItems
                .filter((item) => {
                    if (item.adminOnly && user?.role !== "admin") return false;
                    return true;
                })
                .map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.route);

                    const href = currentHotelId
                        ? `${route(item.route)}?hotel_id=${currentHotelId}`
                        : route(item.route);

                    return (
                        <li key={index}>
                            <Link
                                href={href}
                                className={`p-2 flex items-center gap-3 text-base leading-[23px] rounded-lg ${
                                    active ? "bg-[#F1F5F9]" : "text-[#09090B]"
                                }`}
                            >
                                <Icon strokeWidth={2} className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
        </ul>
    );
};

export default SidebarMenu;
