import { useRouter } from "next/navigation";
import PublicarCard from "../../Xarta/PublicarCard";
import { TituloPagina } from "../../Xarta/TituloPagina";
import TagSelector from "./TagSelector";
import { LabeledInput } from "./LabeledInput";
import { ContentEditor } from "./ContentEditor";
import { EditarCardProps } from "./EditarCardProps";
import { mainFlexContainer } from "@/components/Xarta/Home/mainFlexContainer";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { CONFIGURACOES } from "@/config/config";
import { Toaster } from "@/components/ui/toaster";
import { GhostTag } from "@/components/types/GhostTag";

export type SetFeatured = {
    setFeatured?: (v: boolean) => void;
};

export type ActionType = 'erase' | 'update' | 'create' | 'unpublish' | 'save' | 'publish' | null;

export function EditarCard({
    mode,
    post,
    tags = [],
    setTags,
    setTitle,
    setCustomExcerpt,
    setMetaDescription,
    setHtmlContent,
    setSelectedTags,
    setFeatured,
    setCodeInjectionHead,
    setCodeInjectionFoot
}: EditarCardProps & SetFeatured) {
    const router = useRouter();

    const [codeInjectionTab, setCodeInjectionTab] = useState<'head' | 'foot'>('head');
    const [currentAction, setCurrentAction] = useState<ActionType>(null);

    return (
        <div className={mainFlexContainer}>
            <TituloPagina title={`${mode === 'create' ? "Criar" : "Editar"} Xarta`} onBack={() => router.back()} />
            <div className="gap-y-4 grid tablet:grid-cols-2 tablet:gap-x-5">
                <LabeledInput
                    required={true}
                    id="titulo"
                    label={<>Título do Xarta <span className="font-light">(obrigatório*)</span></>}
                    placeholder="Título do Xarta"
                    value={post.title}
                    onChange={setTitle}
                />
                <LabeledInput
                    id="subtitulo"
                    label={<>Subtítulo do Xarta <span className="font-light">(opcional)</span></>}
                    placeholder="Subtítulo do Xarta"
                    value={post.custom_excerpt}
                    onChange={setCustomExcerpt}
                    maxLength={300}
                />
                <div className="space-y-2">
                    <TagSelector tags={tags} selectedTags={post.tags} onChange={setSelectedTags} onCreate={(e) => {
                        const newTagObject = {name: e};
                        // TODO: Remove typecasts below
                        setTags?.([
                            ...tags,
                            newTagObject
                        ] as GhostTag[]);
                        setSelectedTags([
                            ...(post.tags),
                            newTagObject
                        ] as GhostTag[]);
                    }}
                    />
                </div>
                <LabeledInput
                    id="fontes"
                    label={<>Fontes de informação <span className="font-light">(de onde vieram as informações deste Xarta, opcional)</span></>}
                    placeholder=""
                    value={post.meta_description || ''}
                    onChange={setMetaDescription}
                />
                <ContentEditor
                    required={true}
                    id="contexto"
                    label={<>Escreva abaixo o seu texto de contexto <span className="font-light">(obrigatório*)</span></>}
                    htmlContent={post.html}
                    setHtmlContent={setHtmlContent}
                />

                <div className="space-y-2">
                    <Label htmlFor={'htmlCustomization'}>Customização HTML <span className="font-light">(opcional)</span></Label>
                    <div>
                        <div className="flex space-x-1">
                            <button
                                className={`text-xs py-2 px-4 ${codeInjectionTab === 'head' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                onClick={() => setCodeInjectionTab('head')}
                            >
                                Header
                            </button>
                            <button
                                className={`text-xs py-2 px-4 ${codeInjectionTab === 'foot' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                onClick={() => setCodeInjectionTab('foot')}
                            >
                                Footer
                            </button>
                        </div>

                        {codeInjectionTab === 'head' ? (
                            <Textarea
                                id={"injection"}
                                className="bg-[#EEEDF2] border-0 text-[#3D3D3D] mt-2 min-h-[240px] focus:ring-[#4B31DD]"
                                placeholder="Inclua tags <style> ou <scripts> para customizar o seu Xarta"
                                value={post.codeinjection_head ?? ''}
                                onChange={(e) => setCodeInjectionHead(e.target.value)}
                            />
                        ) : (
                            <Textarea
                                id={"injection"}
                                className="bg-[#EEEDF2] border-0 text-[#3D3D3D] mt-2 min-h-[240px] focus:ring-[#4B31DD]"
                                placeholder="Inclua tags <style> ou <scripts> para customizar o seu Xarta"
                                value={post.codeinjection_foot ?? ''}
                                onChange={(e) => setCodeInjectionFoot(e.target.value)}
                            />
                        )}

                    </div>

                    <div className="mt-5 text-[14px] ">
                        <span className="font-semibold">Dica:</span> para aplicar um template global com <span className="font-semibold">customização </span> de HTML, acesse a página de <Link target="_blank" href={CONFIGURACOES}><span className="text-[#4B31DD] font-semibold">configurações.</span></Link></div>

                </div>
            </div>

            <Toaster />

            <PublicarCard id={post.id} mode={mode} post={post} checked={post.featured} onChange={setFeatured} currentAction={currentAction} setCurrentAction={setCurrentAction} />


        </div>
    );
}