import WrapperVisualizarCard from "@/components/Xarta/WrapperVisualizarCard";
import { Header } from "@/components/Xarta/Header";
import { SharedDefaults } from "@/components/SharedDefaults";
import { Footer } from "@/components/Xarta/Footer";

// Important: This forces data refetch, otherwise user may not see changed Xarta after editing
export const revalidate = 0;

export default function ViewCardPage({ params }: { params: { id: string } }) {

  return (
    <SharedDefaults>
      <Header></Header>
      <WrapperVisualizarCard id={params.id} />
      <Footer/>
    </SharedDefaults>
  );
}