import { GripVertical, Plus } from "lucide-react";
import LightButton from "./LightButton";
import { router, usePage } from "@inertiajs/react";
import { PageContext } from "@/context/PageProvider";
import { useContext, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getIcon } from "@/data/iconMap";
import { Dropdown, DropdownItem } from "./DropdownUi";
import { useModal } from "@/context/ModalProvider";
import { useLang } from "@/context/TranslationProvider";

export default function HotelBrandingButtons({}) {
    const { t } = useLang("Components.HotelBrandingButtons"); // 🔥 translations
    const { openModal } = useModal();
    const { selectedHotel = null } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);

    const handleDelete = async (buttonId) => {
        if (!confirm(t("confirmDelete"))) return;

        try {
            await axios.delete(route("buttons.destroy", { button: buttonId }));
            router.reload({ only: ["selectedHotel"] });
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        {t("buttonsHeading")}
                    </h5>
                    <p className="text-xs text-[#544854]">
                        {t("buttonsDescription")}
                    </p>
                </div>

                <LightButton
                    onClick={() =>
                        openModal("HotelButtonsModal", { selectedHotel })
                    }
                    className="py-[9px] px-[8px]"
                    disabled={!selectedHotel}
                    title={
                        selectedHotel
                            ? t("createNewButton")
                            : t("selectHotelFirst")
                    }
                >
                    <div className="flex justify-center items-center gap-[10px]">
                        <Plus size={16} />
                        <span className="text-sm font-medium">{t("addButton")}</span>
                    </div>
                </LightButton>
            </div>

            <div className="w-full">
                <div className="xl:w-max min-w-full space-y-3">
                    {/* Table Header (desktop) */}
                    <div className="hidden lg:flex border-b border-gray-200 pb-2 px-4 text-xs font-semibold text-[#263238]">
                        <div className="w-[5%] shrink-0"></div>
                        <div className="w-[15%]">{t("icon")}</div>
                        <div className="w-[15%]">{t("no")}</div>
                        <div className="w-[30%]">{t("text")}</div>
                        <div className="w-[20%]">{t("type")}</div>
                        <div className="w-[15%]">{t("action")}</div>
                    </div>

                    {/* Rows */}
                    <ReactSortable
                        list={brandingFormData.buttons || []}
                        setList={(newList) => {
                            const updatedList = newList.map((btn, index) => ({
                                ...btn,
                                id: btn.id || btn.button_id,
                                order: index + 1,
                            }));
                            axios.post(route("buttons.reorder"), { buttons: updatedList });
                            setBrandingFormData((prev) => ({
                                ...prev,
                                buttons: updatedList,
                            }));
                        }}
                        handle=".drag-handle"
                        animation={150}
                        className="space-y-3"
                        ghostClass="dragging-row"
                    >
                        {brandingFormData?.buttons.map((button, idx) => {
                            const Icon = getIcon(button.icon);
                            return (
                                <div
                                    key={idx}
                                    className="border border-gray-400 relative rounded-lg py-2 px-3.5 md:text-sm text:xs text[#263238]  flex flex-wrap flex-row lg:items-center lg:justify-between hover:bg-gray-50 transition"
                                >
                                    <div className="lg:w-[5%] w-full shrink-0 flex items-center">
                                        <GripVertical
                                            className="text-[#CDD5DF] drag-handle cursor-grab active:cursor-grabbing"
                                            size={20}
                                        />
                                    </div>

                                    <div className="lg:w-[15%] w-1/2 flex mt-2 flex-col">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            {t("icon")}:
                                        </span>
                                        {Icon ? <Icon size={18} /> : <span>🔗</span>}
                                    </div>

                                    <div className="lg:w-[15%] w-1/2 flex mt-2 flex-col">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            {t("no")}:
                                        </span>
                                        <span>{button.order}</span>
                                    </div>

                                    <div className="lg:w-[30%] w-1/2 flex mt-2 flex-col">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            {t("text")}:
                                        </span>
                                        <span>{button.text}</span>
                                        <span>{button.text_de}</span>
                                    </div>

                                    <div className="lg:w-[20%] w-1/2 flex mt-2 flex-col">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            {t("type")}:
                                        </span>
                                        <span>{button.type}</span>
                                    </div>

                                    <div className="lg:w-[15%] w-fit lg:static absolute top-1 right-1 flex items-center gap-2 ms-auto justify-end">
                                        <Dropdown>
                                            <DropdownItem
                                                onClick={() =>
                                                    openModal("HotelButtonsModal", {
                                                        button,
                                                        selectedHotel,
                                                    })
                                                }
                                            >
                                                {t("edit")}
                                            </DropdownItem>
                                            <DropdownItem onClick={() => handleDelete(button.button_id)}>
                                                {t("delete")}
                                            </DropdownItem>
                                        </Dropdown>
                                    </div>
                                </div>
                            );
                        })}
                    </ReactSortable>
                </div>
            </div>
        </div>
    );
}
