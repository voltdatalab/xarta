import { GhostPost } from "@/components/types/GhostPost";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { DateTime } from "luxon";
import Image from "next/image";
import './card-styles.css';
import XartaLogo from '@/components/Xarta/new_logo_xarta.png';
import { CodeInjection, Settings } from "@/app/embed/[id]/Settings";
import { ROOT_URL } from "@/config/config";
import { useTranslations } from "next-intl";


export function EmbeddedCard({ post, settings, globalCodeInjection, locale }: { post: GhostPost, settings: Settings, globalCodeInjection: CodeInjection, locale: string }) {

    const t = useTranslations('strings');

    // TODO: Use custom date time depending on i18n ?
    const formattedDate = DateTime.fromISO(post.updated_at).setLocale(locale).toLocaleString(DateTime.DATETIME_MED); //.toFormat('dd/MM/yyyy \'às\' HH\'h\'mm');

    return <Card className="w-full border border-black overflow-hidden xarta-card">
        <CardHeader className="text-center xarta-card-styles">
            {globalCodeInjection.codeinjection_head ? <div
                dangerouslySetInnerHTML={{ __html: globalCodeInjection.codeinjection_head }}
            /> : null}
            {post.codeinjection_head ? <div
                dangerouslySetInnerHTML={{ __html: post.codeinjection_head }}
            /> : null}
            <CardTitle className="text-[26px] font-bold xarta-title">{post.title}</CardTitle>
            <CardDescription className="text-[#000000B2] text-[15px] flex flex-col gap-y-4">
                <span className="text-black xarta-excerpt">{post.custom_excerpt}</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 xarta-card-styles xarta-content">
            {/* Note that Sanitization is not strictly necessary here since the content comes from a trusted source */}
            <div dangerouslySetInnerHTML={{ __html: post.html }}>
            </div>
        </CardContent>
        <CardFooter className="bg-[#E7E7E7] text-sm px-6 py-[17px] xarta-footer">
            <div className="w-full flex flex-col card-minimum:flex-row">
                <div className="flex flex-col grow">
                    <p className="">
                        {post.meta_description ? <><span className="font-semibold text-black">{t('SOURCE_TEXT')}:</span> {post.meta_description}</> : null}
                    </p>
                    <p className="mt-2"><span className="font-semibold">{t('CREATED_BY_TEXT')}:</span> {/*post.primary_author.name*/} {settings.title} {" "} {post.featured ? <span>- <a className="text-[#4b31dd] underline" href={`${ROOT_URL}/xarta/view-card/${post.id}`} target="_blank">{t('REPRODUCTION_ALLOWED_TEXT')}
                        <svg className="inline ml-1 align-top" width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M245.8 214.9l-33.2 17.3c-9.4-19.6-25.2-19.9-27.5-19.9-22.1 0-33.2 14.6-33.2 43.8 0 23.6 9.2 43.8 33.2 43.8 14.5 0 24.7-7.1 30.6-21.3l30.6 15.5c-6.2 11.5-25.7 39-65.1 39-22.6 0-74-10.3-74-77.1 0-58.7 43-77.1 72.6-77.1 30.7 0 52.7 12 66 35.9zm143.1 0l-32.8 17.3c-9.5-19.8-25.7-19.9-27.9-19.9-22.1 0-33.2 14.6-33.2 43.8 0 23.6 9.2 43.8 33.2 43.8 14.5 0 24.7-7.1 30.5-21.3l31 15.5c-2.1 3.8-21.4 39-65.1 39-22.7 0-74-9.9-74-77.1 0-58.7 43-77.1 72.6-77.1 30.7 0 52.6 12 65.6 35.9zM247.6 8.1C104.7 8.1 0 123.1 0 256.1c0 138.5 113.6 248 247.6 248 129.9 0 248.4-100.9 248.4-248 0-137.9-106.6-248-248.4-248zm.9 450.8c-112.5 0-203.7-93-203.7-202.8 0-105.4 85.4-203.3 203.7-203.3 112.5 0 202.8 89.5 202.8 203.3 0 121.7-99.7 202.8-202.8 202.8z" /></svg></a>
                    </span> : null}</p>
                    {/* See: https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning */}
                    <p className="text-left meta-date xarta-updated-at mt-2" suppressHydrationWarning><span className="font-semibold">{t('LAST_UPDATED_AT_TEXT')}:</span> {formattedDate}</p>
                    {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                </div>
                <div className="w-full card-minimum:w-auto flex flex-col shrink-0 content-center justify-center text-right">
                    <a href={settings.logo ? ROOT_URL : "https://xarta.dev/"} target="_blank" className="inline text-right h-[20px] justify-self-center mt-2 mb-2 ">
                        {settings.logo ?
                            <img src={settings.logo} alt="Logo" className={"h-[20px] float-right xarta-custom-logo"} /> :
                            <Image alt={"Xarta logo"} src={XartaLogo} className="xarta-default-logo" height={20} />
                        }
                    </a>
                </div>
            </div>
            {globalCodeInjection.codeinjection_foot ? <div
                dangerouslySetInnerHTML={{ __html: globalCodeInjection.codeinjection_foot }}
            /> : null}
            {post.codeinjection_foot ? <div
                dangerouslySetInnerHTML={{ __html: post.codeinjection_foot }}
            /> : null}
        </CardFooter>
    </Card>;
}

