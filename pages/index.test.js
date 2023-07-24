import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import Home, { getServerSideProps } from "../pages/index";

jest.mock("axios");

describe("getServerSideProps", () => {
  test("should fetch users from the server and return them as props", async () => {
    const mockedUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    axios.get.mockResolvedValue({ data: mockedUsers });

    const context = {};
    const { props } = await getServerSideProps(context);

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/users");
    expect(props).toEqual({ users: mockedUsers });
  });
});
