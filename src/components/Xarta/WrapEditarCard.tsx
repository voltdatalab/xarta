"use client";

import { useQuery } from '@tanstack/react-query';
import { ROOT_URL } from "@/config/config";
import { PostEditorContainer } from "../functional/EditarCard/PostEditorContainer";
import { Carregando } from './Home/Carregando';
import { getPost } from '../ghost-api/getPost';
import { fetchPost } from '../ghost-api/admin/fetchPost';
import { fetchTags } from '../ghost-api/admin/fetchTags';

export const ghostApiTagsUrl = `${ROOT_URL}/ghost/api/admin/tags/?limit=all`

export default function WrapEditarCard({ id }: { id: string; }) {
    const { data: postData, error: postError, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id), // Query function
        enabled: !!id,   // Only run the query if the id exists
    });

    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags, // Query function to fetch tags
    });

    if (postLoading || tagsLoading) return <Carregando>
        Carregando Xarta...
    </Carregando>;
    if (postError) return <div>Error fetching post: {postError.message}</div>;
    if (tagsError) return <div>Error fetching tags: {tagsError.message}</div>;
 
    if (!postData || !postData.posts.length) return <div>{/* No post data available */}</div>;
    if (!tagsData || !tagsData.tags.length) return <div>{/* No tags data available */}</div>;

    return <PostEditorContainer mode="edit" post={postData.posts[0]} tags={tagsData.tags} />;
}