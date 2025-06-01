"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  ExternalLink,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

interface CoinDetail {
  id: string
  symbol: string
  name: string
  description: {
    en: string
  }
  image: {
    large: string
  }
  market_data: {
    current_price: {
      usd: number
    }
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
    circulating_supply: number
    total_supply: number
    max_supply: number
    ath: {
      usd: number
    }
    ath_date: {
      usd: string
    }
    atl: {
      usd: number
    }
    atl_date: {
      usd: string
    }
  }
  links: {
    homepage: string[]
    blockchain_site: string[]
  }
  genesis_date: string
}

interface PriceHistory {
  prices: [number, number][]
}

export default function CoinDetailPage() {
  const params = useParams()
  const router = useRouter()
  const coinId = params.id as string

  const [coinDetail, setCoinDetail] = useState<CoinDetail | null>(null)
  const [priceHistory, setPriceHistory] = useState<PriceHistory | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7")

  // Coin detaylarını çek
  const fetchCoinDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [detailResponse, historyResponse] = await Promise.all([
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`,
        ),
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeRange}`),
      ])

      if (!detailResponse.ok || !historyResponse.ok) {
        throw new Error("Coin verileri yüklenemedi")
      }

      const detailData = await detailResponse.json()
      const historyData = await historyResponse.json()

      setCoinDetail(detailData)
      setPriceHistory(historyData)
    } catch (error) {
      console.error("Coin detayları yüklenirken hata:", error)
      setError("Coin verileri yüklenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (coinId) {
      fetchCoinDetail()
    }
  }, [coinId, timeRange])

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

  const formatSupply = (supply: number) => {
    if (supply >= 1e9) {
      return `${(supply / 1e9).toFixed(2)}B`
    } else if (supply >= 1e6) {
      return `${(supply / 1e6).toFixed(2)}M`
    } else if (supply >= 1e3) {
      return `${(supply / 1e3).toFixed(2)}K`
    }
    return supply?.toFixed(0) || "N/A"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">Coin detayları yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !coinDetail) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || "Coin bulunamadı"}</p>
          <Button onClick={() => router.push("/")} variant="outline">
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-black dark:text-white" />
                <span className="text-2xl font-bold text-black dark:text-white">TradePro</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Coin Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={coinDetail.image.large || "/placeholder.svg"}
              alt={coinDetail.name}
              className="w-16 h-16 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=64&width=64"
              }}
            />
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white">
                {coinDetail.name} ({coinDetail.symbol.toUpperCase()})
              </h1>
              <div className="flex items-center space-x-4 mt-2">
                {coinDetail.links.homepage[0] && (
                  <a
                    href={coinDetail.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Price Info */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Güncel Fiyat</span>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-black dark:text-white">
                  {formatPrice(coinDetail.market_data.current_price.usd)}
                </div>
                <div
                  className={`flex items-center space-x-1 mt-2 ${
                    coinDetail.market_data.price_change_percentage_24h >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {coinDetail.market_data.price_change_percentage_24h >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {Math.abs(coinDetail.market_data.price_change_percentage_24h).toFixed(2)}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">24s</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Piyasa Değeri</span>
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-xl font-bold text-black dark:text-white">
                  {formatVolume(coinDetail.market_data.market_cap.usd)}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">24s Hacim</span>
                  <Activity className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-xl font-bold text-black dark:text-white">
                  {formatVolume(coinDetail.market_data.total_volume.usd)}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Dolaşımdaki Arz</span>
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-xl font-bold text-black dark:text-white">
                  {formatSupply(coinDetail.market_data.circulating_supply)}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price Changes */}
        <Card className="mb-8 border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">Fiyat Değişimleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">24 Saat</div>
                <div
                  className={`text-lg font-semibold ${
                    coinDetail.market_data.price_change_percentage_24h >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {coinDetail.market_data.price_change_percentage_24h?.toFixed(2) || "N/A"}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">7 Gün</div>
                <div
                  className={`text-lg font-semibold ${
                    coinDetail.market_data.price_change_percentage_7d >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {coinDetail.market_data.price_change_percentage_7d?.toFixed(2) || "N/A"}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">30 Gün</div>
                <div
                  className={`text-lg font-semibold ${
                    coinDetail.market_data.price_change_percentage_30d >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {coinDetail.market_data.price_change_percentage_30d?.toFixed(2) || "N/A"}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Statistics */}
        <Card className="mb-8 border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-black dark:text-white">Piyasa İstatistikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">En Yüksek (ATH)</span>
                  <div className="text-right">
                    <div className="font-semibold text-black dark:text-white">
                      {formatPrice(coinDetail.market_data.ath.usd)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(coinDetail.market_data.ath_date.usd).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">En Düşük (ATL)</span>
                  <div className="text-right">
                    <div className="font-semibold text-black dark:text-white">
                      {formatPrice(coinDetail.market_data.atl.usd)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(coinDetail.market_data.atl_date.usd).toLocaleDateString("tr-TR")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Toplam Arz</span>
                  <span className="font-semibold text-black dark:text-white">
                    {formatSupply(coinDetail.market_data.total_supply)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Maksimum Arz</span>
                  <span className="font-semibold text-black dark:text-white">
                    {coinDetail.market_data.max_supply ? formatSupply(coinDetail.market_data.max_supply) : "Sınırsız"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        {coinDetail.description.en && (
          <Card className="mb-8 border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-black dark:text-white">Hakkında {coinDetail.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: coinDetail.description.en.split(". ").slice(0, 3).join(". ") + ".",
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Simple Price Chart */}
        {priceHistory && (
          <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-black dark:text-white">Fiyat Geçmişi</CardTitle>
                <div className="flex space-x-2">
                  {["1", "7", "30", "90"].map((days) => (
                    <Button
                      key={days}
                      variant={timeRange === days ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange(days)}
                      className="text-xs"
                    >
                      {days === "1" ? "1G" : `${days}G`}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-1">
                {priceHistory.prices.slice(-50).map((price, index) => {
                  const height =
                    ((price[1] - Math.min(...priceHistory.prices.map((p) => p[1]))) /
                      (Math.max(...priceHistory.prices.map((p) => p[1])) -
                        Math.min(...priceHistory.prices.map((p) => p[1])))) *
                    100

                  return (
                    <div
                      key={index}
                      className="bg-blue-500 dark:bg-blue-400 rounded-t flex-1 min-w-0"
                      style={{ height: `${Math.max(height, 2)}%` }}
                      title={`${formatPrice(price[1])} - ${new Date(price[0]).toLocaleDateString()}`}
                    />
                  )
                })}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                Son {timeRange} günlük fiyat hareketi
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
