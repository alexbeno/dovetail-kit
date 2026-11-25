import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Caption, Text } from "@/components/ui/typography";

const meta = {
  title: "Navigation/Structure",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsStory: Story = {
  name: "Tabs",
  render: () => (
    <Tabs defaultValue="plan" className="max-w-xl">
      <TabsList>
        <TabsTrigger value="plan">Plan</TabsTrigger>
        <TabsTrigger value="section">Section</TabsTrigger>
        <TabsTrigger value="detail">Detail</TabsTrigger>
      </TabsList>
      <TabsContent value="plan">
        <Text>The view from above.</Text>
      </TabsContent>
      <TabsContent value="section">
        <Text>The cut along A — A.</Text>
      </TabsContent>
      <TabsContent value="detail">
        <Text>The joint at 1:1.</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => (
    <Accordion type="single" collapsible defaultValue="a" className="max-w-xl">
      <AccordionItem value="a">
        <AccordionTrigger>What is a dovetail?</AccordionTrigger>
        <AccordionContent>
          A joint whose flared pins resist being pulled apart.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Why square corners?</AccordionTrigger>
        <AccordionContent>
          A drawing has no rounded frames. Round is kept for dots and balloons.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const BreadcrumbStory: Story = {
  name: "Breadcrumb",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#workbench">Workbench</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Sheet 2</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const Separators: Story = {
  render: () => (
    <div className="grid max-w-xl gap-5">
      <div>
        <Caption className="pb-2">Ink</Caption>
        <Separator />
      </div>
      <div>
        <Caption className="pb-2">Rule</Caption>
        <Separator variant="rule" />
      </div>
      <div>
        <Caption className="pb-2">Dashed</Caption>
        <Separator variant="dashed" />
      </div>
      <div>
        <Caption className="pb-2">Cut</Caption>
        <Separator variant="cut" />
      </div>
      <div className="flex h-8 items-center gap-4">
        <Caption tone="ink">Left</Caption>
        <Separator orientation="vertical" />
        <Caption tone="ink">Right</Caption>
      </div>
    </div>
  ),
};
