import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@/components/ui/card";
import { NoteList, PartsList, RevisionList } from "@/components/ui/lists";
import { Timeline, TimelineItem } from "@/components/ui/timeline";

const meta = {
  title: "Data/Records",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimelineStory: Story = {
  name: "Timeline",
  render: () => (
    <Timeline className="max-w-md">
      <TimelineItem title="Drawn" time="09:12" status="success">
        Front elevation, sheet 2.
      </TimelineItem>
      <TimelineItem title="Tolerance check" time="09:40" status="danger">
        The tenon is 2 mm too long.
      </TimelineItem>
      <TimelineItem title="Corrected" time="10:05" />
      <TimelineItem title="Checking" time="now" status="active" />
      <TimelineItem title="Issue" time="—" status="pending" />
    </Timeline>
  ),
};

export const Parts: Story = {
  render: () => (
    <Card className="max-w-3xl">
      <PartsList
        items={[
          {
            item: 1,
            name: "Top rail",
            meta: "Oak · 1 240 mm",
            description: "Carries the top. Dovetailed into the legs.",
          },
          {
            item: 2,
            name: "Leg",
            meta: "Oak · 860 mm",
            description: "Four of them, tapered on two faces.",
          },
          {
            item: 3,
            name: "Stretcher",
            meta: "Ash · 1 120 mm",
            description: "Keeps the frame from racking.",
          },
        ]}
      />
    </Card>
  ),
};

export const Revisions: Story = {
  render: () => (
    <Card className="max-w-sm">
      <RevisionList
        items={[
          { rev: "A", name: "First issue", date: "09/26" },
          {
            rev: "B",
            name: "Stretcher lowered",
            detail: "By 40 mm",
            date: "10/26",
          },
          {
            rev: "C",
            name: "Tenon shortened",
            detail: "By 2 mm",
            date: "11/26",
            current: true,
          },
        ]}
        footer="Rev C is in force."
      />
    </Card>
  ),
};

export const Notes: Story = {
  render: () => (
    <NoteList>
      <li>All dimensions in millimetres.</li>
      <li>Break all sharp edges.</li>
      <li>Finish: two coats of hard wax oil.</li>
    </NoteList>
  ),
};
