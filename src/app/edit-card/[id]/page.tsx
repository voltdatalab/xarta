import { SharedDefaults } from '@/components/SharedDefaults';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import EditarCard from '@/components/Xarta/WrapEditarCard';
import { getXartaConfig } from '@/config/getConfig';

export default async function EditCardPage({ params }: { params: { id: string } }) {

  const config = await getXartaConfig();

  return (
    <SharedDefaults config={config}>
      <Header></Header>
      <EditarCard id={params.id} config={config} />
      <Footer/>
    </SharedDefaults>

  );
}