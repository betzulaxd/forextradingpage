"use client"

import { useTranslations } from "next-intl"
import { Users, Shield, Zap, Target, Award, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const t = useTranslations()

  const features = [
    {
      icon: Users,
      title: "Uzman Ekip",
      description: "Kripto para ve finans alanında uzman ekibimizle güvenilir hizmet sunuyoruz.",
    },
    {
      icon: Shield,
      title: "Güvenlik",
      description: "En yüksek güvenlik standartları ile verilerinizi koruyoruz.",
    },
    {
      icon: Zap,
      title: "Hızlı Performans",
      description: "Milisaniye cinsinden güncel veriler ile hızlı işlem deneyimi.",
    },
    {
      icon: Target,
      title: "Doğruluk",
      description: "Doğrudan kaynaklardan alınan verilerle %100 doğru bilgi.",
    },
    {
      icon: Award,
      title: "Kalite",
      description: "Sektörde kalite standartlarını belirleyen öncü platform.",
    },
    {
      icon: Globe,
      title: "Global Erişim",
      description: "Dünya çapında 7/24 kesintisiz hizmet sunuyoruz.",
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">{t("about.title")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            TradePro olarak, kripto para dünyasında güvenilir ve doğru bilgiye ulaşmanın ne kadar önemli olduğunu
            biliyoruz. Bu nedenle, en güncel ve doğru piyasa verilerini sizlere sunmak için çalışıyoruz.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Misyonumuz</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Kripto para yatırımcılarına en doğru, güncel ve güvenilir piyasa verilerini sunarak, bilinçli yatırım
                kararları almalarına yardımcı olmak.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Karmaşık piyasa verilerini anlaşılır hale getirerek, hem yeni başlayanlar hem de deneyimli yatırımcılar
                için erişilebilir bir platform oluşturmak.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Vizyonumuz</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Kripto para dünyasında en güvenilir ve kapsamlı veri platformu olmak. Teknoloji ve inovasyonla sektöre
                öncülük etmek.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Global ölçekte, tüm yatırımcıların tercih ettiği, güvenilir ve kullanıcı dostu kripto para analiz
                platformu haline gelmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Neden TradePro?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sektördeki deneyimimiz ve teknolojik altyapımızla size en iyi hizmeti sunuyoruz
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-black dark:text-white mb-4" />
                  <CardTitle className="text-black dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Ekibimiz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Finans, teknoloji ve kripto para alanlarında uzman ekibimiz
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Ahmet Yılmaz",
                role: "CEO & Kurucu",
                description: "15 yıllık finans deneyimi, blockchain uzmanı",
              },
              {
                name: "Elif Kaya",
                role: "CTO",
                description: "Yazılım geliştirme ve sistem mimarisi uzmanı",
              },
              {
                name: "Mehmet Demir",
                role: "Veri Analisti",
                description: "Kripto para piyasaları ve teknik analiz uzmanı",
              },
            ].map((member, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900 text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-2">{member.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-4xl font-bold text-black dark:text-white mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Takip Edilen Coin</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black dark:text-white mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">Aktif Kullanıcı</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black dark:text-white mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black dark:text-white mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Destek</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
