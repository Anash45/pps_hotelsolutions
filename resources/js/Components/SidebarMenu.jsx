"use client";
import { Link, usePage } from "@inertiajs/react";
import { Code2, Home, Hotel, KeyRound } from "lucide-react";
import React from "react";

// Define menu items in an array
const menuItems = [
    { name: "Dashboard", icon: Home, route: "dashboard" },
    { name: "Key Management", icon: KeyRound, route: "keys.index" },
    { name: "Hotel Configurator", icon: Hotel, route: "hotels.index" },
    {
        name: "Code Generator",
        icon: Code2,
        route: "codes.index",
        adminOnly: true,
    },
];

const SidebarMenu = () => {
    const page = usePage(); // get the current Inertia page
    const { props } = usePage();
    const user = props.auth?.user;

    const currentUrl = page.url || window.location.pathname; // fallback if url not present

    const isActive = (routeName) => {
        const routeUrl = new URL(route(routeName)).pathname; // extract only path
        return currentUrl === routeUrl || currentUrl.startsWith(routeUrl + "/");
    };

    return (
        <ul className="flex flex-col gap-1 px-4 pb-4">
            {menuItems
                .filter((item) => {
                    // Hide if adminOnly and user is not admin
                    if (item.adminOnly && user?.role !== "admin") {
                        return false;
                    }
                    return true;
                })
                .map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.route);

                    return (
                        <li key={index}>
                            <Link
                                href={route(item.route)}
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
