import { getRequestConfig } from 'next-intl/server';
import { locales } from '../i18n.config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.includes(locale as any);
  
  return {
    messages: isValidLocale 
      ? (await import(`../messages/${locale}.json`)).default 
      : {},
    timeZone: 'Europe/Istanbul',
    now: new Date(),
    // Return the locale itself
    locale: isValidLocale ? locale : locales[0]
  };
}); 