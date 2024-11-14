import { SharedDefaults } from '@/components/SharedDefaults';
import { Configuracoes } from '@/components/Xarta/Configuracoes';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';

export default function SettingsPage() {

  return (
    <SharedDefaults>
      <Header></Header>
      <Configuracoes />
      <Footer/>
    </SharedDefaults>

  );
}