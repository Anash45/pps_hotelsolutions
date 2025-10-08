import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="font-sf body-auth">
            <div className="flex min-h-screen flex-col items-center pt-6 sm:pt-0 relative">
                <div className="pt-[72px] pb-8 max-w-[580px] mx-auto w-full">
                    <div className="w-full sm:p-8 py-8 px-6 main-box rounded-[14px] flex flex-col gap-3">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="py-1 w-full mt-auto">
                    <div className="px-8">
                        <p className="text-sm font-medium text-black leading-6">
                            © ppshotelsolutions.com 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
