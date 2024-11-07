function newSubjectForm(props) {
  var url = props.url;

  return {
    lookup: function () {
      var form = this.$refs.form;
      var data = new FormData(form);
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then(function (x) {
          return x.json();
        })
        .then((res) => (this.subjects = res));
    },
    selected: null,
    subjects: [],
  };
}
