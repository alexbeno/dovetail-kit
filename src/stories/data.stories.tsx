import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Caption } from "@/components/ui/typography";

const meta = {
  title: "Data/Display",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PARTS = [
  {
    item: "01",
    part: "Top rail",
    material: "Oak",
    quantity: 2,
    length: "1 240",
  },
  { item: "02", part: "Leg", material: "Oak", quantity: 4, length: "860" },
  {
    item: "03",
    part: "Stretcher",
    material: "Ash",
    quantity: 2,
    length: "1 120",
  },
];

export const Cards: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-5 sheet:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Workbench</CardTitle>
          <CardDescription>Front elevation, sheet 2 of 6</CardDescription>
          <CardAction>
            <Badge variant="accent">Rev C</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Caption>Progress</Caption>
          <Progress value={62} className="mt-2" aria-label="Progress" />
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm">
            Discard
          </Button>
          <Button size="sm">Open</Button>
        </CardFooter>
      </Card>
      <Card interactive tabIndex={0}>
        <CardHeader>
          <CardTitle>Interactive card</CardTitle>
          <CardDescription>
            Lifts on hover with a hard ink shadow
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <Skeleton className="w-3/4" />
          <Skeleton />
          <Skeleton className="w-1/2" />
        </CardContent>
      </Card>
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Approved</Badge>
      <Badge variant="destructive">Rejected</Badge>
      <Badge variant="muted">Draft</Badge>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar shape="round">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const PartsTable: Story = {
  render: () => (
    <Card className="max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Part</TableHead>
            <TableHead>Material</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Length</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PARTS.map((row) => (
            <TableRow key={row.item}>
              <TableCell className="font-mono text-pen">{row.item}</TableCell>
              <TableCell>{row.part}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell numeric>{row.quantity}</TableCell>
              <TableCell numeric>{row.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};

export const Alerts: Story = {
  render: () => (
    <div className="grid max-w-xl gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          All dimensions are in millimetres unless stated.
        </AlertDescription>
      </Alert>
      <Alert variant="ink">
        <AlertTitle>Revision</AlertTitle>
        <AlertDescription>
          Rev C supersedes every earlier print.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Approved</AlertTitle>
        <AlertDescription>
          Checked and released for the workshop.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Out of tolerance</AlertTitle>
        <AlertDescription>
          The tenon is 2 mm too long for the mortise.
        </AlertDescription>
      </Alert>
      <div>
        <Caption>Indeterminate</Caption>
        <Progress className="mt-2" aria-label="Loading" />
      </div>
    </div>
  ),
};
