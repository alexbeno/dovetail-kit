import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Caption, Text } from "@/components/ui/typography";

const meta = {
  title: "Overlays/Layers",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Rename the sheet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename the sheet</DialogTitle>
          <DialogDescription>
            The title block updates on every print.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <Label htmlFor="sheet-name">Title</Label>
            <Input id="sheet-name" defaultValue="Workbench, front elevation" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="accent">Rename</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const SheetStory: Story = {
  name: "Sheet (side panel)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open revisions</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Revisions</SheetTitle>
          <SheetDescription>Newest at the bottom.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <Caption>Rev C</Caption>
          <Text>Tenon shortened by 2 mm.</Text>
        </SheetBody>
        <SheetFooter>
          <Button>Issue Rev D</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Menu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Sheet actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sheet 2</DropdownMenuLabel>
        <DropdownMenuItem>
          Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Export as PDF</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>
          Show zone markers
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const PopoverAndTooltip: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Scale</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Caption>Scale</Caption>
          <Text>1:10 on A3. Details at 1:1.</Text>
        </PopoverContent>
      </Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Supplementary text only</TooltipContent>
      </Tooltip>
    </div>
  ),
};
