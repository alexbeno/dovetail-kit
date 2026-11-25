import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Choice, Field, FieldError, FieldHint } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const meta = {
  title: "Forms/Controls",
  parameters: { controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fields: Story = {
  render: () => (
    <div className="grid max-w-md gap-5">
      <Field>
        <Label htmlFor="title">Drawing title</Label>
        <Input id="title" placeholder="Workbench, front elevation" />
        <FieldHint>Shown in the title block.</FieldHint>
      </Field>
      <Field>
        <Label htmlFor="scale">Scale</Label>
        <Input
          id="scale"
          defaultValue="1:0"
          aria-invalid
          aria-describedby="scale-error"
        />
        <FieldError id="scale-error">A scale cannot be zero.</FieldError>
      </Field>
      <Field>
        <Label htmlFor="notes">General notes</Label>
        <Textarea id="notes" placeholder="All dimensions in millimetres." />
      </Field>
      <Field>
        <Label htmlFor="material">Material · native select</Label>
        <NativeSelect id="material" defaultValue="oak">
          <option value="oak">Oak</option>
          <option value="ash">Ash</option>
          <option value="walnut">Walnut</option>
        </NativeSelect>
      </Field>
      <Field>
        <Label htmlFor="joint">Joint · Radix select</Label>
        <Select defaultValue="dovetail">
          <SelectTrigger id="joint">
            <SelectValue placeholder="Pick a joint" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dovetail">Dovetail</SelectItem>
            <SelectItem value="mortise">Mortise and tenon</SelectItem>
            <SelectItem value="lap">Half lap</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </div>
  ),
};

export const Choices: Story = {
  render: () => (
    <div className="grid max-w-md gap-6">
      <Choice>
        <Checkbox defaultChecked />
        Checked by the lead draughtsman
      </Choice>
      <Choice>
        <Checkbox />
        Print with zone markers
      </Choice>
      <RadioGroup defaultValue="a3" aria-label="Sheet size">
        <Choice>
          <RadioGroupItem value="a4" />
          A4
        </Choice>
        <Choice>
          <RadioGroupItem value="a3" />
          A3
        </Choice>
      </RadioGroup>
      <Choice>
        <Switch defaultChecked />
        Blueprint on export
      </Choice>
      <div className="flex gap-3">
        <Button variant="accent">Save</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  ),
};
