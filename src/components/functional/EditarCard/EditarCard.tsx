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
import { useTranslations } from "next-intl";


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
    setCodeInjectionFoot,
}: EditarCardProps & SetFeatured) {

    const t = useTranslations('strings');

    const router = useRouter();

    const [codeInjectionTab, setCodeInjectionTab] = useState<'head' | 'foot'>('head');
    const [currentAction, setCurrentAction] = useState<ActionType>(null);

    return (
        <div className={mainFlexContainer}>
            <TituloPagina title={`${mode === 'create' ? t('CREATE_XARTA_TEXT') : t('EDIT_XARTA_TEXT')}`} onBack={() => router.back()} />
            <div className="gap-y-4 grid tablet:grid-cols-2 tablet:gap-x-5">
                <LabeledInput
                    required={true}
                    id="titulo"
                    label={<>{t('XARTA_TITLE_TEXT')} <span className="font-light">({t('MANDATORY_TEXT')}*)</span></>}
                    placeholder={t('XARTA_TITLE_TEXT')}
                    value={post.title}
                    onChange={setTitle}
                />
                <LabeledInput
                    id="subtitulo"
                    label={<>{t('XARTA_EXCERPT_TEXT')} <span className="font-light">({t('OPTIONAL_TEXT')})</span></>}
                    placeholder={t('XARTA_EXCERPT_TEXT')}
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
                    label={<>{t('INFORMATION_SOURCES_TEXT')} <span className="font-light">({t('INFORMATION_SOURCES_EXPLANATION')}, {t('OPTIONAL_TEXT')})</span></>}
                    placeholder=""
                    value={post.meta_description || ''}
                    onChange={setMetaDescription}
                />
                <ContentEditor
                    required={true}
                    id="contexto"
                    label={<>{t('WRITE_CONTEXT_TEXT')} <span className="font-light">({t('MANDATORY_TEXT')}*)</span></>}
                    htmlContent={post.html}
                    setHtmlContent={setHtmlContent}
                />

                <div className="space-y-2">
                    <Label htmlFor={'htmlCustomization'}>{t('HTML_CUSTOMIZATION_TEXT')} <span className="font-light">({t('OPTIONAL_TEXT')})</span></Label>
                    <div>
                        <div className="flex space-x-1">
                            <button
                                className={`text-xs py-2 px-4 ${codeInjectionTab === 'head' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                onClick={() => setCodeInjectionTab('head')}
                            >
                                {t('HEADER_BUTTON_TEXT')}
                            </button>
                            <button
                                className={`text-xs py-2 px-4 ${codeInjectionTab === 'foot' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                                onClick={() => setCodeInjectionTab('foot')}
                            >
                                {t('FOOTER_BUTTON_TEXT')}
                            </button>
                        </div>

                        {codeInjectionTab === 'head' ? (
                            <Textarea
                                id={"injection"}
                                className="bg-[#EEEDF2] border-0 text-[#3D3D3D] mt-2 min-h-[240px] focus:ring-[#4B31DD]"
                                placeholder={t.raw('CODE_INJECTION_TEXTAREA_PLACEHOLDER')}
                                value={post.codeinjection_head ?? ''}
                                onChange={(e) => setCodeInjectionHead(e.target.value)}
                            />
                        ) : (
                            <Textarea
                                id={"injection"}
                                className="bg-[#EEEDF2] border-0 text-[#3D3D3D] mt-2 min-h-[240px] focus:ring-[#4B31DD]"
                                placeholder={t.raw('CODE_INJECTION_TEXTAREA_PLACEHOLDER')}
                                value={post.codeinjection_foot ?? ''}
                                onChange={(e) => setCodeInjectionFoot(e.target.value)}
                            />
                        )}

                    </div>

                    <div className="mt-5 text-[14px] ">
                        <span className="font-semibold">{t('TIP_TEXT')}:</span> {t.rich('GLOBAL_TEMPLATE_TIP', {
                            link: (chunks) => <Link target="_blank" href={CONFIGURACOES}>
                                <span className="text-[#4B31DD] font-semibold">{chunks}</span>
                            </Link>,
                            b: (chunks) => <span className="font-semibold">{chunks}</span>
                        })}
                    </div>

                </div>
            </div>

            <Toaster />

            <PublicarCard id={post.id} mode={mode} post={post} checked={post.featured} onChange={setFeatured} currentAction={currentAction} setCurrentAction={setCurrentAction} />

        </div>
    );
}