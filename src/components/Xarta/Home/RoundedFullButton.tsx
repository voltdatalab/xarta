import { cn, CnChildrenProps } from "@/lib/utils"

export const buttonTransitionStyles = `transition duration-100 enabled:hover:-translate-y-[1px] enabled:hover:shadow-md enabled:active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed`;


export const RoundedFullButton = ({children, className, onClick}: CnChildrenProps & {onClick?: () => void}) => {
    return <button onClick={onClick} className={cn("inline-block px-[28px] rounded-full bg-[#4B31DD] text-[#f6f6f6] text-[15px] leading-[18px] tablet:text-[18px] tablet:leading-[22px] font-semibold text-center py-[11px] tablet:py-[14px]", buttonTransitionStyles, className)}>
        {children}
    </button>
}