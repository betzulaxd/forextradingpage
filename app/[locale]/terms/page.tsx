"use client"

export default function TermsPage() {
  // Get current locale from URL
  const currentLocale =
    typeof window !== "undefined" ? (window.location.pathname.startsWith("/en") ? "en" : "tr") : "tr"

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
            {currentLocale === "en" ? "Terms of Service" : "Kullanım Şartları"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "Please read these terms carefully before using TradePro"
              : "TradePro'yu kullanmadan önce lütfen bu şartları dikkatlice okuyun"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentLocale === "en" ? "Last updated: January 2024" : "Son güncelleme: Ocak 2024"}
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            {currentLocale === "en" ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    By accessing and using TradePro, you accept and agree to be bound by the terms and provision of this
                    agreement. This is a demo application created for educational and demonstration purposes only.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Demo Application Notice</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro is a demonstration application and should not be used for actual trading decisions. All
                    data is provided for educational purposes only and may not reflect real market conditions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Data Sources</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Market data is provided by CoinGecko API. We do not guarantee the accuracy, completeness, or
                    timeliness of any information displayed on this platform.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. No Financial Advice</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    The information provided on TradePro is for educational purposes only and should not be considered
                    as financial advice. Always consult with qualified financial advisors before making investment
                    decisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Limitation of Liability</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro and its creators shall not be liable for any direct, indirect, incidental, special, or
                    consequential damages resulting from the use of this application.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">6. Privacy</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This demo application does not collect personal data. Any form submissions are stored locally in
                    your browser and are not transmitted to any servers.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">7. Changes to Terms</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                    posting on this page.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Şartların Kabulü</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro'ya erişerek ve kullanarak, bu sözleşmenin şart ve hükümlerine bağlı olmayı kabul etmiş
                    sayılırsınız. Bu, yalnızca eğitim ve gösteri amaçları için oluşturulmuş bir demo uygulamadır.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Demo Uygulama Bildirimi</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro bir demo uygulamadır ve gerçek ticaret kararları için kullanılmamalıdır. Tüm veriler
                    yalnızca eğitim amaçlıdır ve gerçek piyasa koşullarını yansıtmayabilir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Veri Kaynakları</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Piyasa verileri CoinGecko API tarafından sağlanmaktadır. Bu platformda görüntülenen bilgilerin
                    doğruluğu, eksiksizliği veya güncelliği konusunda garanti vermiyoruz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. Finansal Tavsiye Değildir</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro'da sağlanan bilgiler yalnızca eğitim amaçlıdır ve finansal tavsiye olarak
                    değerlendirilmemelidir. Yatırım kararları vermeden önce her zaman nitelikli finansal danışmanlarla
                    görüşün.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Sorumluluk Sınırlaması</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro ve yaratıcıları, bu uygulamanın kullanımından kaynaklanan doğrudan, dolaylı, tesadüfi, özel
                    veya sonuçsal zararlardan sorumlu tutulamaz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">6. Gizlilik</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu demo uygulama kişisel veri toplamaz. Form gönderileri tarayıcınızda yerel olarak saklanır ve
                    hiçbir sunucuya iletilmez.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">7. Şartlarda Değişiklik</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu şartları istediğimiz zaman değiştirme hakkını saklı tutarız. Değişiklikler bu sayfada
                    yayınlandığı anda derhal yürürlüğe girer.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
