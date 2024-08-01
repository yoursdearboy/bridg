const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const typescript = require("@rollup/plugin-typescript");
const { globSync } = require("glob");

const removePrefix = (s, x) => s.substring(x.length, s.length);
const removeSuffix = (s, x) => s.substring(0, s.length - x.length);

module.exports = {
  input: Object.fromEntries(
    globSync("web/**/*.ts").map((f) => [
      removePrefix(removeSuffix(f, ".ts"), "web/"),
      f,
    ])
  ),
  output: {
    dir: "web/static",
    format: "es",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    postcss({
      extract: true,
    }),
  ],
};
