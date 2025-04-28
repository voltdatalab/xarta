"use client";

import { ReactNode, useEffect, useState } from "react";
import { GhostPost } from "../types/GhostPost";
import { ConfigXartaDomain, VisualizarCardInner } from "./VisualizarCard";
import { ConfigPublicRootUrl, fetchPost } from "../ghost-api/admin/fetchPost";
import { ChildrenProps } from "@/lib/utils";
import { useTranslations } from "next-intl";



export const RetryFetchPostPage = ({ id, config }: { id: GhostPost["id"], config: ConfigPublicRootUrl & ConfigXartaDomain}) => {

    const t = useTranslations('strings');


    const [post, setPost] = useState<GhostPost | null>(null);

    useEffect(() => {
        if (!id) return;

        fetchPost(id, config).then(post => setPost(post));

    }, [id]);

    return <>{ post ? <VisualizarCardInner config={config} postId={id} postStatus={"draft"} post={post} /> : t('LOADING_DRAFT_TEXT') }</>;
};