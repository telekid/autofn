import { test } from "node:test";
import assert from "node:assert";

import { prompt } from "../src/index.js";

test("prompt", (t) => {
  assert.equal(
    prompt("docstring", ["name"], ["jake"]),
    `You are going to evaluate a function with the following arguments:\nname\n    \nThe docstring for the function reads as follows:\ndocstring\n\nNext, I will provide you with arguments as a JSON string, and I want you to return the result of your function as JSON in the shape described in the docstring. In all cases, the root of the returned value should be a JSON object with the value contained under the key "result". The only exception to that rule is if you cannot generate a sensible result. In that case, return a short string explaining the cause of the issue and a fix under the key "error". Arguments:\njake`
  );
});
