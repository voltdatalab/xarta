import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { GhostTag } from '@/components/types/GhostTag';
import { ChevronDownIcon } from '../../Xarta/Icons/ChevronDownIcon';
import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { TagIcon } from '../../Xarta/Icons/TagIcon';
import { Badge } from '@/components/ui/badge';
import Tags from './Tags.png';
import Image from 'next/image'
import { PUBLIC_GHOST_TAGS_PANEL_URL } from '@/config/config';

export function TagSelector({ selectedTags, tags, onChange }: { selectedTags: GhostTag[], tags: GhostTag[], onChange?: (tag: GhostTag[]) => void }) {
  const [query, setQuery] = useState('');

  const filteredTags =
    query === ''
      ? tags
      : tags.filter((tag) =>
        tag.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="w-full mx-auto">

      <Combobox immediate value={selectedTags} onChange={onChange} multiple>
        <Combobox.Label>
          <Label htmlFor="tags">Tags <span className="font-light">(opcional)</span></Label>
        </Combobox.Label>

        <div className="relative mt-2">
          <div className="
            relative w-full cursor-default overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-[#4B31DD] focus:border focus:border-[#4B31DD]
            bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md
            flex flex-row items-center
            ">
            {/* <TagIcon color='#3D3D3D' className="ml-3 w-4 h-4 text-muted-foreground justify-self-center" /> */}
            <Image src={Tags} alt="Tags" width={18} height={18} className="ml-3 justify-self-center" />

            <Combobox.Input
              className="
              border-none py-2 pl-4 pr-10 text-sm leading-5 focus:ring-0
              bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md
              grow"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(tag: GhostTag) => tag.name}
              placeholder="Selecione as tags..."
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {/* <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
              <ChevronDownIcon className="ml-auto w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTags.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-10 text-gray-500">
                Nenhuma tag encontrada. { process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <a className="font-semibold text-[#4B31DD]" target='_blank' href={PUBLIC_GHOST_TAGS_PANEL_URL}>Gerenciar suas tags.</a> }
              </div>
            ) : (
              filteredTags.map((tag) => (
                <Combobox.Option
                  key={tag.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={tag}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {tag.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-1 ${active ? 'text-white' : 'text-indigo-600'
                            }`}
                        >
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>

        <div className="flex items-center space-x-2 text-[#3D3D3D] border-0 p-2 rounded-md">
            <div className="flex flex-row grow content-center gap-1">
              {(selectedTags || []).map(t => (
                <Badge key={t.id} variant="secondary" className="bg-[#4B31DD] hover:bg-[#4B31DD] text-white rounded-full">
                  {t.name}
                </Badge>
              ))}
            </div>
          </div>


      </Combobox>
    </div>
  );
}

export default TagSelector;