"use client";
import { CommonEmbedProps, EmbeddedClient } from "@/app/embed/[id]/EmbeddedClient";
import { useState, useEffect } from "react";
import { ConfigPublicRootUrl, fetchPost } from "../ghost-api/admin/fetchPost";
import { GhostPost } from "../types/GhostPost";
import { useTranslations } from "next-intl";


export const RetryFetchPostEmbed = (
    { postId, settings, globalCodeInjection, locale, config }: 
    CommonEmbedProps & {locale: string} & {config: ConfigPublicRootUrl}) => {

    const t = useTranslations('strings');


    const [post, setPost] = useState<GhostPost | null>(null);

    useEffect(() => {
        if (!postId) return;

        console.log('postId', postId);

        fetchPost(postId, config).then(postResponse => {
            const post = postResponse.posts[0];
            if (post) {
                setPost(post);
            }
        });

    }, [postId]);

    return <>{post ? <EmbeddedClient config={config} post={post} postId={postId} settings={settings} globalCodeInjection={globalCodeInjection} locale={locale} /> : t('LOADING_DRAFT_TEXT')}</>;
};
