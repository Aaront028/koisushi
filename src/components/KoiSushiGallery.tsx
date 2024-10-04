'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const pages = ['home', 'about', 'menu', 'catering', 'contact']

const menuSections = [
  {
    title: "SUSHI BY PIECES", items: [
      { name: "Teriyaki Chicken", price: "$1.00" },
      { name: "Karaage Chicken", price: "$1.00" },
      { name: "Salmon Avocado", price: "$1.30" },
      { name: "Fresh Tuna", price: "$1.00" },
      { name: "Tuna Mayo", price: "$1.00" },
      { name: "Double Green", price: "$1.00" },
      { name: "Shiitake Egg", price: "$1.00" },
      { name: "Wasabi Beef", price: "$1.00" },
    ]
  },
  {
    title: "URAMAKI & NIGIRI", items: [
      { name: "Ika Nigiri", price: "$1.50" },
      { name: "Salmon Nigiri", price: "$2.00" },
      { name: "Egg Nigiri", price: "$1.50" },
      { name: "Ebi Nigiri", price: "$1.50" },
      { name: "California roll", price: "$1.50" },
      { name: "Creamy Salmon", price: "$1.50" },
      { name: "Prawn Party", price: "$1.50" },
      { name: "Crispy Chicken & Avocado", price: "$1.80" },
    ]
  },
  {
    title: "DONBURI", items: [
      { name: "Karaage Don", price: "$10.50" },
      { name: "Katsu Don", price: "$11.90" },
      { name: "Oyako Don", price: "$10.90" },
      { name: "Unagi Don", price: "$17.00" },
      { name: "Prawn Udon", price: "$8.50" },
      { name: "Vege Tempura Don", price: "$9.90" },
      { name: "Chicken Bento box", price: "$9.90" },
      { name: "Chirashizushi", price: "$9.00" },
    ]
  },
  {
    title: "SIDES", items: [
      { name: "Miso Soup", price: "$2.50" },
      { name: "Edamame", price: "$4.00" },
      { name: "Seaweed Salad", price: "$5.50" },
      { name: "Gyoza (5pcs)", price: "$6.50" },
      { name: "Takoyaki (4pcs)", price: "$6.00" },
      { name: "Tempura Vegetables", price: "$7.50" },
      { name: "Agedashi Tofu", price: "$5.50" },
      { name: "Chicken Karaage", price: "$8.00" },
    ]
  }
]

const cateringPlatters = [
  {
    name: "Chicken & Salmon Platter",
    items: [
      "8 Teriyaki chicken",
      "8 Karaage",
      "8 Salmon & Avocado",
      "4 Salmon Nigiri"
    ],
    price: "$48"
  },
  {
    name: "Nigiri Platter",
    items: [
      "8 Salmon Nigiri",
      "4 Inari",
      "4 Egg Nigiri",
      "4 Prawn Nigiri"
    ],
    price: "$50"
  },
  {
    name: "Family Platter",
    items: [
      "8 Teriyaki chicken",
      "8 Salmon Avocado",
      "4 Tuna Mayo",
      "4 Salmon Nigiri",
      "8 Mini Chicken"
    ],
    price: "$48"
  },
  {
    name: "Vegan Platter",
    items: [
      "8 Seaweed Salad",
      "8 Takuan",
      "4 Inari",
      "4 Edamame Nigiri"
    ],
    price: "$40"
  },
  {
    name: "Gourmet Platter",
    items: [
      "8 Teriyaki chicken",
      "8 Karaage",
      "8 Prawn Party",
      "8 Creamy Salmon",
      "8 Mini Chicken"
    ],
    price: "$55"
  },
  {
    name: "Standard Platter",
    items: [
      "8 Teriyaki chicken",
      "8 Karaage",
      "4 Inari & Avocado",
      "4 Tuna Mayo",
      "4 Seaweed Salad",
      "4 Salmon Avocado"
    ],
    price: "$40"
  },
  {
    name: "Chicken Platter",
    items: [
      "10 Teriyaki Chicken",
      "10 Karaage",
      "8 Chicken & Avocado"
    ],
    price: "$45"
  }
]

export default function Component() {
  const [currentPage, setCurrentPage] = useState(0)
  const [activeMenuSection, setActiveMenuSection] = useState(menuSections[0].title)

  const paginate = (newDirection: number) => {
    setCurrentPage((prevPage) => {
      let nextPage = prevPage + newDirection
      if (nextPage < 0) nextPage = pages.length - 1
      if (nextPage >= pages.length) nextPage = 0
      return nextPage
    })
  }

  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  }

  const arrowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florian-metzner-12IsagncQ7o-unsplash-6NsVxPm5T40al8AOv3tPE6TDRJw4lz.jpg')",
          filter: "brightness(0.5)"
        }}
      />

      <main className="relative z-10 h-full flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="w-full max-w-4xl"
          >
            <div className="relative">
              {currentPage === 0 && (
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ top: "-25%" }}>
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/koilogo-UGrGbQBXQ02k3Fz51DtZXsTT8rIoaN.png"
                    alt="Koi Sushi & Gallery Logo"
                    className="w-32 h-32 object-contain"
                  />
                </div>
              )}
              <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
                <div className="relative z-10 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-hide">
                  {pages[currentPage] === 'home' && (
                    <div className="text-center text-white pt-16">
                      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-shadow-lg">Welcome to Koi Sushi & Gallery</h1>
                      <p className="text-xl mb-8 text-shadow-md">Experience the art of sushi in a unique gallery setting</p>
                      <div className="flex flex-wrap justify-center gap-4">
                        {pages.map((page, index) => (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(index)}
                            variant="outline"
                            className="mb-2 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-lg"
                          >
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {pages[currentPage] === 'about' && (
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
                      <p className="text-lg mb-4">
                        Koi Sushi & Gallery offers a wide range of sushi with pick your own pieces. All our sushi are traditionally hand made, using quality fresh fish and vegetables.
                      </p>
                      <p className="text-lg">
                        We cater for meetings, parties and functions, bringing the art of sushi to your special events. Visit us to experience the perfect blend of culinary mastery and artistic ambiance.
                      </p>
                    </div>
                  )}

                  {pages[currentPage] === 'menu' && (
                    <div>
                      <h2 className="text-3xl font-bold mb-6 text-center text-white">Our Menu</h2>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {menuSections.map((section) => (
                          <button
                            key={section.title}
                            onClick={() => setActiveMenuSection(section.title)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeMenuSection === section.title
                              ? "bg-blue-500 text-white"
                              : "bg-gray-700 text-white hover:bg-gray-600"
                              }`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {menuSections.find(section => section.title === activeMenuSection)?.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600">
                            <span className="text-white font-medium">{item.name}</span>
                            <span className="text-white">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pages[currentPage] === 'catering' && (
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-6 text-center">Catering Platters</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cateringPlatters.map((platter, index) => (
                          <Card key={index} className="bg-white bg-opacity-10">
                            <CardHeader>
                              <CardTitle className="text-xl text-white">{platter.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc list-inside mb-4 text-white">
                                {platter.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>{item}</li>
                                ))}
                              </ul>
                              <p className="text-2xl font-bold mb-4 text-white">{platter.price}</p>
                              <Button size="sm">Order Now</Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {pages[currentPage] === 'contact' && (
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-5 w-5" />
                          <span>03 386 2880</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-5 w-5" />
                          <span>info@koisushigallery.co.nz</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5" />
                          <span>123 Sushi Street, Christchurch, New Zealand</span>
                        </div>
                        <div className="flex items-center">
                          <Facebook className="mr-2 h-5 w-5" />
                          <a href="#" className="text-blue-300 hover:underline">Follow us on Facebook</a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-12 w-12 text-white cursor-pointer" />
        </motion.div>

        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-12 w-12 text-white cursor-pointer" />
        </motion.div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-4 z-20">
        <div className="container mx-auto px-6 text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} Koi Sushi & Gallery. All rights reserved.</p>
          <p>Website created by v0</p>
        </div>
      </footer>
    </div>
  )
}
