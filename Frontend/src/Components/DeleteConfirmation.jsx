import React from "react";

const DeleteConfirmationModal = ({ user, onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete <b>{user.name}</b>?</p>
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
