import { SharedDefaults } from '@/components/SharedDefaults';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import EditarCard from '@/components/Xarta/WrapEditarCard';

export default function EditCardPage({ params }: { params: { id: string } }) {

  return (
    <SharedDefaults>
      <Header></Header>
      <EditarCard id={params.id} />
      <Footer/>
    </SharedDefaults>

  );
}