import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/solid';
import ProgressIndicatorIcon from './ProgressIndicatorIcon.png'

export default function StatusDropdown({ onChange }: { onChange?: (value: string) => void }) {
  return (
    <div className="flex items-center rounded-md grow shrink-0 max-w-[300px]">
      <div className="flex flex-row items-center bg-[#EEEDF2] rounded-md pl-4 space-x-2 w-full">
        <img src={ProgressIndicatorIcon.src} className='w-[22px] h-[22px]'/>
        <select onChange={(e) => onChange?.(e.target.value)} className="py-3 border-none bg-[#EEEDF2] rounded-md text-[#6D6D6D] text-sm focus:ring-0 w-full">
          <option value=''>Qualquer status</option>
          <option value='draft'>Rascunho</option>
          <option value='published'>Publicado</option>
        </select>
      </div>
    </div>
  );
}