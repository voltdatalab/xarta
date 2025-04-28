"use client";

import { useQuery } from '@tanstack/react-query';
import { PostEditorContainer } from "../functional/EditarCard/PostEditorContainer";
import { Carregando } from './Home/Carregando';
import { ConfigPublicRootUrl, fetchPost } from '../ghost-api/admin/fetchPost';
import { ConfigGhostApiTagsUrl, fetchTags } from '../ghost-api/admin/fetchTags';
import { useTranslations } from 'next-intl';
import { XartaConfig } from "@/config/XartaConfig";
import { ConfigPublicDemoUsername } from './EditarPerfil';


export const useTags = ({config}: {config: ConfigGhostApiTagsUrl}) => useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTags({config}), // Query function to fetch tags
});

export default function WrapEditarCard(
    { id, config }: { id: string; } & 
    {config: Pick<XartaConfig, "PUBLIC_GHOST_TAGS_PANEL_URL"> & ConfigPublicRootUrl & ConfigGhostApiTagsUrl & ConfigPublicDemoUsername}) {

    const t = useTranslations('strings');

    const { data: postData, error: postError, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id, config), // Query function
        enabled: !!id,   // Only run the query if the id exists
    });

    const { data: tagsData, error: tagsError, isLoading: tagsLoading } = useTags({config});

    if (postLoading || tagsLoading) return <Carregando>
        {t('LOADING_XARTA')}
    </Carregando>;
    if (postError) return <div>{t('ERROR_FETCHING_POST')}: {postError.message}</div>;
    if (tagsError) return <div>{t('ERROR_FETCHING_TAGS')}: {tagsError.message}</div>;
 
    if (!postData || !postData.posts.length) return <div>{/* No post data available */}</div>;
    if (!tagsData || !tagsData.tags.length) return <div>{/* No tags data available */}</div>;

    return <PostEditorContainer config={config} mode="edit" post={postData.posts[0]} tags={tagsData.tags} />;
}