import { Carregando } from "@/components/Xarta/Home/Carregando";
import { useTranslations } from "next-intl";


export default function LoadingHome() {

    const t = useTranslations('strings');

    return <Carregando>
        {t('LOADING_XARTA')}
    </Carregando>
}