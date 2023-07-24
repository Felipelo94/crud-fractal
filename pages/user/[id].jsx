import React from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const UserDetail = ({ user }) => {
  const router = useRouter();

  const handleDeleteUser = async (id) => {
    await axios.delete(`/api/users/${id}`);
    router.push("/");
  };

  const handleEditUser = async (id) => {
    router.push(`/user/edit/${id}`);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-start justify-center bg-white p-4 rounded-lg">
          <h1 className="text-gray-400 uppercase text-2xl">
            Detalles del usuario
          </h1>
          <div className="flex flex-row ">
            <div className="mr-4">
              <AccountBoxIcon sx={{ fontSize: 120 }} color="disabled" />
            </div>
            <div className="flex flex-col mt-4">
              <h2>{`Nombre: ${user.firstName}`}</h2>
              <h3>{`Apellido: ${user.firstName}`}</h3>
              <h3>{`Descripcion del cargo: ${user.positionDesc}`}</h3>
            </div>
          </div>
          <div className="flex flex-row gap-5 mt-5">
            <button
              className="bg-red-400 px-7 py-2 text-white rounded hover:bg-red-500"
              onClick={() => handleDeleteUser(user.id)}
            >
              Borrar
            </button>
            <button
              className="bg-blue-400 px-7 py-2 text-white rounded hover:bg-blue-500"
              onClick={() => handleEditUser(user.id)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const res = await axios.get(
    `http://localhost:3000/api/users/${context.query.id}`
  );
  console.log(res.data);
  return {
    props: {
      user: res.data,
    },
  };
};

export default UserDetail;
