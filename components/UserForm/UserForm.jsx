import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserForm = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    positionDesc: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/users/${router.query.id}`);
      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        positionDesc: data.positionDesc,
      });
    };

    if (router.query?.id) {
      getUser(router.query.id);
    }
  }, [router.query.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      router.query?.id
        ? await axios.put(`/api/users/${router.query.id}`, user)
        : await axios.post("/api/users", user);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center flex-col h-auto bg-purple-300 font-mono">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col bg-white p-8 rounded-2xl min-w-[340px]"
      >
        <h1 className="text-6xl font-mono text-gray-500 mb-4">CrudApp</h1>

        <h2 className="text-2xl font-mono mb-3 ">Nuevo usuario</h2>
        <p>Ingrese los datos del nuevo usuario</p>
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex items-start justify-center flex-col w-[200px] sm:w-[500px] ">
            <label className="w-[300px] rounded  pl-3 mt-2 sm:w-[500px]">
              Nombre:
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                required
                className="w-full rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200 "
                placeholder="Ingrese el nombre"
                value={user.firstName}
              />
            </label>
          </div>
          <div className="flex items-start justify-center flex-col w-[200px] sm:w-[500px]">
            <label className="w-[300px] rounded  pl-3 mt-2 sm:w-[500px]">
              Apellido:
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                required
                className="w-full rounded h-8 pl-3 mt-2 bg-slate-100 hover:bg-gray-200 "
                placeholder="Ingrese el apellido"
                value={user.lastName}
              />
            </label>
          </div>
          <div className="flex items-start justify-center flex-col w-[200px] sm:w-[500px]">
            <label className="w-[300px] rounded  pl-3 mt-2 sm:w-[500px]">
              Descripción del cargo:
              <textarea
                type="text"
                name="positionDesc"
                onChange={handleChange}
                required
                className="w-full rounded h-20 pl-3 mt-2 bg-slate-100 hover:bg-gray-200 "
                placeholder="Ingrese la descripción del cargo"
                rows="10"
                value={user.positionDesc}
              />
            </label>
          </div>
          <button
            type="submit"
            className="py-4 px-1 bg-blue-400 rounded-lg shadow-md w-[300px] mt-8 hover:bg-blue-600 sm:w-[500px] sm:px-2"
          >
            {router.query.id ? "Actualizar usuario" : "Crear nuevo usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
