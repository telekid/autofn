import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

// Reference:
// https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md

function updateBodyVisitor({ types: t }) {
  return {
    BlockStatement: {
      exit(path) {
        const newNode = t.BlockStatement([]);

        path.replaceWith(newNode);
      },
    },
  };
}

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
              // TODO: Test this
              throw path.buildCodeFrameError("Function body must be empty.");
            }
            // path.node.body.replaceWith(newNode);

            const args = path.node.params.map((param) => param.name);
            const newNode = createCallGptNode(
              babel.types,
              // TODO: Get identifier from outer scope
              "gpt",
              match.docstring,
              args
            );

            path.node.body = newNode;
            // console.log(path.node.body.body);
            // path.traverse(updateBodyVisitor(babel));
          }
          // console.log("enter!", path.node.leadingComments);
        },
      },
    },
  };
}
