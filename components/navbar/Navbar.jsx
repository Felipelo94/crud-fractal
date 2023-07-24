import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
    } catch (error) {
      console.error(error.message);
    }
    router.push("/login");
  };

  return (
    <div className="flex flex-row justify-between items-center h-20 bg-purple-400 font-mono shadow-black">
      <Link className="text-6xl font-mono ml-4 mr-4 text-gray-600" href={"/"}>
        CrudApp
      </Link>

      <div className="flex flex-row min-w-[320px] max-h-[56px] mr-4 gap-3">
        <Link
          href={"/new"}
          className="bg-blue-400 px-3 py-4 rounded-lg shadow  text-white truncate w-[140px] hover:bg-blue-500 lex items-center justify-center"
        >
          Nuevo usuario
        </Link>
        <button
          onClick={logout}
          className="bg-red-400 px-3 py-4 rounded-lg shadow mr-4 text-white truncate w-[150px] hover:bg-red-500 flex items-center justify-center"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
