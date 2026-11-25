import { useEffect, type PropsWithChildren } from "react";
import type { Preview, StoryContext } from "@storybook/react-vite";
import "./preview.css";

type ThemeName = "paper" | "blueprint";

interface ThemeFrameProps extends PropsWithChildren {
  theme: ThemeName;
}

/** Mirrors what next-themes or dovetail.js do: `.dark` + `data-theme` on <html>. */
function ThemeFrame({ theme, children }: ThemeFrameProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "blueprint");
    root.setAttribute("data-theme", theme);
  }, [theme]);
  return children;
}

function withTheme(Story: () => React.ReactNode, context: StoryContext) {
  return (
    <ThemeFrame theme={context.globals.theme as ThemeName}>
      <Story />
    </ThemeFrame>
  );
}

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: "Dovetail theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          { value: "paper", title: "Paper" },
          { value: "blueprint", title: "Blueprint" },
        ],
      },
    },
  },
  initialGlobals: { theme: "paper" },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          "Foundations",
          "Drafting",
          "Actions",
          "Forms",
          "Data",
          "Navigation",
          "Overlays",
          "Agent",
          "Screens",
          "HTML",
        ],
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
