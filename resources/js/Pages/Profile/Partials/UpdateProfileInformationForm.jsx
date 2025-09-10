import Divider from "@/Components/Divider";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Mail } from "lucide-react";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email,
            profile_image: user.profile_image || null,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            forceFormData: data.profile_image instanceof File, // only force if new file
            onBefore: (visit) => {
                if (visit.formData) {
                    for (let pair of visit.formData.entries()) {
                        console.log(pair[0], pair[1]);
                    }
                }
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);
            },
            onFinish: () => {
                console.log("Request finished.");
            },
        });
    };

    return (
        <section className={className}>
            <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-1 pb-5 border-b border-b-[#EAECF0]">
                    <h2 className="text-lg font-semibold text-grey900">
                        Personal info
                    </h2>

                    <p className="text-sm text-[#475467] font-inter">
                        Update your photo and personal details here.
                    </p>
                </header>

                <form onSubmit={submit} className="space-y-5 xl:max-w-[1000px]">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-2">
                            <InputLabel
                                className=" text-[#344054] font-medium"
                                htmlFor="first_name"
                                value="Name"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.first_name}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.last_name}
                            />
                        </div>

                        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <TextInput
                                    id="first_name"
                                    name="first_name"
                                    className="block w-full"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    required
                                    isFocused
                                    autoComplete="given-name"
                                />
                            </div>
                            <div>
                                <TextInput
                                    id="last_name"
                                    name="last_name"
                                    className="block w-full"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    required
                                    autoComplete="family-name"
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    {/* Email */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-2">
                            <InputLabel
                                className=" text-[#344054] font-medium"
                                htmlFor="email"
                                value="Email"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                        <div className="md:col-span-8">
                            <div className="relative">
                                <Mail
                                    className="text-[#344054] h-5 w-5 left-3.5 top-1/2 -translate-y-1/2 absolute"
                                    strokeWidth={2}
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="block w-full ps-[42px]"
                                    value={data.email}
                                    required
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <Divider />

                    {/* Profile Photo Upload */}
                    <ProfilePhotoUpload
                        value={data.profile_image}
                        errors={errors}
                    />

                    <Divider />

                    <div className="flex items-center gap-4 justify-end">

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Saved.</p>
                        </Transition>
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </section>
    );
}
