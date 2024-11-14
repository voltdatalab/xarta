export interface GhostSettings {
    "settings": {
        "title": string,
        "description": string,
        "logo": string,
        "icon": string,
        "accent_color": null | string,
        "cover_image": string,
        "facebook": string,
        "twitter": string,
        "lang": string,
        "timezone": string,
        "codeinjection_head": null | string,
        "codeinjection_foot": null | string,
        "navigation": Array<{
                "label": string,
                "url": string
            }>
        ,
        "secondary_navigation": [],
        "meta_title": null | string,
        "meta_description": null | string,
        "og_image": null | string,
        "og_title": null | string,
        "og_description": null | string,
        "twitter_image": null | string,
        "twitter_title": null | string,
        "twitter_description": null | string,
        "members_support_address": string,
        "url": string,
    }
}
