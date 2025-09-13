import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

export default function KeysTable({ codes = [] }) {
    const tableData = codes.map((c) => ({
        name: c.key_assignment?.first_name
            ? `${c.key_assignment.first_name} ${
                  c.key_assignment.last_name ?? ""
              }`
            : "-",
        stay: `${c.key_assignment?.stay_from ?? ""} - ${
            c.key_assignment?.stay_till ?? ""
        }`,
        room: c.key_assignment?.room_number ?? "-",
        status: c.status,
        keyType: c.key_type?.display_name ?? "-",
    }));

    const columns = [
        { title: "Name", data: "name" },
        { title: "Stay", data: "stay" },
        { title: "Room", data: "room" },
        {
            title: "Status",
            data: "status",
            render: function (data) {
                const column = data === "active" ? `<span class="px-3 py-1 rounded-full text-green-900 text-sm bg-green-100 capitalize">
                            ${data}
                        </span>` : `<span class="px-3 py-1 rounded-full text-red-900 text-sm bg-red-100 capitalize">
                            ${data}
                        </span>`;
                return column;
            },
        },
        {
            title: "Key Type",
            data: "keyType",
            render: function (data) {
                if (!data || data === "-") return "-";
                return `<span class="capitalize">${data}</span>`;
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
                }}
            />
        </div>
    );
}
