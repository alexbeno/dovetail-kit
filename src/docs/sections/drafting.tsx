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
import { NoteList, RevisionList } from "@/components/ui/lists";
import { DovetailMark, Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import { Caption, Heading, Text } from "@/components/ui/typography";
import { Section, Specimen } from "@/docs/parts";

export function Drafting() {
  return (
    <Section
      id="drafting"
      number="02"
      label="Drafting"
      title="The sheet and its marks"
      lead="A screen is a sheet on a desk. Content sits in the cells of a title block, every value under a small mono caption. The marks are the ones a draughtsman leaves: dimensions, section lines, balloons, stamps."
    >
      <Specimen label="Title block · Cells and Cell" span={4}>
        <Cells columns={4}>
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
          <Cell label="Status · interactive cell" span={2} interactive>
            <Status pulse className="mt-2">
              In progress
            </Status>
          </Cell>
        </Cells>
      </Specimen>

      <Specimen
        label="Dimension, section line, separators"
        className="grid gap-6"
      >
        <Dimension>1 240 mm</Dimension>
        <SectionLine letter="A" />
        <Separator />
        <Separator variant="rule" />
        <Separator variant="dashed" />
      </Specimen>

      <Specimen label="Balloons, status, stamps" className="grid gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <ItemNumber variant="plain">1</ItemNumber>
          <ItemNumber>2</ItemNumber>
          <ItemNumber variant="active">3</ItemNumber>
          <Status>Live</Status>
          <Status tone="grey">Idle</Status>
          <Status tone="danger">Failed</Status>
        </div>
        <div className="flex flex-wrap items-center gap-8 py-4">
          <Stamp>Approved</Stamp>
          <Stamp tone="ink">Issued</Stamp>
          <Stamp tone="danger">Void</Stamp>
        </div>
      </Specimen>

      <Specimen
        label="Logo and monogram"
        className="flex flex-wrap items-center gap-8"
      >
        <Logo href="#top" name="Alexis Benoliel" subtitle="Product engineer" />
        <DovetailMark size={56} />
      </Specimen>

      <Specimen label="General notes">
        <NoteList>
          <li>All dimensions in millimetres.</li>
          <li>Break all sharp edges.</li>
          <li>Finish: two coats of hard wax oil.</li>
        </NoteList>
      </Specimen>

      <Cell flush span={2} spanSm={2}>
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
        />
      </Cell>

      <Specimen label="Empty state">
        <EmptyState>
          <Caption>No drawings</Caption>
          <Heading level={3}>The sheet is blank</Heading>
          <Text tone="grey">Start a drawing and it will be filed here.</Text>
          <Button variant="outline" size="sm">
            New drawing
          </Button>
        </EmptyState>
      </Specimen>
    </Section>
  );
}
