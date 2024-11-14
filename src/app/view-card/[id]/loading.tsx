import { SharedDefaults } from "@/components/SharedDefaults";
import { Footer } from "@/components/Xarta/Footer";
import { Header } from "@/components/Xarta/Header";
import { Carregando } from "@/components/Xarta/Home/Carregando";
import { mainFlexContainer } from "@/components/Xarta/Home/mainFlexContainer";
import { TituloPagina } from "@/components/Xarta/TituloPagina";
import { cn } from "@/lib/utils";


export default function LoadingViewCard () {
    return <SharedDefaults>
        <Header></Header>
        <div className={cn("flex flex-col items-center py-4 space-y-5", mainFlexContainer)}>
            <TituloPagina title="Visualizar Xarta" />
            <Carregando>
                Carregando Xarta...
            </Carregando>
        </div>
        <Footer />
    </SharedDefaults>
}