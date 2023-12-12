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

1. Add [`autofn-babel`](https://www.npmjs.com/package/autofn-babel) as a babel plugin.
2. Add [`autofn-runtime`](https://www.npmjs.com/package/autofn-runtime) as a project dependency and add `import "autofn-runtime";` to the top of your app's entrypoint.
3. Set the `OPENAI_API_KEY` environment variable.
4. Have fun!

### TODO

Lots of ideas.

 - [ ] Memoize results
   - [ ] In-process memoization
   - [ ] Filesystem-backed memoization
 - [ ] Use TypeScript and Flow type information as hints
 - [ ] Convert to TypeScript project
 - [ ] Design mechanism for configuring model on a per-fn basis
 - [ ] Come up with way to quickly "expand" a remote function into a local one
