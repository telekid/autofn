## autofn: a hack

Write JavaScript functions but leave out the body. Describe the function's operation in a (currently single-line) comment prefixed by `autofn:`. Let ChatGPT do the rest!

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

### Q&A

**Is this a good idea?**

No clue.

**Is it production ready?**

Ooooooooh no. The code is a proof-of-concept (AKA "trash") that I hacked together in an afternoon.

**Are you accepting PRs?**

Absolutely! I'll try to review with a light touch.

### Requirements

`autofn` requires Node and Babel.

### Usage

1. Add [`autofn-babel`](https://www.npmjs.com/package/autofn-babel) as a babel plugin.
2. Add [`autofn-runtime`](https://www.npmjs.com/package/autofn-runtime) as a project dependency and add `import "autofn-runtime";` to the top of your app's entrypoint.
3. Set the `OPENAI_API_KEY` environment variable.
4. Have fun!

### Next steps

Some ideas:

 - [ ] Memoize results
   - [ ] In-process memoization
   - [ ] Filesystem-backed memoization
 - [ ] Use TypeScript and Flow type information as hints
 - [ ] Convert to TypeScript project
 - [ ] Design mechanism for configuring model on a per-fn basis
 - [ ] Come up with way to quickly "expand" a remote function into a local one
