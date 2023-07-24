import axios from "axios";
import Layout from "../components/Layout/Layout";

import UserCard from "../components/userCard/UserCard";

export default function Home({ users }) {
  return (
    <Layout>
      <div className="flex items-start h-full">
        <div className="flex flex-row items-baseline justify-start flex-wrap mt-[40px]">
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/users");

  return {
    props: {
      users: res.data,
    },
  };
};
