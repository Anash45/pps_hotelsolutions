import GoogleTranslate from "@/Components/GoogleTranslate";
import Sidebar from "@/Components/Sidebar";
import { AutoTranslateProvider } from "@/context/AutoTranslateProvider";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function GuestKeyLayout({ children }) {
    return (
        <div>
            <AutoTranslateProvider>{children}</AutoTranslateProvider>
        </div>
    );
}
