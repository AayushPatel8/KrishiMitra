import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  User, 
  Tractor, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Ban as Bank,
  FileCheck,
  Briefcase,
  X as XIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// Indian states data
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal"
];

const farmingTypes = [
  "Organic",
  "Conventional",
  "Hydroponic",
  "Aquaponic",
  "Permaculture",
  "Biodynamic",
  "Greenhouse",
  "Mixed"
];

const cropTypes = [
  "Vegetables",
  "Fruits",
  "Pulses",
  "Grains",
  "Herbs",
  "Flowers",
  "Cash Crops",
  "Oil Seeds"
];

interface FarmerRegistrationData {
  // Personal Details
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File;

  // Farm Details
  farms: {
    name: string;
    state: string;
    district: string;
    village: string;
    pincode: string;
    landSize: string;
    landUnit: 'acres' | 'hectares';
    farmingType: string;
    cropsGrown: string[];
  }[];

  // Bank Details
  bankAccount?: string;
  bankName?: string;
  ifscCode?: string;
  upiId?: string;
  gstin?: string;

  // Government Verification
  aadhaar?: string;
  farmerId?: string;

  // Additional Details
  experience?: string;
  certifications?: string;
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'user' | 'farmer' | ''>('');
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [farmerData, setFarmerData] = useState<FarmerRegistrationData>({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    farms: [{
      name: '',
      state: '',
      district: '',
      village: '',
      pincode: '',
      landSize: '',
      landUnit: 'acres',
      farmingType: '',
      cropsGrown: []
    }]
  });

  const handleFarmerDataChange = (field: string, value: any) => {
    setFarmerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFarm = () => {
    setFarmerData(prev => ({
      ...prev,
      farms: [...prev.farms, {
        name: '',
        state: '',
        district: '',
        village: '',
        pincode: '',
        landSize: '',
        landUnit: 'acres',
        farmingType: '',
        cropsGrown: []
      }]
    }));
  };

  const removeFarm = (index: number) => {
    if (index === 0) return; // Prevent removing the first farm
    setFarmerData(prev => ({
      ...prev,
      farms: prev.farms.filter((_, i) => i !== index)
    }));
  };

  const updateFarm = (index: number, field: string, value: any) => {
    setFarmerData(prev => ({
      ...prev,
      farms: prev.farms.map((farm, i) => 
        i === index ? { ...farm, [field]: value } : farm
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signIn(email, password);
        navigate('/shop');
        toast.success('Welcome back!');
      } else if (userType === 'farmer' && !isLogin) {
        // Validate farmer registration data
        if (farmerData.password !== farmerData.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        
        // Register farmer with additional metadata
        await signUp(farmerData.email, farmerData.password, 'farmer');
        navigate('/dashboard');
        toast.success('Farmer account created successfully!');
      } else {
        await signUp(email, password, 'user');
        navigate('/shop');
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const renderFarmerRegistrationStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={farmerData.firstName}
                  onChange={(e) => handleFarmerDataChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={farmerData.lastName}
                  onChange={(e) => handleFarmerDataChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                value={farmerData.mobile}
                onChange={(e) => handleFarmerDataChange('mobile', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={farmerData.email}
                onChange={(e) => handleFarmerDataChange('email', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={farmerData.password}
                onChange={(e) => handleFarmerDataChange('password', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={farmerData.confirmPassword}
                onChange={(e) => handleFarmerDataChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFarmerDataChange('profilePicture', e.target.files?.[0])}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Farm & Location Details</h3>
            {farmerData.farms.map((farm, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Farm {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeFarm(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                    >
                      <XIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                  <input
                    type="text"
                    required
                    value={farm.name}
                    onChange={(e) => updateFarm(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <select
                      required
                      value={farm.state}
                      onChange={(e) => updateFarm(index, 'state', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                      type="text"
                      required
                      value={farm.district}
                      onChange={(e) => updateFarm(index, 'district', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village/Town</label>
                    <input
                      type="text"
                      required
                      value={farm.village}
                      onChange={(e) => updateFarm(index, 'village', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={farm.pincode}
                      onChange={(e) => updateFarm(index, 'pincode', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Land Size</label>
                    <input
                      type="number"
                      required
                      value={farm.landSize}
                      onChange={(e) => updateFarm(index, 'landSize', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                    <select
                      value={farm.landUnit}
                      onChange={(e) => updateFarm(index, 'landUnit', e.target.value as 'acres' | 'hectares')}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="acres">Acres</option>
                      <option value="hectares">Hectares</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Farming</label>
                  <select
                    required
                    value={farm.farmingType}
                    onChange={(e) => updateFarm(index, 'farmingType', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Type</option>
                    {farmingTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Main Crops Grown</label>
                  <div className="grid grid-cols-2 gap-2">
                    {cropTypes.map(crop => (
                      <label key={crop} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={farm.cropsGrown.includes(crop)}
                          onChange={(e) => {
                            const newCrops = e.target.checked
                              ? [...farm.cropsGrown, crop]
                              : farm.cropsGrown.filter(c => c !== crop);
                            updateFarm(index, 'cropsGrown', newCrops);
                          }}
                          className="rounded text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm">{crop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addFarm}
              className="w-full py-2 px-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
            >
              Add Another Farm
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Bank Details (Optional)</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
              <input
                type="text"
                value={farmerData.bankAccount || ''}
                onChange={(e) => handleFarmerDataChange('bankAccount', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={farmerData.bankName || ''}
                onChange={(e) => handleFarmerDataChange('bankName', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
              <input
                type="text"
                value={farmerData.ifscCode || ''}
                onChange={(e) => handleFarmerDataChange('ifscCode', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <input
                type="text"
                value={farmerData.upiId || ''}
                onChange={(e) => handleFarmerDataChange('upiId', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
              <input
                type="text"
                value={farmerData.gstin || ''}
                onChange={(e) => handleFarmerDataChange('gstin', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Government Verification (Optional)</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
              <input
                type="text"
                value={farmerData.aadhaar || ''}
                onChange={(e) => handleFarmerDataChange('aadhaar', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farmer ID</label>
              <input
                type="text"
                value={farmerData.farmerId || ''}
                onChange={(e) => handleFarmerDataChange('farmerId', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience in Farming (Years)</label>
              <input
                type="number"
                value={farmerData.experience || ''}
                onChange={(e) => handleFarmerDataChange('experience', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farming Certifications</label>
              <textarea
                value={farmerData.certifications || ''}
                onChange={(e) => handleFarmerDataChange('certifications', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="List any certifications you have..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { icon: User, label: 'Personal Details' },
    { icon: MapPin, label: 'Farm Details' },
    { icon: Bank, label: 'Bank Details' },
    { icon: FileCheck, label: 'Verification' }
  ];

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-800">KrishiMitra</span>
          </div>

          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div>
              <h2 className="text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="text-center">
              <button
                onClick={() => {
                  setIsLogin(false);
                  setUserType('');
                }}
                className="text-sm text-green-600 hover:text-green-500"
              >
                Don't have an account? Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-800">KrishiMitra</span>
        </div>

        <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          </div>

          {!userType ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-center mb-6">Choose your account type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('user')}
                  className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <User className="w-12 h-12 text-green-600" />
                  <div className="text-center">
                    <h4 className="font-medium">Customer</h4>
                    <p className="text-sm text-gray-500">Buy fresh produce</p>
                  </div>
                </button>
                <button
                  onClick={() => setUserType('farmer')}
                  className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Tractor className="w-12 h-12 text-green-600" />
                  <div className="text-center">
                    <h4 className="font-medium">Farmer</h4>
                    <p className="text-sm text-gray-500">Sell your produce</p>
                  </div>
                </button>
              </div>
            </div>
          ) : userType === 'user' ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create account
                </button>
              </div>
            </form>
          ) : (
            <div>
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.label}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === currentStep
                              ? 'bg-green-600 text-white'
                              : index < currentStep
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs mt-2">{step.label}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-1 mx-4 bg-gray-200">
                          <div
                            className="h-full bg-green-600 transition-all"
                            style={{
                              width: index < currentStep ? '100%' : '0%'
                            }}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderFarmerRegistrationStep()}

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep === 0) {
                        setUserType('');
                      } else {
                        setCurrentStep(currentStep - 1);
                      }
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  {currentStep === steps.length - 1 ? (
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Create Account
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => {
                setIsLogin(true);
                setUserType('user');
              }}
              className="text-sm text-green-600 hover:text-green-500"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;