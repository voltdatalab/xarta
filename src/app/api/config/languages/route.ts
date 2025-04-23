import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { ensureAuthenticated } from '../selected-language/ensureAuthenticated';

export async function GET(request: NextRequest) {
  try {

   // TODO: Use middleware pattern
   const failedResponse = await ensureAuthenticated(request);
   if (failedResponse) {
     return failedResponse;
   }

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
