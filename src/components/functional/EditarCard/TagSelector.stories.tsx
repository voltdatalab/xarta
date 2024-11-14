import { Meta, StoryObj } from "@storybook/react";
import { TagSelector } from "./TagSelector";
import { action } from '@storybook/addon-actions';
import { tagsExample } from "./tagsExample";
import { selectedTags } from "./selectedTags";

const meta = {
    component: TagSelector,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof TagSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyValues: Story = {
    args: {
        selectedTags: [],
        tags: []
    }
}


export const SomeValues: Story = {
    args: {
        selectedTags,
        tags: tagsExample,
        onChange:  action('onChange')
    }
}