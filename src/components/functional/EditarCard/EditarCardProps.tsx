import { GhostPost } from "@/components/types/GhostPost";
import { GhostTag } from "@/components/types/GhostTag";


export type EditarCardProps = {
    mode: 'create' | 'edit'
    post: Pick<GhostPost, "title" | "custom_excerpt" | "tags" | "meta_description" | "html" | "featured" | "codeinjection_head" | "codeinjection_foot"> & { id?: GhostPost["id"]; status?: GhostPost["status"]};
    tags: GhostTag[];
    setTags?: (tags: GhostTag[]) => void;
    setTitle: (title: string) => void;
    setCustomExcerpt: (custom_excerpt: string) => void;
    setMetaDescription: (meta_description: string) => void;
    setHtmlContent: (html: string) => void;
    setSelectedTags: (tags: GhostTag[]) => void;
    setCodeInjectionHead: (code: string) => void;
    setCodeInjectionFoot: (code: string) => void;
};
