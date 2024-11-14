"use client";

import GoBack from "./GoBack";
import { TituloPagina } from "./TituloPagina";

export const ConfiguracoesTitulo = () => {
    return <GoBack>
        {({ back }) => <TituloPagina title="Configurações" onBack={back} />}
    </GoBack>
}