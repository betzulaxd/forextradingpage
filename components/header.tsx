"use client"

import { useState } from "react"
import { BarChart3, Menu, X, Globe } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { Link, useRouter, usePathname } from "@/navigation.tsx"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { locales } from "@/i18n.config"

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.market"), href: "/#market" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.contact"), href: "/contact" },
    { name: t("navigation.blog"), href: "/blog" },
    { name: t("navigation.faq"), href: "/faq" },
  ]

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname.split('/').slice(2).join('/');
    router.push(`${newLocale}${currentPath ? `/${currentPath}` : ''}`);
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-black dark:text-white" />
            <span className="text-2xl font-bold text-black dark:text-white">TradePro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <Globe className="h-4 w-4 mr-2" />
                  {locale.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((loc) => (
                  <DropdownMenuItem key={loc} onClick={() => handleLanguageChange(loc)}>
                    {loc === "tr" ? "🇹🇷 Türkçe" : "🇺🇸 English"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <div className="hidden md:flex">
              <Button
                variant="outline"
                className="border-gray-300 text-black hover:bg-black hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-black"
                onClick={() => router.push(`/${locale}/login`)}
              >
                {t("navigation.login")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-4 mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => router.push(`/${locale}/login`)}
                >
                  {t("navigation.login")}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
