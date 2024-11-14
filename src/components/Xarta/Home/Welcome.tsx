import { youngSerif } from "@/fonts"
import { cn } from "@/lib/utils"
import { RoundedFullButton } from "./RoundedFullButton"

export const Welcome = ({ name, org, onNewCard }: { name?: string, org?: string, onNewCard?: () => void }) => {
    return <div className="flex flex-col text-center">
        <span className={cn('font-semibold text-2xl tablet:text-[38px] leading-7 tablet:leading-[46px]', youngSerif.className)}>
            {process.env.NEXT_PUBLIC_DEMO_USERNAME ? <>
                Bora fazer um Xarta!
            </> :
                <>
                    Olá {name ? `, ${name}` : null}!
                </>
            }
        </span>
        <span className="mt-2.5 text-base leading-[22px] tablet:text-lg">
            {process.env.NEXT_PUBLIC_DEMO_PASSWORD ? <>
                Esta versão do Xarta serve apenas para mostrar seu funcionamento e dinâmica. Clique em &quot;Editar&quot; para ver a tela de edição ou clique em qualquer outro lugar dos cards abaixo para ver sua versão publicada.
            </> : (org ? `Você está associado à organização ${org}` : null)
            }
        </span>
        <div className="mt-[26px] flex flex-row justify-center">
            <RoundedFullButton className="block w-full max-w-[284px] tablet:inline-block" onClick={onNewCard}>Criar novo Xarta</RoundedFullButton>
        </div>
    </div>
}