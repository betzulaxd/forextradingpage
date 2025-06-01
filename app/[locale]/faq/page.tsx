"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Demo FAQ data - Frontend only
const faqData = [
  {
    id: 1,
    category: "Genel",
    categoryEn: "General",
    question: "TradePro nedir?",
    questionEn: "What is TradePro?",
    answer:
      "TradePro, kripto para piyasalarında gerçek zamanlı veriler sunan bir analiz platformudur. CoinGecko API kullanarak güncel fiyat bilgileri, piyasa analizleri ve trend takibi sağlar.",
    answerEn:
      "TradePro is an analysis platform that provides real-time data in cryptocurrency markets. It provides current price information, market analysis and trend tracking using CoinGecko API.",
  },
  {
    id: 2,
    category: "Veriler",
    categoryEn: "Data",
    question: "Veriler ne sıklıkla güncellenir?",
    questionEn: "How often is the data updated?",
    answer:
      "Piyasa verileri 30 saniyede bir otomatik olarak güncellenir. Bu sayede gerçek zamanlı fiyat hareketlerini takip edebilirsiniz.",
    answerEn:
      "Market data is automatically updated every 30 seconds. This way you can track real-time price movements.",
  },
  {
    id: 3,
    category: "Veriler",
    categoryEn: "Data",
    question: "Hangi borsalardan veri alıyorsunuz?",
    questionEn: "Which exchanges do you get data from?",
    answer:
      "CoinGecko API aracılığıyla Binance, Coinbase, Kraken, Huobi ve diğer büyük borsalardan toplanan verileri kullanıyoruz.",
    answerEn:
      "We use data collected from Binance, Coinbase, Kraken, Huobi and other major exchanges through CoinGecko API.",
  },
  {
    id: 4,
    category: "Kullanım",
    categoryEn: "Usage",
    question: "Platform ücretsiz mi?",
    questionEn: "Is the platform free?",
    answer:
      "Evet, TradePro tamamen ücretsiz bir demo platformudur. Tüm temel özellikler herkes tarafından kullanılabilir.",
    answerEn: "Yes, TradePro is a completely free demo platform. All basic features can be used by everyone.",
  },
  {
    id: 5,
    category: "Kullanım",
    categoryEn: "Usage",
    question: "Mobil cihazlarda kullanabilir miyim?",
    questionEn: "Can I use it on mobile devices?",
    answer: "Evet, platformumuz responsive tasarıma sahiptir ve tüm mobil cihazlarda sorunsuz çalışır.",
    answerEn: "Yes, our platform has a responsive design and works seamlessly on all mobile devices.",
  },
  {
    id: 6,
    category: "Teknik",
    categoryEn: "Technical",
    question: "Hangi teknolojiler kullanılıyor?",
    questionEn: "What technologies are used?",
    answer: "Next.js, React, TypeScript, Tailwind CSS ve CoinGecko API kullanılarak geliştirilmiştir.",
    answerEn: "Developed using Next.js, React, TypeScript, Tailwind CSS and CoinGecko API.",
  },
  {
    id: 7,
    category: "Teknik",
    categoryEn: "Technical",
    question: "Verileriniz güvenli mi?",
    questionEn: "Is your data secure?",
    answer:
      "Bu bir demo uygulamadır ve kişisel veri toplamaz. Tüm veriler CoinGecko API'den alınır ve güvenli bir şekilde işlenir.",
    answerEn:
      "This is a demo application and does not collect personal data. All data is retrieved from CoinGecko API and processed securely.",
  },
  {
    id: 8,
    category: "Özellikler",
    categoryEn: "Features",
    question: "Hangi coinleri takip edebilirim?",
    questionEn: "Which coins can I track?",
    answer:
      "Platform üzerinde Bitcoin, Ethereum, ve diğer popüler kripto paraları takip edebilirsiniz. Toplam 50+ coin desteklenmektedir.",
    answerEn:
      "You can track Bitcoin, Ethereum, and other popular cryptocurrencies on the platform. A total of 50+ coins are supported.",
  },
  {
    id: 9,
    category: "Özellikler",
    categoryEn: "Features",
    question: "Fiyat alarmı kurabilir miyim?",
    questionEn: "Can I set price alerts?",
    answer:
      "Bu demo versiyonda fiyat alarmı özelliği bulunmamaktadır. Ancak gerçek zamanlı fiyat takibi yapabilirsiniz.",
    answerEn:
      "Price alert feature is not available in this demo version. However, you can do real-time price tracking.",
  },
  {
    id: 10,
    category: "Destek",
    categoryEn: "Support",
    question: "Teknik destek nasıl alırım?",
    questionEn: "How do I get technical support?",
    answer:
      "İletişim sayfasından bize ulaşabilirsiniz. Bu demo bir uygulama olduğu için gerçek destek hizmeti sunulmamaktadır.",
    answerEn:
      "You can contact us from the contact page. Since this is a demo application, real support service is not provided.",
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openItems, setOpenItems] = useState<number[]>([])

  // Get current locale from URL
  const currentLocale =
    typeof window !== "undefined" ? (window.location.pathname.startsWith("/en") ? "en" : "tr") : "tr"

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const question = currentLocale === "en" ? faq.questionEn : faq.question
    const answer = currentLocale === "en" ? faq.answerEn : faq.answer
    const category = currentLocale === "en" ? faq.categoryEn : faq.category

    const matchesSearch =
      searchTerm === "" ||
      question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || category.toLowerCase() === selectedCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = [
    { value: "all", label: currentLocale === "en" ? "All" : "Tümü" },
    ...Array.from(new Set(faqData.map((faq) => (currentLocale === "en" ? faq.categoryEn : faq.category)))).map(
      (cat) => ({ value: cat.toLowerCase(), label: cat }),
    ),
  ]

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
            {currentLocale === "en" ? "Frequently Asked Questions" : "Sık Sorulan Sorular"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "Find answers to the most frequently asked questions about TradePro"
              : "TradePro hakkında en çok sorulan soruların cevaplarını bulun"}
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={currentLocale === "en" ? "Search questions..." : "Soru ara..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-900"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  {currentLocale === "en" ? "No questions found." : "Soru bulunamadı."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id} className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                                {currentLocale === "en" ? faq.categoryEn : faq.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-black dark:text-white">
                              {currentLocale === "en" ? faq.questionEn : faq.question}
                            </h3>
                          </div>
                          <div className="ml-4">
                            {openItems.includes(faq.id) ? (
                              <ChevronUp className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </button>

                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {currentLocale === "en" ? faq.answerEn : faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            {currentLocale === "en" ? "Couldn't find what you're looking for?" : "Aradığınızı bulamadınız mı?"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "If you have any other questions, feel free to contact us."
              : "Başka sorularınız varsa, bizimle iletişime geçmekten çekinmeyin."}
          </p>
          <Button
            onClick={() => (window.location.href = "/contact")}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {currentLocale === "en" ? "Contact Us" : "İletişime Geçin"}
          </Button>
        </div>
      </section>
    </div>
  )
}
