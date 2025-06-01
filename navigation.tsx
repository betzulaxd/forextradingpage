'use client';

import { useRouter as useNextRouter, usePathname as useNextPathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import NextLink from 'next/link';
import { ComponentProps } from 'react';
import { locales } from './i18n.config';

export function useRouter() {
  const router = useNextRouter();
  const locale = useLocale();

  return {
    ...router,
    push: (href: string) => {
      if (href.startsWith('http')) {
        window.location.href = href;
        return;
      }
      router.push(`/${href}`);
    }
  };
}

export function usePathname() {
  const pathname = useNextPathname();
  const locale = useLocale();
  return pathname;
}

export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return <NextLink href={href} {...props} />;
  }

  if (locales.includes(href)) {
    return <NextLink href={`/${href}`} {...props} />;
  }

  return <NextLink href={`/${locale}${href.startsWith('/') ? href : `/${href}`}`} {...props} />;
} 