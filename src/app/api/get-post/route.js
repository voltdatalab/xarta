import { NextResponse } from 'next/server';
import { config } from '@/config/config';

export const revalidate = 0;

export async function GET(request) {
  try {
    // Extract the post ID from the request URL
    const url = new URL(request.url);
    const postId = url.searchParams.get('id');

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Prepare the request to Ghost's Admin API
    const ghostApiUrl = `${config.INTERNAL_GHOST_URL}/ghost/api/content/posts/${postId}/?include=tags,authors&formats=html&key=${config.GHOST_CONTENT_API_KEY}`;

    const ghostResponse = await fetch(ghostApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Handle Ghost API response
    if (!ghostResponse.ok) {
      const errorDetails = await ghostResponse.json();
      throw new Error(`Failed to get post: ${errorDetails?.errors[0]?.message}`);
    }

    const postResponse = await ghostResponse.json();

    return NextResponse.json(postResponse);

  } catch (error) {
    console.error('Error fetching post:', error);

    // Handle specific cases like 404 errors
    if (error.response && error.response.status === 404) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
