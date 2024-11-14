import { ReactNode } from 'react';
import BackArrow from './back-arrow.png';
import Image from 'next/image';

export const TituloPagina = ({title, onBack}: {title: ReactNode, onBack?: () => void}) => {
    return <div className="flex flex-row pt-2 pb-[28px] content-center w-full">
        <Image alt="back button" src={BackArrow} width={32} className='cursor-pointer' onClick={onBack} />
        <div className="font-bold text-center grow flex flex-col justify-center">{title}</div>
    </div>
}