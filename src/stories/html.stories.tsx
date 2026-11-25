import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "HTML/Without React",
  parameters: { layout: "fullscreen", controls: { disable: true } },
  tags: ["!autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The same recipes compiled to plain classes (`dist/dovetail.css` + `dist/dovetail.js`):
 * no React, no build step. Run `npm run build:html` before Storybook to refresh it.
 */
export const KitchenSink: Story = {
  render: () => (
    <iframe
      title="Dovetail HTML build"
      src="html/demo.html"
      className="h-screen w-full border-0"
    />
  ),
};
