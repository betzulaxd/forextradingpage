"use client"

import { BarChart3, Mail, Phone, MapPin, Twitter, Github, Linkedin, Facebook } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function Footer() {
  const t = useTranslations()

  const quickLinks = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.market"), href: "/#market" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.blog"), href: "/blog" },
  ]

  const supportLinks = [
    { name: t("footer.helpCenter"), href: "/help" },
    { name: t("navigation.faq"), href: "/faq" },
    { name: t("navigation.contact"), href: "/contact" },
  ]

  const legalLinks = [
    { name: t("footer.terms"), href: "/terms" },
    { name: t("footer.privacy"), href: "/privacy" },
  ]

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "Github", icon: Github, href: "https://github.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-8 w-8 text-black dark:text-white" />
              <span className="text-2xl font-bold text-black dark:text-white">TradePro</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{t("footer.description")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">{t("footer.support")}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-black dark:text-white mb-4 mt-6">{t("footer.legal")}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-black dark:text-white mb-4">{t("footer.contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">info@tradepro.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">+90 212 555 0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{t("footer.addressText")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">© 2024 TradePro. {t("footer.rights")}</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2 md:mt-0">{t("footer.dataSource")}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
