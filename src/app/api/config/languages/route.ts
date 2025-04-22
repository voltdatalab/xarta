import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {

    let customLanguages = [];

    const result = await db.query(
      'SELECT value FROM config WHERE key = $1',
      ['languages.available']
    );

    if (result.rows.length > 0) {
      customLanguages = result.rows[0].value;
    }

    // Return default languages if not found in database
    const defaultLanguages = [
      { code: 'en', name: 'English' },
      { code: 'pt', name: 'Português' }
    ];

    return NextResponse.json([
      ...defaultLanguages,
      ...customLanguages
    ]);

  } catch (error) {
    console.error('Error fetching available languages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch available languages' },
      { status: 500 }
    );
  }
}
