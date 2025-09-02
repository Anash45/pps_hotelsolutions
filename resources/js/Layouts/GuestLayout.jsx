import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className=" bg-[rgba(233,237,241,1)] font-sf">
            <div className="flex min-h-screen flex-col items-center pt-6 sm:pt-0 relative">
                <div className="py-3 w-full">
                    <div className="px-8">
                        <ApplicationLogo className="h-[22.22px]" />
                    </div>
                </div>
                <div className="py-[72px] max-w-[580px] mx-auto w-full">
                    <div className="w-full sm:p-8 py-8 px-6 guest-box rounded-[14px] flex flex-col gap-3">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="py-1 w-full mt-auto">
                    <div className="px-8">
                        <p className="text-sm font-medium text-black leading-6">
                            © PPSHOTELPORTAL.com 2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
