import PrimaryButton from "@/Components/PrimaryButton";
import { useModal } from "@/context/ModalProvider";
import { usePage } from "@inertiajs/react";

export default function KeysTitle({ title }) {
    const { openModal } = useModal();
    const { availableCodes = [], keyTypes = [] } = usePage().props;
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <PrimaryButton
                onClick={() =>
                    openModal("CreateKeyModal", { codes: availableCodes, keyTypes:keyTypes })
                }
            >
                Create new key
            </PrimaryButton>
        </div>
    );
}
