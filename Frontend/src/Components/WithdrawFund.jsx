import React, { useState } from "react";

const WithdrawModal = ({ user, onClose }) => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleWithdraw = () => {
    if (!withdrawAmount || withdrawAmount <= 0) {
      setErrorMessage("Enter a valid amount to withdraw.");
      return;
    }

    if (withdrawAmount > user?.amount) {
      setErrorMessage("Insufficient funds.");
      return;
    }

    // No API call, just close the modal
    onClose();
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 opacity-95 z-50 p-4 flex justify-center items-center">
      <div className="p-4 bg-white shadow-lg rounded-lg w-84 border">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Withdraw Funds</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✖
          </button>
        </div>

        {/* Available Balance */}
        <p className="text-lg font-semibold text-gray-700 text-center">Available to Withdraw</p>
        <p className="text-xl font-bold text-blue-600 bg-blue-100 p-2 rounded-md mt-2 text-center">
          ₹{user?.amount || "0"}
        </p>

        {/* Input Field */}
        <div className="mt-4 mb-2">
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded-md text-lg"
          />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm mt-2 mb-2">{errorMessage}</p>}

        {/* Withdraw Button */}
        <button
          onClick={handleWithdraw}
          className="mt-4 w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default WithdrawModal;
