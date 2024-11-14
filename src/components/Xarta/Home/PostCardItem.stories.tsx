import { Meta, StoryObj } from "@storybook/react";
import { PostCardItem } from "./PostCardItem";
import { postsExample } from "./postsExample";
import { fn } from '@storybook/test';

const meta = {
    component: PostCardItem,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PostCardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostExample: Story = {
    args: {
        post: postsExample[0],
        onClick: fn(),
        onEdit: fn()
    }
}