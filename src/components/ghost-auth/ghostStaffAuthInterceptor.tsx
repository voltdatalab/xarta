import axios from 'axios';
import { fetchGhostUser } from './fetchGhostUser';

// export const signInRoute = '/ghost/#/signin';
export const signInRoute = '/xarta/login'

export async function ghostStaffAuthInterceptor(config: any) {
    try {
        // Fetch the current Ghost user
        const user = await fetchGhostUser();

        // If user is not logged in, redirect to the Ghost login page
        if (!user) {
            if (typeof window !== 'undefined') {
                // Check if running in a browser environment
                window.location.href = signInRoute; // Redirect to Ghost login screen
            } else {
                throw new Error('User not authenticated');
            }
        }

        // Proceed with the request if the user is authenticated
        return config;
    } catch (error) {
        // If there is an error fetching the user, redirect to the Ghost login screen
        if (typeof window !== 'undefined') {
            window.location.href = signInRoute;
        }
        return Promise.reject(error);
    }
}
