import { INTERNAL_ROOT_URL } from '@/config/config';
import { NextRequest, NextResponse } from 'next/server';

// Fetch user using the Ghost Admin cookie

async function fetchGhostUser(cookie: string) {
  const response = await fetch(`${INTERNAL_ROOT_URL}/ghost/api/admin/users/me/`, {
    headers: {
      Cookie: cookie,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unauthorized');
  }

  const data = await response.json();
  return data.users[0];
}


export const ensureAuthenticated = async (request: NextRequest) => {
  console.log('Auth check for', request.url);
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    console.log('Not authenticated');
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  let user;
  try {
    user = await fetchGhostUser(cookie);
  } catch (authError) {
    console.log('Invalid session');
    console.log(authError);
    return NextResponse.json(
      { error: 'Invalid or expired session' },
      { status: 401 }
    );
  }
};
