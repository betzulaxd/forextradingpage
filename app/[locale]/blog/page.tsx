"use client"

import React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Calendar, User, Tag, Search, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Demo blog posts - Frontend only data
const blogPosts = [
  {
    id: 1,
    title: "Bitcoin 2024 Yılında Neler Bekliyor?",
    titleEn: "What to Expect from Bitcoin in 2024?",
    excerpt: "Bitcoin'in 2024 yılındaki potansiyel fiyat hareketleri ve piyasa analizleri...",
    excerptEn: "Potential Bitcoin price movements and market analysis for 2024...",
    content: "Bitcoin 2024 yılında birçok önemli gelişmeye sahne olacak...",
    contentEn: "Bitcoin will witness many important developments in 2024...",
    author: "Ahmet Yılmaz",
    date: "2024-01-15",
    category: "Analiz",
    categoryEn: "Analysis",
    tags: ["Bitcoin", "2024", "Analiz"],
    tagsEn: ["Bitcoin", "2024", "Analysis"],
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    title: "Ethereum 2.0 ve Staking Rehberi",
    titleEn: "Ethereum 2.0 and Staking Guide",
    excerpt: "Ethereum 2.0 geçişi ve staking işlemleri hakkında bilmeniz gerekenler...",
    excerptEn: "What you need to know about Ethereum 2.0 transition and staking...",
    content: "Ethereum 2.0 ile birlikte gelen yenilikler...",
    contentEn: "Innovations coming with Ethereum 2.0...",
    author: "Elif Kaya",
    date: "2024-01-12",
    category: "Rehber",
    categoryEn: "Guide",
    tags: ["Ethereum", "Staking", "ETH2"],
    tagsEn: ["Ethereum", "Staking", "ETH2"],
    readTime: 8,
    featured: false,
  },
  {
    id: 3,
    title: "DeFi Protokollerinde Risk Yönetimi",
    titleEn: "Risk Management in DeFi Protocols",
    excerpt: "DeFi yatırımlarında dikkat edilmesi gereken riskler ve korunma yöntemleri...",
    excerptEn: "Risks to consider in DeFi investments and protection methods...",
    content: "DeFi protokollerinde risk yönetimi kritik öneme sahip...",
    contentEn: "Risk management in DeFi protocols is critically important...",
    author: "Mehmet Demir",
    date: "2024-01-10",
    category: "Eğitim",
    categoryEn: "Education",
    tags: ["DeFi", "Risk", "Güvenlik"],
    tagsEn: ["DeFi", "Risk", "Security"],
    readTime: 6,
    featured: true,
  },
  {
    id: 4,
    title: "NFT Piyasasında Son Trendler",
    titleEn: "Latest Trends in NFT Market",
    excerpt: "2024 yılında NFT piyasasındaki gelişmeler ve yeni trendler...",
    excerptEn: "Developments and new trends in the NFT market in 2024...",
    content: "NFT piyasası sürekli evrim geçiriyor...",
    contentEn: "The NFT market is constantly evolving...",
    author: "Ayşe Özkan",
    date: "2024-01-08",
    category: "Trend",
    categoryEn: "Trend",
    tags: ["NFT", "Sanat", "Koleksiyon"],
    tagsEn: ["NFT", "Art", "Collection"],
    readTime: 4,
    featured: false,
  },
  {
    id: 5,
    title: "Kripto Para Vergi Rehberi 2024",
    titleEn: "Cryptocurrency Tax Guide 2024",
    excerpt: "Türkiye'de kripto para vergilendirmesi ve beyan süreçleri...",
    excerptEn: "Cryptocurrency taxation and declaration processes in Turkey...",
    content: "Kripto para vergilendirmesi konusunda bilmeniz gerekenler...",
    contentEn: "What you need to know about cryptocurrency taxation...",
    author: "Can Yıldız",
    date: "2024-01-05",
    category: "Hukuk",
    categoryEn: "Legal",
    tags: ["Vergi", "Hukuk", "Türkiye"],
    tagsEn: ["Tax", "Legal", "Turkey"],
    readTime: 10,
    featured: false,
  },
]

export default function BlogPage() {
  const t = useTranslations()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Get current locale from URL
  const currentLocale =
    typeof window !== "undefined" ? (window.location.pathname.startsWith("/en") ? "en" : "tr") : "tr"

  // Filter posts based on search and category
  const filterPosts = () => {
    let filtered = blogPosts

    if (searchTerm) {
      filtered = filtered.filter((post) => {
        const title = currentLocale === "en" ? post.titleEn : post.title
        const excerpt = currentLocale === "en" ? post.excerptEn : post.excerpt
        const tags = currentLocale === "en" ? post.tagsEn : post.tags

        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => {
        const category = currentLocale === "en" ? post.categoryEn : post.category
        return category.toLowerCase() === selectedCategory.toLowerCase()
      })
    }

    setFilteredPosts(filtered)
  }

  // Update filters when search term or category changes
  React.useEffect(() => {
    filterPosts()
  }, [searchTerm, selectedCategory, currentLocale])

  const categories = [
    { value: "all", label: currentLocale === "en" ? "All" : "Tümü" },
    { value: "analiz", label: currentLocale === "en" ? "Analysis" : "Analiz" },
    { value: "rehber", label: currentLocale === "en" ? "Guide" : "Rehber" },
    { value: "eğitim", label: currentLocale === "en" ? "Education" : "Eğitim" },
    { value: "trend", label: currentLocale === "en" ? "Trend" : "Trend" },
    { value: "hukuk", label: currentLocale === "en" ? "Legal" : "Hukuk" },
  ]

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
            {currentLocale === "en" ? "Crypto Blog" : "Kripto Blog"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "Latest news, analysis and guides from the cryptocurrency world"
              : "Kripto para dünyasından en güncel haberler, analizler ve rehberler"}
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={currentLocale === "en" ? "Search articles..." : "Makale ara..."}
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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
              {currentLocale === "en" ? "Featured Articles" : "Öne Çıkan Makaleler"}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {currentLocale === "en" ? "Featured" : "Öne Çıkan"}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime} {currentLocale === "en" ? "min read" : "dk okuma"}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {currentLocale === "en" ? post.titleEn : post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {currentLocale === "en" ? post.excerptEn : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString(currentLocale === "en" ? "en-US" : "tr-TR")}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {currentLocale === "en" ? post.categoryEn : post.category}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(currentLocale === "en" ? post.tagsEn : post.tags).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
            {currentLocale === "en" ? "Latest Articles" : "Son Makaleler"}
          </h2>

          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {currentLocale === "en" ? "No articles found." : "Makale bulunamadı."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {currentLocale === "en" ? post.categoryEn : post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime} {currentLocale === "en" ? "min" : "dk"}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {currentLocale === "en" ? post.titleEn : post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {currentLocale === "en" ? post.excerptEn : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.date).toLocaleDateString(currentLocale === "en" ? "en-US" : "tr-TR")}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(currentLocale === "en" ? post.tagsEn : post.tags).slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">
            {currentLocale === "en" ? "Stay Updated" : "Güncel Kalın"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "Subscribe to our newsletter to get the latest crypto news and analysis."
              : "En güncel kripto haberleri ve analizleri almak için bültenimize abone olun."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={currentLocale === "en" ? "Enter your email" : "E-posta adresinizi girin"}
              className="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
            <Button
              onClick={() =>
                alert(
                  currentLocale === "en"
                    ? "This is a demo app. Newsletter subscription is not available."
                    : "Bu bir demo uygulamadır. Bülten aboneliği bulunmamaktadır.",
                )
              }
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              {currentLocale === "en" ? "Subscribe" : "Abone Ol"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
