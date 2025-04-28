import EditarPerfil from "@/components/Xarta/EditarPerfil";
import { Header } from "@/components/Xarta/Header";
import { getXartaConfig } from "@/config/getConfig";

export default async function Login() {
    const config = await getXartaConfig();

    return <>
        <Header></Header>
        <EditarPerfil config={config} type="login"></EditarPerfil>
    </>
}