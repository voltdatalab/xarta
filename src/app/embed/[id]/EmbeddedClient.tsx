"use client";

import { EmbeddedCard } from "@/components/functional/EmbeddedCard/EmbeddedCard";
import { GhostPost } from "@/components/types/GhostPost";
import { useEffect } from "react";
import { Settings, CodeInjection } from "./Settings";
import { ConfigPublicRootUrl } from "@/components/ghost-api/admin/fetchPost";

export type CommonEmbedProps = {
    postId: string, 
    settings: Settings, 
    globalCodeInjection: CodeInjection
}

export function EmbeddedClient(
    { post, postId, settings, globalCodeInjection, locale, config }:
    { post: GhostPost; locale: string } & CommonEmbedProps & {config: ConfigPublicRootUrl}) {
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                window.parent.postMessage(
                    { postId, height: entry.contentRect.height },
                    '*'
                );
            }
        });

        const container = document.getElementById('embedded-post-container');
        if (container) {
            resizeObserver.observe(container);
        }

        // Cleanup observer on component unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [postId, post]);

    return (
        <div id="embedded-post-container">
            <EmbeddedCard 
                config={config}
                post={post} settings={settings} globalCodeInjection={globalCodeInjection} locale={locale} />
        </div>
    );
}
