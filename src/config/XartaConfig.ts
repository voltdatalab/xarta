import { getXartaConfig } from "./getConfig";

export type XartaConfig = Awaited<ReturnType<typeof getXartaConfig>>;