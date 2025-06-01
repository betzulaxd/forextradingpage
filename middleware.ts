import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale: 'tr',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
