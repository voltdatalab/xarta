import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const locale = params.locale;
  console.log('Get translation with locale', locale);

  try {
    // Try to get translations from the database
    const result = await db.query(
      'SELECT translations FROM translations WHERE locale = $1',
      [locale]
    );

    // If translations exist in the database, return them
    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0].translations);
    }

    // If not in database, try to get from file system as fallback
    try {
        const translations = (await import(`../../../../../messages/${locale}.json`)).default;
        return NextResponse.json(translations);

    } catch (fileError) {
      console.error(`Error reading translation file for ${locale}:`, fileError);
    }

    // If locale not found in database or file system, return 404
    return NextResponse.json(
      { error: `Translations for locale '${locale}' not found` },
      { status: 404 }
    );
  } catch (error) {
    console.error(`Error fetching translations for ${locale}:`, error);

    return NextResponse.json(
      { error: 'Failed to fetch translations' },
      { status: 500 }
    );
  }
}
