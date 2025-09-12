import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";

export default function UserForm({ user = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        hotel_name: user?.hotel?.hotel_name || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        password_confirmation: "",
        role: user?.role || "hotel",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            put(route("users.update", user.id));
        } else {
            post(route("users.store"));
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 rounded-lg shadow"
        >
            {/* Hotel Name */}
            {data.role === "hotel" && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                    <div className="space-y-1">
                        <InputLabel
                            htmlFor="hotel_name"
                            value="Hotel Name"
                            className="text-[#344054] font-medium"
                        />
                        <TextInput
                            id="hotel_name"
                            name="hotel_name"
                            value={data.hotel_name}
                            onChange={(e) =>
                                setData("hotel_name", e.target.value)
                            }
                            className="block w-full"
                            required
                        />
                        <InputError
                            message={errors.hotel_name}
                            className="mt-1"
                        />
                    </div>
                </div>
            )}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* First Name */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="first_name"
                        value="First Name"
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        className="block w-full"
                        required
                    />
                    <InputError message={errors.first_name} className="mt-1" />
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="last_name"
                        value="Last Name"
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        className="block w-full"
                        required
                    />
                    <InputError message={errors.last_name} className="mt-1" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* Email */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="block w-full"
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Role */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="role"
                        value="Role"
                        className="text-[#344054] font-medium"
                    />
                    <SelectInput
                        id="role"
                        name="role"
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="w-full block"
                        options={[
                            { value: "admin", label: "Admin" },
                            { value: "hotel", label: "Hotel" },
                        ]}
                    />
                    <InputError message={errors.role} className="mt-1" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                {/* Password */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="password"
                        value={`Password${
                            user ? " (leave blank to keep current)" : ""
                        }`}
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="block w-full"
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Password Confirmation */}
                <div className="space-y-1">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-[#344054] font-medium"
                    />
                    <TextInput
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="block w-full"
                    />
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <PrimaryButton type="submit" disabled={processing}>
                    {user ? "Update User" : "Create User"}
                </PrimaryButton>
            </div>
        </form>
    );
}
