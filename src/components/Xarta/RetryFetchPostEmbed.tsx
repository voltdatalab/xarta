"use client";
import { CommonEmbedProps, EmbeddedClient } from "@/app/embed/[id]/EmbeddedClient";
import { useState, useEffect } from "react";
import { fetchPost } from "../ghost-api/admin/fetchPost";
import { GhostPost } from "../types/GhostPost";
import { useTranslations } from "next-intl";


export const RetryFetchPostEmbed = ({ postId, settings, globalCodeInjection, locale }: CommonEmbedProps & {locale: string}) => {

    const t = useTranslations('strings');


    const [post, setPost] = useState<GhostPost | null>(null);

    useEffect(() => {
        if (!postId) return;

        console.log('postId', postId);

        fetchPost(postId).then(postResponse => {
            const post = postResponse.posts[0];
            if (post) {
                setPost(post);
            }
        });

    }, [postId]);

    return <>{post ? <EmbeddedClient post={post} postId={postId} settings={settings} globalCodeInjection={globalCodeInjection} locale={locale} /> : t('LOADING_DRAFT_TEXT')}</>;
};
