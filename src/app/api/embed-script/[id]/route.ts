import { XARTA_DOMAIN, xartaCardContainerPrefix } from "@/config/config";
import { NextResponse } from 'next/server';

// This function only accepts letters and numbers
function sanitizeString(input: string) {
    return input.replace(/[^a-zA-Z0-9]/g, '');
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

 
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
                    iframe.style.height = event.data.height + 'px';
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
