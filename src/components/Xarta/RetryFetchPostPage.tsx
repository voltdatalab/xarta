"use client";

import { ReactNode, useEffect, useState } from "react";
import { GhostPost } from "../types/GhostPost";
import { VisualizarCardInner } from "./VisualizarCard";
import { fetchPost } from "../ghost-api/admin/fetchPost";
import { ChildrenProps } from "@/lib/utils";


export const RetryFetchPostPage = ({ id }: { id: GhostPost["id"]}) => {

    const [post, setPost] = useState<GhostPost | null>(null);

    useEffect(() => {
        if (!id) return;

        fetchPost(id).then(post => setPost(post));

    }, [id]);

    return <>{ post ? <VisualizarCardInner postId={id} postStatus={"draft"} post={post} /> : "Carregando rascunho" }</>;
};