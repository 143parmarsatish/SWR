import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { uploadQR } from "../utils/editPaymentDetails";

const EditPaymentDetails = ({ onClose, paymentData, fetchPayments }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [data, setData] = useState({
    QRCode: paymentData?.QRCode || "",
    UPIID: paymentData?.UPIID || "",
    AccountNumber: paymentData?.AccountNumber || "",
    ifscCode: paymentData?.ifscCode || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUploadChange(e){
    const file = e.target.files[0];
    if(!file){
      return;
    }

    setImageLoading(true);
    const {url} = await uploadQR(file);

    setData((prev) => {
      return {
        ...prev,
        QRCode : url
      }
    })
    setImageLoading(false);
  }

  async function editPaymentDetails(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/edit-payment`,
        {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (result.success) {
        fetchPayments();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-700">Edit Payment Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IoClose size={24} />
          </button>
        </div>

        <form onSubmit={editPaymentDetails} className="grid gap-3">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload QR Code</label>
            <label className="border rounded flex flex-col items-center p-3 cursor-pointer">
              {imageLoading ? (
                <p>Uploading...</p>
              ) : data.QRCode ? (
                <img
                  src={data.QRCode}
                  alt="QR Code"
                  className="w-full h-32 object-contain"
                />
              ) : (
                <FaCloudUploadAlt size={24} className="text-gray-500" />
              )}
              <input type="file" className="hidden" onChange={handleUploadChange} accept="image/*" />
            </label>
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
            <input
              type="text"
              name="UPIID"
              value={data.UPIID}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter UPI ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              name="AccountNumber"
              value={data.AccountNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter Account Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={data.ifscCode}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter IFSC Code"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Close
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentDetails;