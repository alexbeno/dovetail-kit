import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Composer,
  Message,
  PermissionRequest,
  Thinking,
  ToolCall,
  ToolGroup,
  Transcript,
  WorkIndicator,
} from "@/components/ui/agent";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Agent/Agent kit",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Verdict = "allowed" | "denied" | undefined;

function RunDemo() {
  const [verdict, setVerdict] = useState<Verdict>(undefined);
  const [sent, setSent] = useState<string[]>([]);
  const isWaiting = verdict === undefined;

  return (
    <div className="mx-auto grid max-w-2xl gap-5">
      <Transcript>
        <Message role="user">
          Shorten the tenon by 2 mm and update the parts list.
        </Message>
        <Thinking duration="4s">
          The tenon is on sheet 2; the parts list on sheet 5. Both must agree.
        </Thinking>
        <ToolGroup>
          <ToolCall
            name="Read"
            target="drawings/sheet-2.json"
            meta="0.2s"
            output={'{ "tenon": { "length": 42 } }'}
          />
          <ToolCall
            name="Edit"
            target="drawings/sheet-2.json"
            meta="+1 −1"
            output={'- "length": 42\n+ "length": 40'}
          />
          <ToolCall
            name="Bash"
            target="npm run check"
            status="error"
            meta="exit 1"
            output="Parts list still says 42 mm."
          />
          <ToolCall
            name="Edit"
            target="drawings/sheet-5.json"
            status="running"
          />
          <ToolCall name="Bash" target="npm run export" status="pending" />
        </ToolGroup>
        <Message role="assistant" meta="Agent · 09:14" streaming={isWaiting}>
          The tenon is now 40 mm on both sheets. I would like to export the set.
        </Message>
        <PermissionRequest
          title="Run a command"
          detail="npm run export -- --sheet 2"
          reason="Regenerates the PDF the workshop prints from."
          resolved={verdict}
          onDeny={() => setVerdict("denied")}
          onAllowAlways={() => setVerdict("allowed")}
          onAllow={() => setVerdict("allowed")}
        />
        {verdict === "allowed" ? (
          <WorkIndicator title="Exporting" detail="Sheet 2 of 6" />
        ) : null}
        <Message role="system">Context compacted · 12k tokens kept</Message>
        {sent.map((text, index) => (
          <Message key={index} role="user">
            {text}
          </Message>
        ))}
      </Transcript>
      <Composer
        working={verdict === "allowed"}
        onStop={() => setVerdict(undefined)}
        onSend={(text) => setSent([...sent, text])}
        tools={<Badge variant="outline">Sheet 2</Badge>}
      />
    </div>
  );
}

/** A whole run: messages, thinking, tool calls, a permission request and the composer. */
export const Run: Story = {
  render: () => <RunDemo />,
};
