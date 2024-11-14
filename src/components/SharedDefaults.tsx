import { ReactNode } from "react";
import { TanStackQuery } from "./TanStackQuery";
import { cn } from "@/lib/utils";
import { barlow } from "@/fonts";
import { UserProvider } from "./functional/GhostUserProvider";

export const SharedDefaults = ({ children }: { children: ReactNode }) => {
    return <div className={cn(barlow.className)}>
        <TanStackQuery>
            <UserProvider>
                {children}
            </UserProvider>
        </TanStackQuery>
    </div>
}
