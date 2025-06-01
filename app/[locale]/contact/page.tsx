"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Frontend-only form handling - localStorage'a kaydet
    const contactData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    }

    // LocalStorage'a kaydet
    const existingContacts = JSON.parse(localStorage.getItem("contactMessages") || "[]")
    existingContacts.push(contactData)
    localStorage.setItem("contactMessages", JSON.stringify(existingContacts))

    console.log("Form submitted (Frontend Only):", contactData)
    alert("Mesajınız kaydedildi! Bu demo bir uygulamadır, gerçek bir mesaj gönderilmemiştir.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black dark:text-white mb-6">{t("navigation.contact")}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin. Size yardımcı olmaktan
            mutluluk duyarız.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-8">İletişim Bilgileri</h2>

              <div className="space-y-6">
                <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">E-posta</h3>
                        <p className="text-gray-600 dark:text-gray-400">info@tradepro.com</p>
                        <p className="text-gray-600 dark:text-gray-400">destek@tradepro.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">Telefon</h3>
                        <p className="text-gray-600 dark:text-gray-400">+90 212 555 0123</p>
                        <p className="text-gray-600 dark:text-gray-400">+90 212 555 0124 (Destek)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">Adres</h3>
                        <p className="text-gray-600 dark:text-gray-400">Maslak Mahallesi</p>
                        <p className="text-gray-600 dark:text-gray-400">Büyükdere Cad. No:123</p>
                        <p className="text-gray-600 dark:text-gray-400">Şişli, İstanbul</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">Çalışma Saatleri</h3>
                        <p className="text-gray-600 dark:text-gray-400">Pazartesi - Cuma: 09:00 - 18:00</p>
                        <p className="text-gray-600 dark:text-gray-400">Cumartesi: 10:00 - 16:00</p>
                        <p className="text-gray-600 dark:text-gray-400">Pazar: Kapalı</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-black dark:text-white mb-8">Bize Yazın</h2>

              <Card className="border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Ad Soyad *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          placeholder="Adınızı ve soyadınızı girin"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          E-posta *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                          placeholder="E-posta adresinizi girin"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Konu *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        placeholder="Mesajınızın konusunu girin"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Mesaj *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                        placeholder="Mesajınızı detaylı olarak yazın..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Sık Sorulan Sorular</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              En çok merak edilen sorular ve cevapları
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "Veriler ne sıklıkla güncellenir?",
                answer: "Piyasa verileri 30 saniyede bir otomatik olarak güncellenir ve gerçek zamanlı bilgi sağlar.",
              },
              {
                question: "Hangi borsalardan veri alıyorsunuz?",
                answer:
                  "CoinGecko API aracılığıyla dünya çapındaki tüm büyük borsalardan toplanan verileri kullanıyoruz.",
              },
              {
                question: "Platform ücretsiz mi?",
                answer:
                  "Temel özellikler tamamen ücretsizdir. Premium özellikler için farklı paketlerimiz bulunmaktadır.",
              },
              {
                question: "Mobil uygulama var mı?",
                answer:
                  "Şu anda web tabanlı platformumuz mobil uyumludur. Yakında iOS ve Android uygulamaları çıkacak.",
              },
              {
                question: "Teknik destek nasıl alırım?",
                answer: "7/24 canlı destek, e-posta ve telefon ile teknik destek alabilirsiniz.",
              },
              {
                question: "Verileriniz güvenli mi?",
                answer: "Evet, tüm veriler SSL şifreleme ile korunur ve güvenlik standartlarına uygun olarak saklanır.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-800 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg text-black dark:text-white">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
