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
import { useTranslations } from "next-intl";
import { LanguageSelector, Language } from "../functional/LanguageSelector";

export function Configuracoes() {

  const t = useTranslations('strings');

  const { user: ghostUser } = useGhostUser();
  const { toast } = useToast();
  const router = useRouter();

  const user = {
    name: ghostUser?.name || t('USERNAME_TEXT'),
    profile_image: ghostUser?.profile_image || "",
  };

  const [codeInjectionHead, setCodeInjectionHead] = useState("");
  const [codeInjectionFoot, setCodeInjectionFoot] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State for languages and selected language
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | undefined>();
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  
  // Fetch available languages and selected language from database
  useEffect(() => {
    async function fetchLanguageData() {
      setLoadingLanguages(true);
      try {
        // Fetch available languages from API
        const languagesRes = await fetch(`${PUBLIC_NEXT_API_BASE_URL}/config/languages`);
        let availableLanguages: Language[] = [];
        
        if (languagesRes.ok) {
          availableLanguages = await languagesRes.json();
          setLanguages(availableLanguages);
        } else {
          throw new Error('Failed to fetch available languages');
        }
        
        // Fetch selected language from API
        // TODO: Parallelize requests
        const selectedLangRes = await fetch(`${PUBLIC_NEXT_API_BASE_URL}/config/selected-language`);
        if (selectedLangRes.ok) {
          const data = await selectedLangRes.json();
          const language = availableLanguages.find(lang => lang.code === data.code);
          if (language) {
            setSelectedLanguage(language);
          } else {
            // If selected language is not in available languages, use default
            setSelectedLanguage(availableLanguages[0]);
          }
        } else {
          // If API fails, use browser language or default
          setSelectedLanguage(availableLanguages[0]);
        }
      } catch (error) {
        console.error("Error fetching language data:", error);
        // API request failed, show error state or retry
        setLanguages([]);
      } finally {
        setLoadingLanguages(false);
      }
    }
    
    fetchLanguageData();
  }, []);
  
  // Handle language change
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

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

  // Submit the updated code injection values and language settings
  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save code injection settings
      const codeInjectionRes = await fetch(`${ROOT_URL}/ghost/api/admin/settings`, {
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

      // Save selected language to the database
      if (selectedLanguage) {
        try {
          await fetch(`${PUBLIC_NEXT_API_BASE_URL}/config/selected-language`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: selectedLanguage.code }),
          });

        } catch (langError) {
          console.error("Error saving language preference:", langError);
        }
      }

      if (codeInjectionRes.ok) {
        toast({
          title: t('SETTINGS_SAVED_SUCCESSFULLY'),
        });
        router.refresh();
      } else {
        toast({
          title: t('ERROR_SETTINGS_NOT_SAVED'),
        });
      }
    } catch (error) {
      toast({
        title: t('ERROR_SETTINGS_NOT_SAVED'),
      });
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
            { process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <div className="text-sm"><a href="/ghost/#/settings" className="hover:underline" target="_blank"> {t('MANAGE_GHOST_ACCOUNT_TEXT')} </a></div>  }
          </div>
        </Card>

        <Card className="bg-white text-[15px] text-normal overflow-hidden">
          <div className="">
            <button onClick={() => {
              if (confirm(t('CONFIRM_SIGNOUT_TEXT'))) {
                (localStorage ?? {}).removeItem?.(JWT_TOKEN_KEY);
                fetch(`${ROOT_URL}/ghost/api/admin/session`, {
                  method: 'DELETE'
                }).then(() => {
                  alert(t('SIGNED_OUT_SUCCESSFULLY'));
                  router.push(`${NEXT_XARTA_BASE_URL}`);
                })
              }
            }} className="w-full p-5 text-[#4F4F4F] hover:text-[#4B31DD] hover:bg-[#4B31DD1A] hover:font-semibold hover:text-medium flex flow-row gap-3">
              <LogOut className="w-5 h-5" /> {t('SIGN_OUT_TEXT')}
            </button>
          </div>
        </Card>

        <Card className="bg-white text-[15px] text-normal">
          <div className="text-[18px] font-semibold px-5 pt-5">{t('LANGUAGE_SETTINGS')}</div>
          <div className="p-5">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              languages={languages}
              onChange={handleLanguageChange}
            />
          </div>
        </Card>

        <Card className="bg-white text-[15px] text-normal">
          <div className="text-[18px] font-semibold px-5 pt-5">{t('TEMPLATE_SETTINGS_TEXT')}</div>
          <div className="pt-3 px-5">{t('TEMPLATE_EXPLANATION_TEXT')}</div>
          <form onSubmit={handleSave} className="p-5 pb-5 space-y-4">

            <div className="space-y-2">
              <label htmlFor="codeinjection_head" className="block text-sm font-medium text-gray-700">
                {t('CUSTOMIZE_LOGO_TEXT')}
              </label>
              <p>
                { process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <a href="/ghost/#/settings/design/edit" className="hover:underline" target="_blank">- {t('ACCESS_GHOST_CONFIG_TEXT')}</a> }
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="codeinjection_head" className="block text-sm font-medium text-gray-700">
                {t('CUSTOMIZE_HEAD_TEXT')}
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
                {t('CUSTOMIZE_FOOTER_TEXT')}
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
                {loading ? t('SAVING_TEXT') : t('SAVE_CHANGES_TEXT')}
              </button>
            </div>
          </form>
        </Card>


      </div>

      <Toaster />
    </div>
  );
}
