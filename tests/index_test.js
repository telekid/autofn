import { test } from "node:test";
import * as parser from "@babel/parser";
import { transform } from "@babel/core";

import _generate from "@babel/generator";
const generate = _generate.default;
import assert from "node:assert";
import xfm from "../index.js";

const config = { plugins: [xfm] };
test("basic transform", (t) => {
  const example = `
    // autofn: Returns the square of \`n\`
    async function square(n) {}
    `;

  const { code } = transform(example, config);

  assert.equal(
    code,
    '// autofn: Returns the square of `n`\nasync function square(n) {\n  return gpt("Returns the square of `n`", ["n"], [n]);\n}'
  );

  assert.throws(
    () =>
      transform(
        `
      // autofn: xxx
      function square(n) {}
      `,
        config
      ),
    {
      name: "SyntaxError",
      message: /Function must be async/,
    }
  );

  assert.throws(
    () =>
      transform(
        `
      // autofn: xxx
      async function square(n) { const a = 1; }
      `,
        config
      ),
    {
      name: "SyntaxError",
      message: /Function body must be empty/,
    }
  );
});
