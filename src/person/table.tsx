import "datatables.net-dt/css/dataTables.dataTables.min.css";
import DataTable from "datatables.net-dt";
import * as luxon from "luxon";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTableExtra from "../datatables";

(window as any).luxon = luxon;

const URL = "/api/persons";

const COLUMNS = [
  { data: "id", title: "ID" },
  { data: "name.use", title: "Name usage" },
  { data: "name.family", title: "Family name" },
  { data: "name.given", title: "Given name" },
  { data: "name.middle", title: "Middle name" },
  { data: "name.patronymic", title: "Patronymic name", visible: false },
  { data: "name.prefix", title: "Name prefix", visible: false },
  { data: "name.suffix", title: "Name suffix", visible: false },
  { data: "administrative_gender", title: "Administrative gender" },
  {
    data: "birth_date",
    title: "Birth date",
    render: DataTable.render.date("dd.MM.yyyy"),
  },
  {
    data: "death_date",
    title: "Death date",
    render: DataTable.render.date("dd.MM.yyyy"),
    visible: false,
  },
  {
    data: "death_date_estimated_indicator",
    title: "Death date estimated?",
    visible: false,
  },
  { data: "death_indicator", title: "Dead" },
  {
    data: "id",
    render: DataTableExtra.render.react(({ data: id, meta }) => {
      const { navigate } = meta.settings.oInit;
      const url = `/persons/${id}`;
      return (
        <a
          href={url}
          onClick={(e) => {
            e.preventDefault();
            navigate(url);
          }}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
        </a>
      );
    }),
    orderable: false,
  },
];

export default function PersonTable() {
  const ref = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dt = new DataTable(ref.current!, {
      ajax: {
        url: URL,
        dataSrc: "",
      },
      columns: COLUMNS,
      layout: {
        topStart: {},
      },
      searching: false,
      navigate,
    } as any);

    return function () {
      dt.destroy();
    };
  });

  return <table ref={ref}></table>;
}
