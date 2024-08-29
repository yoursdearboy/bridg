function subjectsTable({ dateFormat, datetimeFormat, showURL }) {
  const columns = [
    { title: "ID", data: "id" },
    {
      title: "Full Name",
      data: (d) => d.performing_biologic_entity.primary_name?.full || null,
    },
    {
      title: "Administrative gender",
      data: "performing_biologic_entity.administrative_gender",
    },
    {
      title: "Birth date",
      data: "performing_biologic_entity.birth_date",
      render: DataTable.render.datetime(dateFormat),
    },
    {
      title: "Death indicator",
      data: "performing_biologic_entity.death_indicator",
      render: (data) => (data === true ? "Yes" : data === false ? "No" : ""),
    },
    {
      title: "Death date",
      data: "performing_biologic_entity.death_date",
      render: DataTable.render.datetime(dateFormat),
    },
    {
      title: "Status",
      data: "status",
    },
    {
      title: "Status date",
      data: "status_date",
      render: DataTable.render.datetime(datetimeFormat),
    },
    {
      data: "id",
      sortable: false,
      render: (data) =>
        `<a href='${showURL.replace(":id", data)}'>
          <i class="fa-solid fa-right-to-bracket"></i>
        </a>`,
    },
  ];

  return function () {
    const { table } = this.$refs;
    new DataTable(table, {
      ajax: {
        url: ".",
        dataSrc: "",
        beforeSend: (req) =>
          req.setRequestHeader("Content-Type", "application/json"),
      },
      columns,
      paging: false,
      searching: false,
    });
  };
}
