import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { ConfigPublicRootUrl } from "./admin/fetchPost";

export async function createPost(post: EditarCardProps["post"] & { lexical?: any; }, {config}: {config: ConfigPublicRootUrl}) {
  try {

    // Validate the required fields
    if (!(post.title) || !(post.html)) {
      throw new Error('Title and HTML content are required');
    }

    post.status = post.status || 'draft'; // Default to 'draft' if status is not provided

    // IMPORTANT: "To use HTML as the source for your content instead of Lexical, use the source parameter"
    // See: https://ghost.org/docs/admin-api/#posts
    // We are deleting lexical just to be safe, but the source=html parameter below is mandatory.
    delete post.lexical;

    // Prepare the request to Ghost's Admin API
    const ghostApiUrl = `${config.PUBLIC_ROOT_URL}/ghost/api/admin/posts/?source=html`;

    const ghostResponse = await fetch(ghostApiUrl, {
      method: 'POST',
      // Pass cookies for authentication
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        posts: [
          { ...post }
        ]
      })
    });

    // Handle Ghost API response
    if (!ghostResponse.ok) {
      const errorDetails = await ghostResponse.json();
      throw new Error(`Failed to create post: ${errorDetails?.errors[0]?.message}`);
    }

    const postResponse = await ghostResponse.json();

    // Respond with the created post data
    return postResponse.posts[0];

  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
}
