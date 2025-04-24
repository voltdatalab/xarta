"use client";

import { useTranslations } from "next-intl";
import GoBack from "./GoBack";
import { TituloPagina } from "./TituloPagina";

export const ConfiguracoesTitulo = () => {

  const t = useTranslations('strings');

    return <GoBack>
        {({ back }) => <TituloPagina title={t('SETTINGS_TEXT')} onBack={back} />}
    </GoBack>
}