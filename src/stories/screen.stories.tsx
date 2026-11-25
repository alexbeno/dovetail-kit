import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cell,
  Cells,
  Desk,
  DrawingSheet,
  HeaderStrip,
  HeaderStripCell,
  HeaderStripNav,
  Status,
  Value,
} from "@/components/ui/drafting";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Caption,
  Display,
  Heading,
  Link,
  Mark,
  Text,
} from "@/components/ui/typography";

const meta = {
  title: "Screens/Project sheet",
  parameters: { layout: "fullscreen", controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const REVISIONS = [
  { rev: "A", change: "First issue", date: "2026-09-02" },
  { rev: "B", change: "Stretcher lowered by 40 mm", date: "2026-10-14" },
  { rev: "C", change: "Tenon shortened by 2 mm", date: "2026-11-20" },
];

/** A whole screen: desk, sheet, header strip, hero, title block. One orange action. */
export const ProjectSheet: Story = {
  render: () => (
    <Desk>
      <DrawingSheet>
        <HeaderStrip>
          <HeaderStripCell>
            <Caption tone="ink">Dovetail · Workshop</Caption>
          </HeaderStripCell>
          <HeaderStripCell>
            <HeaderStripNav>
              <Link variant="draw" href="#drawings">
                Drawings
              </Link>
              <Link variant="draw" href="#parts">
                Parts
              </Link>
              <Link variant="draw" href="#revisions">
                Revisions
              </Link>
            </HeaderStripNav>
          </HeaderStripCell>
          <HeaderStripCell end>
            <Button variant="accent">Issue the sheet</Button>
          </HeaderStripCell>
        </HeaderStrip>

        <div className="grid-paper grid gap-6 px-5 py-12 sheet:px-11 sheet:py-16">
          <Caption>Project 014 · Front elevation</Caption>
          <Display>Workbench</Display>
          <Text size="lg" className="max-w-xl">
            Oak frame, ash stretchers, <Mark>through dovetails</Mark> at every
            corner. Built to be taken apart and put back together.
          </Text>
        </div>

        <Cells flush columns={4} className="border-t-[1.5px]">
          <Cell label="Parts">
            <Value variant="lg">128</Value>
          </Cell>
          <Cell label="Sheets">
            <Value variant="lg">6</Value>
          </Cell>
          <Cell label="Scale">
            <Value variant="lg">1:10</Value>
          </Cell>
          <Cell label="Status">
            <Status pulse className="mt-2">
              In progress
            </Status>
          </Cell>
          <Cell flush span={4} id="revisions">
            <div className="flex items-center justify-between px-4 py-3">
              <Heading level={3}>Revisions</Heading>
              <Badge variant="accent">Rev C</Badge>
            </div>
            <Table compact>
              <TableHeader>
                <TableRow>
                  <TableHead>Rev</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REVISIONS.map((row) => (
                  <TableRow key={row.rev}>
                    <TableCell className="font-mono text-pen">
                      {row.rev}
                    </TableCell>
                    <TableCell>{row.change}</TableCell>
                    <TableCell numeric>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Cell>
          <Cell label="Drawn by" span={2}>
            A. Benoliel
          </Cell>
          <Cell label="Checked" span={2}>
            <Status tone="success">Approved</Status>
          </Cell>
        </Cells>
      </DrawingSheet>
    </Desk>
  ),
};
