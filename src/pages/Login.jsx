import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        correo: correo,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("rol", res.data.usuario.rol);
      navigate("/panel");

    } catch (err) {
      setMensaje("❌ Credenciales incorrectas o error de conexión");
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-yellow-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <GraduationCap className="text-blue-600" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Ingreso al Sistema</h2>
        <p className="text-sm text-gray-500 mb-6">Usa tus credenciales educativas</p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Correo institucional"
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full px-4 py-2 pr-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-blue-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Iniciar sesión
          </button>
        </form>

        {mensaje && <p className="text-red-600 mt-4">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Login;
