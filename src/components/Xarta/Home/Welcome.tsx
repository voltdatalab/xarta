import { youngSerif } from "@/fonts"
import { cn } from "@/lib/utils"
import { RoundedFullButton } from "./RoundedFullButton"
import { useTranslations } from "next-intl";

export const Welcome = ({ name, org, onNewCard }: { name?: string, org?: string, onNewCard?: () => void }) => {
    
    const t = useTranslations('strings');
    
    return <div className="flex flex-col text-center">
        <span className={cn('font-semibold text-2xl tablet:text-[38px] leading-7 tablet:leading-[46px]', youngSerif.className)}>
            {process.env.NEXT_PUBLIC_DEMO_USERNAME ? <>
                {t('LETS_CREATE_A_XARTA_TEXT')}
            </> :
                <>
                    {t('HELLO_TEXT')} {name ? `, ${name}` : null}!
                </>
            }
        </span>
        <span className="mt-2.5 text-base leading-[22px] tablet:text-lg max-w-[700px] mx-auto">
            {process.env.NEXT_PUBLIC_DEMO_PASSWORD ? <>
                {t('DEMO_MODE_ENABLED_TEXT')}
            </> : (org ? `${t('ASSOCIATED_TO_ORG_TEXT')} ${org}` : null)
            }
        </span>
        <div className="mt-[26px] flex flex-row justify-center">
            <RoundedFullButton className="block w-full max-w-[284px] tablet:inline-block" onClick={onNewCard}>{t('CREATE_NEW_XARTA_TEXT')}</RoundedFullButton>
        </div>
    </div>
}