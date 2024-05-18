import DataTable from "datatables.net-bs5";
import * as luxon from "luxon";
import { useEffect, useRef } from "react";

window.luxon = luxon;

const URL = "/api/persons";

const COLUMNS = [
  { data: "id", title: "ID" },
  { data: "sex", title: "Sex" },
  {
    data: "birth_date",
    title: "Birth date",
    render: DataTable.render.date("dd.MM.yyyy"),
  },
  { data: "primary_name.family", title: "Family Name" },
];

export default function PersonIndex() {
  const ref = useRef();

  useEffect(() => {
    const dt = new DataTable(ref.current, {
      ajax: {
        url: URL,
        dataSrc: "",
      },
      columns: COLUMNS,
    });
    return () => dt.destroy();
  });

  return (
    <div>
      <h1>Persons</h1>
      <table className="table" ref={ref}></table>
    </div>
  );
}
