'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { Button } from "@/components/ui/button"

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

type CartItem = {
  name: string;
  price: string;
  quantity: number;
}

const CartModal = ({ isOpen, onClose, cart, onCheckout, onRemove, onClearAll }: { isOpen: boolean; onClose: () => void; cart: CartItem[]; onCheckout: () => void; onRemove: (name: string) => void; onClearAll: () => void }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h3>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <div>
              <span className="mr-4">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
              <Button onClick={() => onRemove(item.name)} className="bg-teal-600 hover:bg-teal-700 text-white px-2 py-1 text-sm">
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          {cart.length > 1 && (
            <Button onClick={onClearAll} className="bg-gray-500 hover:bg-gray-600 text-white">
              Clear All
            </Button>
          )}
          <div className="flex space-x-2">
            <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
              Close
            </Button>
            <Button onClick={onCheckout} className="bg-teal-600 hover:bg-teal-700 text-white">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = ({ total, onClose }: { total: number; onClose: () => void }) => {
  const [processing, setProcessing] = useState(false);
  const [demoMessage, setDemoMessage] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setDemoMessage(null);

    // Simulate payment processing
    setTimeout(() => {
      setDemoMessage('This is a demo: No actual payment was processed. In a real application, the payment would be sent to a server for processing.');
      setProcessing(false);
    }, 2000); // Simulate a 2-second processing time
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="card-number"
          placeholder="1234 1234 1234 1234"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={19}
        />
      </div>
      <div className="flex mb-4 space-x-4">
        <div className="flex-1">
          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
            Expiry (MM/YY)
          </label>
          <input
            type="text"
            id="expiry"
            placeholder="MM/YY"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            maxLength={5}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            type="text"
            id="cvc"
            placeholder="123"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            maxLength={3}
          />
        </div>
      </div>
      {demoMessage && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-4" role="alert">
          <p className="font-bold">Demo Payment</p>
          <p>{demoMessage}</p>
        </div>
      )}
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={processing}
          className="bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
};

const CheckoutModal = ({ isOpen, onClose, cart }: { isOpen: boolean; onClose: () => void; cart: CartItem[] }) => {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h3>
        <div className="mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <textarea id="address" name="address" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
          </div>
        </form>
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Payment Details</h4>
          <CheckoutForm total={total} onClose={onClose} />
        </div>
        <p className="text-sm text-gray-500 italic mt-4">
          We will send an email confirmation of your order to the provided email address.
        </p>
      </div>
    </div>
  );
};

const HomeButton = ({ onClick }: { onClick: () => void }) => (
  <motion.div
    className="fixed bottom-24 left-0 right-0 mx-auto w-12 z-30"
    initial={{ opacity: 0.5, scale: 1 }}
    animate={{
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-teal-700 transition-colors duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    </div>
  </motion.div>
);

export default function Component() {
  const [currentPage, setCurrentPage] = useState(0)
  const [activeMenuSection, setActiveMenuSection] = useState(menuSections[0].title)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (platter: { name: string; price: string }) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === platter.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === platter.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...platter, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === name);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.name !== name);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearPlatter = (platterName: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== platterName));
  };

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
    <div className="min-h-screen w-screen overflow-hidden relative bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/florian-metzner-12IsagncQ7o-unsplash-6NsVxPm5T40al8AOv3tPE6TDRJw4lz.jpg')",
          filter: "brightness(0.4)"
        }}
      />

      <main className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 pb-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="w-full max-w-5xl"
          >
            <div className="relative">
              {currentPage === 0 && (
                <img
                  src="/images/koilogo.png"
                  alt="Koi Sushi & Gallery Logo"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 object-contain z-20 logo-position"
                />
              )}
              <div className={`bg-black bg-opacity-60 p-8 ${currentPage === 0 ? 'content-padding' : 'pt-8'} rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm`}>
                <div className="relative z-10 content-height overflow-y-auto scrollbar-hide pb-20"> {/* Added pb-20 here */}
                  {pages[currentPage] === 'home' && (
                    <div className="text-center text-white">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-playfair">
                        Welcome to Koi Sushi & Gallery
                      </h1>
                      <p className="text-lg sm:text-xl mb-6 sm:mb-10 font-playfair italic">
                        Experience the art of sushi in a unique gallery setting
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {pages.map((page, index) => (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(index)}
                            variant="outline"
                            className="mb-2 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-lg text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3 font-playfair"
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
                    <div className="text-white">
                      <h2 className="text-4xl font-bold mb-8 text-center font-playfair">Our Menu</h2>
                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {menuSections.map((section) => (
                          <button
                            key={section.title}
                            onClick={() => setActiveMenuSection(section.title)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${activeMenuSection === section.title
                              ? "bg-teal-600 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                              }`}
                          >
                            {section.title}
                          </button>
                        ))}
                      </div>
                      <div className="bg-gray-900/80 rounded-lg overflow-hidden shadow-lg border border-gray-800 p-6">
                        <h3 className="text-2xl font-semibold mb-6 font-playfair text-white">{activeMenuSection}</h3>
                        <div className="space-y-4">
                          {menuSections.find(section => section.title === activeMenuSection)?.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700">
                              <span className="text-gray-300 font-medium">{item.name}</span>
                              <span className="text-white font-bold">{item.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {pages[currentPage] === 'catering' && (
                    <div className="text-white">
                      <h2 className="text-4xl font-bold mb-8 text-center font-playfair">Catering Platters</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cateringPlatters.map((platter, index) => {
                          const cartItem = cart.find(item => item.name === platter.name);
                          const quantity = cartItem ? cartItem.quantity : 0;
                          return (
                            <div key={index} className="bg-gray-900/80 rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
                              <div className="p-6 flex-grow flex flex-col">
                                <div className="mb-4">
                                  <h3 className="text-2xl font-semibold font-playfair text-white mb-2">{platter.name}</h3>
                                  {quantity > 0 && (
                                    <span className="bg-teal-600/20 text-teal-300 text-sm font-medium px-3 py-1 rounded-full inline-block">
                                      {quantity} in cart
                                    </span>
                                  )}
                                </div>
                                <div className="mb-4 space-y-2 flex-grow">
                                  {platter.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="text-gray-300 text-sm">
                                      {item}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto space-y-4 sm:space-y-0">
                                  <span className="text-3xl font-bold text-white">{platter.price}</span>
                                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                                    {quantity > 0 && (
                                      <Button
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 w-full sm:w-auto"
                                        onClick={() => clearPlatter(platter.name)}
                                      >
                                        Clear Platter
                                      </Button>
                                    )}
                                    <Button
                                      className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 w-full sm:w-auto"
                                      onClick={() => addToCart(platter)}
                                    >
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-800/50 px-6 py-3">
                                <p className="text-sm text-gray-400">Perfect for {index % 2 === 0 ? 'small gatherings' : 'large events'}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="text-center mt-8">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                          onClick={() => setIsCartOpen(true)}
                        >
                          View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                        </Button>
                      </div>
                    </div>
                  )}

                  {pages[currentPage] === 'contact' && (
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-5 w-5" />
                          <span>0800 TEST SUSHI  (For demo purposes only)</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="mr-2 h-5 w-5" />
                          <span>test@testdomain.co.nz (For demo purposes only)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-5 w-5" />
                          <span>123 Sushi Street, Christchurch, New Zealand (For demo purposes only)</span>
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
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-14 w-14 text-white cursor-pointer bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300" />
        </motion.div>

        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          variants={arrowVariants}
          initial="initial"
          animate="animate"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-14 w-14 text-white cursor-pointer bg-black/50 rounded-full p-2 hover:bg-black/70 transition-all duration-300" />
        </motion.div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-4 z-20">
        <div className="container mx-auto px-6 text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} Aaron Tan. All rights reserved.</p>
        </div>
      </footer>

      {currentPage !== 0 && (
        <HomeButton onClick={() => setCurrentPage(0)} />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onRemove={removeFromCart}
        onClearAll={clearCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
      />
    </div>
  )
}