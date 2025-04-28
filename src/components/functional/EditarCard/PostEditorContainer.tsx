import { useState } from "react";
import { GhostTag } from "@/components/types/GhostTag";
import {EditarCard } from "./EditarCard";
import { EditarCardProps } from "./EditarCardProps";
import { XartaConfig } from "@/config/XartaConfig";
import { ConfigPublicRootUrl } from "@/components/ghost-api/admin/fetchPost";

export function PostEditorContainer(
    { post, tags, mode, config }: 
    { post: EditarCardProps["post"], mode: EditarCardProps['mode'], tags: GhostTag[] } & {config: Pick<XartaConfig, "PUBLIC_GHOST_TAGS_PANEL_URL"> & ConfigPublicRootUrl}) {
    const [currentPost, setCurrentPost] = useState(post);
    const [currentTags, setCurrentTags] = useState(tags);

    return (
        <EditarCard
            config={config}
            mode={mode}
            post={currentPost}
            tags={currentTags}
            setTags={setCurrentTags}
            setTitle={(title) => setCurrentPost({ ...currentPost, title })}
            setCustomExcerpt={(custom_excerpt) => setCurrentPost({ ...currentPost, custom_excerpt })}
            setMetaDescription={(meta_description) => setCurrentPost({ ...currentPost, meta_description })}
            setHtmlContent={(html) => setCurrentPost({ ...currentPost, html})}
            setSelectedTags={(tags) => setCurrentPost({ ...currentPost, tags})}
            setFeatured={(featured) => setCurrentPost({ ...currentPost, featured})}
            setCodeInjectionHead={(codeinjection_head) => setCurrentPost({ ...currentPost, codeinjection_head})}
            setCodeInjectionFoot={(codeinjection_foot) => setCurrentPost({ ...currentPost, codeinjection_foot})}
        />
    );
}
