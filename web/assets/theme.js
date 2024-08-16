function theme() {
  var systemIsDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  var systemTheme = systemIsDark ? "dark" : "light";
  var theme = Alpine.$persist(systemTheme).as("theme");
  return {
    theme: theme,
    toggleTheme: function () {
      this.theme = this.theme === "dark" ? "light" : "dark";
    },
  };
}
