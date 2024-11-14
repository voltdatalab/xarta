"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ConfiguracoesTitulo } from "./ConfiguracoesTitulo";
import { mainFlexContainer } from "./Home/mainFlexContainer";
import { FormEvent, useEffect, useState } from "react";
import { useGhostUser } from "../functional/GhostUserProvider";
import { NEXT_XARTA_BASE_URL, PUBLIC_NEXT_API_BASE_URL, ROOT_URL } from "@/config/config";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { Toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";
import { buttonTransitionStyles } from "./Home/RoundedFullButton";
import { LogOut } from "lucide-react";
import { JWT_TOKEN_KEY } from "../ghost-auth/constants";

export function Configuracoes() {
  const { user: ghostUser } = useGhostUser();
  const { toast } = useToast();
  const router = useRouter();

  const user = {
    name: ghostUser?.name || "Nome do Usuário",
    profile_image: ghostUser?.profile_image || "",
  };

  const [codeInjectionHead, setCodeInjectionHead] = useState("");
  const [codeInjectionFoot, setCodeInjectionFoot] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the current code injection settings when the component mounts
  useEffect(() => {
    async function fetchCodeInjectionSettings() {
      try {
        const res = await fetch(`${PUBLIC_NEXT_API_BASE_URL}/code-injection`);
        const data = await res.json();
        setCodeInjectionHead(data.codeinjection_head || "");
        setCodeInjectionFoot(data.codeinjection_foot || "");
      } catch (error) {
        console.error("Error fetching code injection settings:", error);
      }
    }
    fetchCodeInjectionSettings();
  }, []);

  // Submit the updated code injection values
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${ROOT_URL}/ghost/api/admin/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings: [
            {
              key: 'codeinjection_head',
              value: codeInjectionHead
            },
            {
              key: 'codeinjection_foot',
              value: codeInjectionFoot,
            },
          ]
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast({
          title: "Configurações salvas com sucesso",
        })
        router.refresh();
      } else {
        toast({
          title: "Houve um erro ao tentar alterar as configurações",
        })
      }
    } catch (error) {
      toast({
        title: "Houve um erro ao tentar alterar as configurações",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn(mainFlexContainer)}>
      <ConfiguracoesTitulo />

      <div className="space-y-4 max-w-4xl mx-auto">
        <Card className="flex items-center p-4 space-x-4 bg-white">
          <Avatar>
            <AvatarImage src={user.profile_image} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-[18px] font-semibold">{user.name}</div>
            { process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <div className="text-sm"><a href="/ghost/#/settings" className="hover:underline" target="_blank"> Gerencie a sua conta no Ghost </a></div>  }
          </div>
        </Card>

        <Card className="bg-white text-[15px] text-normal overflow-hidden">
          <div className="">
            <button onClick={() => {
              if (confirm('Deseja mesmo sair da sua conta?')) {
                (localStorage ?? {}).removeItem?.(JWT_TOKEN_KEY);
                fetch(`${ROOT_URL}/ghost/api/admin/session`, {
                  method: 'DELETE'
                }).then(() => {
                  alert('Desconectado com sucesso');
                  router.push(`${NEXT_XARTA_BASE_URL}`);
                })
              }
            }} className="w-full p-5 text-[#4F4F4F] hover:text-[#4B31DD] hover:bg-[#4B31DD1A] hover:font-semibold hover:text-medium flex flow-row gap-3">
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </div>
        </Card>

        <Card className="bg-white text-[15px] text-normal overflow-hidden">
          <div className="text-[18px] font-semibold px-5 pt-5">Configurações do Template</div>
          <div className="pt-3 px-5">Os campos de customização HTML abaixo serão aplicados para todos os Xartas do site.</div>
          <form onSubmit={handleSave} className="p-5 pb-5 space-y-4">

            <div className="space-y-2">
              <label htmlFor="codeinjection_head" className="block text-sm font-medium text-gray-700">
                Customizar Logo
              </label>
              <p>
                { process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <a href="/ghost/#/settings/design/edit" className="hover:underline" target="_blank">- Acesse as configurações no Ghost</a> }
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="codeinjection_head" className="block text-sm font-medium text-gray-700">
                Customizar Head
              </label>
              <textarea
                id="codeinjection_head"
                name="codeinjection_head"
                rows={4}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-[#4B31DD]"
                value={codeInjectionHead}
                onChange={(e) => setCodeInjectionHead(e.target.value)}
              />
            </div>

            <div className="space-y-2 pt-3">
              <label htmlFor="codeinjection_foot" className="block text-sm font-medium text-gray-700 ">
                Customizar Footer
              </label>
              <textarea
                id="codeinjection_foot"
                name="codeinjection_foot"
                rows={4}
                className="block w-full p-2 border border-gray-300 rounded-md focus:ring-[#4B31DD]"
                value={codeInjectionFoot}
                onChange={(e) => setCodeInjectionFoot(e.target.value)}
              />
            </div>

            <div className="space-y-2 text-center">
              <button
                type="submit"
                className={cn("px-4 py-2 bg-[#4B31DD] text-white rounded-full disabled:opacity-50", buttonTransitionStyles)}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar mudanças"}
              </button>
            </div>
          </form>
        </Card>


      </div>

      <Toaster />
    </div>
  );
}
