"use client"

import { useState, useEffect, use } from "react"
import { useTranslations } from "next-intl"
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown } from "lucide-react"
import { Link } from "@/navigation.tsx"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CoinData {
  id: string
  symbol: string
  name: string
  description: { tr?: string; en: string }
  image: { large: string }
  market_data: {
    current_price: { usd: number }
    price_change_percentage_24h: number
    market_cap: { usd: number }
    total_volume: { usd: number }
    circulating_supply: number
    total_supply: number
    max_supply: number | null
    ath: { usd: number }
    atl: { usd: number }
  }
  links: {
    homepage: string[]
    blockchain_site: string[]
  }
}

export default function CoinPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const resolvedParams = use(params)
  const t = useTranslations("coinDetail")
  const [coinData, setCoinData] = useState<CoinData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${resolvedParams.id}?localization=true&tickers=false&market_data=true&community_data=false&developer_data=false`)
        
        if (!response.ok) {
          throw new Error("Coin verileri yüklenemedi")
        }

        const data = await response.json()
        setCoinData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bir hata oluştu")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoinData()
  }, [resolvedParams.id])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="ml-4">{t("loading")}</p>
        </div>
      </div>
    )
  }

  if (error || !coinData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 mb-4">{error || t("error")}</p>
        <Link href="/">
          <Button variant="outline">{t("backToHome")}</Button>
        </Link>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(6)}`
    if (price < 100) return `$${price.toFixed(4)}`
    return `$${price.toFixed(2)}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toFixed(2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("back")}
      </Link>

      {/* Coin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div className="flex items-center">
          <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16 mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">{coinData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{coinData.symbol.toUpperCase()}</p>
          </div>
        </div>
        {coinData.links.homepage[0] && (
          <a
            href={coinData.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("website")}
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        )}
      </div>

      {/* Price and Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("currentPrice")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(coinData.market_data.current_price.usd)}</div>
            <div
              className={`flex items-center mt-2 ${
                coinData.market_data.price_change_percentage_24h >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {coinData.market_data.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("marketCap")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(coinData.market_data.market_cap.usd)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("volume24h")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(coinData.market_data.total_volume.usd)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Market Stats */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("marketStats")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t("circulatingSupply")}</span>
                <span className="font-medium">{formatNumber(coinData.market_data.circulating_supply)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t("totalSupply")}</span>
                <span className="font-medium">
                  {coinData.market_data.total_supply ? formatNumber(coinData.market_data.total_supply) : t("unlimited")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t("maxSupply")}</span>
                <span className="font-medium">
                  {coinData.market_data.max_supply ? formatNumber(coinData.market_data.max_supply) : t("unlimited")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t("ath")}</span>
                <span className="font-medium">{formatPrice(coinData.market_data.ath.usd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t("atl")}</span>
                <span className="font-medium">{formatPrice(coinData.market_data.atl.usd)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("description")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {resolvedParams.locale === "tr" && coinData.description.tr
                ? coinData.description.tr
                : coinData.description.en}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Links */}
      {coinData.links.blockchain_site.filter(Boolean).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("blockchainLinks")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {coinData.links.blockchain_site.filter(Boolean).map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {new URL(link).hostname}
                  <ExternalLink className="inline-block h-4 w-4 ml-2" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 