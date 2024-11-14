"use client";
import { ghostApiTagsUrl } from "../../Xarta/WrapEditarCard";


export async function fetchTags() {
    const response = await fetch(ghostApiTagsUrl, {
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
