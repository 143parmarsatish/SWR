import React, { useState } from "react";

const EditUserModal = ({ user, onCancel, onConfirm }) => {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(updatedUser);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>
          <label className="block mb-2">
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>
          <label className="block mb-2">
            Phone:
            <input
              type="text"
              name="phone"
              value={updatedUser.phone}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>
          <label className="block mb-2">
            Aadhar:
            <input
              type="text"
              name="phone"
              value={updatedUser.aadhar}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>
          <label className="block mb-2">
            Amount:
            <input
              type="text"
              name="amount"
              value={updatedUser.amount}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>
          <label className="block mb-2">
            Amount Trade:
            <input
              type="text"
              name="amountTrade"
              value={updatedUser.amountTrade}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </label>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-3 py-2 rounded mr-2"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
