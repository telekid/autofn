// Reference:
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

const target_re = /\s*autofn: (?<docstring>.*)$/;

function createCallGptNode(t, callee, docstring, args) {
  return t.BlockStatement([
    t.ReturnStatement(
      t.CallExpression(t.Identifier(callee), [
        t.StringLiteral(docstring),
        t.ArrayExpression(args.map((arg) => t.StringLiteral(arg))),
        t.ArrayExpression(args.map((arg) => t.Identifier(arg))),
      ])
    ),
  ]);
}

export default function xfm(babel) {
  return {
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          const comments = path.node.leadingComments;
          let match;

          if (comments == null) {
            return;
          }

          for (const comment of comments) {
            const res = comment.value.match(target_re);
            if (res != null) {
              match = {
                docstring: res.groups.docstring,
              };
            }
          }
          if (match != null) {
            if (!path.node.async) {
              throw path.buildCodeFrameError("Function must be async.");
            }
            if (path.node.body.body.length != 0) {
              throw path.buildCodeFrameError("Function body must be empty.");
            }
            const args = path.node.params.map((param) => param.name);
            const newNode = createCallGptNode(
              babel.types,
              "globalThis.gpt",
              match.docstring,
              args
            );

            path.node.body = newNode;
          }
        },
      },
    },
  };
}
