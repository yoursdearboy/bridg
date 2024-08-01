import DataTable from "datatables.net-bs5";
import * as luxon from "luxon";

(window as any).luxon = luxon;

const datePattern = (window as any).datePattern;

new DataTable("#subjects", {
  ajax: {
    url: ".",
    dataSrc: "",
    beforeSend: (req) =>
      req.setRequestHeader("Content-Type", "application/json"),
  },
  columns: [
    { title: "ID", data: "id" },
    {
      title: "Full Name",
      data: "performing_biologic_entity.full_primary_name",
    },
    {
      title: "Administrative gender",
      data: "performing_biologic_entity.administrative_gender",
    },
    {
      title: "Birth date",
      data: "performing_biologic_entity.birth_date",
      render: DataTable.render.datetime(datePattern),
    },
    {
      title: "Death indicator",
      data: "performing_biologic_entity.death_indicator",
      render: (data) => (data === true ? "Yes" : data === false ? "No" : ""),
    },
    {
      title: "Death date",
      data: "performing_biologic_entity.death_date",
      render: DataTable.render.datetime(datePattern),
    },
  ],
});
