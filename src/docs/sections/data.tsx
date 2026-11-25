import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
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
import { Cell } from "@/components/ui/drafting";
import { PartsList } from "@/components/ui/lists";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { Caption } from "@/components/ui/typography";
import { Section, Specimen } from "@/docs/parts";

export function Data() {
  return (
    <Section
      id="data"
      number="04"
      label="Data"
      title="Records and feedback"
      lead="Cards framed in ink, tables with mono column heads and hairline rows, progress drawn as a dimension line, skeletons as pencil hatching."
    >
      <Specimen label="Cards" className="grid gap-5 sheet:grid-cols-2" span={4}>
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
      </Specimen>

      <Cell flush span={4} spanSm={2}>
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
      </Cell>

      <Specimen label="Badges, avatars, loaders" className="grid gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Approved</Badge>
          <Badge variant="destructive">Rejected</Badge>
          <Badge variant="muted">Draft</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar shape="round">
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
          <Spinner />
        </div>
        <Progress aria-label="Loading" />
      </Specimen>

      <Specimen label="Timeline">
        <Timeline>
          <TimelineItem title="Drawn" time="09:12" status="success">
            Front elevation, sheet 2.
          </TimelineItem>
          <TimelineItem title="Tolerance check" time="09:40" status="danger">
            The tenon is 2 mm too long.
          </TimelineItem>
          <TimelineItem title="Checking" time="now" status="active" />
          <TimelineItem title="Issue" time="—" status="pending" />
        </Timeline>
      </Specimen>

      <Specimen label="Alerts" className="grid gap-3">
        <Alert>
          <InfoIcon />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            All dimensions are in millimetres unless stated.
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
      </Specimen>

      <Specimen label="Banners" className="grid gap-3">
        <Banner label="Notice">The workshop closes at 18:00.</Banner>
        <Banner variant="success" label="Approved">
          Rev C is released.
        </Banner>
        <Banner variant="quiet" label="Tip">
          Zone markers help point at a detail.
        </Banner>
      </Specimen>
    </Section>
  );
}
