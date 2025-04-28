import { Meta, StoryObj } from "@storybook/react";
import { Welcome } from "./Welcome";

const meta = {
    component: Welcome,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    // tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Welcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
    args: {
        config: {
            PUBLIC_DEMO_USERNAME: '',
            PUBLIC_DEMO_PASSWORD: ''
        }
    }
}

export const WithName: Story = {
    args: {
        name: `Rafael`,
        config: {
            PUBLIC_DEMO_USERNAME: '',
            PUBLIC_DEMO_PASSWORD: ''
        }
    }
}


export const WithOrg: Story = {
    args: {
        org: `Teste LTDA`,
        config: {
            PUBLIC_DEMO_USERNAME: '',
            PUBLIC_DEMO_PASSWORD: ''
        }        
    }
}

export const WithNameAndOrg: Story = {
    args: {
        name: `Rafael`,
        org: `Teste LTDA`,
        config: {
            PUBLIC_DEMO_USERNAME: '',
            PUBLIC_DEMO_PASSWORD: ''
        }        
    }
}