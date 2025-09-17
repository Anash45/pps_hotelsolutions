import PrimaryButton from "@/Components/PrimaryButton";
import { useModal } from "@/context/ModalProvider";

export default function KeysTitle({ title }) {
    const { openModal } = useModal();
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <PrimaryButton
                onClick={() =>
                    openModal("TestModal", { title: "My First Modal" })
                }
            >
                Create new key
            </PrimaryButton>
        </div>
    );
}
