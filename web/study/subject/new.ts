function newSubjectForm({ url }) {
  return {
    async lookup() {
      const { form } = this.$refs;
      const data = new FormData(form);
      const res = await fetch(url, {
        method: "POST",
        body: data,
      }).then((x) => x.json());
      this.subjects = res;
    },
    selected: null,
    subjects: [],
  };
}
