import { GhostPost } from "@/components/types/GhostPost"
import { CalendarIcon } from "@heroicons/react/24/solid"
import { DateTime } from 'luxon';
import EditIcon from './EditIcon.png';
import Image from 'next/image';
import Bg from '@/components/Xarta/Home/padronagem-grayscale.png'
import { CreativeCommons, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";


export const PostCardItem = ({post, onClick, onEdit}: {post: GhostPost, onClick?: (post: GhostPost) => void, onEdit?: (post: GhostPost) => void}) => {

    const t = useTranslations('strings');


    const formattedDate = DateTime.fromISO(post.created_at).toLocaleString(DateTime.DATE_MED);

    return <div onClick={() => onClick?.(post)} className="group w-full min-h-[288px] shadow-md rounded-lg bg-[#F6F6F6] cursor-pointer hover:-translate-y-[1px] active:translate-y-0 transition duration-100">
        <div className="h-[125px] bg-white rounded-t-lg relative" style={{backgroundImage: `url(${Bg.src}`, backgroundSize: 'cover'}}>
            <div onClick={(e) => {e.stopPropagation(); onEdit?.(post); }} className="bg-[#4B31DD] rounded-xl flex flex-row p-2 justify-center content-center absolute top-2.5 right-2.5 grow-0 active:translate-y-[1px] transition duration-100 shadow-lg z-20 gap-x-1">
                <div className="w-[18px] h-[19px] self-center">
                    <Image className="shrink-0" src={EditIcon} alt={t('EDIT_TEXT')} width={18} height={20}/>
                </div>
                <span className="text-white text-sm shrink-0"> {t('EDIT_TEXT')} </span>
            </div>
            <div className="absolute inset-0 w-full h-full transition duration-100 group-hover:bg-[#f6f6f6]/30 z-10 rounded-t-lg"></div>
        </div>

        <div className="mt-4 px-4 flex flex-row gap-2 flex-wrap">
            {post.tags.map(tag => <div key={tag.id} className="flex flex-row rounded-full px-[12px] py-[5px] bg-[#79787EB2] hover:bg-[#4B31DD] text-[#F6F6F6] font-medium text-[12px] leading-[14px] whitespace-nowrap">
                {tag.name}
            </div>) }
            {post.status === 'draft' ? <div title={t('DRAFT_TEXT')} className="flex flex-row rounded-full px-[10px] gap-1 bg-[#4B31DD] text-[#F6F6F6] font-normal text-[12px] leading-[14px] whitespace-nowrap">
                <SquarePen strokeWidth={1.75} width={14} />
            </div> : null}
            <div className="flex flex-row rounded-full px-[10px] gap-1 py-[5px] border border-[#00000059] text-[#00000059] font-normal text-[12px] leading-[14px] whitespace-nowrap">
                <CalendarIcon width={14} /> {formattedDate}
            </div>
            {post.featured ? <div title={t('CREATIVE_COMMONS_TEXT')} className="flex flex-row rounded-full gap-1 text-[#00000059] font-normal text-[12px] leading-[14px] whitespace-nowrap">
                <CreativeCommons strokeWidth={1} height={26} />
            </div> : null}            
        </div>

        <div className="mt-[15px] mx-4 text-[16px] leading-[19px] font-semibold">
            {post.title}
        </div>

        <div className="mt-1 mx-4 text-[13px] leading-[20px] font-light mb-4" style={{
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden'
        }}>
            {post.custom_excerpt || post.excerpt}
        </div>
        
    </div>
}