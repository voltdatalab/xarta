import { Meta, StoryObj } from "@storybook/react";
import { postsExample } from "@/components/Xarta/Home/postsExample";
import { PostEditorContainer } from "./PostEditorContainer";
import { tagsExample } from "./tagsExample";

const meta = {
    component: PostEditorContainer,
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
} satisfies Meta<typeof PostEditorContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyValues: Story = {
    args: {
        post: postsExample[0],
        tags: tagsExample,
        mode: 'edit',
        config: {
            PUBLIC_GHOST_TAGS_PANEL_URL: '',
            PUBLIC_ROOT_URL: '',
            PUBLIC_DEMO_USERNAME: undefined
        }
    }
}