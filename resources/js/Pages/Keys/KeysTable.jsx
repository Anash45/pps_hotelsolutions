import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";
import { createRoot } from "react-dom/client";
import { Dropdown, DropdownItem } from "@/Components/DropdownUi";
import { useModal } from "@/context/ModalProvider";
import { usePage } from "@inertiajs/react";
import { format, parseISO } from "date-fns";

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
    const { openModal } = useModal();

    const { keyTypes = [] } = usePage().props;

    const tableData = codes.map((c) => ({
        name: c.key_assignment?.first_name
            ? `${c.key_assignment.first_name} ${c.key_assignment.last_name ?? ""}`
            : "-",
        stay: `${formatDate(c.key_assignment?.stay_from)} - ${formatDate(c.key_assignment?.stay_till)}`,
        room: c.key_assignment?.room_number ?? "-",
        status: c.status,
        keyType: c.key_type?.display_name ?? "-",
        id: c.id, // useful for actions
    }));

    const columns = [
        { title: "Name", data: "name" },
        { title: "Stay", data: "stay" },
        { title: "Room", data: "room" },
        {
            title: "Status",
            data: "status",
            render: (data) =>
                data === "active"
                    ? `<span class="px-3 py-1 rounded-full text-green-900 text-sm bg-green-100 capitalize">${data}</span>`
                    : `<span class="px-3 py-1 rounded-full text-red-900 text-sm bg-red-100 capitalize">${data}</span>`,
        },
        {
            title: "Key Type",
            data: "keyType",
            render: (data) => (!data || data === "-" ? "-" : `<span class="capitalize">${data}</span>`),
        },
        {
            title: "Actions",
            data: "id",
            orderable: false,
            createdCell: (td, cellData, rowData) => {
                // Inject React Dropdown
                const root = createRoot(td);
                root.render(
                    <Dropdown>
                        <DropdownItem onClick={() =>
                            openModal("CreateKeyModal", {
                                keyTypes: keyTypes,
                                selectedHotel: selectedHotel,
                                codeId: rowData.id
                            })
                        }>
                            Edit
                        </DropdownItem>
                        <DropdownItem
                            onClick={() =>
                                console.log(
                                    rowData.status === "active" ? "Set Inactive" : "Set Active",
                                    rowData.id
                                )
                            }
                        >
                            {rowData.status === "active" ? "Set Inactive" : "Set Active"}
                        </DropdownItem>
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div className="p-3 rounded-[14px] main-box bg-white">
            <DataTable
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
