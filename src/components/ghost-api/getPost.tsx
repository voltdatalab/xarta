"use client";
import { PUBLIC_NEXT_API_BASE_URL } from "@/config/config";
import { GhostPost } from "../types/GhostPost";


export async function getPost(id: GhostPost["id"]) {
    const response = await fetch(`${PUBLIC_NEXT_API_BASE_URL}/get-post/?id=${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the post');
    }
    return response.json();
}
