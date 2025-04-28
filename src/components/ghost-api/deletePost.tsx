import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { ConfigPublicRootUrl } from "./admin/fetchPost";


export async function deletePost(id: EditarCardProps["post"]["id"], {config}: {config: ConfigPublicRootUrl}) {
  try {

    // Prepare the request to Ghost's Admin API
    const ghostApiUrl = `${config.PUBLIC_ROOT_URL}/ghost/api/admin/posts/${id}`;

    const ghostResponse = await fetch(ghostApiUrl, {
      method: 'DELETE',
      // Pass cookies for authentication
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle Ghost API response
    if (!ghostResponse.ok) {
      const errorDetails = await ghostResponse.json();
      throw new Error(`Failed to delete post: ${errorDetails?.errors[0]?.message}`);
    }

    return true;

  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to delete post');
  }
}
