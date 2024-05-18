import DataTable from "datatables.net-bs5";
import * as luxon from "luxon";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { reactRenderer } from "../datatables";

window.luxon = luxon;

const URL = "/api/persons";

const COLUMNS = [
  { data: "id", title: "ID" },
  { data: "primary_name.use", title: "Name usage" },
  { data: "primary_name.family", title: "Family name" },
  { data: "primary_name.given", title: "Given name" },
  { data: "primary_name.middle", title: "Middle name" },
  { data: "primary_name.patronymic", title: "Patronymic name", visible: false },
  { data: "primary_name.prefix", title: "Name prefix", visible: false },
  { data: "primary_name.suffix", title: "Name suffix", visible: false },
  { data: "sex", title: "Sex" },
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
    render: reactRenderer(({ data: id, meta }) => {
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
          E
        </a>
      );
    }),
    orderable: false,
  },
];

export default function PersonIndex() {
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const dt = new DataTable(ref.current, {
      ajax: {
        url: URL,
        dataSrc: "",
      },
      columns: COLUMNS,
      layout: {
        topStart: {},
      },
      navigate,
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
