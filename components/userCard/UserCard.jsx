import Link from "next/link";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const UserCard = ({ user }) => {
  return (
    <Link
      href={`/user/${user.id}`}
      className="border shadow-md p-6 mb-2 font-mono flex-row flex w-96 ml-4 bg-white cursor-pointer hover:bg-gray-200 min-w-[350px] rounded-xl "
    >
      <div>
        <AccountBoxIcon sx={{ fontSize: 120 }} color="disabled" />
      </div>
      <div className="flex items-start justify-center flex-col">
        <p className="flex w-max text-2xl">{`${user.firstName} ${user.lastName}`}</p>
        <p className="flex w-max text-xl">{user.positionDesc}</p>
      </div>
    </Link>
  );
};

export default UserCard;
