import TagsDropdown from './TagsDropdown';
import StatusDropdown from './StatusDropdown';
import DateRangePicker from './DateRangePicker';
import SearchInput from './SearchInput';

export default function Toolbar() {
  return (
    <div className="flex space-x-4">
      <TagsDropdown />
      <StatusDropdown />
      <DateRangePicker />
      <SearchInput />
    </div>
  );
}