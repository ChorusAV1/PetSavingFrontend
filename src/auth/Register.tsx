import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePasswordValidation } from "../Components/usePasswordValidation";

const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {errors, validatePassword} = usePasswordValidation();

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validatePassword(password)){
      return;
    }

    try {
      await axios.post("http://216.238.94.51:5172/comandafacil/account/register", {
        userName,
        password,
      });
      toast.success("Registro de cuenta exitoso!");
      navigate("/login"); 
    } catch (err) {
      console.error(err);
      toast.error("Registro fallido. Por favor inténtelo de nuevo.");
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-[#1E1E1E]">
      <form
        onSubmit={handleRegister}
        className="dark:bg-[#202020] p-6 rounded shadow-md w-80"
      >
        {/* Login redirect */}
        <p className="mb-4 text-sm">
          <button
             type="button"
             onClick={() => navigate("/login")}
             className="text-blue-500 hover:underline"
            >
             ← Regresar a inicio de sesión
          </button>
        </p>
        <h2 className="text-2xl text-white font-bold mb-4 text-center">Registrarse</h2>
          {/* Shows the errors */}
          {errors.length > 0 && (
            <ul className="text-red-500 text-sm mb-2">
              {errors.map((err, i) => (
                <li key={i}>• {err}</li>
              ))}
            </ul>
          )}
        <input
          type="text"
          placeholder="Usuario"
          value={userName}
          onChange={handleUserNameChange}
          className="w-full h-8 p-2 mb-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-white dark:bg-[#101010] text-white"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          className="w-full h-8 p-2 mb-3 border border-black rounded focus:outline-none focus:ring-2 focus:ring-white dark:bg-[#101010] text-white"
        />
        <button
          type="submit"
          className="w-full bg-[#05DF72] text-white py-2 rounded hover:bg-[#5ae9a2] transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
