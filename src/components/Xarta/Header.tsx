import XartaLogo from './new_logo_xarta.png';
import UserIcon from './user-icon.png';
import { HOME, CONFIGURACOES } from "@/config/config";
import Link from 'next/link';
import { mainFlexContainer } from "./Home/mainFlexContainer";
import Image from 'next/image';

export const Header = () => {
    return (
        <div className={mainFlexContainer}>
            <div className="flex flex-row py-[24px] content-center items-center">
                <div className="grow">
                    <Link href={HOME}>
                            <Image alt="Xarta logo" src={XartaLogo} width="96" className="cursor-pointer" />
                    </Link>
                </div>
                <div className="">
                    <Link href={CONFIGURACOES}>
                            <Image alt="User settings" src={UserIcon} width="32" className="cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

