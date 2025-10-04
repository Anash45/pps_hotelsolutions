import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function HotelCustomPage({ page = null, guestKey = null }) {
    console.log("Two: ", page, guestKey);

    return (
        <div className="space-y-4 px-2">
            {guestKey ? (
                <Link
                    href={`/key/${guestKey}`}
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Zurück</span>
                </Link>
            ) : (
                <a
                    href="#"
                    className="flex items-center justify-start gap-1 text-xs text-dark cursor-pointer"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Zurück</span>
                </a>
            )}

            <div className="space-y-3">
                <div
                    dangerouslySetInnerHTML={{ __html: page?.content }}
                    className="custom-page-content"
                />
            </div>
        </div>
    );
}
