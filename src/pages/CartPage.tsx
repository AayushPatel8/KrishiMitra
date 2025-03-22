import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  CreditCard, 
  Wallet, 
  Truck, 
  ChevronLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingCart
} from 'lucide-react';

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  products: any[];
  updateItemQuantity: (productId: number, delta: number) => void;
}

const DELIVERY_CHARGE = 40;
const GST_RATE = 0.18;

const paymentMethods = [
  { id: 'gpay', name: 'Google Pay', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '🌐' },
  { id: 'paytm', name: 'Paytm', icon: '📱' },
  { id: 'card', name: 'Debit Card', icon: '💳' },
  { id: 'wallet', name: 'KrishiMitra Wallet', icon: '👛' },
];

function CartPage({ cartItems, products, updateItemQuantity }: CartPageProps) {
  const [selectedPayment, setSelectedPayment] = React.useState('');

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const subtotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * GST_RATE;
  const total = subtotal + DELIVERY_CHARGE + gst;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some fresh items to your cart!</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-gray-800">KrishiMitra</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
              <div className="space-y-4">
                {cartProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.unit}</p>
                      <p className="font-bold text-green-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, -1)}
                        className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, 1)}
                        className="bg-gray-200 hover:bg-gray-300 p-1 rounded-full transition"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => updateItemQuantity(item.id, -item.quantity)}
                        className="ml-2 text-red-500 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Delivery Charge
                  </span>
                  <span>₹{DELIVERY_CHARGE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Payment Method</h3>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        selectedPayment === method.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span>{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                className={`w-full mt-6 py-3 rounded-full font-semibold transition ${
                  selectedPayment
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedPayment}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CartPage;