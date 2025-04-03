"use client";

import { useQuery } from '@tanstack/react-query';
import { ROOT_URL } from "@/config/config";
import { PostEditorContainer } from "../functional/EditarCard/PostEditorContainer";
import { Carregando } from './Home/Carregando';
import { getPost } from '../ghost-api/getPost';
import { fetchPost } from '../ghost-api/admin/fetchPost';
import { fetchTags } from '../ghost-api/admin/fetchTags';
import { useTranslations } from 'next-intl';

export const ghostApiTagsUrl = `${ROOT_URL}/ghost/api/admin/tags/?limit=all`

export const useTags = () => useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags, // Query function to fetch tags
});

export default function WrapEditarCard({ id }: { id: string; }) {

    const t = useTranslations('strings');

    const { data: postData, error: postError, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id), // Query function
        enabled: !!id,   // Only run the query if the id exists
    });

    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useTags();

    if (postLoading || tagsLoading) return <Carregando>
        {t('LOADING_XARTA')}
    </Carregando>;
    if (postError) return <div>{t('ERROR_FETCHING_POST')}: {postError.message}</div>;
    if (tagsError) return <div>{t('ERROR_FETCHING_TAGS')}: {tagsError.message}</div>;
 
    if (!postData || !postData.posts.length) return <div>{/* No post data available */}</div>;
    if (!tagsData || !tagsData.tags.length) return <div>{/* No tags data available */}</div>;

    return <PostEditorContainer mode="edit" post={postData.posts[0]} tags={tagsData.tags} />;
}