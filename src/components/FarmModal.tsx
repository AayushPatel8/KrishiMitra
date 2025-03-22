import React, { useState } from 'react';
import { X as XIcon, Upload } from 'lucide-react';
import type { Farm } from '../lib/types';

// Constants for farm management
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

interface FarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (farmData: Partial<Farm>, image?: File) => void;
  initialData?: Farm;
  mode: 'add' | 'edit';
  isFirstFarm?: boolean;
}

export default function FarmModal({ isOpen, onClose, onSubmit, initialData, mode, isFirstFarm = false }: FarmModalProps) {
  const [formData, setFormData] = useState<Partial<Farm>>(
    initialData || {
      name: '',
      state: '',
      district: '',
      village: '',
      pincode: '',
      land_size: 0,
      land_unit: 'acres',
      farming_type: '',
      crops: []
    }
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, selectedImage || undefined);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {mode === 'add' ? 'Add New Farm' : 'Edit Farm'}
            </h2>
            {!isFirstFarm && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XIcon className="h-6 w-6" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farm Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Farm preview"
                        className="mx-auto h-32 w-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                      >
                        <XIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Farm Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Enter farm name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter district"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village/Town
                </label>
                <input
                  type="text"
                  required
                  value={formData.village}
                  onChange={(e) => handleChange('village', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter village/town"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter pincode"
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit pincode"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Land Size
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.land_size}
                  onChange={(e) => handleChange('land_size', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter land size"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  value={formData.land_unit}
                  onChange={(e) => handleChange('land_unit', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Farming
              </label>
              <select
                required
                value={formData.farming_type}
                onChange={(e) => handleChange('farming_type', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Type</option>
                {farmingTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Crops Grown
              </label>
              <div className="grid grid-cols-2 gap-2 border rounded-lg p-4">
                {cropTypes.map(crop => (
                  <label key={crop} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.crops?.includes(crop)}
                      onChange={(e) => {
                        const newCrops = e.target.checked
                          ? [...(formData.crops || []), crop]
                          : (formData.crops || []).filter(c => c !== crop);
                        handleChange('crops', newCrops);
                      }}
                      className="rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{crop}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              {!isFirstFarm && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {mode === 'add' ? 'Add Farm' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}