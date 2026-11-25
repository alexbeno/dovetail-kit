import { ArrowRightIcon, PlusIcon } from "lucide-react";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Section, Specimen } from "@/docs/parts";

export function Controls() {
  return (
    <Section
      id="controls"
      number="03"
      label="Actions and forms"
      title="Controls"
      lead="Mono uppercase buttons with a 44px target, inputs with a 1.5px ink border that turns orange on focus. One accent button per screen: the primary action."
    >
      <Specimen
        label="Button variants"
        className="flex flex-wrap items-center gap-3"
      >
        <Button variant="accent">Accent</Button>
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Specimen>

      <Specimen label="Sizes, icons, states" className="grid gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" variant="outline">
            Large
          </Button>
          <Button variant="outline">Default</Button>
          <Button size="sm" variant="outline">
            Small
          </Button>
          <Button size="icon" variant="outline" aria-label="Add">
            <PlusIcon />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            Issue the sheet <ArrowRightIcon />
          </Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
          <ToggleGroup type="single" defaultValue="plan" aria-label="View">
            <ToggleGroupItem value="plan">Plan</ToggleGroupItem>
            <ToggleGroupItem value="section">Section</ToggleGroupItem>
            <ToggleGroupItem value="detail">Detail</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </Specimen>

      <Specimen label="Fields" className="grid gap-5">
        <Field>
          <Label htmlFor="docs-title">Drawing title</Label>
          <Input id="docs-title" placeholder="Workbench, front elevation" />
          <FieldHint>Shown in the title block.</FieldHint>
        </Field>
        <Field>
          <Label htmlFor="docs-scale">Scale</Label>
          <Input
            id="docs-scale"
            defaultValue="1:0"
            aria-invalid
            aria-describedby="docs-scale-error"
          />
          <FieldError id="docs-scale-error">A scale cannot be zero.</FieldError>
        </Field>
        <Field>
          <Label htmlFor="docs-notes">General notes</Label>
          <Textarea
            id="docs-notes"
            placeholder="All dimensions in millimetres."
          />
        </Field>
      </Specimen>

      <Specimen label="Selects and choices" className="grid gap-5">
        <Field>
          <Label htmlFor="docs-joint">Joint · Radix select</Label>
          <Select defaultValue="dovetail">
            <SelectTrigger id="docs-joint">
              <SelectValue placeholder="Pick a joint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dovetail">Dovetail</SelectItem>
              <SelectItem value="mortise">Mortise and tenon</SelectItem>
              <SelectItem value="lap">Half lap</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="docs-material">Material · native select</Label>
          <NativeSelect id="docs-material" defaultValue="oak">
            <option value="oak">Oak</option>
            <option value="ash">Ash</option>
            <option value="walnut">Walnut</option>
          </NativeSelect>
        </Field>
        <div className="grid gap-3">
          <Choice>
            <Checkbox defaultChecked />
            Checked by the lead draughtsman
          </Choice>
          <RadioGroup
            defaultValue="a3"
            aria-label="Sheet size"
            className="grid-flow-col justify-start gap-6"
          >
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
        </div>
      </Specimen>
    </Section>
  );
}
