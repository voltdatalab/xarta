import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { GhostTag } from '@/components/types/GhostTag';
import { ChevronDownIcon } from '../../Xarta/Icons/ChevronDownIcon';
import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Tags from './Tags.png';
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { XartaConfig } from "@/config/XartaConfig";

export function TagSelector(
  { config, selectedTags = [], tags = [], onChange, showTitle = true, extraClasses = '', wrapperClasses = '', onCreate }: 
  { config: Pick<XartaConfig, "PUBLIC_GHOST_TAGS_PANEL_URL">, selectedTags?: GhostTag[], tags?: GhostTag[], onChange?: (tag: GhostTag[]) => void, showTitle?: boolean, extraClasses?: string, wrapperClasses?: string,
    onCreate?: (tagName: string) => void
   }
) {

  const t = useTranslations('strings');

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
        {showTitle ? <Combobox.Label>
          <Label htmlFor="tags">{t('TAGS_TEXT')} <span className="font-light">({t('OPTIONAL_TEXT')})</span></Label>
        </Combobox.Label> : null}

        <div className={cn("relative mt-2", wrapperClasses)}>
          <div className={cn(`
            relative w-full cursor-default overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-[#4B31DD] focus:border focus:border-[#4B31DD]
            bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md 
            flex flex-row items-center
          `, extraClasses)}>
            <Image src={Tags} alt={t('TAGS_TEXT')} width={18} height={18} className="ml-3 justify-self-center" />

            <Combobox.Input
              className="
              border-none py-2 pl-4 pr-10 text-sm leading-5 focus:ring-0
              bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md
              grow"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(tag: GhostTag) => tag.name}
              placeholder={t('SELECT_TAGS_PLACEHOLDER')}
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
                {t('NO_TAGS_FOUND_TEXT')}
              </div>
            ) : (
              filteredTags.map((tag) => (
                <Combobox.Option
                  //TODO: Improve tag.id || tag.name
                  key={tag.id || tag.name}
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
            <div aria-hidden="true" className="flex flex-col justify-items-center items-center">
              <div className="w-1/2 border-t border-gray-100" />
            </div>
           { (query && onCreate) ? <div className="cursor-pointer relative cursor-default select-none py-2 px-10 text-gray-500" onClick={() => {
            onCreate?.(query);
            setQuery('');
           }}>
              <a className="font-medium text-[#4B31DD]">{t('ADD_TAG_TEXT')} <span className="text-black">&quot;{query}&quot;</span></a>
            </div>   : null }         
            <div className="relative cursor-pointer select-none py-2 px-10 text-gray-500">
              {process.env.NEXT_PUBLIC_DEMO_USERNAME ? null : <a className="font-medium text-[#4B31DD]" target='_blank' href={config.PUBLIC_GHOST_TAGS_PANEL_URL}>{t('MANAGE_TAGS_TEXT')}</a>}
            </div>
          </Combobox.Options>
        </div>

        {showTitle ? <div className="flex items-center space-x-2 text-[#3D3D3D] border-0 p-2 rounded-md">
          <div className="flex flex-row grow content-center gap-1">
            {(selectedTags || []).map(t => (
              //TODO: Improve t.id || t.name
              <Badge key={t.id || t.name} variant="secondary" className="bg-[#4B31DD] hover:bg-[#4B31DD] text-white rounded-full">
                {t.name}
              </Badge>
            ))}
          </div>
        </div> : null}


      </Combobox>
    </div>
  );
}

export default TagSelector;