import { GripVertical, Plus } from "lucide-react";
import LightButton from "./LightButton";
import { router, usePage } from "@inertiajs/react";
import { PageContext } from "@/context/PageProvider";
import { useContext, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { getIcon } from "@/data/iconMap";
import { Dropdown, DropdownItem } from "./DropdownUi";
import { useModal } from "@/context/ModalProvider";

export default function HotelBrandingButtons({}) {
    const { openModal } = useModal();
    const { selectedHotel = null } = usePage().props;
    const { brandingFormData, setBrandingFormData } = useContext(PageContext);

    const handleDelete = async (buttonId) => {
        console.log("BTN ID:", buttonId);
        if (!confirm("Are you sure you want to delete this button?")) return;

        try {
            await axios.delete(route("buttons.destroy", { button: buttonId }));

            router.reload({ only: ["selectedHotel"] });
            console.log("Button deleted successfully");
        } catch (error) {
            if (error.response && error.response.data) {
                console.error("Server error:", error.response.data);
            } else {
                console.error("Unknown error:", error);
            }
        }
    };

    console.log("DATA: ", brandingFormData);

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                <div className="flex flex-col gap-1">
                    <h5 className="font-semibold text-grey900 text-[18px] leading-[28px]">
                        Buttons
                    </h5>
                    <p className="text-xs text-[#544854]">
                        You can change the order using ↑/↓.
                    </p>
                </div>
                <LightButton
                    onClick={() =>
                        openModal("HotelButtonsModal", {
                            selectedHotel: selectedHotel,
                        })
                    }
                    className="py-[9px] px-[8px]"
                    disabled={!selectedHotel}
                    title={`${
                        selectedHotel
                            ? "Create new button"
                            : "Select a hotel first to create new button"
                    }`}
                >
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
                        <div className="w-[30%]">Text</div>
                        <div className="w-[20%]">Type</div>
                        <div className="w-[15%]">Action</div>
                    </div>

                    {/* Row - responsive */}
                    <ReactSortable
                        list={brandingFormData.buttons || []}
                        setList={(newList) => {
                            const updatedList = newList.map((btn, index) => ({
                                ...btn,
                                id: btn.id || btn.button_id,
                                order: index + 1,
                            }));

                            console.log(
                                "🟡 New local button order:",
                                updatedList
                            );

                            setBrandingFormData((prev) => {
                                // Compare by IDs, not just order values
                                const oldIds = (prev.buttons || []).map(
                                    (b) => b.id || b.button_id
                                );
                                const newIds = updatedList.map((b) => b.id);

                                const hasChanged =
                                    JSON.stringify(oldIds) !==
                                    JSON.stringify(newIds);

                                console.log("🔍 Order changed?", hasChanged, {
                                    oldIds,
                                    newIds,
                                });

                                if (hasChanged) {
                                    console.log("📤 Sending reorder payload:", {
                                        buttons: updatedList.map(
                                            ({ id, order }) => ({ id, order })
                                        ),
                                    });

                                    axios
                                        .post("/buttons/reorder", {
                                            buttons: updatedList.map(
                                                ({ id, order }) => ({
                                                    id,
                                                    order,
                                                })
                                            ),
                                        })
                                        .then((res) => {
                                            console.log(
                                                "✅ Reorder success:",
                                                res.data
                                            );
                                        })
                                        .catch((err) => {
                                            console.error(
                                                "❌ Reorder failed:",
                                                err.response?.data || err
                                            );
                                        });
                                } else {
                                    console.log(
                                        "ℹ️ Order unchanged, no request sent."
                                    );
                                }

                                return { ...prev, buttons: updatedList };
                            });
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
                                            <Icon size={18} />
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

                                    <div className="lg:w-[30%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Text:
                                        </span>
                                        <span>{button.text}</span>
                                    </div>

                                    <div className="lg:w-[20%] w-full flex items-center">
                                        <span className="lg:hidden text-[10px] text-gray-500 mr-1">
                                            Type:
                                        </span>
                                        <span>{button.type}</span>
                                    </div>

                                    <div className="lg:w-[15%] w-full flex items-center gap-2">
                                        <Dropdown>
                                            <DropdownItem
                                                onClick={() =>
                                                    openModal(
                                                        "HotelButtonsModal",
                                                        {
                                                            button,
                                                            selectedHotel:
                                                                selectedHotel,
                                                        }
                                                    )
                                                }
                                            >
                                                Edit
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    handleDelete(
                                                        button.button_id
                                                    )
                                                }
                                            >
                                                Delete
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
