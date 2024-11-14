import { NextResponse } from 'next/server';
import { callGhostAdminAPI } from '../lib/callGhostAdminAPI';

// GET request to fetch current code injection settings
export async function GET() {
  try {
    // Fetch the settings from the Ghost Admin API
    const settings = (await callGhostAdminAPI('settings/'))?.settings || [];

    // Extract the code injection settings

    const codeinjection_head = settings.find((i: any) => i.key === 'codeinjection_head')?.value || '';
    const codeinjection_foot = settings.find((i: any) => i.key === 'codeinjection_foot')?.value || '';
    
    // Return the code injection settings as JSON
    return NextResponse.json({ codeinjection_head, codeinjection_foot });
  } catch (error) {
    console.error('Error fetching code injection settings:', error);
    return NextResponse.json({ error: 'Failed to fetch code injection settings' }, { status: 500 });
  }
}

export const revalidate = 0;
