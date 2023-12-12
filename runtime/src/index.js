import OpenAI from "openai";

let openai;

export function init() {
  openai = new OpenAI({});
}

export function prompt(docstring, argset, argsval) {
  return `You are a function with the following arguments:
${argset}
    
The docstring for the function reads as follows:
${docstring}

Next, I will provide you with arguments as a JSON string, and I want you to return the result of your function as JSON in the shape described in the docstring. In all cases, the root of the returned value should be a JSON object with the value contained under the key "result". The only exception to that rule is if you cannot generate a sensible result. In that case, return a short string explaining the cause of the issue and a fix under the key "error". Arguments:
${argsval}`;
}

export async function gpt(docstring, argset, argvals) {
  if (openai == null) {
    // TODO: throw
  }

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt(docstring, argset, argvals) }],
    model: "gpt-3.5-turbo",
  });

  // TODO: typescript
  const { error, result } = JSON.parse(response.choices[0].message.content);

  if (result) {
    return result;
  } else if (error) {
    throw new Error("AI could could not produce a result.", { details: error });
  }
}
