import { SharedDefaults } from '@/components/SharedDefaults';
import { Configuracoes } from '@/components/Xarta/Configuracoes';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import { getXartaConfig } from '@/config/getConfig';

export default async function SettingsPage() {

  const config = await getXartaConfig();

  return (
    <SharedDefaults config={config}>
      <Header></Header>
      <Configuracoes config={config} />
      <Footer/>
    </SharedDefaults>

  );
}