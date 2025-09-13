import PrimaryButton from "@/Components/PrimaryButton";

export default function KeysTitle({ title }) {
    return (
        <div className="flex items-center gap-3 flex-wrap justify-between">
            <h5 className="font-bold text-xl text-grey900">{title}</h5>
            <PrimaryButton>
                Create new key
            </PrimaryButton>
        </div>
    );
}
