import { NextResponse } from 'next/server';
import { config } from '@/config/config';

export const revalidate = 0;

export async function GET() {
  try {
    // Build the API request URL to fetch site settings
    const url = `${config.INTERNAL_GHOST_URL}/ghost/api/content/settings/?key=${config.GHOST_CONTENT_API_KEY}`;

    // Fetch the site settings using the native fetch API
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch site settings: ${response.statusText}`);
    }

    // Parse the JSON response
    const {settings} = await response.json();

    // Extract the site title from the settings
    const title = settings.title;
    const logo = settings.logo;

    // Return the site title as JSON
    return NextResponse.json({ title, logo });
  } catch (error) {
    console.error('Error fetching site title:', error);
    return NextResponse.json({ error: 'Failed to fetch site title' }, { status: 500 });
  }
}
