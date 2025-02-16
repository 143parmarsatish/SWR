import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersTable = () => {
  const [users, setUsers] = useState([]); // Store users in state
  const navigate = useNavigate();

  async function fetchAllUsers() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/all-users`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const result = await response.json();
      if (result.success) {
        setUsers(result.allUser); // Store users array
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("User deleted successfully");
        setUsers(users.filter((user) => user._id !== userId)); // Remove user from list
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function handleEdit(userId) {
    alert(`Edit functionality for User ID: ${userId} is not implemented yet.`);
    // Here you can open a modal for editing user details
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center">
            <button className="border p-2 rounded-xl bg-amber-100" onClick={() => navigate('/home')}>Home</button>
        </div>
      <h2 className="text-2xl font-bold text-center mb-4">Users List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Aadhar</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Amount Trade</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="text-center">
                    {console.log(user)}
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.aadhar}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role || "User"}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.amount || "0"}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.amountTrade || "0"}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;

