"use client"

export default function PrivacyPage() {
  // Get current locale from URL
  const currentLocale =
    typeof window !== "undefined" ? (window.location.pathname.startsWith("/en") ? "en" : "tr") : "tr"

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">
            {currentLocale === "en" ? "Privacy Policy" : "Gizlilik Politikası"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {currentLocale === "en"
              ? "Learn how we protect your privacy and handle your data"
              : "Gizliliğinizi nasıl koruduğumuz ve verilerinizi nasıl işlediğimiz hakkında bilgi edinin"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentLocale === "en" ? "Last updated: January 2024" : "Son güncelleme: Ocak 2024"}
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            {currentLocale === "en" ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro is a demo application that does not collect, store, or process any personal information. We
                    do not require user registration, and no personal data is transmitted to our servers.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Local Storage</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Any form submissions (such as contact forms) are stored locally in your browser's localStorage. This
                    data remains on your device and is not shared with any third parties or transmitted to external
                    servers.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Third-Party Services</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We use CoinGecko API to fetch cryptocurrency market data. Please refer to CoinGecko's privacy policy
                    for information about how they handle data. We do not share any user information with CoinGecko.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. Cookies</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This application may use minimal cookies for theme preferences and language settings. These cookies
                    are essential for the functionality of the application and do not track personal information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Data Security</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Since we do not collect personal data, there are no security risks related to data breaches. All
                    data processing happens locally in your browser.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">6. Children's Privacy</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This application does not collect any information from children under 13 years of age. Since no
                    personal data is collected, there are no special provisions needed for children's privacy.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">7. Changes to Privacy Policy</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We may update this privacy policy from time to time. Any changes will be posted on this page with an
                    updated revision date.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">8. Contact Information</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    If you have any questions about this privacy policy, please contact us through the contact page.
                    Note that this is a demo application and responses may not be available.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">1. Topladığımız Bilgiler</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    TradePro, herhangi bir kişisel bilgi toplamayan, saklamayan veya işlemeyen bir demo uygulamadır.
                    Kullanıcı kaydı gerektirmiyoruz ve hiçbir kişisel veri sunucularımıza iletilmez.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">2. Yerel Depolama</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Form gönderimleri (iletişim formları gibi) tarayıcınızın localStorage'ında yerel olarak saklanır. Bu
                    veriler cihazınızda kalır ve üçüncü taraflarla paylaşılmaz veya harici sunuculara iletilmez.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">3. Üçüncü Taraf Hizmetleri</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kripto para piyasa verilerini almak için CoinGecko API'sini kullanıyoruz. Verileri nasıl işledikleri
                    hakkında bilgi için lütfen CoinGecko'nun gizlilik politikasına bakın. CoinGecko ile hiçbir kullanıcı
                    bilgisi paylaşmıyoruz.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">4. Çerezler</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu uygulama tema tercihleri ve dil ayarları için minimal çerezler kullanabilir. Bu çerezler
                    uygulamanın işlevselliği için gereklidir ve kişisel bilgileri takip etmez.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">5. Veri Güvenliği</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kişisel veri toplamadığımız için veri ihlalleriyle ilgili güvenlik riskleri yoktur. Tüm veri işleme
                    tarayıcınızda yerel olarak gerçekleşir.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">6. Çocukların Gizliliği</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu uygulama 13 yaşın altındaki çocuklardan herhangi bir bilgi toplamaz. Kişisel veri toplanmadığı
                    için çocukların gizliliği için özel hükümler gerekmez.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                    7. Gizlilik Politikası Değişiklikleri
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişiklik güncellenmiş
                    revizyon tarihi ile bu sayfada yayınlanacaktır.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-4">8. İletişim Bilgileri</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Bu gizlilik politikası hakkında sorularınız varsa, lütfen iletişim sayfası üzerinden bize ulaşın.
                    Bunun bir demo uygulama olduğunu ve yanıtların mevcut olmayabileceğini unutmayın.
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
