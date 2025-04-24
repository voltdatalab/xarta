import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronDownIcon } from '../Xarta/Icons/ChevronDownIcon';
import { CheckIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

export interface Language {
  code: string;
  name: string;
}

export function LanguageSelector(
  { 
    selectedLanguage, 
    languages = [], 
    onChange, 
    showTitle = true, 
    extraClasses = '', 
    wrapperClasses = '' 
  }: { 
    selectedLanguage?: Language, 
    languages: Language[], 
    onChange?: (language: Language) => void, 
    showTitle?: boolean, 
    extraClasses?: string, 
    wrapperClasses?: string
  }
) {
  const t = useTranslations('strings');
  const [query, setQuery] = useState('');

  const filteredLanguages =
    query === ''
      ? languages
      : languages.filter((language) =>
        language.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="w-full mx-auto">
      <Combobox value={selectedLanguage} onChange={onChange}>
        {showTitle ? <Combobox.Label>
          <Label htmlFor="language">{t('LANGUAGE')}</Label>
        </Combobox.Label> : null}
        <div className={cn("relative mt-2", wrapperClasses)}>
          <div className={cn(`
            relative w-full cursor-default overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-[#4B31DD] focus:border focus:border-[#4B31DD]
            bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md 
            flex flex-row items-center
          `, extraClasses)}>
            <Globe className="ml-3 w-5 h-5 text-[#4B31DD]" />

            <Combobox.Input
              className="
              border-none py-2 pl-4 pr-10 text-sm leading-5 focus:ring-0
              bg-[#EEEDF2] text-[#3D3D3D] border-0 rounded-md
              grow"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(language: Language) => language?.name || ''}
              placeholder={t('SELECT_LANGUAGE')}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="ml-auto w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredLanguages.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-10 text-gray-500">
                {t('NO_LANGUAGES_FOUND')}
              </div>
            ) : (
              filteredLanguages.map((language) => (
                <Combobox.Option
                  key={language.code}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={language}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {language.name}
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
      </Combobox>
    </div>
  );
}

export default LanguageSelector;
