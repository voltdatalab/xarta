import { GhostAuthor } from "./GhostAuthor";
import { GhostTag } from "./GhostTag";

export interface GhostPost {
    slug: string;
    id: string;
    uuid: string;
    title: string;
    html: string;
    comment_id: string;
    feature_image: string;

    featured: boolean;

    created_at: string;
    updated_at: string;
    published_at: string;
    custom_excerpt: string;

    codeinjection_head: string | null;
    codeinjection_foot: string | null;

    authors: GhostAuthor[];
    tags: GhostTag[];
    primary_author: GhostAuthor;
    primary_tag: GhostTag | null;

    url: string;
    excerpt: string;

    visibility: 'public' | 'private';
    reading_time: number;
    status: 'published' | 'draft';
    og_image: null | string,
    og_title: null | string,
    og_description: null | string,
    twitter_image: null | string,
    twitter_title: null | string,
    twitter_description: null | string,
    custom_template: null | string,
    canonical_url: null | string,
    meta_title: null | string,
    meta_description: null | string,
    feature_image_alt: null | string,
    feature_image_caption: null | string,        
}