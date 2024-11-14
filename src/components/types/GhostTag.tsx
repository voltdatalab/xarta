export interface GhostTag {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    feature_image: string | null;
    visibility: 'public' | 'private';
    meta_title: string | null;
    meta_description: string | null;
    url: string;

    "og_image": null | string,
    "og_title": null | string,
    "og_description": null | string,
    "twitter_image": null | string,
    "twitter_title": null | string,
    "twitter_description": null | string,
    "codeinjection_head": null | string,
    "codeinjection_foot": null | string,
    "canonical_url": null | string,
    "accent_color": null | string,
};
