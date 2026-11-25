import { useState } from "react";
import { FileTextIcon, HistoryIcon, LayersIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Cell } from "@/components/ui/drafting";
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
  SidebarItem,
  SidebarSection,
} from "@/components/ui/sidebar";
import { Split } from "@/components/ui/split";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Caption, Heading, Text } from "@/components/ui/typography";
import { Section, Specimen } from "@/docs/parts";

function ShellSpecimen() {
  const [page, setPage] = useState(3);

  return (
    <div className="h-[420px]">
      <Split
        defaultSize={26}
        min={18}
        max={45}
        first={
          <Sidebar width="100%" className="border-r-0">
            <SidebarBody>
              <SidebarSection label="Project">
                <SidebarItem
                  href="#navigation"
                  active
                  icon={<FileTextIcon />}
                  trailing={<Badge variant="outline">6</Badge>}
                >
                  Drawings
                </SidebarItem>
                <SidebarItem href="#navigation" icon={<LayersIcon />}>
                  Parts
                </SidebarItem>
                <SidebarItem href="#navigation" icon={<HistoryIcon />}>
                  Revisions
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
        second={
          <div className="flex h-full flex-col">
            <PageHeader className="sheet:px-8 sheet:py-6">
              <PageHeaderTop>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#navigation">
                        Projects
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Workbench</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </PageHeaderTop>
              <PageHeaderText>
                <Heading level={2}>Drawings</Heading>
                <Text tone="grey">
                  Drag the ink rule on the left to resize.
                </Text>
              </PageHeaderText>
              <PageHeaderActions>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </PageHeaderActions>
            </PageHeader>
            <div className="grid-paper flex-1" />
            <div className="flex justify-end border-t border-ink p-3">
              <Pagination
                page={page}
                pageCount={12}
                onPageChange={setPage}
                size="sm"
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export function Navigation() {
  return (
    <Section
      id="navigation"
      number="05"
      label="Navigation"
      title="Finding your way"
      lead="A sidebar that folds to a rail, a page header, a resizable split, pagination, tabs and accordions. The current place is always marked in orange."
    >
      <Cell flush span={4} spanSm={2}>
        <Caption className="px-4 pt-5 pb-4 sheet:px-6">
          App shell · Sidebar, Split, PageHeader, Breadcrumb, Pagination
        </Caption>
        <div className="border-t border-ink">
          <ShellSpecimen />
        </div>
      </Cell>

      <Specimen label="Tabs">
        <Tabs defaultValue="plan">
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
      </Specimen>

      <Specimen label="Accordion">
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>What is a dovetail?</AccordionTrigger>
            <AccordionContent>
              A joint whose flared pins resist being pulled apart.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>Why square corners?</AccordionTrigger>
            <AccordionContent>
              A drawing has no rounded frames. Round is kept for dots and
              balloons.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Specimen>
    </Section>
  );
}
