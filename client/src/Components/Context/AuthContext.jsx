import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // remove the curly braces
import Swal from 'sweetalert2';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromToken = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded token:", decoded);
          setUser(decoded);
        } catch (error) {
          // Handle invalid token
          console.error("Invalid token:", error.message);
          setUser(null);
          localStorage.removeItem("token");
          setToken(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserFromToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5010/login", { email, password });
      if(response.status==200){
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        setToken(response.data.token);
        setUser(jwtDecode(response.data.token)); // Set the user from the decoded token
        toast.success("Logged in successfully!");
        navigate("/");
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      return { error: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post("http://localhost:5010/register", { username, email, password })
      console.log(response.data.msg);
      toast.success("Account Created Successfully");
      navigate("/login"); // Navigate to login or another page as appropriate
      return response.data;
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.message);
      return { error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // setToken("");
    // setUser("");
    location.reload();
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5010/users/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data.error || 'Deletion failed');
      }

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      location.reload();
      navigate("/")
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          register,
          logout,
          deleteUser,
        }}
      >
        {children}
      </AuthContext.Provider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
};

export { AuthProvider, AuthContext };
