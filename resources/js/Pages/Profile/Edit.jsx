import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ProfileTitle from "./ProfileTitle";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import UpdateProfileInformation from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import { useLang } from "@/context/TranslationProvider";

export default function ProfileEdit() {
    const { t } = useLang();

    return (
        <AuthenticatedLayout>
            <Head title={t("profile.page.title")} />

            <div className="py-4 md:px-6 px-4 flex flex-col gap-6">
                <ProfileTitle />

                <div className="py-6 px-4 rounded-[14px] main-box bg-white flex flex-col gap-6">
                    <div className="xl:px-8">
                        <Tabs className={`main-tabs`}>
                            <div className="flex flex-col gap-5">
                                <TabList className="flex gap-4 border-b border-b-[#EAECF0]">
                                    <Tab className="px-1 pb-[11px] cursor-pointer text-sm text-[#667085]">
                                        {t("profile.page.tabDetails")}
                                    </Tab>
                                    <Tab className="px-1 pb-[11px] cursor-pointer text-sm text-[#667085]">
                                        {t("profile.page.tabPassword")}
                                    </Tab>
                                </TabList>

                                <div className="tabs-container">
                                    <TabPanel>
                                        <UpdateProfileInformation />
                                    </TabPanel>
                                    <TabPanel>
                                        <UpdatePasswordForm />
                                    </TabPanel>
                                </div>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
