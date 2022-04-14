import jsx from "rollup-plugin-jsx";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import path from "path";
import fs from "fs";

export default fs
  .readdirSync(path.join(__dirname, "src", "webviews", "pages"))
  .map((input) => {
    const name = input.split(".")[0];
    return {
      input: "src/webviews/pages/" + input,
      output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "out/compiled/" + name + ".js",
      },
      plugins: [
        jsx({ factory: "React.createElement" }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
          browser: true,
          dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
          tsconfig: "src/webviews/tsconfig.json",
        }),
      ],
      watch: {
        clearScreen: false,
      },
    };
  });
