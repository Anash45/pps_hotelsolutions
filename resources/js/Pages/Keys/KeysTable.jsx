import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { createRoot } from "react-dom/client";
import { Dropdown, DropdownItem } from "@/Components/DropdownUi";
import { useModal } from "@/context/ModalProvider";
import { Link, usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { getDomain } from "@/utils/viteConfig";
import { useLang } from "@/context/TranslationProvider";
import axios from "axios";

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        return format(parseISO(dateStr), "dd.MM.yyyy");
    } catch {
        return dateStr;
    }
}

DataTable.use(DT);

export default function KeysTable({ codes = [], selectedHotel = null }) {
    const { t } = useLang();
    const { openModal } = useModal();
    const { keyTypes = [] } = usePage().props;

    const [linkDomain, setLinkDomain] = useState(
        "https://app.ppshotelsolutions.de"
    );

    useEffect(() => {
        (async () => {
            const domain = await getDomain();
            setLinkDomain(domain);
        })();
    }, []);

    const tableData = codes.map((c) => ({
        name: c.key_assignment?.first_name
            ? `${c.key_assignment.salutation ?? ""} ${
                  c.key_assignment.title ?? ""
              } ${c.key_assignment.first_name} ${
                  c.key_assignment.last_name ?? ""
              }`
            : "-",
        stay: `${formatDate(c.key_assignment?.stay_from)} - ${formatDate(
            c.key_assignment?.stay_till
        )}`,
        room: c.key_assignment?.room_number ?? "-",
        code: c.code,
        status: c.status,
        keyType: c.key_type?.display_name ?? "-",
        id: c.id,
        original: c,
    }));

    const columns = [
        { title: t("keys.KeysTable.columns.name"), data: "name" },
        {
            title: t("keys.KeysTable.columns.code"),
            data: "code",
            createdCell: (td, cellData, rowData) => {
                const root = createRoot(td);
                root.render(
                    <div>
                        <a
                            href={`${linkDomain}/key/${rowData.code}`}
                            target="_blank"
                            className="underline text-primary"
                        >
                            {rowData.code}
                        </a>
                    </div>
                );
            },
        },
        { title: t("keys.KeysTable.columns.stay"), data: "stay" },
        { title: t("keys.KeysTable.columns.room"), data: "room" },
        {
            title: t("keys.KeysTable.columns.status"),
            data: "status",
            render: (data) =>
                data === "active"
                    ? `<span class="px-3 py-1 rounded-full text-green-900 text-sm bg-green-100 capitalize">${t(
                          "keys.KeysTable.status.active"
                      )}</span>`
                    : `<span class="px-3 py-1 rounded-full text-red-900 text-sm bg-red-100 capitalize">${t(
                          "keys.KeysTable.status.inactive"
                      )}</span>`,
        },
        {
            title: t("keys.KeysTable.columns.keyType"),
            data: "keyType",
            render: (data) =>
                !data || data === "-"
                    ? "-"
                    : `<span class="capitalize">${data}</span>`,
        },
        {
            title: t("keys.KeysTable.columns.actions"),
            data: "id",
            orderable: false,
            createdCell: (td, cellData, rowData) => {
                const root = createRoot(td);
                root.render(
                    <Dropdown>
                        <DropdownItem
                            onClick={() =>
                                openModal("CreateKeyModal", {
                                    keyTypes,
                                    selectedHotel,
                                    code: rowData.original,
                                })
                            }
                        >
                            {t("keys.KeysTable.columns.edit")}
                        </DropdownItem>
                        <DropdownItem
                            onClick={async () => {
                                try {
                                    const newStatus =
                                        rowData.status === "active"
                                            ? "inactive"
                                            : "active";

                                    const res = await axios.put(
                                        `/keys/${rowData.id}/status`,
                                        { status: newStatus }
                                    );

                                    router.reload({ only: ["codes"] });
                                } catch (err) {
                                    console.error(
                                        "❌ Failed to update status:",
                                        err.response?.data || err
                                    );
                                }
                            }}
                        >
                            {rowData.status === "active"
                                ? t("keys.KeysTable.columns.setInactive")
                                : t("keys.KeysTable.columns.setActive")}
                        </DropdownItem>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div className="p-3 rounded-[14px] main-box bg-white">
            <DataTable
                key={linkDomain}
                className="keys-datatable"
                data={tableData}
                columns={columns}
                options={{
                    dom: `
                        <'flex justify-between mb-4'lf>
                        <'mb-4't>
                        <'flex justify-end items-center gap-4 mt-4'p>
                    `,
                    order: [],
                }}
            />
        </div>
    );
}
