import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import { toast } from "react-toastify";


const Login: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth =useContext(AuthContext);



  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
        const response = await axios.post("http://216.238.94.51:5172/comandafacil/account/login", {
        userName,
        password,
      });
      auth?.login(response.data.token);
      toast.success("Inicio de sesión exitoso!");
      navigate("/appointments");
    } catch (err: any) {
    setError("Datos inválidos");
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
          onSubmit={handleSubmit}
          className="dark:bg-[#202020] p-6 rounded shadow-md w-80"
        >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="userName"
          placeholder="Nombre de usuario"
          value={userName}
          onChange={handleUserNameChange}
          className="w-full h-8 p-2 mb-3 border border-black rounded focus:outline-none focus:ring-1 focus:ring-white dark:bg-[#101010] text-white"
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
          className="w-full p-2 bg-[#339FFF] text-white  rounded hover:bg-[#7ab8ee] transition"
        >
          Iniciar sesión
        </button>

        {/* Register redirect */}
        <p className="mt-4 text-center text-sm text-white">
            ¿No tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline"
            >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
};


export default Login;