import { openai, createAgent } from "@inngest/agent-kit"

import { inngest } from "./client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => { 
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer, You write readable, maintainable code. You write simple Next.js and react snippets. You return only the code with no added description.",
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet:${event.data.value}`
    );
    console.log(output)

    return output[0].content
  },
);
