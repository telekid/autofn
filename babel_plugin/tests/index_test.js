import { test } from "node:test";
import assert from "node:assert";
import { transform } from "@babel/core";

import xfm from "../index.js";

const config = { plugins: [xfm] };
test("basic transform", (t) => {
  assert.equal(
    transform(
      `
    // autofn: Returns the square of \`n\`
    async function square(n) {}
    `,
      config
    ).code,
    '// autofn: Returns the square of `n`\nasync function square(n) {\n  return gpt("Returns the square of `n`", ["n"], [n]);\n}'
  );

  assert.equal(
    transform(`function square(n) {}`, config).code,
    `function square(n) {}`
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
