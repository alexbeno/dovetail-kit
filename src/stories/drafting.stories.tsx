import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Cell,
  Cells,
  Dimension,
  EmptyState,
  ItemNumber,
  SectionLine,
  Stamp,
  Status,
  Value,
} from "@/components/ui/drafting";
import { Caption, Heading, Text } from "@/components/ui/typography";

const meta = {
  title: "Drafting/Marks",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleBlock: Story = {
  render: () => (
    <Cells columns={4} columnsSm={2}>
      <Cell label="Drawn by">A. Benoliel</Cell>
      <Cell label="Checked">
        <Status tone="success">Approved</Status>
      </Cell>
      <Cell label="Scale">
        <Value variant="mono">1:10</Value>
      </Cell>
      <Cell label="Sheet" accent>
        <Value variant="mono">2 / 6</Value>
      </Cell>
      <Cell label="Parts" span={2}>
        <Value variant="lg">128</Value>
      </Cell>
      <Cell label="Status" span={2} interactive>
        <Status pulse>In progress</Status>
      </Cell>
    </Cells>
  ),
};

export const Marks: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-8">
      <Dimension>1 240 mm</Dimension>
      <SectionLine letter="A" />
      <div className="flex items-center gap-4">
        <ItemNumber variant="plain">1</ItemNumber>
        <ItemNumber>2</ItemNumber>
        <ItemNumber variant="active">3</ItemNumber>
        <Status>Live</Status>
        <Status tone="grey">Idle</Status>
        <Status tone="danger">Failed</Status>
      </div>
      <div className="flex flex-wrap items-center gap-10 py-6">
        <Stamp>Approved</Stamp>
        <Stamp tone="ink">Issued</Stamp>
        <Stamp tone="success">Checked</Stamp>
        <Stamp tone="danger">Void</Stamp>
      </div>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyState className="max-w-xl">
      <Caption>No drawings</Caption>
      <Heading level={3}>The sheet is blank</Heading>
      <Text tone="grey">Start a drawing and it will be filed here.</Text>
      <Button variant="accent">New drawing</Button>
    </EmptyState>
  ),
};
