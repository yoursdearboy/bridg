function search() {
  return {
    init: function () {
      Alpine.bind(document.body, {
        "x-on:keydown.prevent.ctrl.k": this.focus.bind(this),
        "x-on:keydown.prevent.cmd.k": this.focus.bind(this),
      });
    },
    focus: function () {
      this.$refs.q.focus();
    },
  };
}
