"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getLanguage, setLanguage } from "@/lib/translations"

type LanguageContextType = {
  language: string
  changeLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "tr",
  changeLanguage: () => {},
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setCurrentLanguage] = useState("tr")

  useEffect(() => {
    // Client-side'da localStorage'dan dil bilgisini al
    const savedLanguage = getLanguage()
    setCurrentLanguage(savedLanguage)
  }, [])

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    setCurrentLanguage(lang)
  }

  return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>
}
