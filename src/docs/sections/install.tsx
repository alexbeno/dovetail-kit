import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Caption, Code, CodeBlock, Text } from "@/components/ui/typography";
import { Section, Specimen } from "@/docs/parts";

const REPOSITORY = "https://github.com/alexbeno/dovetail-kit";

const REACT_USAGE = `import { Button } from "@/components/ui/button";
import { Cell, Cells, Desk, DrawingSheet, Value } from "@/components/ui/drafting";
import { Caption, Display } from "@/components/ui/typography";

export function Page() {
  return (
    <Desk>
      <DrawingSheet>
        <div className="grid-paper grid gap-6 px-5 py-12">
          <Caption>Project 014</Caption>
          <Display>Workbench</Display>
        </div>
        <Cells flush columns={4} className="border-t-[1.5px]">
          <Cell label="Parts">
            <Value variant="lg">128</Value>
          </Cell>
          <Cell label="Next step" span={3}>
            <Button variant="accent">Issue the sheet</Button>
          </Cell>
        </Cells>
      </DrawingSheet>
    </Desk>
  );
}`;

const HTML_USAGE = `<div class="desk">
  <div class="drawing-sheet">
    <section class="grid-paper grid gap-6 px-5 py-12">
      <span class="caption">Project 014</span>
      <h1 class="display">Workbench</h1>
    </section>
    <div class="cells cells-flush border-t" style="--cells: 4">
      <div class="cell">
        <span class="caption">Parts</span>
        <span class="value value-lg">128</span>
      </div>
      <div class="cell" style="--span: 3">
        <button class="btn btn-accent">Issue the sheet</button>
      </div>
    </div>
  </div>
</div>`;

function getReactSetup(origin: string) {
  return `# 1. components.json: point shadcn at the registry
"registries": { "@dovetail": "${origin}/r/{name}.json" }

# 2. add components (each one brings the tokens, the theme and the recipes)
npx shadcn@latest add @dovetail/button @dovetail/drafting @dovetail/typography

# 3. global stylesheet, after Tailwind
@import "tailwindcss";
@import "../styles/dovetail/dovetail.css";`;
}

function getHtmlSetup(origin: string) {
  return `<link rel="stylesheet" href="${origin}/dist/dovetail.min.css" />
<script src="${origin}/dist/dovetail.js"></script>

<!-- or one tag: fonts + styles + behaviours -->
<script src="${origin}/dist/dovetail.bundle.js"></script>`;
}

export function Install() {
  const origin = window.location.origin;

  return (
    <Section
      id="install"
      number="08"
      label="Install"
      title="Two ways in, one source"
      lead="Every class lives in one file of recipes. React components read it; the HTML build compiles it into plain classes. Pick the one your project needs: they look the same."
    >
      <Specimen label="Set up" span={4}>
        <Tabs defaultValue="react">
          <TabsList>
            <TabsTrigger value="react">React · Next.js</TabsTrigger>
            <TabsTrigger value="html">Plain HTML</TabsTrigger>
            <TabsTrigger value="claude">Claude</TabsTrigger>
          </TabsList>
          <TabsContent value="react" className="grid gap-4">
            <Text tone="grey" className="max-w-2xl">
              Components install one by one through a shadcn registry served by
              this site. Requires Tailwind CSS 4 and a{" "}
              <Code>components.json</Code>.
            </Text>
            <CodeBlock>{getReactSetup(origin)}</CodeBlock>
            <Caption>Then</Caption>
            <CodeBlock>{REACT_USAGE}</CodeBlock>
          </TabsContent>
          <TabsContent value="html" className="grid gap-4">
            <Text tone="grey" className="max-w-2xl">
              One stylesheet with every component as a class, and a small script
              for the theme, tabs, dialogs and menus. No build step.
            </Text>
            <CodeBlock>{getHtmlSetup(origin)}</CodeBlock>
            <Caption>Then</Caption>
            <CodeBlock>{HTML_USAGE}</CodeBlock>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <a href="/html/demo.html">Open the HTML demo</a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="/dist/dovetail.min.css">dovetail.min.css</a>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <a href="/dist/classes.json">classes.json</a>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="claude" className="grid gap-4">
            <Text tone="grey" className="max-w-2xl">
              The repository ships a self-contained skill: the stylesheet, the
              script, the class list and the rules. Copy it once and Claude
              builds artifacts and single-file apps in Dovetail.
            </Text>
            <CodeBlock>{`git clone ${REPOSITORY}
cp -R dovetail-kit/.claude/skills/dovetail-html ~/.claude/skills/`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </Specimen>
    </Section>
  );
}
