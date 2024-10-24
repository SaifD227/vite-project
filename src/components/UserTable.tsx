import React, { useEffect, useState } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import AlertDialog from "./AlertDialog";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [newUser, setNewUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  const editUser = (user: User) => {
    setCurrentUser(user);
    setNewUser({ name: user.name, email: user.email });
    setEditMode(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/users/${currentUser.id}`,
          newUser
        );
        setUsers(
          users.map((user) =>
            user.id === currentUser.id ? { ...user, ...newUser } : user
          )
        );
        resetForm();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrentUser(null);
    setNewUser({ name: "", email: "" });
  };

  if (loading) {
    return (
      <p className="text-center">
        <PulseLoader />
      </p>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between">
        <div>
          <p className="text-2xl font-bold mb-4">Saif Data Table</p>
        </div>
        <div>
          <a href="/" className="hover:underline text-orange-500">
            Sign out
          </a>
        </div>
      </div>

      <form
        onSubmit={editMode ? handleEditSubmit : handleAddUser}
        className="mb-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
        >
          {editMode ? "Update User" : "Add User"}
        </button>
        {editMode && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white py-1 px-3 rounded ml-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => editUser(user)}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDialog
        isOpen={isDialogOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default UserTable;
