// components/SearchInput.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function SearchInput() {
  return (
    <div className="flex items-center bg-[#EEEDF2] rounded-md p-2 space-x-2">
      <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Digite sua busca"
        className="bg-transparent outline-none text-sm text-muted-foreground flex-grow"
      />
    </div>
  );
}