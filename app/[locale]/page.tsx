"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Shield,
  Zap,
  RefreshCw,
  Search,
  Filter,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CoinData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
  market_cap: number
  last_updated: string
}

export default function HomePage() {
  const t = useTranslations()
  const router = useRouter()

  const [marketData, setMarketData] = useState<CoinData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")
  const [priceFilter, setPriceFilter] = useState("all")
  const [changeFilter, setChangeFilter] = useState("all")
  const [filteredData, setFilteredData] = useState<CoinData[]>([])

  useEffect(() => {
    // Saat güncellemesi için interval
    const updateTime = () => {
      setLastUpdate(new Date().toLocaleTimeString())
    }
    updateTime() // İlk değeri ayarla
    const timeInterval = setInterval(updateTime, 1000)

    // Market verilerini çek
    const fetchMarketData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        )
        if (!response.ok) throw new Error("API isteği başarısız")
        const data = await response.json()
        setMarketData(data)
      } catch (error) {
        console.error("Veri çekme hatası:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMarketData()
    const dataInterval = setInterval(fetchMarketData, 30000)

    // Cleanup
    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
    }
  }, [])

  // Filtreleme ve arama fonksiyonu
  useEffect(() => {
    let filtered = [...marketData]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Fiyat filtresi
    if (priceFilter !== "all") {
      switch (priceFilter) {
        case "under1":
          filtered = filtered.filter((coin) => coin.current_price < 1)
          break
        case "1to100":
          filtered = filtered.filter((coin) => coin.current_price >= 1 && coin.current_price <= 100)
          break
        case "100to1000":
          filtered = filtered.filter((coin) => coin.current_price > 100 && coin.current_price <= 1000)
          break
        case "over1000":
          filtered = filtered.filter((coin) => coin.current_price > 1000)
          break
      }
    }

    // Değişim filtresi
    if (changeFilter !== "all") {
      switch (changeFilter) {
        case "positive":
          filtered = filtered.filter((coin) => coin.price_change_percentage_24h > 0)
          break
        case "negative":
          filtered = filtered.filter((coin) => coin.price_change_percentage_24h < 0)
          break
        case "high_gain":
          filtered = filtered.filter((coin) => coin.price_change_percentage_24h > 5)
          break
        case "high_loss":
          filtered = filtered.filter((coin) => coin.price_change_percentage_24h < -5)
          break
      }
    }

    // Sıralama
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.current_price - b.current_price)
        break
      case "price_desc":
        filtered.sort((a, b) => b.current_price - a.current_price)
        break
      case "change_asc":
        filtered.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
        break
      case "change_desc":
        filtered.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        break
      case "volume_desc":
        filtered.sort((a, b) => b.total_volume - a.total_volume)
        break
      case "market_cap_desc":
      default:
        filtered.sort((a, b) => b.market_cap - a.market_cap)
        break
    }

    setFilteredData(filtered)
  }, [marketData, searchTerm, sortBy, priceFilter, changeFilter])

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`
    } else if (price < 100) {
      return `$${price.toFixed(4)}`
    } else {
      return `$${price.toFixed(2)}`
    }
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`
    } else if (volume >= 1e3) {
      return `$${(volume / 1e3).toFixed(2)}K`
    }
    return `$${volume.toFixed(2)}`
  }

  return (
    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
            {t("hero.title")}
            <span className="block">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>
              {t("hero.lastUpdate")}: {lastUpdate}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Bu butona tıklandığında yapılması gereken işlemler burada yazılabilir
              }}
              disabled={isLoading}
              className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section id="market" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">{t("market.title")}</h2>
            <p className="text-gray-600 dark:text-gray-400">{t("market.description")}</p>
          </div>

          {/* Arama ve Filtreleme */}
          <div className="mb-8 space-y-4">
            {/* Arama Çubuğu */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t("market.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:border-black dark:focus:border-gray-500"
              />
            </div>

            {/* Filtreler */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("market.filters")}:
                </span>
              </div>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-48 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                  <SelectValue placeholder="Fiyat Aralığı" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                  <SelectItem value="all">{t("market.allPrices")}</SelectItem>
                  <SelectItem value="under1">{t("market.under1")}</SelectItem>
                  <SelectItem value="1to100">{t("market.1to100")}</SelectItem>
                  <SelectItem value="100to1000">{t("market.100to1000")}</SelectItem>
                  <SelectItem value="over1000">{t("market.over1000")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={changeFilter} onValueChange={setChangeFilter}>
                <SelectTrigger className="w-48 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                  <SelectValue placeholder="24s Değişim" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                  <SelectItem value="all">{t("market.allChanges")}</SelectItem>
                  <SelectItem value="positive">{t("market.positive")}</SelectItem>
                  <SelectItem value="negative">{t("market.negative")}</SelectItem>
                  <SelectItem value="high_gain">{t("market.highGain")}</SelectItem>
                  <SelectItem value="high_loss">{t("market.highLoss")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sonuç Sayısı */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              {filteredData.length} {t("market.coinsShowing")}
              {searchTerm && ` "${searchTerm}" ${t("market.for")}`}
            </div>
          </div>

          {isLoading && marketData.length === 0 ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">{t("market.loading")}</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-8 w-8 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400">{t("market.noResults")}</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setPriceFilter("all")
                  setChangeFilter("all")
                  setSortBy("market_cap_desc")
                }}
                className="mt-4 dark:border-gray-700 dark:text-white"
              >
                {t("market.clearFilters")}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                {/* Tablo Header */}
                <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-semibold text-sm text-gray-700 dark:text-gray-300">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => setSortBy(sortBy === "market_cap_desc" ? "market_cap_asc" : "market_cap_desc")}
                  >
                    <span>{t("market.rank")}</span>
                    <span>{t("market.coin")}</span>
                    {sortBy.includes("market_cap") &&
                      (sortBy === "market_cap_desc" ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      ))}
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer text-right"
                    onClick={() => setSortBy(sortBy === "price_desc" ? "price_asc" : "price_desc")}
                  >
                    <span>{t("market.price")}</span>
                    {sortBy.includes("price") &&
                      (sortBy === "price_desc" ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      ))}
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer text-right"
                    onClick={() => setSortBy(sortBy === "change_desc" ? "change_asc" : "change_desc")}
                  >
                    <span>{t("market.change24h")}</span>
                    {sortBy.includes("change") &&
                      (sortBy === "change_desc" ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      ))}
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer text-right"
                    onClick={() => setSortBy(sortBy === "volume_desc" ? "volume_asc" : "volume_desc")}
                  >
                    <span>{t("market.volume24h")}</span>
                    {sortBy.includes("volume") &&
                      (sortBy === "volume_desc" ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      ))}
                  </div>
                  <div className="text-right">{t("market.marketCap")}</div>
                  <div className="text-center">{t("market.trend")}</div>
                </div>

                {/* Tablo Body */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredData.map((coin, index) => (
                    <div
                      key={coin.id}
                      className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                      onClick={() => router.push(`/coin/${coin.id}`)}
                    >
                      {/* Rank & Coin Info */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 w-6">{index + 1}</span>
                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                            {coin.symbol.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-black dark:text-white text-sm">
                            {coin.symbol.toUpperCase()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-20">
                            {coin.name}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-black dark:text-white">
                          {formatPrice(coin.current_price)}
                        </div>
                      </div>

                      {/* 24h Change */}
                      <div className="text-right">
                        <div
                          className={`font-semibold flex items-center justify-end space-x-1 ${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span>{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                        </div>
                      </div>

                      {/* Volume */}
                      <div className="text-right">
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          {formatVolume(coin.total_volume)}
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div className="text-right">
                        <div className="font-medium text-gray-700 dark:text-gray-300">
                          {formatVolume(coin.market_cap)}
                        </div>
                      </div>

                      {/* Trend Indicator */}
                      <div className="flex justify-center">
                        <div
                          className={`w-12 h-6 rounded-full flex items-center justify-center ${
                            coin.price_change_percentage_24h >= 0
                              ? "bg-green-100 dark:bg-green-900"
                              : "bg-red-100 dark:bg-red-900"
                          }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">{t("about.title")}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("about.description")}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-black dark:text-white mb-4" />
                <CardTitle className="text-black dark:text-white">{t("about.realData.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{t("about.realData.description")}</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-black dark:text-white mb-4" />
                <CardTitle className="text-black dark:text-white">{t("about.reliableSource.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{t("about.reliableSource.description")}</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 mx-auto text-black dark:text-white mb-4" />
                <CardTitle className="text-black dark:text-white">{t("about.liveUpdate.title")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">{t("about.liveUpdate.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-3xl font-bold text-black dark:text-white mb-2">{filteredData.length}</div>
              <div className="text-gray-600 dark:text-gray-400">{t("stats.coinsShown")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black dark:text-white mb-2">30s</div>
              <div className="text-gray-600 dark:text-gray-400">{t("stats.updateFreq")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black dark:text-white mb-2">7/24</div>
              <div className="text-gray-600 dark:text-gray-400">{t("stats.uptime")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black dark:text-white mb-2">API</div>
              <div className="text-gray-600 dark:text-gray-400">{t("stats.realtime")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
