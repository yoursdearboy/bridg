function subjectsTable({ dateFormat, datetimeFormat, showURL }) {
  const columns = [
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
      render: (data) =>
        `<a href='${showURL.replace(":subject_id", data)}'>${data}</a>`,
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
