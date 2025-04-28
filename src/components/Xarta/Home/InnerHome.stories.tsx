import { Meta, StoryObj } from "@storybook/react";
import { InnerHome } from "./InnerHome";
import { postsExample } from "./postsExample";
import { fn } from '@storybook/test';

const meta = {
    component: InnerHome,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
        // See: https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof InnerHome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PostExample: Story = {
    args: {
        posts: postsExample,
        isLoading: false,
        isSuccess: true,
        error: null,
        tags: [],
        selectedTags: [],
        setTitleParam: () => { },
        setStatusParam: () => { },
        setSelectedTags: () => { },
        config: {
            PUBLIC_GHOST_TAGS_PANEL_URL: '',
            PUBLIC_DEMO_USERNAME: '',
            PUBLIC_DEMO_PASSWORD: ''
        }
    }
}