"use client";

import { useQuery } from "@tanstack/react-query";
import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { fetchTags } from '../ghost-api/admin/fetchTags';
import { PostEditorContainer } from "../functional/EditarCard/PostEditorContainer";

export function WrapCreateCard() {

    const post: EditarCardProps["post"] = {
        tags: [],
        title: '',
        custom_excerpt: '',
        meta_description: '',
        featured: false,
        html: '',
        codeinjection_foot: null,
        codeinjection_head: null
    }


    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: fetchTags, // Query function to fetch tags
    });

    if (tagsError) return <div>Error fetching tags: {tagsError.message}</div>;
    if (!tagsData || !tagsData.tags.length) return <div>{/*No tags data available*/}</div>;

    return <PostEditorContainer mode="create" post={post} tags={tagsData.tags} />;
}