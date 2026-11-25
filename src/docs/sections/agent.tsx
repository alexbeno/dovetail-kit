import { useState } from "react";
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
import { Cell } from "@/components/ui/drafting";
import { Section } from "@/docs/parts";

type Verdict = "allowed" | "denied" | undefined;

export function Agent() {
  const [verdict, setVerdict] = useState<Verdict>(undefined);
  const [sent, setSent] = useState<string[]>([]);

  return (
    <Section
      id="agent"
      number="07"
      label="Agent kit"
      title="People and agents"
      lead="A transcript reads like a revision log, tool calls are parts, and a permission is an approval the human stamps. Presentational only: bring your own state. Answer the request below, or send a message."
      columns={1}
    >
      <Cell span={1} spanSm={2} className="py-8 sheet:px-6">
        <div className="mx-auto grid max-w-2xl gap-5">
          <Transcript>
            <Message role="user">
              Shorten the tenon by 2 mm and update the parts list.
            </Message>
            <Thinking duration="4s">
              The tenon is on sheet 2; the parts list on sheet 5. Both must
              agree.
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
            </ToolGroup>
            <Message
              role="assistant"
              meta="Agent · 09:14"
              streaming={verdict === undefined}
            >
              The tenon is now 40 mm on both sheets. I would like to export the
              set.
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
      </Cell>
    </Section>
  );
}
