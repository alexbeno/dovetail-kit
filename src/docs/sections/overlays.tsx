import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
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
import { useStamp } from "@/components/ui/toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Caption, Text } from "@/components/ui/typography";
import { Section, Specimen } from "@/docs/parts";

function ToastButtons() {
  const { stamp, notify } = useStamp();

  function handleNotify() {
    notify({
      title: "Rev C filed",
      description: "The workshop has been told.",
      tone: "success",
    });
  }

  return (
    <>
      <Button variant="outline" onClick={() => stamp("Approved")}>
        Stamp
      </Button>
      <Button
        variant="outline"
        onClick={() => stamp("Void", { tone: "danger" })}
      >
        Stamp · danger
      </Button>
      <Button variant="outline" onClick={handleNotify}>
        Note
      </Button>
    </>
  );
}

export function Overlays() {
  return (
    <Section
      id="overlays"
      number="06"
      label="Overlays"
      title="Layers over the sheet"
      lead="Dialogs framed in 2px ink, menus and popovers with a hard offset shadow, tooltips inked in mono, and the toast as a rubber stamp. Built on Radix: focus, keyboard and dismissal are handled."
    >
      <Specimen
        label="Dialog, alert dialog, side sheet"
        className="flex flex-wrap gap-3"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Dialog</Button>
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
                <Label htmlFor="docs-sheet-name">Title</Label>
                <Input
                  id="docs-sheet-name"
                  defaultValue="Workbench, front elevation"
                />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Rename</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Alert dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogContent danger>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete sheet 2?</AlertDialogTitle>
              <AlertDialogDescription>
                Its revisions go with it. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep it</AlertDialogCancel>
              <AlertDialogAction variant="destructive">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Side sheet</Button>
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
      </Specimen>

      <Specimen label="Menu, popover, tooltip" className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Caption>Scale</Caption>
            <Text>1:10 on A3. Details at 1:1.</Text>
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost">Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>Supplementary text only</TooltipContent>
        </Tooltip>
      </Specimen>

      <Specimen
        label="Toasts · stamp() and notify()"
        className="flex flex-wrap gap-3"
      >
        <ToastButtons />
      </Specimen>

      <Specimen label="Context menu">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="grid h-24 place-items-center border border-dashed border-grey">
              <Caption>Right-click this area</Caption>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Sheet 2</ContextMenuLabel>
            <ContextMenuItem>Duplicate</ContextMenuItem>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Specimen>
    </Section>
  );
}
