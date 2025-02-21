import React, { useEffect, useState } from "react";
import QRCode from '../assets/qr.png'


const FundModal = ({ title, onClose }) => {
  const [showQrCode, setShowQrCode] = useState(false);
  const [user, setUser] = useState(null);
  const [showUpiId, setShowUpiId] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [copyMessage, setCopyMessage] = useState(""); // For showing copy success message

  // Fetch Payment Data
  async function fetchPayment() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/get-payment`, {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
      

      if (result.success) {
        setPaymentData(result.data); // Store API data
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPayment();
  }, []);

  // Copy UPI ID to Clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyMessage("Copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000); // Reset message after 2 sec
      })
      .catch(() => setCopyMessage("Failed to copy!"));
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 opacity-95 z-50 p-4 flex justify-center items-center">
      <div className="p-4 bg-white shadow-lg rounded-lg w-84 border">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {showQrCode ? "Scan QR Code" : showUpiId ? "UPI ID" : showBankDetails ? "Bank Account Details" : title}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Conditional Rendering */}
        {showQrCode ? (
          <div className="flex flex-col items-center">
            <img src={paymentData.QRCode} alt="QR Code" className="w-50 h-50 mb-4" />
            <button
              onClick={() => setShowQrCode(false)}
              className="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>
        ) : showUpiId ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">UPI ID</p>
            <p>Click for Copy</p>
            <p
              className="text-xl font-bold text-blue-600 bg-blue-100 p-2 rounded-md mt-2 cursor-pointer hover:bg-blue-200 transition mb-2"
              onClick={() => copyToClipboard(paymentData?.UPIID || "upi@example.com")}
            >
              {paymentData?.UPIID || "upi@example.com"}
            </p>
            {copyMessage && <p className="text-green-600 text-sm mt-2">{copyMessage}</p>}
            <button
              onClick={() => setShowUpiId(false)}
              className="mt-4 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>
        ) : showBankDetails ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Bank Account Details:</p>
            <p className="text-md font-bold text-gray-800 bg-gray-100 p-2 rounded-md mt-2">
              Account No: {paymentData?.AccountNumber || "XXXX-XXXX-XXXX-1234"}
            </p>
            <p className="text-md font-bold text-gray-800 bg-gray-100 p-3 rounded-md mt-2 mb-2">
              IFSC: {paymentData?.ifscCode || "BANK0001234"}
            </p>
            <button
              onClick={() => setShowBankDetails(false)}
              className="mt-8 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              Back
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowQrCode(true)}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              QrCode
            </button>
            <button
              onClick={() => setShowUpiId(true)}
              className="px-6 py-3 bg-purple-500 text-white font-bold rounded-lg shadow-md hover:bg-purple-600 transition"
            >
              UPI ID
            </button>
            <button
              onClick={() => setShowBankDetails(true)}
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition"
            >
              Bank Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundModal;
