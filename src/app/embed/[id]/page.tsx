import { EmbeddedClient } from "./EmbeddedClient";
import { GhostPost } from "@/components/types/GhostPost";
import { RetryFetchPostEmbed } from "@/components/Xarta/RetryFetchPostEmbed";
import { INTERNAL_NEXT_API_BASE_URL } from "@/config/config";
import { getXartaConfig } from "@/config/getConfig";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type EmbedTheme = 'light' | 'dark';

function normalizeTheme(theme?: string): EmbedTheme {
    return theme === 'dark' ? 'dark' : 'light';
}

export default async function EmbeddedPage({ params, searchParams }: {
    params: { id: string },
    searchParams?: { theme?: string }
}) {

    const config = await getXartaConfig();

    const res = await fetch(`${INTERNAL_NEXT_API_BASE_URL}/get-post/?id=${params.id}`, {
        cache: 'no-store'
    });

    let data: any;

    if (!res.ok) {
        data = null;
    }

    else {
        data = await res.json();
    }

    if (!data?.posts?.length) {
        data = null;
    }

    const post: GhostPost | null = data ? data.posts[0] : null;

    const resSettings = await fetch(`${INTERNAL_NEXT_API_BASE_URL}/get-settings`, {
        cache: 'no-store'
    });
    if (!resSettings.ok) {
        return notFound();
    }

    const settingsData = await resSettings.json();
    
    
    const resCodeInjection = await fetch(`${INTERNAL_NEXT_API_BASE_URL}/code-injection`, {
        cache: 'no-store'
    });
    if (!resCodeInjection.ok) {
        return notFound();
    }

    const codeInjectionData = await resCodeInjection.json();

    const locale = await getLocale();
    const initialTheme = normalizeTheme(searchParams?.theme);

    return (
        post ? <EmbeddedClient config={config} locale={locale} post={post} postId={params.id} settings={settingsData} globalCodeInjection={codeInjectionData} initialTheme={initialTheme} /> :
        <RetryFetchPostEmbed config={config} locale={locale} postId={params.id} settings={settingsData} globalCodeInjection={codeInjectionData} initialTheme={initialTheme} />
    );
}