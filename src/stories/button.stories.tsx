import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const meta = {
  title: "Actions/Button",
  component: Button,
  args: { children: "New drawing" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "accent",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="accent">Accent</Button>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">Large</Button>
      <Button>Default · 44px</Button>
      <Button size="sm">Small</Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="accent">
        Issue the sheet <ArrowRightIcon />
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button asChild variant="outline">
        <a href="#top">As a link</a>
      </Button>
    </div>
  ),
};

export const Toggles: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="plan" aria-label="View">
      <ToggleGroupItem value="plan">Plan</ToggleGroupItem>
      <ToggleGroupItem value="section">Section</ToggleGroupItem>
      <ToggleGroupItem value="detail">Detail</ToggleGroupItem>
    </ToggleGroup>
  ),
};
