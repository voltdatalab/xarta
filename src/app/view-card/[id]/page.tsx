import WrapperVisualizarCard from "@/components/Xarta/WrapperVisualizarCard";
import { Header } from "@/components/Xarta/Header";
import { SharedDefaults } from "@/components/SharedDefaults";
import { Footer } from "@/components/Xarta/Footer";
import { getXartaConfig } from "@/config/getConfig";

// Important: This forces data refetch, otherwise user may not see changed Xarta after editing
export const revalidate = 0;

export default async function ViewCardPage({ params }: { params: { id: string } }) {

  const config = await getXartaConfig();

  return (
    <SharedDefaults config={config}>
      <Header></Header>
      <WrapperVisualizarCard id={params.id} />
      <Footer/>
    </SharedDefaults>
  );
}