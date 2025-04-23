import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ensureAuthenticated } from './ensureAuthenticated';

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

export async function PUT(request: NextRequest) {
  try {

    // TODO: Use middleware pattern
    const failedResponse = await ensureAuthenticated(request);
    if (failedResponse) {
      return failedResponse;
    }

    const body = await request.json();
    const { code } = body;

    // TODO: Validate code

    if (!code) {
      return NextResponse.json(
        { error: 'Language code is required' },
        { status: 400 }
      );
    }

    //Check if the config exists
    const checkResult = await db.query(
      'SELECT id FROM config WHERE key = $1',
      ['languages.selectedLanguage']
    );

    if (checkResult.rows.length === 0) {
      // Insert new config
      await db.query(
        'INSERT INTO config (key, value) VALUES ($1, $2)',
        ['languages.selectedLanguage', { code }]
      );
    } else {
      // Update existing config
      await db.query(
        'UPDATE config SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
        [{ code }, 'languages.selectedLanguage']
      );
    }

    /* TODO: In the future, consider using https://nextjs.org/docs/app/api-reference/functions/revalidatePath#revalidating-all-data */
    revalidatePath('/', 'layout');    

    return NextResponse.json({ success: true, code });
  } catch (error) {
    console.error('Error updating selected language:', error);
    return NextResponse.json(
      { error: 'Failed to update selected language' },
      { status: 500 }
    );
  }
}
