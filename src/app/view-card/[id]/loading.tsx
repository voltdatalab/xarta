import { SharedDefaults } from "@/components/SharedDefaults";
import { Footer } from "@/components/Xarta/Footer";
import { Header } from "@/components/Xarta/Header";
import { Carregando } from "@/components/Xarta/Home/Carregando";
import { mainFlexContainer } from "@/components/Xarta/Home/mainFlexContainer";
import { TituloPagina } from "@/components/Xarta/TituloPagina";
import { getXartaConfig } from "@/config/getConfig";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function LoadingViewCard () {

    const t = await getTranslations('strings');
    const config = await getXartaConfig();

    return <SharedDefaults config={config}>
        <Header></Header>
        <div className={cn("flex flex-col items-center py-4 space-y-5", mainFlexContainer)}>
            <TituloPagina title={t('VIEW_XARTA')} />
            <Carregando>
                {t('LOADING_XARTA')}
            </Carregando>
        </div>
        <Footer/>
    </SharedDefaults>
}