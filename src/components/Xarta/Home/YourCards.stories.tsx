import { Meta, StoryObj } from "@storybook/react";
import { YourCards } from "./YourCards";
import { postsExample } from "./postsExample";

const meta = {
    component: YourCards,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof YourCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {

}

export const WithName: Story = {
    args: {
        posts: postsExample
    }
}