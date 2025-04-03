"use client";

import { useQuery } from "@tanstack/react-query";
import { EditarCardProps } from "../functional/EditarCard/EditarCardProps";
import { fetchTags } from '../ghost-api/admin/fetchTags';
import { PostEditorContainer } from "../functional/EditarCard/PostEditorContainer";
import { useTranslations } from "next-intl";



export function WrapCreateCard() {

    const t = useTranslations('strings');


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

    if (tagsError) return <div>{t('ERROR_FETCHING_TAGS')}: {tagsError.message}</div>;
    if (!tagsData || !tagsData.tags.length) return <div>{/*No tags data available*/}</div>;

    return <PostEditorContainer mode="create" post={post} tags={tagsData.tags} />;
}