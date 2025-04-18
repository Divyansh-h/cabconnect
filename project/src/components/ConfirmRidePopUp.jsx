import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function ConfirmRidePopUp({
  fare = 0,
  onClose,
  onConfirm
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("💰 Fare:", fare);
  }, [fare]);

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Ride Confirmation
          </h2>

          <div className="text-center text-gray-700 mb-6">
            <p className="mb-2">
              Estimated Fare: ₹{fare.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              We’ll revert back to you in less than 20 minutes. Sit tight!
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`bg-blue-900 text-white px-6 py-2 rounded-lg shadow flex items-center gap-2 transition ${
                isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-800'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm'
              )}
            </button>

            {!isLoading && (
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
