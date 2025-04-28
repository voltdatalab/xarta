import { GhostPost } from "../types/GhostPost";
import { ConfigPublicRootUrl } from "./admin/fetchPost";

export async function getPosts(params: string = '', {config}: {config: ConfigPublicRootUrl}) {
  try {

    // Prepare the request to Ghost's Admin API
    const ghostApiUrl = (params: string = '') => `${config.PUBLIC_ROOT_URL}/ghost/api/admin/posts/?limit=all&formats=html${params}`;

    const ghostResponse = await fetch(ghostApiUrl(params), {
      method: 'GET',
      // Pass cookies for authentication
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Handle Ghost API response
    if (!ghostResponse.ok) {
      const errorDetails = await ghostResponse.json();
      throw new Error(`Failed to get posts: ${errorDetails?.errors[0]?.message}`);
    }

    const postResponse = await ghostResponse.json();

    // Respond with the created post data
    return postResponse as {
      posts: GhostPost[]
    };

  } catch (error) {
    console.error('Error getting posts:', error);
    throw new Error('Failed to get posts');
  }
}
