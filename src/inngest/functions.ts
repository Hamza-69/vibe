import { openai, createAgent } from "@inngest/agent-kit"
import {Sandbox} from '@e2b/code-interpreter'
import { inngest } from "./client"
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => { 
    const SandboxId = await step.run("get-sandbox-id", async () =>{
      const sandbox = await Sandbox.create("vibable-nexjs-hamza-3")
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer, You write readable, maintainable code. You write simple Next.js and react snippets. You return only the code with no added description.",
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet:${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(SandboxId)
      const host = sandbox.getHost(3000)
      return `https://${host}`
    })

    return {output, sandboxUrl}
  },
);
