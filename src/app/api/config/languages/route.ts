import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { ensureAuthenticated } from '../selected-language/ensureAuthenticated';
import { defaultLanguages } from './defaultLanguages';

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

    // Return default languages plus custom languages from database
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
