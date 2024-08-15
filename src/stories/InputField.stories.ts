import type { Meta, StoryObj } from "@storybook/vue3";
import InputField from "./InputField.vue";
import { ref, watch } from "vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: "App/Input Field",
  component: InputField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["text", "date"] },
  },
  args: {
    type: "button",
    placeholder: "I am default placeholder",
    modelValue: "Aha, here you are!",
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const InputField_Basic: Story = {
  name: "Basic with text",
  args: {
    type: "text",
    placeholder: "I am different",
  },
};

export const InputField_Placeholder: Story = {
  name: "Placeholder (empty)",
  args: {
    type: "text",
    placeholder: "I am special placeholder",
    modelValue: "",
  },
};

export const InputField_Date: Story = {
  name: "Date",
  args: {
    type: "date",
    placeholder: "I am special date",
    modelValue: "2024-08-15",
  },
};

export const InputField_Custom: Story = {
  name: "Custom",
  render: (args: any) => ({
    components: { InputField },
    setup() {
      const model = ref(args.modelValue);

      // Optional: Keeps v-model in sync with storybook args
      watch(
        () => args.modelValue,
        (val) => {
          model.value = val;
        },
      );

      return { args, model };
    },
    template: '<InputField v-bind="args" v-model="model" />',
  }),
  args: {
    type: "text",
    title: "This is default placeholder",
    modelValue: "I am custom value!",
  },
};
