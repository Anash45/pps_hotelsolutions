import { useLang } from "@/context/TranslationProvider";
import { FileText, Plus } from "lucide-react";
import LightButton from "./LightButton";
import { router, usePage } from "@inertiajs/react";
import { PageContext } from "@/context/PageProvider";
import { useContext } from "react";
import { Dropdown, DropdownItem } from "./DropdownUi";
import { useModal } from "@/context/ModalProvider";
import InputError from "./InputError";
import axios from "axios";

export default function HotelBrandingPages() {
    const { openModal } = useModal();
    const { selectedHotel = null, errors: formErrors } = usePage().props;
    const { brandingFormData } = useContext(PageContext);
    const { t } = useLang("Components.HotelBrandingPages");

    const handleDelete = async (pageId) => {
        if (!confirm(t("delete") + "?")) return;

        try {
            await axios.delete(`/hotel-pages/${pageId}`);
            router.reload({ only: ["selectedHotel"] });
            console.log("Page deleted successfully");
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("individualPagesTitle")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("individualPagesDescription")}
                    </p>
                </div>
                <LightButton
                    className="py-[9px] px-[8px]"
                    onClick={() =>
                        openModal("HotelPageModal", { selectedHotel })
                    }
                    disabled={!selectedHotel}
                    title={
                        selectedHotel
                            ? t("createPageTooltip")
                            : t("createPageDisabledTooltip")
                    }
                >
                    <div className="flex justify-center items-center gap-[10px]">
                        <Plus size={16} />
                        <span className="text-sm font-medium">
                            {t("createPageButton")}
                        </span>
                    </div>
                </LightButton>
            </div>

            <div className="w-full">
                <div className="xl:w-max min-w-full space-y-3">
                    {brandingFormData.pages?.map((page, idx) => (
                        <div
                            key={idx}
                            className="border border-gray-400 rounded-lg relative py-2 px-3.5 md:text-sm text-xs text-[#263238] flex flex-col lg:flex-row lg:items-center lg:justify-between hover:bg-gray-50 transition"
                        >
                            <div className="lg:w-max w-full shrink-0 grow">
                                <div className="flex lg:items-center lg:flex-row flex-col gap-2 flex-wrap justify-start">
                                    <FileText size={20} />
                                    <span className="text-gray900">
                                        <span className="font-bold">
                                            {brandingFormData.heading}
                                        </span>
                                        /
                                        <span className="text-xs">
                                            ({page.slug})
                                        </span>
                                    </span>
                                </div>
                                <InputError
                                    message={
                                        formErrors?.pages?.[idx]?.title?.[0]
                                    }
                                />
                            </div>

                            <div className="lg:w-10 w-fit lg:static absolute top-1 right-1 flex items-center gap-2 ms-auto justify-end">
                                <Dropdown>
                                    <DropdownItem
                                        onClick={() =>
                                            openModal("HotelPageModal", {
                                                page,
                                                selectedHotel,
                                            })
                                        }
                                    >
                                        {t("edit")}
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => handleDelete(page.id)}
                                    >
                                        {t("delete")}
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
