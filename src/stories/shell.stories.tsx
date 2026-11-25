import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileTextIcon, HistoryIcon, LayersIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DrawingSheet } from "@/components/ui/drafting";
import { DovetailMark, Logo } from "@/components/ui/logo";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderText,
  PageHeaderTop,
} from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
} from "@/components/ui/sidebar";
import { Split } from "@/components/ui/split";
import { Caption, Heading, Text } from "@/components/ui/typography";

const meta = {
  title: "Screens/App shell",
  parameters: { layout: "fullscreen", controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ShellDemo() {
  const [page, setPage] = useState(3);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Banner variant="quiet" label="Notice">
        Rev C supersedes every earlier print.
      </Banner>
      <div className="flex min-h-0 flex-1">
        <Sidebar collapsed={isCollapsed}>
          <SidebarHeader>
            <Logo
              href="#top"
              name="Dovetail"
              subtitle="Workshop"
              className={isCollapsed ? "[&>span]:hidden" : undefined}
            />
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection label="Project">
              <SidebarItem
                href="#drawings"
                active
                icon={<FileTextIcon />}
                trailing={<Badge variant="outline">6</Badge>}
              >
                Drawings
              </SidebarItem>
              <SidebarItem href="#parts" icon={<LayersIcon />}>
                Parts
              </SidebarItem>
              <SidebarItem href="#revisions" icon={<HistoryIcon />}>
                Revisions
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter>
            <Button
              variant="ghost"
              size="sm"
              className="w-full px-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "→" : "← Fold"}
            </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex min-w-0 flex-1 flex-col">
          <PageHeader>
            <PageHeaderTop>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#projects">Projects</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Workbench</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </PageHeaderTop>
            <PageHeaderText>
              <Heading level={1}>Drawings</Heading>
              <Text tone="grey">Six sheets, one in review.</Text>
            </PageHeaderText>
            <PageHeaderActions>
              <Button variant="outline">Export</Button>
              <Button variant="accent">New drawing</Button>
            </PageHeaderActions>
          </PageHeader>
          <div className="min-h-0 flex-1">
            <Split
              defaultSize={35}
              first={
                <div className="p-5">
                  <Caption>List</Caption>
                  <Text>
                    Drag the ink rule, or focus it and use the arrows.
                  </Text>
                </div>
              }
              second={
                <div className="grid-paper h-full p-5">
                  <Caption>Detail</Caption>
                </div>
              }
            />
          </div>
          <div className="flex justify-end border-t border-ink p-3">
            <Pagination
              page={page}
              pageCount={12}
              onPageChange={setPage}
              size="sm"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

/** Banner, sidebar, page header, resizable split and pagination together. */
export const AppShell: Story = {
  render: () => <ShellDemo />,
};

export const Banners: Story = {
  render: () => (
    <div className="grid gap-3 p-5">
      <Banner label="Notice">The workshop closes at 18:00.</Banner>
      <Banner variant="accent" label="Live">
        Sheet 2 is being edited.
      </Banner>
      <Banner variant="success" label="Approved">
        Rev C is released.
      </Banner>
      <Banner variant="danger" label="Blocked" onDismiss={() => undefined}>
        The export failed.
      </Banner>
      <Banner
        variant="quiet"
        label="Tip"
        action={
          <Button variant="outline" size="sm">
            Show me
          </Button>
        }
      >
        Zone markers help point at a detail.
      </Banner>
    </div>
  ),
};

export const LogoAndZones: Story = {
  render: () => (
    <div className="bg-desk p-6">
      <DrawingSheet zoned>
        <div className="grid-paper grid gap-6 p-10">
          <Logo
            href="#top"
            name="Alexis Benoliel"
            subtitle="Product engineer"
          />
          <div className="flex items-center gap-4">
            <DovetailMark size={64} />
            <Text tone="grey">
              A zoned sheet: inner frame, numbers along the top and bottom,
              letters down the sides. Hover the logo.
            </Text>
          </div>
        </div>
      </DrawingSheet>
    </div>
  ),
};
