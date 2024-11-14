export interface GhostTiers {
    "tiers": Array<{
        "id": string,
        "name": string,
        "description": null | string,
        "slug": string,
        "active": boolean
        "type": string,
        "welcome_page_url": null | string,
        "created_at": string,
        "updated_at": string,

        "stripe_prices": null | any [],
        "benefits": null | any [],
        "visibility": string,
    }>
}
