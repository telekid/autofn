import "autofn-runtime";

// autofn: Groups `todos` into `categories`. Then, return todos as a flattened array in the order specified by `categories`.
async function sortTodos(todos, categories) {
  return globalThis.gpt(
    "Groups `todos` into `categories`. Then, return todos as a flattened array in the order specified by `categories`.",
    ["todos", "categories"],
    [todos, categories]
  );
}
const result = await sortTodos(
  [
    "dishes",
    "laundry",
    "submit performance review",
    "call mom",
    "make dr appointment",
  ],
  ["phone", "house chores", "work"]
);
console.log(result);
