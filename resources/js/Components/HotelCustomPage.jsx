import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useLang } from "@/context/TranslationProvider";
import AutoTranslate from "./AutoTranslate";

export default function HotelCustomPage({ page = null, guestKey = null }) {
    console.log(page?.content);

    return (
        <div className="space-y-4 px-2">
            {guestKey ? (
                <Link
                    href={`/key/${guestKey}`}
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{<AutoTranslate text={"Back"} />}</span>
                </Link>
            ) : (
                <a
                    href="#"
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>{<AutoTranslate text={"Back"} />}</span>
                </a>
            )}

            <div className="space-y-3">
                <div className="custom-page-content">
                    <AutoTranslate text={page?.content} />
                </div>
            </div>
        </div>
    );
}
