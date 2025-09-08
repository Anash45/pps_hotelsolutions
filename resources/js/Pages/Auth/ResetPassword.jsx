import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import NotificationModal from "@/Components/NotificationModal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [isNotificationModalOpen, setIsNotificationModalOpen] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => {
                reset("password", "password_confirmation");
                setIsNotificationModalOpen(true);
            },
        });
    };

    return (
        <>
            <GuestLayout>
                <Head title="Reset Password" />

                <div className="flex flex-col gap-1.5 mb-6 text-grey900">
                    <h2 className="font-semibold text-[30px] leading-9">
                        Set a New Password
                    </h2>
                    <p className="text-sm tracking-wide leading-6 text-[#64748B]">
                        Create a strong password to secure your account.
                    </p>
                </div>
                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="hidden">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full"
                            autoComplete="new-password"
                            placeholder="Enter new password"
                            isFocused={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            placeholder="Re-enter new password"
                            className="block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Reset Password
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>

            {/* ✅ show modal only when success */}
            <NotificationModal
                isOpen={isNotificationModalOpen}
                onClose={() => {
                    setIsNotificationModalOpen(false);
                    window.location.href = route("login"); // redirect after close
                }}
                title="Password Successfully Updated"
                description="Your password has been reset. You can now log in with your new credentials."
            />
        </>
    );
}
