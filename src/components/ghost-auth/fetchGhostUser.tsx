"use client";

import { ConfigPublicRootUrl } from "../ghost-api/admin/fetchPost";

// API function to fetch user data

export async function fetchGhostUser({config}: {config: ConfigPublicRootUrl}) {
    const response = await fetch(`${config.PUBLIC_ROOT_URL}/ghost/api/admin/users/me/`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data.users[0]; // Assuming response.users[0] is the logged-in user
}
