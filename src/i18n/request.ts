import { getRequestConfig } from 'next-intl/server';
import { INTERNAL_NEXT_API_BASE_URL } from '@/config/config';

export default getRequestConfig(async () => {

  try {
    const apiUrl = `${INTERNAL_NEXT_API_BASE_URL}/config/selected-language`;
    const locale = await (await fetch(apiUrl)).json();

    // Fetch translations from the API
    const response = await fetch(`${INTERNAL_NEXT_API_BASE_URL}/translations/${locale.code}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch translations for ${JSON.stringify(locale)}`);
    }
    const messages = await response.json();

    return {
      locale: locale.code,
      messages
    };
  } catch (error) {
    console.error(`Error loading translations: `, error);

    // TODO: This is necessary because of Next.js SSR,
    // the API will not be running during next build

    const messages = (await import(`../../messages/${`en`}.json`)).default;

    return {
      locale: `en`,
      messages
    };

  }
});