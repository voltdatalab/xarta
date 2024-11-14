import Image from 'next/image';
import { ReactNode } from 'react';
import favicon from '@/app/favicon.ico'


export const Carregando = ({children}: {children: ReactNode}) => {
    return <div className="mt-6 text-center flex flex-col items-center gap-1 animate-pulse grayscale" style={{minHeight: '80vh'}}>
      <Image alt="loading cards" width={30} src={favicon} className="animate-bounce" /><br/><br/> 
      <span className="font-semibold text-gray-500">{children}</span>
    </div>
}