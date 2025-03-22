import React from 'react';
import { AlertTriangle, X as XIcon } from 'lucide-react';

interface DeleteFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  farmName: string;
}

export default function DeleteFarmModal({ isOpen, onClose, onConfirm, farmName }: DeleteFarmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Delete Farm</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{farmName}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete Farm
          </button>
        </div>
      </div>
    </div>
  );
}