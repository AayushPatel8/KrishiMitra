import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Thermometer,
  CloudSun,
  TrendingUp,
  Bot,
  AlertTriangle,
  Droplet,
  ChevronRight,
  Edit2,
  Trash2,
  Bell,
  Plus,
  X as XIcon,
  Loader2,
  Package,
  Store
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { getFarmerFarms, createFarm, updateFarm, deleteFarm, getFarmerProducts, createProduct, updateProduct, deleteProduct } from '../lib/api';
import type { Farm, FarmerProduct } from '../lib/types';
import FarmModal from '../components/FarmModal';
import DeleteFarmModal from '../components/DeleteFarmModal';
import ProductModal from '../components/ProductModal';
import DeleteProductModal from '../components/DeleteProductModal';

function DashboardPage() {
  const { user } = useAuth();
  const farmName = user?.user_metadata?.farm_name || 'Green Valley Farm';
  const [loading, setLoading] = useState(true);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [products, setProducts] = useState<FarmerProduct[]>([]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [editingProduct, setEditingProduct] = useState<FarmerProduct | null>(null);
  const [deletingFarm, setDeletingFarm] = useState<Farm | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<FarmerProduct | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [farmerFarms, farmerProducts] = await Promise.all([
        getFarmerFarms(),
        getFarmerProducts()
      ]);
      setFarms(farmerFarms);
      setProducts(farmerProducts);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFarm = async (farmData: Partial<Farm>, image?: File) => {
    try {
      await createFarm(farmData, farmData.crops || [], image);
      await loadData();
      setShowAddFarm(false);
      toast.success('Farm added successfully');
    } catch (error) {
      toast.error('Failed to add farm');
    }
  };

  const handleUpdateFarm = async (farmData: Partial<Farm>, image?: File) => {
    if (!editingFarm) return;

    try {
      await updateFarm(editingFarm.id, farmData, farmData.crops || [], image);
      await loadData();
      setEditingFarm(null);
      toast.success('Farm updated successfully');
    } catch (error) {
      toast.error('Failed to update farm');
    }
  };

  const handleDeleteFarm = async () => {
    if (!deletingFarm) return;

    try {
      await deleteFarm(deletingFarm.id);
      await loadData();
      setDeletingFarm(null);
      toast.success('Farm deleted successfully');
    } catch (error) {
      toast.error('Failed to delete farm');
    }
  };

  const handleAddProduct = async (productData: Partial<FarmerProduct>, image?: File) => {
    try {
      await createProduct(productData, image);
      await loadData();
      setShowAddProduct(false);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleUpdateProduct = async (productData: Partial<FarmerProduct>, image?: File) => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, productData, image);
      await loadData();
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    try {
      await deleteProduct(deletingProduct.id);
      await loadData();
      setDeletingProduct(null);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <span className="text-xl font-bold text-gray-800">KrishiMitra</span>
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="text-xl text-gray-700">{farmName}</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Thermometer className="h-5 w-5" />
                <span>28°C</span>
                <CloudSun className="h-5 w-5 ml-2" />
                <span>Sunny</span>
              </div>
              <div className="relative">
                <button className="relative p-2">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    2
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Thermometer className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-700">Crop Health</h3>
            </div>
            <p className="text-sm text-gray-500">All crops growing well</p>
            <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              Good
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CloudSun className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-700">Weather</h3>
            </div>
            <p className="text-sm text-gray-500">Perfect growing conditions</p>
            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              Clear
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-700">Market Prices</h3>
            </div>
            <p className="text-sm text-gray-500">Trending upward</p>
            <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              +5.2%
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-700">AI Assistant</h3>
            </div>
            <p className="text-sm text-gray-500">New recommendations</p>
            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              2 alerts
            </span>
          </div>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="font-medium text-gray-700">Pest Alert</h3>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">High</span>
            </div>
            <p className="text-sm text-gray-500">Potential aphid infestation detected in Field 2</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-2">
              <Droplet className="h-5 w-5 text-orange-500" />
              <h3 className="font-medium text-gray-700">Irrigation Alert</h3>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">Medium</span>
            </div>
            <p className="text-sm text-gray-500">Optimal irrigation time tomorrow</p>
          </div>
        </div>

        {/* Farms */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Farms</h2>
            <button
              onClick={() => setShowAddFarm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Add New Farm
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            </div>
          ) : farms.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">No farms added yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first farm</p>
              <button
                onClick={() => setShowAddFarm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Add Farm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {farms.map((farm, index) => (
                <div key={farm.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-40 relative">
                    <img
                      src={farm.image_url || `https://source.unsplash.com/featured/?farm,${farm.farming_type.toLowerCase()}`}
                      alt={farm.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">{farm.name}</h3>
                      <p className="text-sm">{farm.farming_type}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setEditingFarm(farm)}
                        className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20"
                      >
                        <Edit2 className="h-4 w-4 text-white" />
                      </button>
                      {index !== 0 && (
                        <button
                          onClick={() => setDeletingFarm(farm)}
                          className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20"
                        >
                          <Trash2 className="h-4 w-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">{farm.state}, {farm.district}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {farm.crops?.map((crop) => (
                        <span
                          key={crop}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Products */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-gray-600" />
              <h2 className="text-xl font-semibold">Your Products</h2>
            </div>
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Add New Product
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No products added yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first product</p>
              <button
                onClick={() => setShowAddProduct(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 relative">
                    <img
                      src={product.image_url || `https://source.unsplash.com/featured/?${product.category.toLowerCase()},food`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <Edit2 className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => setDeletingProduct(product)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {product.category}
                      </span>
                    </div>
                    {product.description && (
                      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-600">₹{product.price}/{product.unit}</span>
                      <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <FarmModal
        isOpen={showAddFarm}
        onClose={() => setShowAddFarm(false)}
        onSubmit={handleAddFarm}
        mode="add"
        isFirstFarm={farms.length === 0}
      />

      <FarmModal
        isOpen={!!editingFarm}
        onClose={() => setEditingFarm(null)}
        onSubmit={handleUpdateFarm}
        initialData={editingFarm || undefined}
        mode="edit"
      />

      <DeleteFarmModal
        isOpen={!!deletingFarm}
        onClose={() => setDeletingFarm(null)}
        onConfirm={handleDeleteFarm}
        farmName={deletingFarm?.name || ''}
      />

      <ProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onSubmit={handleAddProduct}
        mode="add"
      />

      <ProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleUpdateProduct}
        initialData={editingProduct || undefined}
        mode="edit"
      />

      <DeleteProductModal
        isOpen={!!deletingProduct}
        onClose={() => setDeletingProduct(null)}
        onConfirm={handleDeleteProduct}
        productName={deletingProduct?.name || ''}
      />
    </div>
  );
}

export default DashboardPage;