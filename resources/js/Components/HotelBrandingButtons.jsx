import { GripVertical, Plus } from "lucide-react";
import LightButton from "./LightButton";
import { usePage } from "@inertiajs/react";
import { PageContext } from "@/context/PageProvider";
import { useContext, useEffect, useState } from "react";
import { defaultButtons } from "@/data/defaultButtons";
import { ReactSortable } from "react-sortablejs";
import { getIcon } from "@/data/iconMap";

export default function HotelBrandingButtons({}) {
    const { selectedHotel = null } = usePage().props;
    const { brandingFormData, handleBrandingChange, setBrandingFormData } =
        useContext(PageContext);
    const [initialButtons, setInitialButtons] = useState(defaultButtons);

    useEffect(() => {
        let finalButtons = defaultButtons;

        if (selectedHotel?.buttons && selectedHotel.buttons.length > 0) {
            // Map hotel’s saved buttons, ensuring button_id is set
            finalButtons = selectedHotel.buttons.map((btn) => ({
                ...btn,
                button_id: btn.id, // map DB id to button_id
                hotel_id: selectedHotel.id,
            }));
        }

        setInitialButtons(finalButtons);

        // 🔹 Ensure brandingFormData always has `buttons` key
        setBrandingFormData((prev) => {
            if (!prev.hasOwnProperty("buttons")) {
                // add buttons if key doesn’t exist
                return {
                    ...prev,
                    buttons: finalButtons,
                };
            }

            if (!prev.buttons || prev.buttons.length === 0) {
                // replace if empty
                return {
                    ...prev,
                    buttons: finalButtons,
                };
            }

            return prev; // keep existing
        });
    }, [selectedHotel, setBrandingFormData]);

    console.log("Brading Data: ", brandingFormData);

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Buttons
                    </h5>
                    <p className="text-xs text-[#544854]">
                        The default is 4 buttons; change the order using ↑/↓.
                    </p>
                </div>
                <LightButton className="py-[9px] px-[8px]">
                    <div className="flex justify-center items-center gap-[10px]">
                        <Plus size={16} />
                        <span className="text-sm font-medium">Add button</span>
                    </div>
                </LightButton>
            </div>

            <div className="w-full">
                <div className="xl:w-max min-w-full space-y-3">
                    {/* Table Header (desktop) */}
                    <div className="hidden lg:flex border-b border-gray-200 pb-2 px-4 text-xs font-semibold text-[#263238]">
                        <div className="w-[5%] shrink-0"></div>{" "}
                        {/* Checkbox / icon slot */}
                        <div className="w-[15%]">Icon</div>
                        <div className="w-[15%]">No.</div>
                        <div className="w-[25%]">Text</div>
                        <div className="w-[20%]">Type</div>
                        <div className="w-[20%]">Action</div>
                    </div>

                    {/* Row - responsive */}
                    <ReactSortable
                        list={brandingFormData.buttons || []}
                        setList={(newList) => {
                            // Update the order property based on new position
                            const updatedList = newList.map((btn, index) => ({
                                ...btn,
                                order: index + 1, // 1-based index
                            }));

                            // Update brandingFormData with new button order
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
                                    className="border border-gray-400 rounded-lg py-2 px-3.5 md:text-sm text:xs text[#263238] flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 transition"
                                >
                                    <div className="lg:w-[5%] w-full shrink-0 flex items-center">
                                        <GripVertical
                                            className="text-[#CDD5DF] drag-handle cursor-grab active:cursor-grabbing"
                                            size={20}
                                        />
                                    </div>

                                    <div className="lg:w-[15%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Icon:
                                        </span>
                                        {Icon ? (
                                            <Icon
                                                size={18}
                                            />
                                        ) : (
                                            <span>🔗</span>
                                        )}
                                    </div>

                                    <div className="lg:w-[15%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            No.:
                                        </span>
                                        <span>{button.order}</span>
                                    </div>

                                    <div className="lg:w-[25%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Text:
                                        </span>
                                        <span>{button.title}</span>
                                    </div>

                                    <div className="lg:w-[20%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Type:
                                        </span>
                                        <span>{button.type}</span>
                                    </div>

                                    <div className="lg:w-[20%] w-full flex items-center gap-2">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Action:
                                        </span>
                                        <button className="text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:underline">
                                            Delete
                                        </button>
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
