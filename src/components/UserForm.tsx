


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

interface UserFormProps {
  onLoginSuccess: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLoginSuccess = () => {
    onLoginSuccess(); 
    navigate("/table"); 
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(/woman-laptop-virtual-screen-abbreviation-260nw-2400645481.webp)",
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-black bg-opacity-70 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {isSignup ? (
          <SignupForm />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}

        <button
          onClick={handleToggleForm}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all text-center"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don’t have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default UserForm;

