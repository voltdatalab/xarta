import { SharedDefaults } from '@/components/SharedDefaults';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import { WrapCreateCard } from '@/components/Xarta/WrapCreateCard';
import { getXartaConfig } from '@/config/getConfig';

export default async function CreateCardPage() {

  const config = await getXartaConfig();

  return (
    <SharedDefaults config={config}>
      <Header></Header>
      <WrapCreateCard config={config} />
      <Footer/>
    </SharedDefaults>

  );
}