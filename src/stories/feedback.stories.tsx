import type { Meta, StoryObj } from "@storybook/react-vite";
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
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/spinner";
import { StampProvider, useStamp } from "@/components/ui/toaster";
import { Caption } from "@/components/ui/typography";

const meta = {
  title: "Overlays/Feedback",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete the sheet</Button>
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
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const RightClick: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="grid h-40 max-w-md place-items-center border border-dashed border-grey">
          <Caption>Right-click this area</Caption>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Sheet 2</ContextMenuLabel>
        <ContextMenuItem>
          Duplicate <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

function ToastButtons() {
  const { stamp, notify } = useStamp();

  function handleNotify() {
    notify({
      title: "Rev C filed",
      description: "The workshop has been told.",
      tone: "success",
      action: (
        <Button variant="outline" size="sm">
          Open
        </Button>
      ),
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
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
        Note with a body
      </Button>
      <Spinner />
    </div>
  );
}

/** `useStamp()` gives `stamp()` (one word, slams in) and `notify()` (a note with a body). */
export const Toasts: Story = {
  render: () => (
    <StampProvider>
      <ToastButtons />
    </StampProvider>
  ),
};
