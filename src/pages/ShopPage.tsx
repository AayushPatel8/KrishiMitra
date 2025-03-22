import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Leaf, Apple, Carrot, Grape, Plus, Minus, User, LogOut, Settings, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const categories = [
  { id: 'all', name: 'All', icon: Leaf },
  { id: 'fruits', name: 'Fruits', icon: Apple },
  { id: 'vegetables', name: 'Vegetables', icon: Carrot },
  { id: 'organic', name: 'Organic', icon: Grape },
];

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
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-gray-800">FreshMart</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search fresh fruits & vegetables"
                  className="pl-10 pr-4 py-2 w-[300px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                <button 
                  className="relative"
                  onClick={() => navigate('/cart')}
                >
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition"
                  >
                    <User className="h-6 w-6 text-green-600" />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {totalItems > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} added
            </div>
          )}
        </div>
      </header>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center gap-8 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
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
              </button>
            );
          })}
        </div>

        {/* Featured Banner */}
        <div className="relative rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="Seasonal Fruits"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
            <div className="px-12">
              <h2 className="text-4xl font-bold text-white mb-4">20% OFF</h2>
              <p className="text-white text-xl mb-6">on Seasonal Fruits</p>
              <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-50 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Best Deals</h2>
            <Link to="#" className="text-green-600 hover:text-green-700">See All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const quantity = getItemQuantity(product.id);
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-gray-500 text-sm">{product.unit}</p>
                        <p className="font-bold text-green-600">₹{product.price}</p>
                      </div>
                      {quantity === 0 ? (
                        <button
                          onClick={() => updateItemQuantity(product.id, 1)}
                          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateItemQuantity(product.id, -1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(product.id, 1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;