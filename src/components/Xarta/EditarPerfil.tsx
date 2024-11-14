import { useRouter } from "next/navigation";
import { TituloPagina } from "./TituloPagina";
import { CONFIGURACOES, HOME, PUBLIC_GHOST_ADMIN_API_URL } from "@/config/config";
import { mainFlexContainer } from "./Home/mainFlexContainer";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { buttonTransitionStyles } from "./Home/RoundedFullButton";

export type ScreenType = 'edit' | 'create' | 'login';

export const getButtonText = (type: ScreenType) => {
  switch (type) {
    case 'edit':
      return "Salvar alterações";
    case "create":
      return "Criar Usuário";
    case "login":
      return "Fazer Login";
  }
}

export default function EditarPerfil({ type = 'edit' }: { type?: ScreenType }) {
  const [canClick, setCanClick] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const buttonText = getButtonText(type);

  const performOnClick = useCallback((type: ScreenType) => {
    if ((type === 'edit') || (type === 'create')) {
      router.push(type === 'edit' ? CONFIGURACOES : HOME);
    } else if (type === 'login') {
      setCanClick(false);
      fetch(`${PUBLIC_GHOST_ADMIN_API_URL}session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "username": email,
          "password": password
        })
      })
      .then(() => {
        router.push(HOME);
        router.refresh();
      })
      .finally(() => setCanClick(true));
    }
  }, [email, password, router, setCanClick]);

  const getPageTitle = (type: ScreenType) => {
    switch (type) {
      case 'edit':
        return "Editar Perfil";
      case 'login':
        return "Fazer Login";
      case 'create':
        return 'Criar Usuário';
    }
  }

  useEffect(() => {
    const demoUsername = process.env.NEXT_PUBLIC_DEMO_USERNAME;
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

    if (demoUsername && demoPassword) {
      setEmail(demoUsername);
      setPassword(demoPassword);
      
      const timer = setTimeout(() => {
        performOnClick('login'); // Automatically trigger the login
      }, 1000); // Wait for 1 second

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [performOnClick]);

  return (
    <div className={cn("flex flex-col items-center justify-center", mainFlexContainer)}>
      <TituloPagina title={getPageTitle(type)} onBack={() => router.back()} />
      <div>
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            {type !== 'login' ? (
              <div className="space-y-2">
                <label htmlFor="username" className="block text-[15px] font-semibold">
                  Nome de usuário
                </label>
                <input
                  id="username"
                  type="text"
                  className="w-full p-3 rounded-md h-[44px] border-0 bg-[#EEEDF2] text-sm"
                  placeholder="Digite seu nome de usuário"
                />
              </div>
            ) : null}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[15px] font-semibold">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}                
                className="w-full p-3 rounded-md h-[44px] border-0 bg-[#EEEDF2] text-sm"
                placeholder="Digite o seu e-mail"
              />
            </div>
            {(type === 'edit' || type === 'login') ? (
              <div className="space-y-2">
                <label htmlFor="senha" className="block text-[15px] font-semibold">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md h-[44px] border-0 bg-[#EEEDF2] text-sm"
                  placeholder="Digite a sua senha"
                />
              </div>
            ) : null}
            {(type === 'edit') ? (
              <div className="space-y-2">
                <label htmlFor="senha" className="block text-[15px] font-semibold">
                  {type === 'edit' ? "Nova senha" : "Senha"}
                </label>
                <input
                  id="nova-senha"
                  type="password"
                  className="w-full p-3 rounded-md h-[44px] border-0 bg-[#EEEDF2] text-sm"
                  placeholder="Digite sua nova senha"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <button disabled={!canClick} className={cn("px-6 py-3 mt-6 text-white rounded-full bg-[#4B31DD]", buttonTransitionStyles)} onClick={() => performOnClick(type)}>{buttonText}</button>
    </div>
  );
}
