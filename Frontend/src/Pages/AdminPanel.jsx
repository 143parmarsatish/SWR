import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // Import Outlet
import EditPaymentDetails from "../Components/Editpayment";

const AdminPanel = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  async function fetchPayment() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/get-payment`, {
        method: "GET",
      });
      const result = await response.json();

      if (result.success) {
        setPaymentData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPayment();
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>
      <p className="text-center text-gray-600">Welcome to the Admin Dashboard.</p>

      {/* Admin functionalities */}
      <div className="mt-6 flex flex-col gap-3">
        <button
          className="w-full bg-blue-500 text-white p-4 rounded"
          onClick={() => navigate("/allusers")} // ✅ Correct navigation
        >
          Manage Users
        </button>
        <button className="w-full bg-green-500 text-white p-4 rounded mt-2">
          View Transactions
        </button>
        <button
          className="w-full bg-red-500 text-white p-4 rounded"
          onClick={() => setShowEditModal(true)}
        >
          Edit Payment Details
        </button>
      </div>
      
      {showEditModal && (
        <EditPaymentDetails
          fetchPayments={fetchPayment}
          paymentData={paymentData}
          onClose={() => setShowEditModal(false)}
        />
      )}

    </div>
  );
};

export default AdminPanel;
