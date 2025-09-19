import PrimaryButton from "@/Components/PrimaryButton";
import { useModal } from "@/context/ModalProvider";
import { usePage } from "@inertiajs/react";

export default function KeysTitle({ title, selectedHotel = null }) {
    const { openModal } = useModal();
    const { keyTypes = [] } = usePage().props;
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <PrimaryButton
                disabled={!selectedHotel}
                onClick={() =>
                    openModal("CreateKeyModal", {
                        keyTypes: keyTypes,
                        selectedHotel: selectedHotel
                    })
                }
            >
                Create new key
            </PrimaryButton>
        </div>
    );
}
