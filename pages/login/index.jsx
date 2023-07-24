import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginForm = () => {
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
      await axios.post("/api/login", formData);
      console.log("Heloooooooooooooooooooooo");
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError("Ingreso fallido. Revisa tus credenciales.");
      console.error(error);
      setFormData({ ...formData, password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-purple-300 font-mono">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col bg-white p-8 rounded-2xl"
      >
        {error && (
          <p className="text-2xl text-red-500 w-[300px] md:w-[500px] text-center mb-4">
            {error}
          </p>
        )}
        <h1 className="text-6xl font-mono text-gray-500 mb-4">CrudApp</h1>

        <h2 className="text-2xl font-mono mb-3 w-[200px]">Iniciar sesión</h2>
        <p className=" font-mono mb-3 w-[300px] sm:w-full text-center">
          Ingrese sus credenciales para acceder a su cuenta
        </p>

        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex items-start justify-center flex-col w-[300px] sm:w-[500px]">
            <label
              className="min-w-[300px] rounded sm:w-[500px] pl-3 mt-2"
              htmlFor="email"
              aria-labelledby="email"
            >
              Correo:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200 "
                placeholder="Ingrese su correo"
              />
            </label>
          </div>
          <div className="flex items-start justify-center flex-col w-[300px] sm:w-[500px]">
            <label
              className="w-[300px] rounded  pl-3 mt-2 sm:w-[500px]"
              htmlFor="password"
            >
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200 "
                placeholder="Ingrese su contraseña"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-4 px-2 bg-blue-400 rounded-lg shadow-md w-[300px] mt-8 hover:bg-blue-600 sm:w-[500px]"
          >
            Ingresar
          </button>
        </div>
        <p className="flex p-0 m-0 mt-6">
          ¿No tienes una cuenta?{"  "}
          <Link href="/registro" className="text-blue-500 ml-1">
            Registrate
          </Link>
        </p>

        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
