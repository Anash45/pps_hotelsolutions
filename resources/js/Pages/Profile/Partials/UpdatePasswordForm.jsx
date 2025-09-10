import Divider from "@/Components/Divider";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-1 pb-5 border-b border-b-[#EAECF0]">
                    <h2 className="text-lg font-semibold text-grey900">
                        Password
                    </h2>

                    <p className="text-sm text-[#475467] font-inter">
                        Please enter your current password to change your
                        password.
                    </p>
                </header>

                <form
                    onSubmit={updatePassword}
                    className="space-y-5 xl:max-w-[1000px]"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-2">
                            <InputLabel
                                className=" text-[#344054] font-medium"
                                htmlFor="current_password"
                                value="Current Password"
                            />

                            <InputError
                                message={errors.current_password}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-8">
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type="password"
                                placeholder="********"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    
                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-2">
                            <InputLabel
                                className=" text-[#344054] font-medium"
                                htmlFor="password"
                                value="New Password"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="md:col-span-8">
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                placeholder="********"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>
                    
                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 space-y-2">
                            <InputLabel
                                className=" text-[#344054] font-medium"
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="md:col-span-8">
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type="password"
                                placeholder="********"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

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
