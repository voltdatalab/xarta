// components/SearchInput.tsx
import SearchIcon from './SearchIcon.png'


export default function SearchInput({ onChange }: { onChange?: (value: string) => void }) {
  return (
    <div className="flex items-center rounded-md grow">
      <div className="flex flex-row items-center bg-[#EEEDF2] rounded-md pl-4 space-x-2 w-full">
        <img src={SearchIcon.src} className='w-[22px] h-[22px]'/>
        <input
          type="text"
          placeholder="Digite sua busca"
          className="outline-none text-sm text-muted-foreground flex-grow border-none bg-[#EEEDF2] rounded-md py-3 focus:ring-0"
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}