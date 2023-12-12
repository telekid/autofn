import { init, gpt } from "runtime";

init();

// autofn: Returns string representing current president in given `year`.
async function prezInYear(year) {}

const result = await prezInYear(2020);

console.log("res", result);
