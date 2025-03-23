import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import Chatbot from './pages/Chatbot';
import ProductPage from './pages/ProductPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

interface CartItem {
  productId: number;
  quantity: number;
}

interface NutritionFacts {
  servingSize: string;
  calories: number;
  protein: string;
  carbohydrates: string;
  fiber: string;
  vitamins: string[];
}

interface FarmingDetails {
  method: string;
  pesticides: string;
  fertilizers: string;
  irrigation: string;
  harvestedDate: string;
  seasonality: string;
  storageMethod: string;
}

interface Farmer {
  name: string;
  image: string;
  experience: string;
  farmName: string;
  location: string;
  farmingType: string;
  certification: string;
  story: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  description: string;
  farmer: Farmer;
  farmingDetails: FarmingDetails;
  nutritionFacts: NutritionFacts;
}

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Apples",
    price: 99,
    unit: "1 kg",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Sweet and crispy apples, perfect for snacking or baking.",
    farmer: {
      name: "Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "15 years",
      farmName: "Green Valley Orchards",
      location: "Himachal Pradesh, India",
      farmingType: "Organic",
      certification: "NPOP Certified Organic",
      story: "Rajesh has been growing apples using traditional organic methods passed down through generations. His orchard is situated at an altitude of 2,000 meters, providing the perfect climate for apple cultivation."
    },
    farmingDetails: {
      method: "Traditional Organic",
      pesticides: "None",
      fertilizers: "Natural compost and vermicompost",
      irrigation: "Drip irrigation system",
      harvestedDate: "2024-03-01",
      seasonality: "September to March",
      storageMethod: "Temperature-controlled storage"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 52,
      protein: "0.3g",
      carbohydrates: "14g",
      fiber: "2.4g",
      vitamins: ["Vitamin C", "Vitamin B6", "Vitamin K"]
    }
  },
  {
    id: 2,
    name: "Organic Carrots",
    price: 45,
    unit: "500 g",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Farm-fresh organic carrots, rich in vitamins and minerals.",
    farmer: {
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1594167154836-838a4be99977?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "8 years",
      farmName: "Sunshine Organic Farm",
      location: "Maharashtra, India",
      farmingType: "Biodynamic",
      certification: "Demeter Certified Biodynamic",
      story: "Priya transitioned from conventional to biodynamic farming after seeing its positive impact on soil health. Her farm is now a model for sustainable agriculture in the region."
    },
    farmingDetails: {
      method: "Biodynamic",
      pesticides: "Natural pest control",
      fertilizers: "Biodynamic preparations",
      irrigation: "Rainwater harvesting",
      harvestedDate: "2024-03-10",
      seasonality: "Year-round",
      storageMethod: "Cold storage"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 41,
      protein: "0.9g",
      carbohydrates: "10g",
      fiber: "2.8g",
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin K"]
    }
  },
  {
    id: 3,
    name: "Green Grapes",
    price: 149,
    unit: "500 g",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Juicy and sweet seedless green grapes.",
    farmer: {
      name: "Amit Patel",
      image: "https://images.unsplash.com/photo-1622030411594-c282a3f29cdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "12 years",
      farmName: "Vineyard Paradise",
      location: "Nashik, Maharashtra",
      farmingType: "Sustainable",
      certification: "GlobalG.A.P. Certified",
      story: "Amit's family has been growing grapes for three generations. They've adopted modern sustainable practices while maintaining traditional quality standards."
    },
    farmingDetails: {
      method: "Integrated Pest Management",
      pesticides: "Minimal, targeted application",
      fertilizers: "Balanced organic and mineral",
      irrigation: "Precision irrigation",
      harvestedDate: "2024-03-05",
      seasonality: "February to April",
      storageMethod: "Controlled atmosphere storage"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 69,
      protein: "0.7g",
      carbohydrates: "18g",
      fiber: "0.9g",
      vitamins: ["Vitamin C", "Vitamin K", "Vitamin B6"]
    }
  },
  {
    id: 4,
    name: "Fresh Tomatoes",
    price: 60,
    unit: "500 g",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Vine-ripened tomatoes, perfect for salads and cooking.",
    farmer: {
      name: "Meera Reddy",
      image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "10 years",
      farmName: "Red Earth Farms",
      location: "Karnataka, India",
      farmingType: "Hydroponic",
      certification: "India Good Agricultural Practices (IndGAP)",
      story: "Meera pioneered hydroponic farming in her region, proving that sustainable farming can be both efficient and environmentally friendly. Her methods have inspired many local farmers to adopt modern techniques."
    },
    farmingDetails: {
      method: "Hydroponic",
      pesticides: "Biological control",
      fertilizers: "Balanced nutrient solution",
      irrigation: "Recirculating system",
      harvestedDate: "2024-03-12",
      seasonality: "Year-round",
      storageMethod: "Room temperature"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 18,
      protein: "0.9g",
      carbohydrates: "3.9g",
      fiber: "1.2g",
      vitamins: ["Vitamin C", "Vitamin K", "Vitamin A", "Vitamin B6"]
    }
  },
  {
    id: 5,
    name: "Organic Spinach",
    price: 40,
    unit: "250 g",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Fresh, nutrient-rich organic spinach leaves.",
    farmer: {
      name: "Suresh Verma",
      image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "7 years",
      farmName: "Green Leaf Organics",
      location: "Uttarakhand, India",
      farmingType: "Organic",
      certification: "NPOP Certified Organic",
      story: "Suresh left his corporate job to pursue organic farming. His dedication to soil health and sustainable practices has made his farm a benchmark for organic leafy vegetable production."
    },
    farmingDetails: {
      method: "Organic",
      pesticides: "Neem-based solutions",
      fertilizers: "Vermicompost",
      irrigation: "Drip irrigation",
      harvestedDate: "2024-03-13",
      seasonality: "October to March",
      storageMethod: "Refrigerated"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 23,
      protein: "2.9g",
      carbohydrates: "3.6g",
      fiber: "2.2g",
      vitamins: ["Vitamin K", "Vitamin A", "Vitamin C", "Vitamin E", "Folate"]
    }
  },
  {
    id: 6,
    name: "Sweet Mangoes",
    price: 199,
    unit: "1 kg",
    category: "fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: "Premium Alphonso mangoes, known for their sweet taste and rich flavor.",
    farmer: {
      name: "Dinesh Pawar",
      image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      experience: "20 years",
      farmName: "Mango Haven",
      location: "Ratnagiri, Maharashtra",
      farmingType: "Traditional",
      certification: "GI Tagged Alphonso",
      story: "Dinesh's family has been cultivating the famous Ratnagiri Alphonso mangoes for generations. Their orchards are known for producing some of the finest mangoes in the region."
    },
    farmingDetails: {
      method: "Traditional",
      pesticides: "Minimal use",
      fertilizers: "Organic manure",
      irrigation: "Basin irrigation",
      harvestedDate: "2024-03-15",
      seasonality: "March to May",
      storageMethod: "Controlled ripening chambers"
    },
    nutritionFacts: {
      servingSize: "100g",
      calories: 60,
      protein: "0.8g",
      carbohydrates: "15g",
      fiber: "1.6g",
      vitamins: ["Vitamin A", "Vitamin C", "Vitamin B6", "Vitamin E"]
    }
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
      
      if (!existingItem) {
        if (delta > 0) {
          return [...prevItems, { productId, quantity: delta }];
        }
        return prevItems;
      }

      const newQuantity = existingItem.quantity + delta;
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.productId !== productId);
      }

      return prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
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
          path="/product/:id" 
          element={
            <ProtectedRoute>
              <ProductPage 
                products={products}
                cartItems={cartItems}
                updateItemQuantity={updateItemQuantity}
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