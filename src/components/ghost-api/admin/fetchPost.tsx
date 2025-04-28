"use client";

import { XartaConfig } from "@/config/XartaConfig";

export type ConfigPublicRootUrl = Pick<XartaConfig, "PUBLIC_ROOT_URL">;

export const ghostAdminPostUrl = (id: string, config: ConfigPublicRootUrl) => `${config.PUBLIC_ROOT_URL}/ghost/api/admin/posts/${id}?include=authors,tags&formats=html`


export async function fetchPost(id: string, config: ConfigPublicRootUrl) {
    const response = await fetch(ghostAdminPostUrl(id, config), {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    const result = await response.json();

    console.log(result);

    return result;
}
