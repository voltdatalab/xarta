import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const defaultCode = 'en';

  try {
    const result = await db.query(
      'SELECT value FROM config WHERE key = $1',
      ['languages.selectedLanguage']
    );

    if (result.rows.length === 0) {
      // Return default if not found
      return NextResponse.json({ code: defaultCode });
    }

    return NextResponse.json(result.rows[0].value);
  } catch (error) {
    console.error('Error fetching selected language:', error);
    return NextResponse.json(
      { error: 'Failed to fetch selected language' },
      { status: 500 }
    );
  }
}
