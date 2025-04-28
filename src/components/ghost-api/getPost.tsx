"use client";
import { GhostPost } from "../types/GhostPost";
import { XartaConfig } from "@/config/XartaConfig";

export type ConfigPublicNextApiBaseUrl = Pick<XartaConfig, "PUBLIC_NEXT_API_BASE_URL">;

export async function getPost(id: GhostPost["id"], {config}: {config: ConfigPublicNextApiBaseUrl}) {
    const response = await fetch(`${config.PUBLIC_NEXT_API_BASE_URL}/get-post/?id=${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch the post');
    }
    return response.json();
}
