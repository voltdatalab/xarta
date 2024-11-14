import { useRouter } from "next/navigation";
import { mainFlexContainer } from "./mainFlexContainer";
import { PostCardItem } from "./PostCardItem";
import { Welcome } from "./Welcome";
import { YourCards } from "./YourCards";
import { GhostPost } from "@/components/types/GhostPost";
import { Carregando } from "./Carregando";
import { useGhostUser } from "@/components/functional/GhostUserProvider";
import { RoundedFullButton } from "./RoundedFullButton";
import { cn } from "@/lib/utils";
import Bg from '@/components/Xarta/Home/padronagem-grayscale.png'

export function InnerHome({ posts = [], isLoading, isSuccess, error }: { posts: Array<GhostPost>, isLoading: boolean, isSuccess: boolean, error: Error | null }) {

  const router = useRouter(); // Initialize the router instance

  const { user, settings } = useGhostUser();

  const userName = user?.name;
  const organization = settings?.title;

  // Functions to handle card click
  const editCard = (id: string) => {
    router.push(`/edit-card/${id}`);
  };
  const viewCard = (id: string) => {
    router.push(`/view-card/${id}`);
  };
  const createCard = () => {
    router.push(`/create-card`);
  }


  return (
    <div className={mainFlexContainer}>
      <Welcome onNewCard={createCard} name={userName} org={organization} />
      <YourCards posts={posts} className="pt-9 pb-5" />

      {
        isSuccess && (posts.length === 0) ? <div className="mt-6 text-center">Nenhum card encontrado.</div> : null
      }

      {isLoading ? <Carregando>
        Carregando Xartas...
      </Carregando> : null}
      {error ? <div className="mt-6 text-center">Erro ao carregar cards: {error.message}</div> : null}

      <div className="
        grid 
        grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 ultra:grid-cols-4 
        gap-y-4 tablet:gap-x-5 tablet:gap-y-5
      ">
        {posts.map((post, i) => (
          <div key={post.id} className="tablet:min-w-[283px] pc:min-w-[295px] ultra:min-w-[320px] contents">
            <PostCardItem post={post} onClick={(p) => viewCard(p.id)} onEdit={(p) => editCard(p.id)} />
          </div>
        ))}
        <div className="tablet:min-w-[283px] pc:min-w-[295px] ultra:min-w-[320px] justify-items-center content-center contents">
          <div onClick={createCard} className="overflow-hidden relative flex group w-full min-h-[288px] shadow-md rounded-lg bg-[#F6F6F6] cursor-pointer hover:-translate-y-[1px] active:translate-y-0 transition duration-100" style={{backgroundImage: `url(${Bg.src})`, backgroundSize: 'contain'}}>
            <div className="absolute inset-0 group-hover:bg-[#4B31DD22] transition duration-500"></div>
            <RoundedFullButton className={cn("relative z-10 block w-full max-w-[284px] tablet:inline-block", "mx-auto self-center justify-self-center")} >Criar novo Xarta</RoundedFullButton>
          </div>
        </div>
      </div>
    </div>
  )
}  