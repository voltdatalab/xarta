import { GhostPost } from "@/components/types/GhostPost"
import { cn, CnProps } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const YourCards = ({posts = [], className}: {posts?: GhostPost[]} & CnProps) => {

    const t = useTranslations('strings');

    const draftPosts = posts.filter(p => p.status === 'draft');
    const publishedPosts = posts.filter(p => p.status === 'published');

    const publiclyAvailable = publishedPosts.filter(p => p.featured);

    return <div className={cn(className)}>
        <div className="font-bold 
            text-[18px] leading-[22px] 
            tablet:text-[20px] tablet:leading-[24px] 
            pc:text-[24px] pc:leading-[29px]
        ">{t('CREATED_CONTEXTS_TEXT')}</div>
        <div className="mt-[6px] font-normal
        text-[14px] leading-[22px]
        tablet:text-[16px]
        tablet:mt-[12px] 
        pc:mt-[17px] pc:text-[18px]">
            {t.rich('CARD_COUNT_SUMMARY', {
                postsCount: posts.length,
                draftPostsCount: draftPosts.length, 
                publishedPostsCount: publishedPosts.length, 
                publiclyAvailableCount: publiclyAvailable.length,
                b: (chunks) => <span className="font-semibold">{chunks}</span>
            })} 
        </div>
    </div>
}