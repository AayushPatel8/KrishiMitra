import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

interface CartItem {
  productId: number;
  quantity: number;
}

const products = [
  {
    id: 1,
    name: 'Fresh Oranges',
    price: 199,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fruits'
  },
  {
    id: 2,
    name: 'Red Tomatoes',
    price: 149,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1546470427-1ec6b777bb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables'
  },
  {
    id: 3,
    name: 'Green Apples',
    price: 249,
    unit: '1kg',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'fruits'
  },
  {
    id: 4,
    name: 'Fresh Carrots',
    price: 99,
    unit: '500g',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'vegetables'
  }
];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return <>{children}</>;
}

function FarmerRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user || user.user_metadata?.user_type !== 'farmer') {
    return <Navigate to="/shop" />;
  }
  return <>{children}</>;
}

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateItemQuantity = (productId: number, delta: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + delta;
        if (newQuantity <= 0) {
          return prevItems.filter(item => item.productId !== productId);
        }
        return prevItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (delta > 0) {
        return [...prevItems, { productId, quantity: 1 }];
      }
      
      return prevItems;
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route 
          path="/shop" 
          element={
            <ProtectedRoute>
              <ShopPage 
                cartItems={cartItems} 
                updateItemQuantity={updateItemQuantity}
                products={products}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage 
                cartItems={cartItems}
                updateItemQuantity={updateItemQuantity}
                products={products}
              />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <FarmerRoute>
              <DashboardPage />
            </FarmerRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;