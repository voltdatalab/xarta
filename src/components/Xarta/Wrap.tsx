import { ChildrenProps } from "@/lib/utils"
import { Header } from "./Header"

export const Wrap = ({children}: ChildrenProps) => {
    return <div className="min-h-screen w-full bg-[#F6F6F6]">
        <Header />
        {children}
    </div>
}