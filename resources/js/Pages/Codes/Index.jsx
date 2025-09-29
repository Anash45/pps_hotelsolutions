import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import CodesTitle from "./CodesTitle";
import CodesForm from "./CodesForm";
import CodeGroupsPreview from "./CodeGroupsPreview";
import Alert from "@/Components/Alert";
import FlashMessage from "@/Components/FlashMessage";

export default function Codes() {
    const { codeGroups, flash } = usePage().props;

    console.log(codeGroups);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <CodesTitle title={"Code Generator"} />
                <div className="grid xl:grid-cols-[60%,40%] grid-cols-1 gap-[14px]">
                    <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3">
                        <FlashMessage message={flash?.success} type="success" />
                        <FlashMessage message={flash?.error} type="error" />
                        <div className="flex flex-col gap-1">
                            <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                                Create new code block
                            </h5>
                            <p className="text-xs text-[#544854]">
                                Description of this block
                            </p>
                        </div>
                        <CodesForm />
                    </div>
                    <div className="py-4 md:px-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                                History
                            </h5>
                            <p className="text-xs text-[#544854]">
                                Description of this block
                            </p>
                        </div>
                        <CodeGroupsPreview previewGroups={codeGroups} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
