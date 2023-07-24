import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/register", formData);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-purple-300 font-mono">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col bg-white p-8 rounded-2xl"
      >
        <h1 className="text-6xl font-mono text-gray-500 mb-4">CrudApp</h1>

        <h2 className="text-2xl font-mono mb-3 ">Registro</h2>
        <p>Ingrese sus credenciales para crear su cuenta</p>

        <div className="flex items-start justify-center flex-col w-[500px]">
          <label className="w-[500px] rounded  pl-3 mt-2">Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-[500px] rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200"
            placeholder="Ingrese su correo"
          />
        </div>
        <div className="flex items-start justify-center flex-col w-[500px]">
          <label className="w-[500px] rounded  pl-3 mt-2">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-[500px] rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-4 px-2 bg-blue-400 rounded-lg shadow-md w-[500px] mt-8 hover:bg-blue-600"
        >
          Registrarse
        </button>

        <p className="flex p-0 m-0 mt-6">
          ¿Ya tienes una cuenta?
          <Link href="/registro" className="text-blue-500 ml-1">
            Inicia sesión
          </Link>
        </p>

        {error && <p>{error}</p>}
      </form>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //     />
    //   </div>
    //   <button type="submit" disabled={loading}>
    //     Register
    //   </button>
    //   {error && <p>{error}</p>}
    // </form>
  );
};

export default RegisterForm;
