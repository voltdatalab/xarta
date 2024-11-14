import { SharedDefaults } from '@/components/SharedDefaults';
import { Footer } from '@/components/Xarta/Footer';
import { Header } from '@/components/Xarta/Header';
import { WrapCreateCard } from '@/components/Xarta/WrapCreateCard';

export default function CreateCardPage() {

  return (
    <SharedDefaults>
      <Header></Header>
      <WrapCreateCard />
      <Footer/>
    </SharedDefaults>

  );
}