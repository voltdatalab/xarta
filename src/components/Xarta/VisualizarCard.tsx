"use client";

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Toaster } from "../ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { TituloPagina } from "./TituloPagina";
import { useRouter } from "next/navigation";
import { GhostPost } from "../types/GhostPost";
import { FilePenIcon } from "./Icons/FilePenIcon";
import { xartaCardContainerPrefix } from "@/config/config";
import { XARTA_DOMAIN } from "@/config/config";
import { mainFlexContainer } from './Home/mainFlexContainer';
import { cn } from '@/lib/utils';
import { buttonTransitionStyles } from './Home/RoundedFullButton';
import { ClipboardCopy } from 'lucide-react';
import { useGhostUser } from '../functional/GhostUserProvider';

export function VisualizarCardInner({ post, postStatus, postId }: { post: GhostPost, postId:GhostPost["id"], postStatus: GhostPost["status"] }) {

    const codeSnippet = `<div id="${xartaCardContainerPrefix}${postId}" style="width:100%; max-width:700px">
</div>
<script src="${XARTA_DOMAIN}xarta/api/embed-script/${postId}">
</script>
`;

    const { toast } = useToast();
    const router = useRouter();
    const divTarget = useRef<HTMLDivElement | null>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);
    const {user} = useGhostUser();

    useEffect(() => {

        let container: HTMLElement | null = null;

        if (!(scriptRef.current)) {
            // Create a new script element
            const script = document.createElement('script');
            script.src = `${XARTA_DOMAIN}xarta/api/embed-script/${postId}`;
            script.async = true;

            scriptRef.current = script;

            // Append the script to the container div
            container = document.getElementById(`${xartaCardContainerPrefix}${postId}`);
            if (container) {
                container.appendChild(script);
            }
        }


        // Cleanup the script if the component is unmounted
        return () => {
            if (container) {
                container.removeChild(scriptRef.current as HTMLScriptElement);
            }
            if (divTarget.current) {
                divTarget.current.innerHTML = '';
            }
        };
    }, [postId]);

    return (
        <div className={cn("flex flex-col items-center py-4 space-y-5", mainFlexContainer)}>
            <Toaster />
            <TituloPagina title={`Visualizar Xarta ${postStatus === 'published' ? "Publicado" : "em Rascunho"}`} onBack={() => router.back()} />
            {/* Embedded card is rendered by the dynamically loaded script */}
            <div className={cn("grid rounded-xl gap-y-5 tablet:p-2 pc:grid-cols-2 pc:gap-x-[16px]")}>
                <div ref={divTarget} className='w-full' id={`${xartaCardContainerPrefix}${postId}`}></div>
                <div className="space-y-5 flex flex-col items-center justify-center">
                    <div className="w-full p-4 bg-black text-white rounded-md max-w-[calc(100vw_-_36px)]">
                        {postStatus === 'published' ? <SyntaxHighlighter language="html" style={irBlack} wrapLines={true} wrapLongLines={true}>
                            {codeSnippet}
                        </SyntaxHighlighter> : <span>Este Xarta está em Rascunho, para obter o código embedável primeiro publique o Xarta.</span>
                        }
                    </div>
                    <div className="flex w-full space-x-4 justify-center">
                        {user ? <Button
                            onClick={() => router.push(`/edit-card/${postId}`)}
                            className={cn("flex-1 bg-black hover:bg-black text-white rounded-full tablet:grow-0", buttonTransitionStyles)}>
                            <FilePenIcon className="w-4 h-4 mr-2" />
                            Editar Xarta
                        </Button> : null }
                        {postStatus === 'published' ?
                            <CopyToClipboard text={codeSnippet} onCopy={() => toast({
                                title: "Código HTML copiado com sucesso ✓",
                                description: "Cole o código em seu site para integrá-lo com o Xarta",
                            })}>
                                <Button className={cn("flex-1 hover:bg-[#6b4eff] text-white rounded-full tablet:grow-0", buttonTransitionStyles,  'bg-[#6b4eff]'
                                )}>
                                    {postStatus === 'published' ? <><ClipboardCopy  className="w-4 h-4 mr-2"  />Copiar código</> : <>Publicar</>}
                                    </Button>
                            </CopyToClipboard>
                        : null
                        }

                    </div>

                    {post.featured ? 
                        <blockquote className="mt-10"><em>O criador desse Xarta permitiu sua reprodução via Licença Creative Commons 4.0. Use o código acima para embedar o código em seu site ou acesse <a className="text-[#4b31dd] underline" href={`${XARTA_DOMAIN}${post.slug}`} target="_blank">esta página</a> para ver o post publicado.</em></blockquote>
                        :
                        null
                    }

                </div>
            </div>
        </div>
    );
}