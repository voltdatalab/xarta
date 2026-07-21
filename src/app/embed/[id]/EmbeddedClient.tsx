"use client";

import { EmbeddedCard } from "@/components/functional/EmbeddedCard/EmbeddedCard";
import { GhostPost } from "@/components/types/GhostPost";
import { useEffect, useState } from "react";
import { Settings, CodeInjection } from "./Settings";
import { ConfigPublicRootUrl } from "@/components/ghost-api/admin/fetchPost";

export type CommonEmbedProps = {
    postId: string, 
    settings: Settings, 
    globalCodeInjection: CodeInjection,
    initialTheme: EmbedTheme
}

export type EmbedTheme = 'light' | 'dark';

export function EmbeddedClient(
    { post, postId, settings, globalCodeInjection, locale, config, initialTheme }:
    { post: GhostPost; locale: string } & CommonEmbedProps & {config: ConfigPublicRootUrl}) {
    const [theme, setTheme] = useState<EmbedTheme>(initialTheme);

    useEffect(() => {
        document.documentElement.style.colorScheme = theme;
        document.body.style.background = 'transparent';

        const postHeight = () => {
            const container = document.getElementById('embedded-post-container');
            if (!container) return;

            window.parent.postMessage(
                { postId, height: container.getBoundingClientRect().height },
                '*'
            );
        };

        const handleParentMessage = (event: MessageEvent) => {
            if (event.source !== window.parent || !event.data) return;

            if (
                event.data.type === 'xarta:set-theme' &&
                event.data.postId === postId &&
                (event.data.theme === 'light' || event.data.theme === 'dark')
            ) {
                setTheme(event.data.theme);
            }

            if (event.data.action === 'requestHeight' && event.data.postId === postId) {
                postHeight();
            }
        };

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

        window.addEventListener('message', handleParentMessage);
        const initialHeightFrame = window.requestAnimationFrame(postHeight);

        // Cleanup observer on component unmount
        return () => {
            window.cancelAnimationFrame(initialHeightFrame);
            resizeObserver.disconnect();
            window.removeEventListener('message', handleParentMessage);
        };
    }, [postId, post, theme]);

    return (
        <div id="embedded-post-container" className="xarta-embed" data-color-scheme={theme}>
            <EmbeddedCard 
                config={config}
                post={post} settings={settings} globalCodeInjection={globalCodeInjection} locale={locale} />
        </div>
    );
}
