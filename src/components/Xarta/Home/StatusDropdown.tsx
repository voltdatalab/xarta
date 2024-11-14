import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CogIcon } from '@heroicons/react/24/solid';

export default function StatusDropdown() {
  return (
    <div className="flex items-center bg-[#EEEDF2] rounded-md p-2 space-x-2">
      <CogIcon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Status</span>
      <ChevronDownIcon className="w-4 h-4 text-muted-foreground ml-auto" />
    </div>
  );
}