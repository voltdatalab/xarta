import { xartaCardContainerPrefix } from "@/config/config";
import { getXartaConfig } from "@/config/getConfig";
import { NextResponse } from 'next/server';

// This function only accepts letters and numbers
function sanitizeString(input: string) {
    return input.replace(/[^a-zA-Z0-9]/g, '');
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    const {XARTA_DOMAIN} = await getXartaConfig();

    const scriptContent = `
    (function() {
        function detectHostTheme() {
            var root = document.documentElement;
            var declaredTheme = root.getAttribute('data-color-scheme') || root.getAttribute('data-theme');

            if (declaredTheme === 'dark' || declaredTheme === 'light') {
                return declaredTheme;
            }

            if (root.classList.contains('dark')) {
                return 'dark';
            }

            var computedColorScheme = window.getComputedStyle(root).colorScheme.trim();
            if (computedColorScheme === 'dark') {
                return 'dark';
            }

            if (computedColorScheme === 'light') {
                return 'light';
            }

            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        function createIframe(postId) {
            var iframe = document.createElement('iframe');
            var embedUrl = new URL('${XARTA_DOMAIN}xarta/embed/' + postId);
            var theme = detectHostTheme();
            embedUrl.searchParams.set('theme', theme);
            iframe.src = embedUrl.toString();
            iframe.style.width = '100%';
            iframe.style.border = 'none';
            iframe.style.colorScheme = theme;
            iframe.id = 'embedded-post-' + postId;
            iframe.title = 'Xarta card';

            // Append iframe to the container div
            var container = document.getElementById('${xartaCardContainerPrefix}' + postId);
            if (!container) return;
            container.appendChild(iframe);

            var disposed = false;
            var themeObserver;
            var lifecycleObserver;
            var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            function cleanup() {
                if (disposed) return;
                disposed = true;

                window.removeEventListener('message', handleIframeMessage);
                if (themeObserver) themeObserver.disconnect();
                if (lifecycleObserver) lifecycleObserver.disconnect();

                if (colorSchemeQuery.removeEventListener) {
                    colorSchemeQuery.removeEventListener('change', sendTheme);
                } else if (colorSchemeQuery.removeListener) {
                    colorSchemeQuery.removeListener(sendTheme);
                }
            }

            function sendTheme() {
                if (!iframe.isConnected) {
                    cleanup();
                    return;
                }

                var nextTheme = detectHostTheme();
                if (nextTheme === theme && iframe.dataset.xartaThemeSent === nextTheme) return;

                theme = nextTheme;
                iframe.style.colorScheme = theme;
                iframe.dataset.xartaThemeSent = theme;

                if (iframe.contentWindow) {
                    iframe.contentWindow.postMessage({
                        type: 'xarta:set-theme',
                        postId: postId,
                        theme: theme
                    }, embedUrl.origin);
                }
            }

            // Listen for messages from the iframe to adjust the height
            function handleIframeMessage(event) {
                if (event.origin !== embedUrl.origin || event.source !== iframe.contentWindow) return;

                if (event.data && event.data.postId === postId && event.data.height) {
                    // TODO: Verify, add 2px to height to avoid border bugs
                    iframe.style.height = (event.data.height + 2) + 'px';
                }
            }
            window.addEventListener('message', handleIframeMessage);

            // Send the current theme and request the initial height.
            iframe.onload = function() {
                iframe.dataset.xartaThemeSent = '';
                sendTheme();
                iframe.contentWindow.postMessage({ action: 'requestHeight', postId: postId }, embedUrl.origin);
            };

            themeObserver = new MutationObserver(sendTheme);
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-color-scheme', 'data-theme', 'style']
            });

            lifecycleObserver = new MutationObserver(function() {
                if (!iframe.isConnected) cleanup();
            });
            lifecycleObserver.observe(document.documentElement, {
                childList: true,
                subtree: true
            });

            if (colorSchemeQuery.addEventListener) {
                colorSchemeQuery.addEventListener('change', sendTheme);
            } else if (colorSchemeQuery.addListener) {
                colorSchemeQuery.addListener(sendTheme);
            }
        }

        createIframe("${sanitizeString(params.id)}");
    })();
    `;

    return new NextResponse(scriptContent, {
        headers: {
            'Content-Type': 'application/javascript',
        },
    });
}
