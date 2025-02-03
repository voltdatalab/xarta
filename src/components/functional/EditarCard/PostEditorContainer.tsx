import { useState } from "react";
import { GhostTag } from "@/components/types/GhostTag";
import {EditarCard } from "./EditarCard";
import { EditarCardProps } from "./EditarCardProps";

export function PostEditorContainer({ post, tags, mode }: { post: EditarCardProps["post"], mode: EditarCardProps['mode'], tags: GhostTag[] }) {
    const [currentPost, setCurrentPost] = useState(post);
    const [currentTags, setCurrentTags] = useState(tags);

    return (
        <EditarCard
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
