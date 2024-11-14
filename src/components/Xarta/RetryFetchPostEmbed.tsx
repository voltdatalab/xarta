"use client";
import { CommonEmbedProps, EmbeddedClient } from "@/app/embed/[id]/EmbeddedClient";
import { useState, useEffect } from "react";
import { fetchPost } from "../ghost-api/admin/fetchPost";
import { GhostPost } from "../types/GhostPost";



export const RetryFetchPostEmbed = ({ postId, settings, globalCodeInjection }: CommonEmbedProps) => {

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

    return <>{post ? <EmbeddedClient post={post} postId={postId} settings={settings} globalCodeInjection={globalCodeInjection} /> : "Carregando rascunho"}</>;
};
