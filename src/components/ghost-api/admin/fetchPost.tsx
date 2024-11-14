"use client";

import { ROOT_URL } from "@/config/config";

export const ghostAdminPostUrl = (id: string) => `${ROOT_URL}/ghost/api/admin/posts/${id}?include=authors,tags&formats=html`


export async function fetchPost(id: string) {
    const response = await fetch(ghostAdminPostUrl(id), {
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
