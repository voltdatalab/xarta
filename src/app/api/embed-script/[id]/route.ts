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
        function createIframe(postId) {
            var iframe = document.createElement('iframe');
            iframe.src = '${XARTA_DOMAIN}xarta/embed/' + postId;
            iframe.style.width = '100%';
            iframe.style.border = 'none';
            iframe.id = 'embedded-post-' + postId;

            // Append iframe to the container div
            var container = document.getElementById('${xartaCardContainerPrefix}' + postId);
            container.appendChild(iframe);

            // Listen for messages from the iframe to adjust the height
            window.addEventListener('message', function(event) {
                if (event.data.postId === postId && event.data.height) {
                    // TODO: Verify, add 2px to height to avoid border bugs
                    iframe.style.height = (event.data.height + 2) + 'px';
                }
            });

            // Send a message to the iframe to request its height
            iframe.onload = function() {
                iframe.contentWindow.postMessage({ action: 'requestHeight' }, '*');
            };
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
