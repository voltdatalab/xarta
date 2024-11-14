"use client";

import { ROOT_URL } from "@/config/config";

// API function to fetch user data

export async function fetchGhostUser() {
    const response = await fetch(`${ROOT_URL}/ghost/api/admin/users/me/`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    const data = await response.json();
    return data.users[0]; // Assuming response.users[0] is the logged-in user
}
