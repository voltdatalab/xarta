import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/solid';

export default function DateRangePicker() {
  return (
    <div className="flex items-center bg-[#EEEDF2] rounded-md p-2 space-x-2">
      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">10 mar - 29 maio</span>
      <ChevronDownIcon className="w-4 h-4 text-muted-foreground ml-auto" />
    </div>
  );
}