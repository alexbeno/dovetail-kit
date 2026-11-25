import { Section, Specimen } from "@/docs/parts";
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

const COLOURS = [
  { name: "desk", swatch: "bg-desk", use: "Behind the sheet" },
  { name: "paper", swatch: "bg-paper", use: "Every surface" },
  { name: "ink", swatch: "bg-ink", use: "Text, frames, rules" },
  { name: "pen", swatch: "bg-pen", use: "The one orange pen" },
  { name: "grey", swatch: "bg-grey", use: "Captions, secondary" },
  { name: "rule", swatch: "bg-rule", use: "Faint separators" },
  { name: "danger", swatch: "bg-danger", use: "Errors, destructive" },
  { name: "success", swatch: "bg-success", use: "Confirmations" },
];

const LINES = [
  { name: "Hairline", width: "border-t", note: "1px · cells, rows" },
  { name: "Rule", width: "border-t-[1.5px]", note: "1.5px · controls, cards" },
  { name: "Frame", width: "border-t-2", note: "2px · sheet, dialog" },
  { name: "Stamp", width: "border-t-[3px]", note: "3px · stamps, alerts" },
];

export function Foundations() {
  return (
    <Section
      id="foundations"
      number="01"
      label="Foundations"
      title="Paper, ink and one orange pen"
      lead="Eight colours in two themes, three typefaces with fixed roles, four line weights. Corners are square and depth is a hard ink offset, never a blur."
    >
      {COLOURS.map((colour) => (
        <div key={colour.name} className="bg-paper">
          <div className={`h-24 border-b border-ink ${colour.swatch}`} />
          <div className="px-4 py-3 sheet:px-6">
            <Caption tone="ink">{colour.name}</Caption>
            <Text size="sm" tone="grey">
              {colour.use}
            </Text>
          </div>
        </div>
      ))}

      <Specimen
        label="Display · Archivo Black, wide · once per screen"
        span={4}
      >
        <Display className="text-[clamp(38px,6vw,84px)]">
          Joints that hold
        </Display>
      </Specimen>

      <Specimen label="Headings · Archivo condensed" className="grid gap-2">
        <Heading level={1}>Front elevation</Heading>
        <Heading level={2}>Parts list</Heading>
        <Heading level={3}>Revision history</Heading>
        <Heading level={4}>General notes</Heading>
      </Specimen>

      <Specimen label="Text · IBM Plex Sans and Mono" className="grid gap-3">
        <Text size="lg">Trained as a carpenter. Product engineer today.</Text>
        <Text>
          Emphasis is <Mark>hatching under the words</Mark>, never italics. A{" "}
          <Link variant="draw" href="#foundations">
            link
          </Link>{" "}
          draws its underline in.
        </Text>
        <Text size="sm" tone="grey">
          Secondary text sits in pencil grey.
        </Text>
        <Text>
          Run <Code>npm run build</Code>, then press <Kbd>⌘</Kbd> <Kbd>K</Kbd>.
        </Text>
      </Specimen>

      <Specimen label="Line weights" className="grid gap-5">
        {LINES.map((line) => (
          <div key={line.name}>
            <div className="flex justify-between pb-2">
              <Caption tone="ink">{line.name}</Caption>
              <Caption>{line.note}</Caption>
            </div>
            <div className={`border-ink ${line.width}`} />
          </div>
        ))}
      </Specimen>

      <Specimen label="Graph paper and depth" className="grid gap-5">
        <div className="grid-paper h-28 border-[1.5px] border-ink p-3">
          <Caption>12px minor · 48px major</Caption>
        </div>
        <div className="flex gap-6 pb-1">
          <div className="border-[1.5px] border-ink bg-paper px-4 py-3 shadow-float">
            <Caption tone="ink">Float</Caption>
          </div>
          <div className="border-[1.5px] border-ink bg-paper px-4 py-3 shadow-press">
            <Caption tone="ink">Press</Caption>
          </div>
        </div>
      </Specimen>
    </Section>
  );
}
