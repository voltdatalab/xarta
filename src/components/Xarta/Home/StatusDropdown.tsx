import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/solid';
import ProgressIndicatorIcon from './ProgressIndicatorIcon.png'
import { useTranslations } from 'next-intl';


export default function StatusDropdown({ onChange }: { onChange?: (value: string) => void }) {

  const t = useTranslations('strings');

  return (
    <div className="flex items-center rounded-md grow shrink-0 tablet:max-w-[300px]">
      <div className="flex flex-row items-center bg-[#EEEDF2] rounded-md pl-4 space-x-2 w-full">
        <img src={ProgressIndicatorIcon.src} className='w-[22px] h-[22px]'/>
        <select onChange={(e) => onChange?.(e.target.value)} className="py-3 border-none bg-[#EEEDF2] rounded-md text-[#6D6D6D] text-sm focus:ring-0 w-full">
          <option value=''>{t('ANY_STATUS_OPTION')}</option>
          <option value='draft'>{t('DRAFT_OPTION')}</option>
          <option value='published'>{t('PUBLISHED_OPTION')}</option>
        </select>
      </div>
    </div>
  );
}