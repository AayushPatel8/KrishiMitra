import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, ShoppingCart, ArrowLeft, Star, Calendar, Droplet, Plane as Plant, ThermometerSun, Award, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ProductPageProps {
  products: any[];
  cartItems: CartItem[];
  updateItemQuantity: (productId: number, delta: number) => void;
}

interface CartItem {
  productId: number;
  quantity: number;
}

function ProductPage({ products, cartItems, updateItemQuantity }: ProductPageProps) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product not found</h2>
          <Link to="/" className="text-green-600 hover:text-green-700 flex items-center gap-2 justify-center">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const quantity = cartItems.find(item => item.productId === product.id)?.quantity || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold text-gray-800">KrishiMitra</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <QRCodeSVG
                    value={window.location.href}
                    size={100}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">{product.unit}</p>
                <p className="text-4xl font-bold text-green-600">₹{product.price}</p>
              </div>

              <div className="prose prose-green mb-8">
                <p className="text-gray-600 mb-4">{product.description}</p>
              </div>

              <div className="flex items-center gap-4 mb-8">
                {quantity === 0 ? (
                  <button
                    onClick={() => updateItemQuantity(product.id, 1)}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => updateItemQuantity(product.id, -1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-medium">{quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(product.id, 1)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Information */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Farmer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={product.farmer.image}
                  alt={product.farmer.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{product.farmer.name}</h3>
                <p className="text-gray-600">{product.farmer.experience} of experience</p>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span>{product.farmer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span>{product.farmer.certification}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{product.farmer.story}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Farming Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Farming Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Plant className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold mb-1">Farming Method</h3>
                <p className="text-gray-600">{product.farmingDetails.method}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Droplet className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold mb-1">Irrigation</h3>
                <p className="text-gray-600">{product.farmingDetails.irrigation}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold mb-1">Harvested Date</h3>
                <p className="text-gray-600">{new Date(product.farmingDetails.harvestedDate).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ThermometerSun className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-semibold mb-1">Storage Method</h3>
                <p className="text-gray-600">{product.farmingDetails.storageMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Facts */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h2>
            <div className="max-w-md">
              <div className="border-b-2 border-gray-900 pb-4 mb-4">
                <p className="text-sm text-gray-600">Serving Size {product.nutritionFacts.servingSize}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold">Calories</span>
                  <span>{product.nutritionFacts.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span>{product.nutritionFacts.protein}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbohydrates</span>
                  <span>{product.nutritionFacts.carbohydrates}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fiber</span>
                  <span>{product.nutritionFacts.fiber}</span>
                </div>
                <div className="mt-4">
                  <span className="font-semibold">Vitamins:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.nutritionFacts.vitamins.map((vitamin: string) => (
                      <span key={vitamin} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {vitamin}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;