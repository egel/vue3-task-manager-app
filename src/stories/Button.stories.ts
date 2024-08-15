import type { Meta, StoryObj } from "@storybook/vue3";
import { fn } from "@storybook/test";
import Button from "./Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "App/Button",
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    type: { control: "select", options: ["button", "submit", "reset"] },
  },
  args: {
    type: "button",
    title: "",
    backgroundColor: "#282828",
    fontColor: "#f1f1f1",
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
    default: "Button",
  },
  parameters: {
    slots: {
      default: {
        description: "Default slot",
        template: `<p>{{ args.default }}</p>`,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  args: {
    title: "This is default button title",
    default: "Button",
  },
};

export const CustomTitleAndSlot: Story = {
  name: "Custom title and slot",
  args: {
    title: "Edit mode",
    default: "✎",
  },
};

export const Colored: Story = {
  name: "I am in Color! 🎉",
  args: {
    title: "Complete task",
    default: "✓ Done",
    backgroundColor: "#37B000",
    fontColor: "#282828",
  },
};
