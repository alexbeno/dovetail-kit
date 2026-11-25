import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Caption,
  Code,
  Display,
  Heading,
  Kbd,
  Link,
  Mark,
  Text,
} from "@/components/ui/typography";

const meta = {
  title: "Foundations/Tokens",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const COLOURS = [
  { name: "desk", swatch: "bg-desk", use: "Page background behind the sheet" },
  { name: "paper", swatch: "bg-paper", use: "Every surface" },
  { name: "ink", swatch: "bg-ink", use: "Text, frames, structural rules" },
  { name: "pen", swatch: "bg-pen", use: "The one orange pen" },
  { name: "grey", swatch: "bg-grey", use: "Captions, secondary text" },
  { name: "rule", swatch: "bg-rule", use: "Faint row separators" },
  { name: "danger", swatch: "bg-danger", use: "Errors, destructive" },
  { name: "success", swatch: "bg-success", use: "Confirmations" },
];

const LINES = [
  { name: "Hairline", width: "border-t", note: "1px · cell separators" },
  {
    name: "Rule",
    width: "border-t-[1.5px]",
    note: "1.5px · inputs, buttons, cards",
  },
  { name: "Frame", width: "border-t-2", note: "2px · sheet, dialog" },
  { name: "Stamp", width: "border-t-[3px]", note: "3px · stamps, alerts" },
];

export const Colours: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-px border-[1.5px] border-ink bg-ink sheet:grid-cols-4">
      {COLOURS.map((colour) => (
        <div key={colour.name} className="bg-paper">
          <div className={`h-20 border-b border-ink ${colour.swatch}`} />
          <div className="px-4 py-3">
            <Caption>{colour.name}</Caption>
            <Text size="sm">{colour.use}</Text>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Type: Story = {
  render: () => (
    <div className="grid gap-6">
      <div>
        <Caption>Display · Archivo Black, wide · once per screen</Caption>
        <Display className="text-[64px]">Dovetail</Display>
      </div>
      <div>
        <Caption>Heading 1 to 4 · Archivo condensed</Caption>
        <Heading level={1}>Joints that hold</Heading>
        <Heading level={2}>Parts list</Heading>
        <Heading level={3}>Revision history</Heading>
        <Heading level={4}>General notes</Heading>
      </div>
      <div>
        <Caption>Text · IBM Plex Sans</Caption>
        <Text size="lg">Trained as a carpenter. Product engineer today.</Text>
        <Text>
          Emphasis is <Mark>hatching under the words</Mark>, never italics. A{" "}
          <Link variant="draw">link</Link> draws its underline in.
        </Text>
        <Text size="sm" tone="grey">
          Secondary text sits in pencil grey.
        </Text>
      </div>
      <div>
        <Caption>Mono · IBM Plex Mono · labels, numbers, codes</Caption>
        <Text>
          Run <Code>npm run build</Code> then press <Kbd>⌘</Kbd> <Kbd>K</Kbd>.
        </Text>
      </div>
    </div>
  ),
};

export const Lines: Story = {
  render: () => (
    <div className="grid max-w-xl gap-5">
      {LINES.map((line) => (
        <div key={line.name}>
          <div className="flex justify-between pb-2">
            <Caption tone="ink">{line.name}</Caption>
            <Caption>{line.note}</Caption>
          </div>
          <div className={`border-ink ${line.width}`} />
        </div>
      ))}
      <div className="grid-paper h-36 border-[1.5px] border-ink p-4">
        <Caption>Graph paper · 12px minor, 48px major</Caption>
      </div>
    </div>
  ),
};
