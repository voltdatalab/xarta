import { clsx, type ClassValue } from "clsx"
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type CnProps = {
  className?: string,
};

export type ChildrenProps = {
  children?: ReactNode
}

export type CnChildrenProps = CnProps & ChildrenProps;
