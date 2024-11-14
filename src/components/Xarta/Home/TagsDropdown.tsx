import { ChevronDownIcon, TagIcon } from '@heroicons/react/24/solid';


export default function TagsDropdown() {
  return (
    <div className="flex items-center bg-[#EEEDF2] rounded-md p-2 space-x-2">
      <TagIcon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Tags</span>
      <ChevronDownIcon className="w-4 h-4 text-muted-foreground ml-auto" />
    </div>
  );
}