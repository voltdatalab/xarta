import { GhostPost } from "@/components/types/GhostPost";
import { INTERNAL_NEXT_API_BASE_URL } from "@/config/config";
import { notFound } from "next/navigation";
import { VisualizarCardInner } from "./VisualizarCard";
import { RetryFetchPostPage } from "./RetryFetchPostPage";

export default async function WrapperVisualizarCard({ id }: { id: string }) {
    // Fetch post data on the server
    const res = await fetch(`${INTERNAL_NEXT_API_BASE_URL}/get-post/?id=${id}`, {
        cache: 'no-store'
    });

    let data: any;

    if (!res.ok) {
        data = null;
    }

    else {
        data = await res.json();
    }

    if (!data?.posts?.length) {
        data = null;
    }

    const post: GhostPost | null = data ? data.posts[0] : null;

    return (
        post ? <VisualizarCardInner postId={post.id} post={post} postStatus="published" /> : <RetryFetchPostPage id={id} />
    );
}
