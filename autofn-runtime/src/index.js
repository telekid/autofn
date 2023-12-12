export function prompt(docstring, argset, argsval) {
  return `You are a function with the following arguments:
${JSON.stringify(argset)}
    
The docstring for the function reads as follows:
${JSON.stringify(docstring)}

Next, I will provide you with arguments as a JSON string, and I want you to return the result of your function as JSON in the shape described in the docstring. In all cases, the root of the returned value should be a JSON object with the value contained under the key "result". The only exception to that rule is if you cannot generate a sensible result. In that case, return a short string explaining the cause of the issue and a fix under the key "error". Arguments:
${JSON.stringify(argsval)}`;
}

export async function gpt(docstring, argset, argvals) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "gpt-4-1106-preview",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: prompt(docstring, argset, argvals),
        },
      ],
    }),
  });

  const unpacked = await response.json();

  // TODO: typescript
  const { error, result } = JSON.parse(unpacked.choices[0].message.content);

  if (result) {
    return result;
  } else if (error) {
    console.log("err", error);
    throw new Error("AI could could not produce a result.", { details: error });
  }
}

globalThis.gpt = gpt;
