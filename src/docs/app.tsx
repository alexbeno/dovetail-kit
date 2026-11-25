import { Button } from "@/components/ui/button";
import {
  Cell,
  Cells,
  Desk,
  DrawingSheet,
  HeaderStrip,
  HeaderStripCell,
  HeaderStripNav,
  Status,
  Value,
} from "@/components/ui/drafting";
import { Logo } from "@/components/ui/logo";
import { StampProvider } from "@/components/ui/toaster";
import { Caption, Display, Link, Mark, Text } from "@/components/ui/typography";
import { Agent } from "@/docs/sections/agent";
import { Controls } from "@/docs/sections/controls";
import { Data } from "@/docs/sections/data";
import { Drafting } from "@/docs/sections/drafting";
import { Foundations } from "@/docs/sections/foundations";
import { Install } from "@/docs/sections/install";
import { Navigation } from "@/docs/sections/navigation";
import { Overlays } from "@/docs/sections/overlays";
import { useTheme } from "@/docs/use-theme";

const REPOSITORY = "https://github.com/alexbeno/dovetail-kit";

const CHAPTERS = [
  { href: "#foundations", label: "Foundations" },
  { href: "#drafting", label: "Drafting" },
  { href: "#controls", label: "Controls" },
  { href: "#data", label: "Data" },
  { href: "#navigation", label: "Navigation" },
  { href: "#overlays", label: "Overlays" },
  { href: "#agent", label: "Agent" },
];

export function App() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "blueprint" ? "Paper" : "Blueprint";

  return (
    <StampProvider>
      <Desk id="top">
        <DrawingSheet zoned>
          <div>
            <HeaderStrip className="sheet:grid-cols-[auto_minmax(0,1fr)_auto] sheet:auto-cols-auto">
              <HeaderStripCell>
                <Logo href="#top" name="Dovetail" subtitle="Design system" />
              </HeaderStripCell>
              <HeaderStripCell className="overflow-x-auto">
                <HeaderStripNav className="gap-5 text-xs whitespace-nowrap">
                  {CHAPTERS.map((chapter) => (
                    <Link key={chapter.href} variant="draw" href={chapter.href}>
                      {chapter.label}
                    </Link>
                  ))}
                </HeaderStripNav>
              </HeaderStripCell>
              <HeaderStripCell end>
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {nextTheme}
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={REPOSITORY}>GitHub</a>
                </Button>
              </HeaderStripCell>
            </HeaderStrip>

            <header className="grid-paper grid gap-7 px-5 py-14 sheet:px-11 sheet:py-24">
              <Caption>Design system · shadcn/ui · Tailwind CSS 4</Caption>
              <Display>Dovetail</Display>
              <Text size="lg" className="max-w-2xl">
                An engineering drawing turned into an interface: cool graph
                paper, black ink and <Mark>one orange pen</Mark>. The same
                components for React and for plain HTML, drawn from a single
                source of styles.
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="accent">
                  <a href="#install">Get started</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#foundations">See the parts</a>
                </Button>
              </div>
            </header>

            <Cells flush columns={4} className="border-t-[1.5px]">
              <Cell label="Themes" className="sheet:px-6">
                <Value variant="lg">2</Value>
              </Cell>
              <Cell label="Colours" className="sheet:px-6">
                <Value variant="lg">8</Value>
              </Cell>
              <Cell label="Corner radius" className="sheet:px-6">
                <Value variant="lg">0</Value>
              </Cell>
              <Cell label="Current theme" className="sheet:px-6">
                <Status pulse className="mt-2 capitalize">
                  {theme}
                </Status>
              </Cell>
            </Cells>

            <main>
              <Foundations />
              <Drafting />
              <Controls />
              <Data />
              <Navigation />
              <Overlays />
              <Agent />
              <Install />
            </main>

            <footer>
              <Cells flush columns={4} className="border-t-[1.5px]">
                <Cell label="Drawn by" className="sheet:px-6">
                  <Link variant="draw" href="https://www.alexisbenoliel.fr">
                    Alexis Benoliel
                  </Link>
                </Cell>
                <Cell label="Source" className="sheet:px-6">
                  <Link variant="draw" href={REPOSITORY}>
                    alexbeno/dovetail-kit
                  </Link>
                </Cell>
                <Cell label="Licence" className="sheet:px-6">
                  <Value variant="mono">MIT</Value>
                </Cell>
                <Cell label="Sheet" className="sheet:px-6">
                  <Value variant="mono">1 / 1</Value>
                </Cell>
              </Cells>
            </footer>
          </div>
        </DrawingSheet>
      </Desk>
    </StampProvider>
  );
}
