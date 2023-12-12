## autofn: a hack

Write JavaScript functions but leave out the body. Let ChatGPT do the work!

```javascript
import "autofn-runtime";

// autofn: Groups `todos` into `categories`. Then, return todos as a flattened array in the order specified by `categories`.
async function sortTodos(todos, categories) {}

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
// ['call mom', 'make dr appointment', 'dishes', 'laundry', 'submit performance review']
```

### Requirements

Node and Babel.

### Usage

_This is a proof of concept. Only fools will use it in production. (There are many fools among us...)_

1. Add `autofn-babel` as a babel plugin.
2. Import `autofn-runtime` to your app's entrypoint.
3. That's it.
