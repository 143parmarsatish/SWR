import React, { useEffect, useState } from 'react';
import FundModal from '../Components/FundModel';
import WithdrawModal from '../Components/WithdrawFund'; // Import Withdraw Modal

const Money = () => {
  const [showFundOptions, setShowFundOptions] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // State for withdraw modal
  const [user, setUser] = useState(null);

  async function fetchUserDetails() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/get-user`, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const result = await response.json();
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Fund Available */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <p className="font-bold text-2xl text-gray-700">Fund Available</p>
        <div className="mt-3 bg-blue-100 text-blue-800 font-bold text-xl py-2 rounded-md">
          ₹{user?.amount ? user.amount : "0"}
        </div>
      </div>

      {/* Used Margin */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center mt-5">
        <p className="font-bold text-2xl text-gray-700">Used Margin</p>
        <div className="mt-3 bg-blue-100 text-blue-800 font-bold text-xl py-2 rounded-md">
          ₹{user?.amountTrade ? user.amountTrade : "0"}
        </div>
      </div>

      {/* Add Fund Box */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center mt-5">
        <p className="font-bold text-2xl text-gray-700">Add Fund</p>
        <div className="mt-8">
          <button
            className="w-full px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
            onClick={() => setShowFundOptions(!showFundOptions)}
          >
            Add Fund
          </button>
        </div>
      </div>

      {showFundOptions && <FundModal title="Select a Payment Method" onClose={() => setShowFundOptions(false)} />}

      {/* Withdraw Fund Box */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center mt-5">
        <p className="font-bold text-2xl text-gray-700">Withdraw Fund</p>
        <div className="mt-8">
          <button
            className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
            onClick={() => setShowWithdrawModal(true)} // Show withdraw modal
          >
            Withdraw Fund
          </button>
        </div>
      </div>

      {showWithdrawModal && <WithdrawModal user={user} onClose={() => setShowWithdrawModal(false)} />}
    </div>
  );
};

export default Money;
