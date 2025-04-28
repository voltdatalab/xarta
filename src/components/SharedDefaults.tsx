import { ReactNode } from "react";
import { TanStackQuery } from "./TanStackQuery";
import { cn } from "@/lib/utils";
import { barlow } from "@/fonts";
import { UserProvider } from "./functional/GhostUserProvider";
import { XartaConfig } from "@/config/XartaConfig";
import { ConfigPublicRootUrl } from "./ghost-api/admin/fetchPost";

export const SharedDefaults = (
    { children, config }: 
    { children: ReactNode } & {config: Pick<XartaConfig, "PUBLIC_NEXT_API_BASE_URL"> & ConfigPublicRootUrl}) => {
    return <div className={cn(barlow.className)}>
        <TanStackQuery>
            <UserProvider config={config}>
                {children}
            </UserProvider>
        </TanStackQuery>
    </div>
}
