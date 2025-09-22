import { FileText, GripVertical, Plus } from "lucide-react";
import LightButton from "./LightButton";
import { usePage } from "@inertiajs/react";
import { PageContext } from "@/context/PageProvider";
import { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownItem } from "./DropdownUi";
import { useModal } from "@/context/ModalProvider";

export default function HotelBrandingPages({}) {
    const { openModal } = useModal();
    const { selectedHotel = null } = usePage().props;
    const { brandingFormData, handleBrandingChange, setBrandingFormData } =
        useContext(PageContext);

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Individual pages
                    </h5>
                    <p className="text-xs text-[#544854]">
                        Create content such as guest folders, spa information,
                        etc and connect with the buttons.
                    </p>
                </div>
                <LightButton
                    className="py-[9px] px-[8px]"
                    onClick={() => {
                        openModal("HotelPageModal", {
                            selectedHotel: selectedHotel,
                        });
                    }}
                >
                    <div className="flex justify-center items-center gap-[10px]">
                        <Plus size={16} />
                        <span className="text-sm font-medium">Create Page</span>
                    </div>
                </LightButton>
            </div>

            <div className="w-full">
                <div className="xl:w-max min-w-full space-y-3">
                    {brandingFormData?.pages.map((page, idx) => (
                        <div className="border border-gray-400 rounded-lg py-1 px-3.5 md:text-sm text:xs text[#263238] flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition">
                            <div className="lg:w-max w-full shrink-0 grow">
                                <div className="flex items-center gap-2 flex-wrap justify-start">
                                    <FileText size={20} />
                                    <span className="text-gray900">
                                        <span className="font-bold">
                                            {brandingFormData.heading}
                                        </span>
                                        /{page.slug}
                                    </span>
                                </div>
                            </div>

                            <div className="lg:w-10 w-full flex items-center gap-2">
                                <Dropdown>
                                    <DropdownItem>Edit</DropdownItem>
                                    <DropdownItem>Delete</DropdownItem>
                                </Dropdown>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
