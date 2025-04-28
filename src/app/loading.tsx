import { Carregando } from "@/components/Xarta/Home/Carregando";
import { getTranslations } from "next-intl/server";


export default async function LoadingHome() {

    const t = await getTranslations('strings');

    return <Carregando>
        {t('LOADING_XARTA')}
    </Carregando>
}