import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Leaf, Apple, Carrot, Grape, Plus, Minus, User, LogOut, Settings, Heart, QrCode, X, MessageCircle, Send } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  { id: 'all', name: 'All', icon: Leaf },
  { id: 'fruits', name: 'Fruits', icon: Apple },
  { id: 'vegetables', name: 'Vegetables', icon: Carrot },
  { id: 'organic', name: 'Organic', icon: Grape },
];

interface Message {
  text: string;
  isUser: boolean;
}

interface ShopPageProps {
  cartItems: CartItem[];
  updateItemQuantity: (productId: number, delta: number) => void;
  products: any[];
}

interface CartItem {
  productId: number;
  quantity: number;
}

function ShopPage({ cartItems, updateItemQuantity, products }: ShopPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleSignOut = async () => {
    try {
      navigate('/auth');
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (productId: number) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  const selectedProductData = selectedProduct ? products.find(p => p.id === selectedProduct) : null;

  const getProductUrl = (productId: number) => {
    return `${window.location.origin}/product/${productId}`;
  };

  const handleQrCodeClick = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleProductClick(productId);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { text: data.response, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Sorry, there was an error processing your request.', isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/" className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-gray-800">KrishiMitra</span>
              </Link>
            </motion.div>

            <div className="flex items-center gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search fresh fruits & vegetables"
                  className="pl-10 pr-4 py-2 w-[300px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.div>

              <div className="flex items-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition"
                  >
                    <User className="h-6 w-6 text-green-600" />
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
                      >
                        <Link
                          to="/profile"
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>Favorites</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-sm text-gray-600"
              >
                {totalItems} {totalItems === 1 ? 'item' : 'items'} added
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8 mb-12"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center gap-2 ${
                  selectedCategory === category.id ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                <div className={`p-4 rounded-full ${
                  selectedCategory === category.id ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Featured Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative rounded-xl overflow-hidden mb-12"
        >
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="Seasonal Fruits"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
            <div className="px-12">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl font-bold text-white mb-4"
              >
                20% OFF
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white text-xl mb-6"
              >
                on Seasonal Fruits
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="text-xl font-semibold">Best Deals</h2>
            <Link to="#" className="text-green-600 hover:text-green-700">See All</Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const quantity = getItemQuantity(product.id);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleQrCodeClick(product.id, e)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                      >
                        <QrCode className="h-5 w-5 text-gray-600" />
                      </motion.button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <div>
                          <p className="text-gray-500 text-sm">{product.unit}</p>
                          <p className="font-bold text-green-600">₹{product.price}</p>
                        </div>
                        {quantity === 0 ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.preventDefault();
                              updateItemQuantity(product.id, 1);
                            }}
                            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </motion.button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                updateItemQuantity(product.id, -1);
                              }}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                            >
                              <Minus className="h-4 w-4" />
                            </motion.button>
                            <span className="w-8 text-center font-medium">{quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                updateItemQuantity(product.id, 1);
                              }}
                              className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                            >
                              <Plus className="h-4 w-4" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {selectedProduct && selectedProductData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedProductData.name}</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-500 transition"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={getProductUrl(selectedProductData.id)}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Scan this QR code to view detailed information about {selectedProductData.name}
              </p>
              <div className="mt-4 text-center">
                <Link
                  to={`/product/${selectedProductData.id}`}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                  onClick={() => setSelectedProduct(null)}
                >
                  View Product Page →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl z-40"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with KrishiMitra</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChatbot(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-4">
                    Start a conversation by sending a message!
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isUser
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                      Typing...
                    </div>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors disabled:bg-green-400"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShopPage;