"use client";

import { XartaConfig } from "@/config/XartaConfig";

export type ConfigGhostApiTagsUrl = Pick<XartaConfig, "ghostApiTagsUrl">;

export async function fetchTags({config}: {config: ConfigGhostApiTagsUrl}) {
    const response = await fetch(config.ghostApiTagsUrl, {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch tags');
    }
    return response.json();
}
