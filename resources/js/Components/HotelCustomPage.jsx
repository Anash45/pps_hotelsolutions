import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import AutoTranslate from "./AutoTranslate";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function HotelCustomPage({ page = null, guestKey = null }) {
    const context = useAutoTranslate();
    const isDE = context?.isDE || null;

    return (
        <div className="space-y-4 px-2">
            {guestKey ? (
                <Link
                    href={`/key/${guestKey}`}
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{isDE ? "Zurück" : "Back"}</span>
                </Link>
            ) : (
                <a
                    href="#"
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{isDE ? "Zurück" : "Back"}</span>
                </a>
            )}

            <div className="space-y-3">
                <div className="custom-page-content">
                    <div
                        dangerouslySetInnerHTML={{
                            __html:
                                isDE && page.content_de
                                    ? page.content_de
                                    : page.content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
